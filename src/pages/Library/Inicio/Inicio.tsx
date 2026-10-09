import { useEffect, useMemo, useState } from "react";
import Button from "../../../components/Button";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  id_instituicao: number;
};

type Dashboard = {
  usuario: Usuario;
  instituicao: {
    id: number;
    nome: string;
  };
  estatisticas: {
    livros: number;
    alunos: number;
    professores: number;
    emprestimosAtivos: number;
    atrasados: number;
    livrosDisponiveis: number;
  };
  atividadesRecentes: Array<{
    id: number;
    aluno: string;
    livro: string;
    dataEmprestimo: string;
    dataDevolucaoPrevista: string;
    status: string;
  }>;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function obterToken() {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
}

function formatarData(data: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(new Date(data));
}

export default function Inicio() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarDashboard = async () => {
      const token = obterToken();

      if (!token) {
        setErro("Sessão não encontrada.");
        setCarregando(false);
        return;
      }

      try {
        const resposta = await fetch(`${API_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dados = await resposta.json();

        if (resposta.status === 401) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("usuario");
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          window.location.href = "/";
          return;
        }

        if (!resposta.ok) {
          throw new Error(dados.erro || "Não foi possível carregar o painel.");
        }

        setDashboard(dados);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        setErro(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os dados."
        );
      } finally {
        setCarregando(false);
      }
    };

    carregarDashboard();
  }, []);

  const saudacao = useMemo(() => {
    const hora = new Date().getHours();
    if (hora < 12) return "Bom dia";
    if (hora < 18) return "Boa tarde";
    return "Boa noite";
  }, []);

  if (carregando) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[var(--color-on-surface-variant)]">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          Carregando seu painel...
        </div>
      </main>
    );
  }

  if (erro || !dashboard) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] p-8">
        <div className="rounded-xl border border-[var(--color-error)] bg-[var(--color-error-container)] p-5 text-[var(--color-on-error-container)]">
          {erro || "Não foi possível carregar o painel."}
        </div>
      </main>
    );
  }

  const { usuario, instituicao, estatisticas, atividadesRecentes } = dashboard;

  return (
    <main className="min-h-screen overflow-y-auto bg-[var(--color-background)] rounded-lg text-[var(--color-on-background)] font-[var(--font-family-base)]">
      <div className="flex-1 overflow-y-auto p-[var(--margin-desktop)] pb-24 shadow-lg">
        <div className="max-w-[var(--container-max-widt)] display-right space-y-[var(--stack-lg)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-semibold text-2xl text-[var(--color-on-surface-variant)]">
                Visão geral
              </h2>
              <p className="font-normal text-lg text-[var(--color-on-surface-variant)] mt-1">
                {saudacao}, <span className="font-semibold">{usuario.nome}</span>.
              </p>
              <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">
                {instituicao.nome} · {usuario.tipo}
              </p>
            </div>

            <Button
              text="Exportar relatório"
              NomeClasse="material-symbols-outlined"
              icon="download"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-[var(--stack-md)]">
            <Card icon="library_books" titulo="Livros" valor={estatisticas.livros} />
            <Card icon="group" titulo="Alunos" valor={estatisticas.alunos} />
            <Card icon="book_5" titulo="Meus empréstimos" valor={estatisticas.emprestimosAtivos} />
            <Card icon="warning" titulo="Meus atrasados" valor={estatisticas.atrasados} destaque />
            <Card icon="menu_book" titulo="Disponíveis" valor={estatisticas.livrosDisponiveis} />
            <Card icon="person" titulo="Professores" valor={estatisticas.professores} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--stack-md)]">
            <div className="lg:col-span-2 bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-6">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="font-semibold text-[var(--font-size-title-lg)] text-[var(--color-on-surface)]">
                    Meus empréstimos recentes
                  </h3>
                  <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">
                    Apenas empréstimos realizados por {usuario.nome}.
                  </p>
                </div>
              </div>

              {atividadesRecentes.length === 0 ? (
                <div className="py-12 text-center text-[var(--color-on-surface-variant)]">
                  <span className="material-symbols-outlined text-4xl">menu_book</span>
                  <p className="mt-2">Nenhum empréstimo encontrado.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {atividadesRecentes.map((atividade) => (
                    <div
                      key={atividade.id}
                      className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-lg border border-[var(--color-surface-container-highest)] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[var(--color-primary)] mt-0.5">
                          book
                        </span>
                        <div>
                          <p className="font-semibold text-[var(--color-on-surface)]">
                            {atividade.livro}
                          </p>
                          <p className="text-sm text-[var(--color-on-surface-variant)]">
                            Aluno: {atividade.aluno}
                          </p>
                        </div>
                      </div>

                      <div className="text-sm md:text-right">
                        <p className="text-[var(--color-on-surface-variant)]">
                          Empréstimo: {formatarData(atividade.dataEmprestimo)}
                        </p>
                        <p className={atividade.status === "ATRASADO" ? "font-semibold text-[var(--color-error)]" : "text-[var(--color-on-surface-variant)]"}>
                          Devolução: {formatarData(atividade.dataDevolucaoPrevista)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-6">
              <h3 className="font-semibold text-[var(--font-size-title-lg)] text-[var(--color-on-surface)]">
                Minha conta
              </h3>

              <div className="mt-5 space-y-4">
                <Info label="Nome" valor={usuario.nome} />
                <Info label="E-mail" valor={usuario.email} />
                <Info label="Perfil" valor={usuario.tipo} />
                <Info label="Instituição" valor={instituicao.nome} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Card({
  icon,
  titulo,
  valor,
  destaque = false,
}: {
  icon: string;
  titulo: string;
  valor: number;
  destaque?: boolean;
}) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-4 flex flex-col gap-2 hover:bg-[var(--color-surface-container-low)] transition-colors">
      <span
        className={`material-symbols-outlined p-2 rounded-full w-fit ${destaque ? "text-[var(--color-error)] bg-[var(--color-error-container)]" : "text-[var(--color-primary)] bg-[var(--color-primary-container)]"}`}
      >
        {icon}
      </span>
      <div className="mt-2">
        <h3 className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)] uppercase tracking-wider">
          {titulo}
        </h3>
        <p className={`font-semibold text-[var(--font-size-headline-md)] ${destaque ? "text-[var(--color-error)]" : "text-[var(--color-on-surface)]"}`}>
          {valor.toLocaleString("pt-BR")}
        </p>
      </div>
    </div>
  );
}

function Info({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="border-b border-[var(--color-surface-container-highest)] pb-3">
      <p className="text-xs uppercase tracking-wider text-[var(--color-on-surface-variant)]">
        {label}
      </p>
      <p className="mt-1 font-medium text-[var(--color-on-surface)] break-words">
        {valor}
      </p>
    </div>
  );
}
