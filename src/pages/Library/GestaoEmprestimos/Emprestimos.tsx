import { useState } from "react";
import Button from "../../../components/Button";

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
  status: "Ativo" | "Atrasado";
}


function Emprestimos() {
  const [aba, setAba] = useState<"ativos" | "atrasados" | "historico">(
    "ativos"
  );

  const [aluno, setAluno] = useState("");
  const [livro, setLivro] = useState("");
  const [data, setData] = useState("Qualquer período");

  const [emprestimos] = useState<Emprestimo[]>([
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
  ]);

  const emprestimosFiltrados = emprestimos.filter((emprestimo) => {
    const correspondeAluno =
      aluno === "" ||
      emprestimo.aluno.toLowerCase().includes(aluno.toLowerCase()) ||
      emprestimo.alunoId.toLowerCase().includes(aluno.toLowerCase());

    const correspondeLivro =
      livro === "" ||
      emprestimo.livro.toLowerCase().includes(livro.toLowerCase()) ||
      emprestimo.autor.toLowerCase().includes(livro.toLowerCase());

    const correspondeAba =
      aba === "ativos"
        ? emprestimo.status === "Ativo"
        : aba === "atrasados"
        ? emprestimo.status === "Atrasado"
        : true;

    return correspondeAluno && correspondeLivro && correspondeAba;
  });

  return (
    <div className="min-h-screen bg-background font-body-md text-on-background ">

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex min-h-screen flex-1 flex-col p-[var(--margin-desktop)] bg-[var(--color-background)] font-[var(--font-family-base) rounded-lg ">

        {/* TOPBAR */}
        <header className=" flex h-16 items-center justify-between border-b mb-[var(--line-height-label-lg)]  border-[var(--color-secondary)] border-outline-variant bg-surface px-gutter">

          <div className="flex flex-1 items-center gap-4">

            {/* Busca */}
            <div className="relative hidden w-full max-w-md md:block text-[var(--color-on-surface-variant)]">

              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>

              <input
                type="text"
                placeholder="Pesquisar empréstimos, alunos ou livros..."
                className="w-full rounded-lg border border-outline-variant bg-surface-container-low py-2 pl-10 pr-4 text-body-md transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />

            </div>

          </div>

          {/* Notificação e usuário */}
          <div className="flex items-center gap-2">

            <button
              type="button"
              className="relative rounded-full p-2 text-on-surface-variant transition-all hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined cursor-pointer hover:text-[var(--color-primary)]">
                notifications
              </span>

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
            </button>

          </div>
        </header>

        {/* CONTEÚDO DA PÁGINA */}
        <div className="flex-1 p-margin_mobile md:p-margin_desktop">

          {/* Título */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font text-2xl text-(--color-on-surface-variant) font-semibold">
                Gerenciamento de Empréstimos
              </h2>

              <p className="text-[var(--color-on-surface-variant)] mt-1 font-body-md text-body-md text-on-surface-variant">
                Gerencie os empréstimos, acompanhe os atrasos e processe as devoluções.
              </p>
            </div>

            {/* componente */}
            {<Button text="Novo Empréstimo" icon="add" NomeClasse="material-symbols-outlined"/>}
          </div>

          {/* ABAS */}
          <div className="mb-6 flex overflow-x-auto border-b border-outline-variant no-scrollbar">

            <button
              type="button"
              onClick={() => setAba("ativos")}
              className={`whitespace-nowrap px-6 py-3 font-label-md text-label-lg ${
                aba === "ativos"
                  ? "border-b-2 border-b-[var(--color-primary-container)] border-primary font-bold text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              Empréstimos Ativos (
              {emprestimos.filter((item) => item.status === "Ativo").length}
              )
            </button>

            <button
              type="button"
              onClick={() => setAba("atrasados")}
              className={`whitespace-nowrap border-b-[var(--color-primary-container)] px-6 py-3 font-label-md text-label-lg ${
                aba === "atrasados"
                  ? "border-b-2 border-primary font-bold text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              Atrasados (
              {emprestimos.filter((item) => item.status === "Atrasado").length}
              )
            </button>

            <button
              type="button"
              onClick={() => setAba("historico")}
              className={`whitespace-nowrap border-b-[var(--color-primary-container)] px-6 py-3 font-label-md text-label-lg ${
                aba === "historico"
                  ? "border-b-2 border-primary font-bold text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              Histórico
            </button>

          </div>

          {/* FILTROS */}
          <div className="mb-6 flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 md:flex-row">

            <div className="flex-1">
              <label className="mb-1 block font-label-md text-label-md font-bold text-on-surface">
                Aluno
              </label>

              <input
                type="text"
                placeholder="Nome ou ID"
                value={aluno}
                onChange={(e) => setAluno(e.target.value)}
                className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex-1">
              <label className="mb-1 block font-label-md text-label-md font-bold text-on-surface">
                Livro
              </label>

              <input
                type="text"
                placeholder="Título ou ISBN"
                value={livro}
                onChange={(e) => setLivro(e.target.value)}
                className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex-1">
              <label className="mb-1 block font-label-md text-label-md font-bold text-on-surface">
                Data de devolução
              </label>

              <select
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option>Qualquer período</option>
                <option>Vence hoje</option>
                <option>Vence esta semana</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-on-surface transition-colors hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined text-sm">
                  filter_list
                </span>

                Filtrar
              </button>
            </div>

          </div>

          {/* TABELA */}
          <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full border-collapse text-left">

                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container">

                    <th className="px-6 py-4 font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface-variant">
                      Aluno
                    </th>

                    <th className="px-6 py-4 font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface-variant">
                      Livro
                    </th>

                    <th className="px-6 py-4 font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface-variant">
                      Empréstimo
                    </th>

                    <th className="px-6 py-4 font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface-variant">
                      Devolução
                    </th>

                    <th className="px-6 py-4 font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface-variant">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface-variant">
                      Ações
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant/50">

                  {emprestimosFiltrados.map((emprestimo) => (

                    <tr
                      key={emprestimo.id}
                      className={`group transition-colors hover:bg-surface-container-low ${
                        emprestimo.status === "Atrasado"
                          ? "bg-error-container/10"
                          : ""
                      }`}
                    >

                      {/* Aluno */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div>

                            <p className="font-label-lg text-label-lg text-on-surface">
                              {emprestimo.aluno}
                            </p>

                            <p className="font-label-md text-label-md text-on-surface-variant">
                              ID: {emprestimo.alunoId}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Livro */}
                      <td className="px-6 py-4">

                        <p className="font-label-lg text-label-lg text-on-surface">
                          {emprestimo.livro}
                        </p>

                        <p className="font-label-md text-label-md text-on-surface-variant">
                          {emprestimo.autor}
                        </p>

                      </td>

                      {/* Data empréstimo */}
                      <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">
                        {emprestimo.dataEmprestimo}
                      </td>

                      {/* Data devolução */}
                      <td className="px-6 py-4">

                        <p
                          className={`font-label-lg text-label-lg ${
                            emprestimo.status === "Atrasado"
                              ? "font-bold text-error"
                              : "text-on-surface"
                          }`}
                        >
                          {emprestimo.dataDevolucao}
                        </p>

                        <p
                          className={`font-label-md text-label-md ${
                            emprestimo.status === "Atrasado"
                              ? "text-error"
                              : "text-on-surface-variant"
                          }`}
                        >
                          {emprestimo.prazo}
                        </p>

                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-label-md text-label-md ${
                            emprestimo.status === "Atrasado"
                              ? "bg-error-container text-on-error-container"
                              : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                          }`}
                        >
                          {emprestimo.status}
                        </span>

                      </td>

                      {/* Ações */}
                      <td className="px-6 py-4 text-right">

                        <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">

                          {emprestimo.status === "Atrasado" && (
                            <button
                              type="button"
                              onClick={() =>
                                alert(
                                  `Lembrete enviado para ${emprestimo.aluno}`
                                )
                              }
                              className="rounded p-1.5 text-error transition-colors hover:bg-error-container"
                              title="Enviar lembrete"
                            >
                              <span className="material-symbols-outlined text-xl hover:text-[var(--color-on-primary-fixed-variant)]">
                                mail
                              </span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              alert(
                                `Devolução registrada: ${emprestimo.livro}`
                              )
                            }
                            className="rounded p-1.5 text-primary transition-colors hover:bg-primary-fixed"
                            title="Registrar devolução"
                          >
                            <span className="material-symbols-outlined text-xl">
                              assignment_return
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              alert(`Empréstimo #${emprestimo.id}`)
                            }
                            className="rounded p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-high"
                            title="Mais opções"
                          >
                            <span className="material-symbols-outlined text-xl">
                              more_vert
                            </span>
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* PAGINAÇÃO */}
            <div className="flex items-center justify-between border-t border-outline-variant bg-surface-container-lowest px-6 py-4">

              <p className="font-label-md text-label-md text-on-surface-variant">
                Mostrando {emprestimosFiltrados.length} empréstimos
              </p>

              <div className="flex gap-1">

                <button
                  type="button"
                  disabled
                  className="rounded p-1 text-outline hover:bg-surface-container-high disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded bg-primary-container font-label-md text-label-md text-on-primary"
                >
                  1
                </button>

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded font-label-md text-label-md text-on-surface hover:bg-surface-container-high"
                >
                  2
                </button>

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded font-label-md text-label-md text-on-surface hover:bg-surface-container-high"
                >
                  3
                </button>

                <button
                  type="button"
                  className="rounded p-1 text-on-surface hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Emprestimos;
