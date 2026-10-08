import { useMemo, useState } from "react";
import "./Emprestimos.css";
import Button from "../../../components/Button";

type Aba = "ativos" | "atrasados" | "historico";
type Status = "Ativo" | "Atrasado";

interface Emprestimo {
  id: number;
  aluno: string;
  alunoId: string;
  iniciais: string;
  livro: string;
  autor: string;
  dataEmprestimo: string;
  dataDevolucao: string;
  prazo: string;
  status: Status;
}

const emprestimos: Emprestimo[] = [
  {
    id: 1,
    aluno: "Elena Smith",
    alunoId: "ST-8492",
    iniciais: "ES",
    livro: "The Design of Everyday Things",
    autor: "Don Norman",
    dataEmprestimo: "12/10/2023",
    dataDevolucao: "26/10/2023",
    prazo: "3 dias restantes",
    status: "Ativo",
  },
  {
    id: 2,
    aluno: "James Doe",
    alunoId: "ST-1029",
    iniciais: "JD",
    livro: "Introduction to Algorithms",
    autor: "Thomas H. Cormen",
    dataEmprestimo: "28/09/2023",
    dataDevolucao: "12/10/2023",
    prazo: "11 dias atrasado",
    status: "Atrasado",
  },
  {
    id: 3,
    aluno: "Maria Rodriguez",
    alunoId: "ST-5581",
    iniciais: "MR",
    livro: "Sapiens: A Brief History",
    autor: "Yuval Noah Harari",
    dataEmprestimo: "20/10/2023",
    dataDevolucao: "03/11/2023",
    prazo: "11 dias restantes",
    status: "Ativo",
  },
];

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    filter: <><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></>,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function formatDate(value: string) {
  const [day, month, year] = value.split("/");
  // Traduzido para os meses em Português
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return { first: `${day} de ${months[Number(month) - 1]},`, second: year };
}

