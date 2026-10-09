import React, { useCallback, useEffect, useMemo, useState } from "react";

type Categoria = { id_categoria: number; nome_categoria: string };
type Livro = {
  id_livro: number;
  titulo_livro: string;
  codigo_livro: string;
  autor_livro: string | null;
  isbn: string | null;
  id_categoria: number | null;
  quantidade_total: number;
  quantidade_disponivel: number;
  status_livro: boolean;
  status_exibicao?: string;
  tbl_categorias?: Categoria | null;
};
type LivroForm = {
  titulo_livro: string;
  codigo_livro: string;
  autor_livro: string;
  isbn: string;
  id_categoria: string;
  quantidade_total: string;
  status_livro: boolean;
};

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");
const EMPTY_FORM: LivroForm = {
  titulo_livro: "", codigo_livro: "", autor_livro: "", isbn: "",
  id_categoria: "", quantidade_total: "1", status_livro: true,
};

function getToken() {
  const direct = localStorage.getItem("token");
  if (direct) return direct;
  for (const key of ["usuario", "user", "orbi_usuario", "auth"]) {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        const parsed = JSON.parse(value);
        if (parsed?.token) return parsed.token;
      }
    } catch { /* ignora valores que não sejam JSON */ }
  }
  return "";
}

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  const raw = await response.text();
  let data: any = {};
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = { mensagem: raw.trim() };
    }
  }

  if (!response.ok) {
    const mensagem = data?.erro || data?.mensagem;
    const detalhe = typeof mensagem === "string" && mensagem.length < 300
      ? mensagem
      : `A API respondeu com HTTP ${response.status}.`;
    throw new Error(`${detalhe} (HTTP ${response.status})`);
  }

  return data as T;
}

function statusLivro(livro: Livro) {
  if (!livro.status_livro) return "Inativo";
  if (livro.quantidade_disponivel > 0) return "Disponível";
  return "Emprestado";
}

