import { useCallback, useEffect, useMemo, useState } from "react";
import "./Emprestimos.css";

type Aba = "ativos" | "atrasados" | "historico";
type Status = "Ativo" | "Atrasado" | "Devolvido";

interface EmprestimoApi {
  id: number;
  aluno?: {
    id_aluno: number;
    nome_aluno: string;
    matricula_aluno: string;
    serie_aluno?: string;
    turma_aluno?: string | null;
  } | null;
  livro?: {
    id_livro: number;
    titulo_livro: string;
    codigo_livro: string;
  } | null;
  professorResponsavel?: {
    id_usuario: number;
    nome_usuario: string;
  } | null;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoReal?: string | null;
  status: string;
}

interface Emprestimo {
  id: number;
  aluno: string;
  alunoId: string;
  iniciais: string;
  livro: string;
  codigoLivro: string;
  professorResponsavel: string;
  dataEmprestimo: string;
  dataDevolucao: string;
  dataDevolucaoReal: string | null;
  prazo: string;
  status: Status;
}

interface RespostaEmprestimos {
  total: number;
  emprestimos: EmprestimoApi[];
  erro?: string;
}

const API_URL = "http://localhost:3000/api/emprestimos";
const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function getToken() {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
}

function parseDate(value?: string | null): Date | null {
  if (!value) return null;

  // Datas SQL no formato YYYY-MM-DD são tratadas como datas locais para evitar
  // que o fuso horário mostre o dia anterior.
  const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dateOnly) {
    return new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(value?: string | null) {
  const date = parseDate(value);
  if (!date) return { first: "—", second: "" };

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.getMonth() + 1;
  return {
    first: `${day} de ${MESES[month - 1]},`,
    second: String(date.getFullYear()),
  };
}

function formatShortDate(value?: string | null) {
  const date = parseDate(value);
  if (!date) return "—";
  return date.toLocaleDateString("pt-BR");
}

function startOfToday() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function mapEmprestimo(item: EmprestimoApi): Emprestimo {
  const statusOriginal = String(item.status || "").toUpperCase();
  const devolvido = statusOriginal === "DEVOLVIDO" || Boolean(item.dataDevolucaoReal);
  const vencimento = parseDate(item.dataDevolucaoPrevista);
  const diasRestantes = vencimento
    ? Math.round((vencimento.getTime() - startOfToday().getTime()) / 86400000)
    : null;
  const atrasado = !devolvido && (
    statusOriginal === "ATRASADO" ||
    (statusOriginal === "ATIVO" && diasRestantes !== null && diasRestantes < 0)
  );

  let prazo = "Prazo não informado";
  if (devolvido) {
    prazo = item.dataDevolucaoReal
      ? `Devolvido em ${formatShortDate(item.dataDevolucaoReal)}`
      : "Devolvido";
  } else if (atrasado && diasRestantes !== null) {
    prazo = `${Math.abs(diasRestantes)} ${Math.abs(diasRestantes) === 1 ? "dia" : "dias"} atrasado`;
  } else if (diasRestantes === 0) {
    prazo = "Vence hoje";
  } else if (diasRestantes !== null && diasRestantes > 0) {
    prazo = `${diasRestantes} ${diasRestantes === 1 ? "dia" : "dias"} restantes`;
  }

  const nomeAluno = item.aluno?.nome_aluno || "Aluno não identificado";
  const matricula = item.aluno?.matricula_aluno || String(item.aluno?.id_aluno ?? "—");

  return {
    id: item.id,
    aluno: nomeAluno,
    alunoId: matricula,
    iniciais: nomeAluno
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0].toUpperCase())
      .join("") || "AL",
    livro: item.livro?.titulo_livro || "Livro não identificado",
    codigoLivro: item.livro?.codigo_livro || "—",
    professorResponsavel: item.professorResponsavel?.nome_usuario || "Não informado",
    dataEmprestimo: item.dataEmprestimo,
    dataDevolucao: item.dataDevolucaoPrevista,
    dataDevolucaoReal: item.dataDevolucaoReal || null,
    prazo,
    status: devolvido ? "Devolvido" : atrasado ? "Atrasado" : "Ativo",
  };
}

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    filter: <><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Emprestimos() {
  const [aba, setAba] = useState<Aba>("ativos");
  const [aluno, setAluno] = useState("");
  const [livro, setLivro] = useState("");
  const [data, setData] = useState("Qualquer período");
  const [busca, setBusca] = useState("");
  const [acoesAbertas, setAcoesAbertas] = useState<number | null>(null);
  const [cartaoExpandido, setCartaoExpandido] = useState<number | null>(null);
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarEmprestimos = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setErro("Sua sessão não foi encontrada. Entre novamente no ORBI.");
      setCarregando(false);
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const payload = await resposta.json().catch(() => ({} as RespostaEmprestimos));

      if (resposta.status === 401 || resposta.status === 403) {
        throw new Error("Sua sessão expirou ou não está autorizada. Entre novamente no ORBI.");
      }
      if (!resposta.ok) {
        throw new Error(payload.erro || "Não foi possível carregar os empréstimos.");
      }

      const dados = payload as RespostaEmprestimos;
      setEmprestimos(Array.isArray(dados.emprestimos) ? dados.emprestimos.map(mapEmprestimo) : []);
    } catch (error) {
      setErro(error instanceof Error
        ? error.message
        : "Não foi possível conectar à API. Verifique se o servidor está ativo.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void carregarEmprestimos();
  }, [carregarEmprestimos]);

  const contagemAtivos = emprestimos.filter((item) => item.status === "Ativo" || item.status === "Atrasado").length;
  const contagemAtrasados = emprestimos.filter((item) => item.status === "Atrasado").length;

  const filtrados = useMemo(() => emprestimos.filter((item) => {
    const termo = busca.trim().toLowerCase();
    const correspondeBusca = !termo || [
      item.aluno, item.alunoId, item.livro, item.codigoLivro, item.professorResponsavel,
    ].some((valor) => valor.toLowerCase().includes(termo));
    const correspondeAluno = !aluno ||
      item.aluno.toLowerCase().includes(aluno.toLowerCase()) ||
      item.alunoId.toLowerCase().includes(aluno.toLowerCase());
    const correspondeLivro = !livro ||
      item.livro.toLowerCase().includes(livro.toLowerCase()) ||
      item.codigoLivro.toLowerCase().includes(livro.toLowerCase());
    const correspondeAba = aba === "historico"
      ? true
      : aba === "ativos"
        ? item.status === "Ativo" || item.status === "Atrasado"
        : item.status === "Atrasado";

    const vencimento = parseDate(item.dataDevolucao);
    const hoje = startOfToday();
    const correspondeData = data === "Qualquer período" ||
      (data === "Vence hoje" && vencimento?.getTime() === hoje.getTime() && item.status !== "Devolvido") ||
      (data === "Vence esta semana" && vencimento !== null && vencimento >= hoje &&
        vencimento.getTime() <= hoje.getTime() + 6 * 86400000 && item.status !== "Devolvido");

    return correspondeBusca && correspondeAluno && correspondeLivro && correspondeAba && correspondeData;
  }), [emprestimos, aba, aluno, livro, busca, data]);

  const renderAcoes = (item: Emprestimo) => (
    <div className="loan-actions-menu">
      <button
        type="button"
        className="loan-actions-trigger"
        onClick={() => setAcoesAbertas((aberto) => aberto === item.id ? null : item.id)}
        aria-label={`Abrir ações do empréstimo de ${item.aluno}`}
        aria-expanded={acoesAbertas === item.id}
      >
        <Icon name="more" size={18} />
        <span>Ações</span>
        <span className="material-symbols-outlined loan-actions-chevron">
          {acoesAbertas === item.id ? "expand_less" : "expand_more"}
        </span>
      </button>
      {acoesAbertas === item.id && (
        <div className="loan-actions-dropdown">
          <button type="button" disabled title="Detalhamento individual ainda não disponível">
            <span className="material-symbols-outlined">visibility</span>
            Ver detalhes
          </button>
          <button type="button" disabled title="A API ainda não disponibiliza a devolução">
            <span className="material-symbols-outlined">assignment_turned_in</span>
            Registrar devolução
          </button>
          <button type="button" disabled title="A API ainda não disponibiliza a renovação">
            <span className="material-symbols-outlined">autorenew</span>
            Renovar empréstimo
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="loans-page">
      <header className="loans-topbar">
        <div className="topbar-search">
          <Icon name="search" size={21} />
          <input
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Buscar empréstimos, alunos, livros ou professores..."
            aria-label="Buscar empréstimos"
          />
        </div>
        <div className="topbar-actions">
          <button className="icon-button notification" aria-label="Notificações"><Icon name="bell" size={22} /><span /></button>
        </div>
      </header>

      <main className="loans-content">
        <section className="loans-heading">
          <div>
            <h1>Gerenciamento de Empréstimos</h1>
            <p>Consulte os empréstimos da instituição, acompanhe atrasos e identifique o professor responsável.</p>
          </div>
          <button
            type="button"
            className="new-loan-button"
            disabled
            title="O cadastro de empréstimos ainda não está disponível na API"
          >
            <span className="material-symbols-outlined">add</span>
            Novo Empréstimo
          </button>
        </section>

        <div className="loan-tabs" role="tablist" aria-label="Filtrar empréstimos">
          <button className={aba === "ativos" ? "active" : ""} onClick={() => setAba("ativos")} role="tab" aria-selected={aba === "ativos"}>
            Empréstimos Ativos ({contagemAtivos})
          </button>
          <button className={aba === "atrasados" ? "active" : ""} onClick={() => setAba("atrasados")} role="tab" aria-selected={aba === "atrasados"}>
            Atrasados ({contagemAtrasados})
          </button>
          <button className={aba === "historico" ? "active" : ""} onClick={() => setAba("historico")} role="tab" aria-selected={aba === "historico"}>
            Histórico ({emprestimos.length})
          </button>
        </div>

        <section className="filter-card">
          <label>
            <span>Aluno</span>
            <input value={aluno} onChange={(event) => setAluno(event.target.value)} placeholder="Nome ou matrícula" />
          </label>
          <label>
            <span>Título do Livro</span>
            <input value={livro} onChange={(event) => setLivro(event.target.value)} placeholder="Título ou código" />
          </label>
          <label>
            <span>Data de Vencimento</span>
            <select value={data} onChange={(event) => setData(event.target.value)}>
              <option>Qualquer período</option>
              <option>Vence hoje</option>
              <option>Vence esta semana</option>
            </select>
          </label>
          <button className="filter-button" type="button" onClick={() => void carregarEmprestimos()} disabled={carregando}>
            <Icon name="filter" size={17} /> Atualizar
          </button>
        </section>

        {erro && (
          <div role="alert" style={{ padding: "14px 18px", marginBottom: 18, border: "1px solid #efb7b7", borderRadius: 10, background: "#fff3f3", color: "#8d1b1b" }}>
            <p style={{ margin: "0 0 10px" }}>{erro}</p>
            <button type="button" onClick={() => void carregarEmprestimos()} style={{ padding: "7px 12px", borderRadius: 7, border: "1px solid currentColor", background: "white", color: "inherit", cursor: "pointer" }}>
              Tentar novamente
            </button>
          </div>
        )}

        <section className="table-card">
          <div className="table-scroll loans-desktop-table">
            <table>
              <thead>
                <tr>
                  <th>ALUNO</th><th>LIVRO / RESPONSÁVEL</th><th>DATA DE EMPRÉSTIMO</th><th>DATA DE DEVOLUÇÃO</th><th>STATUS</th><th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr><td colSpan={6} className="empty-row">Carregando empréstimos da instituição...</td></tr>
                ) : !erro && filtrados.map((item) => {
                  const loan = formatDate(item.dataEmprestimo);
                  const due = formatDate(item.dataDevolucao);
                  return (
                    <tr key={item.id} className={item.status === "Atrasado" ? "overdue-row" : ""}>
                      <td>
                        <div className="student-cell">
                          <div className="initials">{item.iniciais}</div>
                          <div><strong>{item.aluno}</strong><small>Matrícula: {item.alunoId}</small></div>
                        </div>
                      </td>
                      <td>
                        <div className="book-cell">
                          <strong>{item.livro}</strong>
                          <small>Código: {item.codigoLivro}</small>
                          <small>Responsável: {item.professorResponsavel}</small>
                        </div>
                      </td>
                      <td><div className="date-cell"><span>{loan.first}</span><span>{loan.second}</span></div></td>
                      <td>
                        <div className={`date-cell ${item.status === "Atrasado" ? "danger" : ""}`}>
                          <span>{due.first}</span><span>{due.second}</span><small>{item.prazo}</small>
                        </div>
                      </td>
                      <td><span className={`status-pill ${item.status === "Atrasado" ? "overdue" : "active"}`}>{item.status}</span></td>
                      <td>{renderAcoes(item)}</td>
                    </tr>
                  );
                })}
                {!carregando && !erro && filtrados.length === 0 && (
                  <tr><td colSpan={6} className="empty-row">Nenhum empréstimo encontrado para os filtros selecionados.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="loans-mobile-cards">
            {carregando && <p className="loan-mobile-empty">Carregando empréstimos da instituição...</p>}
            {!carregando && !erro && filtrados.map((item) => {
              const loan = formatDate(item.dataEmprestimo);
              const due = formatDate(item.dataDevolucao);
              const expanded = cartaoExpandido === item.id;
              return (
                <article key={item.id} className={`loan-mobile-card ${item.status === "Atrasado" ? "overdue-row" : ""}`}>
                  <button
                    type="button"
                    className="loan-mobile-card-summary"
                    onClick={() => setCartaoExpandido((id) => id === item.id ? null : item.id)}
                    aria-expanded={expanded}
                  >
                    <div className="student-cell">
                      <div className="initials">{item.iniciais}</div>
                      <div className="min-w-0 text-left">
                        <strong>{item.aluno}</strong>
                        <small>Matrícula: {item.alunoId}</small>
                      </div>
                    </div>
                    <div className="loan-mobile-summary-end">
                      <span className={`status-pill ${item.status === "Atrasado" ? "overdue" : "active"}`}>{item.status}</span>
                      <span className="material-symbols-outlined">{expanded ? "expand_less" : "expand_more"}</span>
                    </div>
                  </button>
                  {expanded && (
                    <div className="loan-mobile-card-details">
                      <div><span>Livro</span><strong>{item.livro}</strong><small>Código: {item.codigoLivro}</small></div>
                      <div><span>Professor responsável</span><strong>{item.professorResponsavel}</strong></div>
                      <div className="loan-mobile-dates">
                        <div><span>Data de empréstimo</span><strong>{loan.first} {loan.second}</strong></div>
                        <div><span>Data de devolução</span><strong className={item.status === "Atrasado" ? "loan-danger-text" : ""}>{due.first} {due.second}</strong><small className={item.status === "Atrasado" ? "loan-danger-text" : ""}>{item.prazo}</small></div>
                      </div>
                      <div className="loan-mobile-actions">{renderAcoes(item)}</div>
                    </div>
                  )}
                </article>
              );
            })}
            {!carregando && !erro && filtrados.length === 0 && <p className="loan-mobile-empty">Nenhum empréstimo encontrado para os filtros selecionados.</p>}
          </div>

          <footer className="table-footer">
            <span>Exibindo {filtrados.length} de {emprestimos.length} empréstimos da instituição</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Emprestimos;