function Emprestimos() {
  const [aba, setAba] = useState<Aba>("ativos");
  const [aluno, setAluno] = useState("");
  const [livro, setLivro] = useState("");
  const [data, setData] = useState("Qualquer período");
  const [busca, setBusca] = useState("");
  const [acoesAbertas, setAcoesAbertas] = useState<number | null>(null);
  const [cartaoExpandido, setCartaoExpandido] = useState<number | null>(null);

  const contagemAtivos = emprestimos.filter((item) => item.status === "Ativo").length;
  const contagemAtrasados = emprestimos.filter((item) => item.status === "Atrasado").length;

  const filtrados = useMemo(() => emprestimos.filter((item) => {
    const termo = busca.trim().toLowerCase();
    const correspondeBusca = !termo || [item.aluno, item.alunoId, item.livro, item.autor].some((v) => v.toLowerCase().includes(termo));
    const correspondeAluno = !aluno || item.aluno.toLowerCase().includes(aluno.toLowerCase()) || item.alunoId.toLowerCase().includes(aluno.toLowerCase());
    const correspondeLivro = !livro || item.livro.toLowerCase().includes(livro.toLowerCase()) || item.autor.toLowerCase().includes(livro.toLowerCase());
    const correspondeAba = aba === "historico" || (aba === "ativos" ? item.status === "Ativo" : item.status === "Atrasado");
    return correspondeBusca && correspondeAluno && correspondeLivro && correspondeAba;
  }), [aba, aluno, livro, busca]);

  return (
    <div className="loans-page">
      <header className="loans-topbar">
        <div className="topbar-search">
          <Icon name="search" size={21} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar empréstimos, alunos ou livros..." />
        </div>
        <div className="topbar-actions">
          <button className="icon-button notification" aria-label="Notificações"><Icon name="bell" size={22} /><span /></button>
          <div className="profile-avatar">HU</div>
        </div>
      </header>

      <main className="loans-content">
        <section className="loans-heading">
          <div>
            <h1>Gerenciamento de Empréstimos</h1>
            <p>Gerencie empréstimos ativos de livros, acompanhe itens atrasados e processe devoluções.</p>
          </div>
          {<Button text="Novo Empréstimo" icon="add" NomeClasse="material-symbols-outlined"/>} 
        </section>

        <div className="loan-tabs" role="tablist">
          <button className={aba === "ativos" ? "active" : ""} onClick={() => setAba("ativos")} role="tab">Empréstimos Ativos ({contagemAtivos + contagemAtrasados + 19})</button>
          <button className={aba === "atrasados" ? "active" : ""} onClick={() => setAba("atrasados")} role="tab">Atrasados ({contagemAtrasados + 2})</button>
          <button className={aba === "historico" ? "active" : ""} onClick={() => setAba("historico")} role="tab">Histórico</button>
        </div>

        <section className="filter-card">
          <label>
            <span>Aluno</span>
            <input value={aluno} onChange={(e) => setAluno(e.target.value)} placeholder="Nome ou ID" />
          </label>
          <label>
            <span>Título do Livro</span>
            <input value={livro} onChange={(e) => setLivro(e.target.value)} placeholder="Título ou ISBN" />
          </label>
          <label>
            <span>Data de Vencimento</span>
            <select value={data} onChange={(e) => setData(e.target.value)}>
              <option>Qualquer período</option>
              <option>Vence hoje</option>
              <option>Vence esta semana</option>
            </select>
          </label>
          <button className="filter-button"><Icon name="filter" size={17} /> Filtrar</button>
        </section>

        <section className="table-card">
          <div className="table-scroll loans-desktop-table">
            <table>
              <thead>
                <tr>
                  <th>ALUNO</th><th>LIVRO</th><th>DATA DE EMPRÉSTIMO</th><th>DATA DE DEVOLUÇÃO</th><th>STATUS</th><th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((item) => {
                  const loan = formatDate(item.dataEmprestimo);
                  const due = formatDate(item.dataDevolucao);
                  return (
                    <tr key={item.id} className={item.status === "Atrasado" ? "overdue-row" : ""}>
                      <td>
                        <div className="student-cell"><div className="initials">{item.iniciais}</div><div><strong>{item.aluno}</strong><small>ID: {item.alunoId}</small></div></div>
                      </td>
                      <td><div className="book-cell"><strong>{item.livro}</strong><small>{item.autor}</small></div></td>
                      <td><div className="date-cell"><span>{loan.first}</span><span>{loan.second}</span></div></td>
                      <td><div className={`date-cell ${item.status === "Atrasado" ? "danger" : ""}`}><span>{due.first}</span><span>{due.second}</span><small>{item.prazo}</small></div></td>
                      <td><span className={`status-pill ${item.status === "Atrasado" ? "overdue" : "active"}`}>{item.status}</span></td>
                      <td>
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
                              <button type="button" onClick={() => setAcoesAbertas(null)}>
                                <span className="material-symbols-outlined">visibility</span>
                                Ver detalhes
                              </button>
                              <button type="button" onClick={() => setAcoesAbertas(null)}>
                                <span className="material-symbols-outlined">assignment_turned_in</span>
                                Registrar devolução
                              </button>
                              <button type="button" onClick={() => setAcoesAbertas(null)}>
                                <span className="material-symbols-outlined">autorenew</span>
                                Renovar empréstimo
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>                                                  
                  );
                })}
                {filtrados.length === 0 && <tr><td colSpan={6} className="empty-row">Nenhum empréstimo encontrado.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="loans-mobile-cards">
            {filtrados.map((item) => {
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
                        <small>ID: {item.alunoId}</small>
                      </div>
                    </div>
                    <div className="loan-mobile-summary-end">
                      <span className={`status-pill ${item.status === "Atrasado" ? "overdue" : "active"}`}>{item.status}</span>
                      <span className="material-symbols-outlined">{expanded ? "expand_less" : "expand_more"}</span>
                    </div>
                  </button>
                  {expanded && (
                    <div className="loan-mobile-card-details">
                      <div><span>Livro</span><strong>{item.livro}</strong><small>{item.autor}</small></div>
                      <div className="loan-mobile-dates">
                        <div><span>Data de empréstimo</span><strong>{loan.first} {loan.second}</strong></div>
                        <div><span>Data de devolução</span><strong className={item.status === "Atrasado" ? "loan-danger-text" : ""}>{due.first} {due.second}</strong><small className={item.status === "Atrasado" ? "loan-danger-text" : ""}>{item.prazo}</small></div>
                      </div>
                      <div className="loan-mobile-actions">
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
                            <span className="material-symbols-outlined loan-actions-chevron">{acoesAbertas === item.id ? "expand_less" : "expand_more"}</span>
                          </button>
                          {acoesAbertas === item.id && (
                            <div className="loan-actions-dropdown">
                              <button type="button" onClick={() => setAcoesAbertas(null)}><span className="material-symbols-outlined">visibility</span>Ver detalhes</button>
                              <button type="button" onClick={() => setAcoesAbertas(null)}><span className="material-symbols-outlined">assignment_turned_in</span>Registrar devolução</button>
                              <button type="button" onClick={() => setAcoesAbertas(null)}><span className="material-symbols-outlined">autorenew</span>Renovar empréstimo</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
            {filtrados.length === 0 && <p className="loan-mobile-empty">Nenhum empréstimo encontrado.</p>}
          </div>

          <footer className="table-footer">
            <span>Exibindo {filtrados.length || 0} de 24 empréstimos</span>
          </footer>
        </section>
      </main>
    </div>
  );
}


export default Emprestimos;