function Catalogo() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [livroEditando, setLivroEditando] = useState<Livro | null>(null);
  const [form, setForm] = useState<LivroForm>(EMPTY_FORM);
  const [acoesAbertas, setAcoesAbertas] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      const [listaLivros, listaCategorias] = await Promise.all([
        apiRequest<Livro[]>("/api/livros"),
        apiRequest<Categoria[]>("/api/categorias"),
      ]);
      setLivros(listaLivros);
      setCategorias(listaCategorias);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao carregar o catálogo.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => { void carregarDados(); }, [carregarDados]);

  const livrosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return livros.filter((livro) => {
      const correspondeBusca = !termo ||
        livro.titulo_livro.toLocaleLowerCase("pt-BR").includes(termo) ||
        (livro.isbn || "").toLocaleLowerCase("pt-BR").includes(termo);
      const correspondeCategoria = !categoriaFiltro || String(livro.id_categoria || "") === categoriaFiltro;
      const correspondeStatus = !statusFiltro || statusLivro(livro).toLocaleLowerCase("pt-BR") === statusFiltro.toLocaleLowerCase("pt-BR");
      return correspondeBusca && correspondeCategoria && correspondeStatus;
    });
  }, [livros, busca, categoriaFiltro, statusFiltro]);

  const abrirCadastro = (livro?: Livro) => {
    setErro("");
    setSucesso("");
    setLivroEditando(livro || null);
    setForm(livro ? {
      titulo_livro: livro.titulo_livro || "",
      codigo_livro: livro.codigo_livro || "",
      autor_livro: livro.autor_livro || "",
      isbn: livro.isbn || "",
      id_categoria: livro.id_categoria ? String(livro.id_categoria) : "",
      quantidade_total: String(livro.quantidade_total || 1),
      status_livro: Boolean(livro.status_livro),
    } : EMPTY_FORM);
    setModalAberto(true);
    setAcoesAbertas(null);
  };

  const salvarLivro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro("");
    setSucesso("");

    const codigoNormalizado = form.codigo_livro.trim().toLocaleLowerCase("pt-BR");
    const duplicado = livros.some((livro) =>
      livro.codigo_livro.trim().toLocaleLowerCase("pt-BR") === codigoNormalizado &&
      livro.id_livro !== livroEditando?.id_livro
    );
    if (duplicado) {
      setErro("Já existe um livro com este código no catálogo da sua instituição. Confira o código ou edite o livro existente para atualizar a quantidade de exemplares.");
      return;
    }

    setSalvando(true);
    const payload = {
      titulo_livro: form.titulo_livro.trim(),
      codigo_livro: form.codigo_livro.trim(),
      autor_livro: form.autor_livro.trim(),
      isbn: form.isbn.trim(),
      id_categoria: form.id_categoria ? Number(form.id_categoria) : null,
      quantidade_total: Number(form.quantidade_total),
      status_livro: form.status_livro,
    };
    try {
      if (livroEditando) {
        await apiRequest(`/api/livros/${livroEditando.id_livro}`, {
          method: "PUT", body: JSON.stringify(payload),
        });
        setSucesso("Livro atualizado com sucesso.");
      } else {
        await apiRequest("/api/livros", { method: "POST", body: JSON.stringify(payload) });
        setSucesso("Livro cadastrado com sucesso.");
      }
      setModalAberto(false);
      await carregarDados();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível salvar o livro.");
    } finally {
      setSalvando(false);
    }
  };

  const excluirLivro = async (livro: Livro) => {
    setAcoesAbertas(null);
    if (!window.confirm(`Deseja realmente excluir “${livro.titulo_livro}”?`)) return;
    setErro("");
    setSucesso("");
    try {
      await apiRequest(`/api/livros/${livro.id_livro}`, { method: "DELETE" });
      setSucesso("Livro excluído com sucesso.");
      await carregarDados();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível excluir o livro.");
    }
  };

  const alternarStatus = async (livro: Livro) => {
    setAcoesAbertas(null);
    try {
      await apiRequest(`/api/livros/${livro.id_livro}`, {
        method: "PUT", body: JSON.stringify({ status_livro: !livro.status_livro }),
      });
      setSucesso(livro.status_livro ? "Livro desativado." : "Livro ativado.");
      await carregarDados();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível alterar o status.");
    }
  };

  const classeStatus = (status: string) => {
    if (status === "Disponível") return "bg-emerald-50 text-emerald-700";
    if (status === "Emprestado") return "bg-amber-50 text-amber-700";
    return "bg-slate-100 text-slate-600";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-background)] font-[var(--font-family-base)]">
      <main className="mx-auto flex w-full min-w-0 max-w-[1600px] flex-col gap-6 p-4 md:p-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-on-background)] md:text-3xl">Gerenciamento do catálogo</h1>
            <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">Consulte, organize e mantenha o acervo da sua instituição.</p>
          </div>
          <button type="button" onClick={() => abrirCadastro()} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
            <span className="material-symbols-outlined text-xl">add</span> Adicionar livro
          </button>
        </header>

        {erro && <div role="alert" className="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><span>{erro}</span><button type="button" onClick={() => setErro("")} aria-label="Fechar aviso">×</button></div>}
        {sucesso && <div role="status" className="flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"><span>{sucesso}</span><button type="button" onClick={() => setSucesso("")} aria-label="Fechar aviso">×</button></div>}

        <section className="flex flex-col gap-3 rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] p-4 shadow-sm md:flex-row md:items-center">
          <select aria-label="Filtrar por categoria" value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)} className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] outline-none focus:border-[var(--color-primary)]">
            <option value="">Todas as categorias</option>
            {categorias.map((categoria) => <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nome_categoria}</option>)}
          </select>
          <select aria-label="Filtrar por status" value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value)} className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-on-surface)] outline-none focus:border-[var(--color-primary)]">
            <option value="">Todos os status</option>
            <option value="Disponível">Disponível</option>
            <option value="Emprestado">Emprestado</option>
            <option value="Inativo">Inativo</option>
          </select>
          <div className="relative min-w-0 flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-lg text-[var(--color-on-surface-variant)]">search</span>
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por ISBN ou título..." aria-label="Buscar por ISBN ou título" className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] py-2.5 pl-10 pr-3 text-sm text-[var(--color-on-surface)] outline-none focus:border-[var(--color-primary)]" />
          </div>
          <button type="button" onClick={() => { setBusca(""); setCategoriaFiltro(""); setStatusFiltro(""); }} className="rounded-lg border border-[var(--color-outline-variant)] px-3 py-2.5 text-sm text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)]">Limpar filtros</button>
        </section>

        <section className="overflow-visible rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--color-outline-variant)] px-4 py-3">
            <p className="text-sm text-[var(--color-on-surface-variant)]"><strong className="text-[var(--color-on-surface)]">{livrosFiltrados.length}</strong> {livrosFiltrados.length === 1 ? "livro encontrado" : "livros encontrados"}</p>
            <button type="button" onClick={() => void carregarDados()} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-[var(--color-primary)] hover:bg-[var(--color-surface-container-low)]"><span className="material-symbols-outlined text-lg">refresh</span> Atualizar</button>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead><tr className="border-b border-[var(--color-outline-variant)] bg-[var(--color-surface-container)] text-xs uppercase tracking-wide text-[var(--color-on-surface-variant)]">
                <th className="px-4 py-3 font-semibold">Detalhes do livro</th><th className="px-4 py-3 font-semibold">ISBN</th><th className="px-4 py-3 font-semibold">Categoria</th><th className="px-4 py-3 font-semibold">Disponibilidade</th><th className="px-4 py-3 text-right font-semibold">Ações</th>
              </tr></thead>
              <tbody className="divide-y divide-[var(--color-outline-variant)]">
                {carregando ? <tr><td colSpan={5} className="px-4 py-12 text-center text-[var(--color-on-surface-variant)]"><span className="material-symbols-outlined mb-2 block animate-spin text-2xl">progress_activity</span>Carregando catálogo...</td></tr>
                : livrosFiltrados.length === 0 ? <tr><td colSpan={5} className="px-4 py-12 text-center text-[var(--color-on-surface-variant)]"><span className="material-symbols-outlined mb-2 block text-3xl">menu_book</span>Nenhum livro encontrado com os filtros selecionados.</td></tr>
                : livrosFiltrados.map((livro) => {
                  const status = statusLivro(livro);
                  return <tr key={livro.id_livro} className="transition-colors hover:bg-[var(--color-surface-container-low)]">
                    <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="flex h-12 w-10 shrink-0 items-center justify-center rounded bg-[var(--color-surface-container-highest)]"><span className="material-symbols-outlined text-[var(--color-on-surface-variant)]">menu_book</span></div><div className="min-w-0"><p className="font-semibold text-[var(--color-on-surface)]">{livro.titulo_livro}</p><p className="mt-0.5 text-xs text-[var(--color-on-surface-variant)]">{livro.autor_livro || "Autor não informado"} · Código: {livro.codigo_livro}</p></div></div></td>
                    <td className="px-4 py-4 text-[var(--color-on-surface)]">{livro.isbn || "—"}</td>
                    <td className="px-4 py-4 text-[var(--color-on-surface)]">{livro.tbl_categorias?.nome_categoria || "Sem categoria"}</td>
                    <td className="px-4 py-4"><div className="flex flex-col items-start gap-1"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${classeStatus(status)}`}>{status}</span><span className="text-xs text-[var(--color-on-surface-variant)]">{livro.quantidade_disponivel} de {livro.quantidade_total} disponíveis</span></div></td>
                    <td className="px-4 py-4 text-right"><div className="relative inline-block text-left"><button type="button" aria-label={`Ações para ${livro.titulo_livro}`} aria-expanded={acoesAbertas === livro.id_livro} onClick={() => setAcoesAbertas(acoesAbertas === livro.id_livro ? null : livro.id_livro)} className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-outline-variant)] px-3 py-2 text-xs text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)]"><span className="material-symbols-outlined text-lg">more_horiz</span>Ações<span className="material-symbols-outlined text-base">{acoesAbertas === livro.id_livro ? "expand_less" : "expand_more"}</span></button>
                      {acoesAbertas === livro.id_livro && <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] py-1 text-left shadow-xl"><button type="button" onClick={() => abrirCadastro(livro)} className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-[var(--color-surface-container-low)]"><span className="material-symbols-outlined text-lg">edit</span>Editar livro</button><button type="button" onClick={() => void alternarStatus(livro)} className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-[var(--color-surface-container-low)]"><span className="material-symbols-outlined text-lg">{livro.status_livro ? "visibility_off" : "visibility"}</span>{livro.status_livro ? "Desativar livro" : "Ativar livro"}</button><button type="button" onClick={() => void excluirLivro(livro)} className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"><span className="material-symbols-outlined text-lg">delete</span>Excluir livro</button></div>}
                    </div></td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {modalAberto && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setModalAberto(false); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="livro-modal-title" className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] shadow-2xl">
          <header className="flex items-center justify-between border-b border-[var(--color-outline-variant)] px-6 py-4"><div><h2 id="livro-modal-title" className="text-xl font-semibold text-[var(--color-on-surface)]">{livroEditando ? "Editar livro" : "Adicionar novo livro"}</h2><p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">Os dados serão salvos no acervo da sua instituição.</p></div><button type="button" onClick={() => setModalAberto(false)} aria-label="Fechar" className="rounded-lg p-2 hover:bg-[var(--color-surface-container-low)]"><span className="material-symbols-outlined">close</span></button></header>
          <form onSubmit={salvarLivro} className="flex min-h-0 flex-1 flex-col">
            <div className="grid gap-4 overflow-y-auto p-6 sm:grid-cols-2">
              {erro && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{erro}</p>}
              <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--color-on-surface)]">Título *<input required maxLength={255} value={form.titulo_livro} onChange={(e) => setForm({ ...form, titulo_livro: e.target.value })} className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-3 py-2.5 font-normal outline-none focus:border-[var(--color-primary)]" placeholder="Título do livro" /></label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--color-on-surface)]">Código do livro *<input required maxLength={50} value={form.codigo_livro} onChange={(e) => setForm({ ...form, codigo_livro: e.target.value })} className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-3 py-2.5 font-normal outline-none focus:border-[var(--color-primary)]" placeholder="Código único do acervo" /></label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--color-on-surface)] sm:col-span-2">Autor(es)<input maxLength={255} value={form.autor_livro} onChange={(e) => setForm({ ...form, autor_livro: e.target.value })} className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-3 py-2.5 font-normal outline-none focus:border-[var(--color-primary)]" placeholder="Nome do autor" /></label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--color-on-surface)]">ISBN<input maxLength={20} value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-3 py-2.5 font-normal outline-none focus:border-[var(--color-primary)]" placeholder="ISBN (opcional)" /></label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--color-on-surface)]">Categoria<select value={form.id_categoria} onChange={(e) => setForm({ ...form, id_categoria: e.target.value })} className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-3 py-2.5 font-normal outline-none focus:border-[var(--color-primary)]"><option value="">Sem categoria</option>{categorias.map((categoria) => <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nome_categoria}</option>)}</select></label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--color-on-surface)]">Quantidade de exemplares *<input required min={1} type="number" value={form.quantidade_total} onChange={(e) => setForm({ ...form, quantidade_total: e.target.value })} className="rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-3 py-2.5 font-normal outline-none focus:border-[var(--color-primary)]" /></label>
              <label className="flex items-center gap-3 self-end rounded-lg border border-[var(--color-outline-variant)] p-3 text-sm text-[var(--color-on-surface)]"><input type="checkbox" checked={form.status_livro} onChange={(e) => setForm({ ...form, status_livro: e.target.checked })} className="h-4 w-4 accent-[var(--color-primary)]" />Livro ativo no catálogo</label>
            </div>
            <footer className="flex justify-end gap-3 border-t border-[var(--color-outline-variant)] bg-[var(--color-surface-container)] px-6 py-4"><button type="button" disabled={salvando} onClick={() => setModalAberto(false)} className="rounded-lg border border-[var(--color-outline-variant)] px-4 py-2.5 text-sm text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)]">Cancelar</button><button type="submit" disabled={salvando} className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"><span className="material-symbols-outlined text-lg">{salvando ? "progress_activity" : "save"}</span>{salvando ? "Salvando..." : livroEditando ? "Salvar alterações" : "Cadastrar livro"}</button></footer>
          </form>
        </section>
      </div>}
    </div>
  );
}

export default Catalogo;
