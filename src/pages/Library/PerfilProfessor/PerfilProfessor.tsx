import { useState } from "react";


// ============================================================
// TIPOS
// ============================================================

interface Professor {
  nome: string;
  cargo: string;
  departamento: string;
  matricula: string;
  email: string;
  bio: string;
  areas: string[];
}

interface Disciplina {
  codigo: string;
  nome: string;
  turma: string;
  alunos: string;
  livros: string;
  cor: "blue" | "purple" | "orange";
}

interface Livro {
  titulo: string;
  autor: string;
  turma: string;
  copias: string;
  status: string;
  statusTipo: "disponivel" | "fila";
  imagem: string;
}

interface Emprestimo {
  titulo: string;
  autor: string;
  prazo: string;
  data: string;
}


// ============================================================
// DADOS INICIAIS
// ============================================================

const professorInicial: Professor = {
  nome: "Prof. Dr. Marcos Silveira",

  cargo:
    "Professor Titular de Literatura Brasileira & Linguística Aplicada",

  departamento: "Departamento de Letras & Humanidades",

  matricula: "PROF-8842",

  email: "marcos.silveira@orbi.edu.br",

  bio:
    "Pesquisador em Modernismo Brasileiro, Poéticas Visuais e Narrativas Hipertextuais. Coordenador do Grupo de Estudos em Memória Oral e Curador da Coleção Especial de Obras Raras da Biblioteca ORBI.",

  areas: [
    "Modernismo",
    "Crítica Literária",
    "Semiótica",
  ],
};


const disciplinas: Disciplina[] = [
  {
    codigo: "LIT-301",
    nome: "Literatura Brasileira II",
    turma: "3º Ano A — Ensino Médio",
    alunos: "38 Alunos matriculados",
    livros: "6 Livros em ementa",
    cor: "blue",
  },

  {
    codigo: "RED-102",
    nome: "Teoria da Redação & Argumentação",
    turma: "1º Ano B — Ensino Médio",
    alunos: "34 Alunos matriculados",
    livros: "4 Livros em ementa",
    cor: "purple",
  },

  {
    codigo: "SEM-402",
    nome: "Seminário de Obras Raras & Arquivo",
    turma: "Núcleo Avançado de Humanas",
    alunos: "16 Alunos pesquisadores",
    livros: "8 Obras raras",
    cor: "orange",
  },
];


const livros: Livro[] = [
  {
    titulo: "Macunaíma: O Herói Sem Nenhum Caráter",
    autor: "Mário de Andrade",
    turma: "Turma: 3º Ano A",
    copias: "6 cópias",
    status: "Disponível",
    statusTipo: "disponivel",

    imagem:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYOWHo5Owrvt9RKyCiG4Q2OhdOVxFwplizasSiRzosY4685gmdlaPAqcGnVPu3r9ZNPEOm0GZLlhXg_A5Xq1obcJfHteWuReYQLydHUYjCPT2-lA2RygzozCSO_LVkFC4YCGLIJ-e9plIt7xxXvU4MtlpluXjvvQU6lHHocTG2uW1pIfhHycKDrofsGxv3W-yMNQZduqp1cWsvSGMk9cOmU1RH3r9jp-5tDhZ6qFh1J1tLEtENLPZjBw",
  },

  {
    titulo: "Dom Casmurro (Edição Crítica)",
    autor: "Machado de Assis",
    turma: "Turma: 3º Ano A",
    copias: "10 cópias",
    status: "2 em fila",
    statusTipo: "fila",

    imagem:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLwqr7WJncWbcUOowk8Ysiz2FnZ90ITjO1QOhZzsLDqhBmRdY0RfzcUd4WxZojYcsIiTTO7V6GEM-VCXmaPxCtdn1pMfaWOW0_kehIX13zCrNiIx9h36iWmyz5QsnPmI2n-3bgMDzk5vz0TZcA96MTWUoxc1ZTpf-vzzyBUcbQUbbFtnhEwGuh_HEoNsOoW0H-bALpz6jkU_8_bEVzvmFfCMm39Xd-cr2OShN9Q3qY2gMg8TKTaZDBlA",
  },

  {
    titulo: "Literatura e Sociedade",
    autor: "Antonio Candido",
    turma: "Núcleo Avançado",
    copias: "4 cópias",
    status: "Disponível",
    statusTipo: "disponivel",

    imagem:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBa8qd1fDpjbVWj-i-vGdPWiAVw0-2B2AvfbcLx8yYg6wMDTjE57NIve-5ZT9_ftO1BRZp4r43uQpDG6nsierCVSFa1uwR3-5WeeMOElMfn2x8ZOzs4MjJR2udjrtGE9tgRx52uCBbIl_Wo638RCS5EVNsfWIIe8zGsjVOaCP9ECRyQrCJEdkN-E43MHXRkW-n4GfyhN6oIJU8o5f1eQxa1wgOi-JESm4TN40n2yqlgv_4-vbSrQAt2fw",
  },
];


const emprestimos: Emprestimo[] = [
  {
    titulo: "Os Sertões: Edição Anotada",
    autor: "Euclides da Cunha • Tomo I",
    prazo: "Devolução em 22 dias",
    data: "04/02/2025",
  },

  {
    titulo: "História Concisa da Literatura Brasileira",
    autor: "Alfredo Bosi",
    prazo: "Devolução em 14 dias",
    data: "28/01/2025",
  },

  {
    titulo: "O Banco dos Réus: Linguagem Jurídica",
    autor: "Estudos Aplicados de Retórica",
    prazo: "Devolução em 28 dias",
    data: "10/02/2025",
  },
];


// ============================================================
// COMPONENTE DE ÍCONE
// ============================================================

interface IconProps {
  children: string;
  className?: string;
}

function Icon({
  children,
  className = "",
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
    >
      {children}
    </span>
  );
}


// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function PerfilProfessor() {

  const [professor, setProfessor] =
    useState<Professor>(professorInicial);

  const [modalAberto, setModalAberto] =
    useState(false);

  const [form, setForm] =
    useState<Professor>(professorInicial);

  const [salvando, setSalvando] =
    useState(false);


  // ----------------------------------------------------------
  // ABRIR MODAL
  // ----------------------------------------------------------

  function abrirModal() {
    setForm(professor);
    setModalAberto(true);
  }


  // ----------------------------------------------------------
  // FECHAR MODAL
  // ----------------------------------------------------------

  function fecharModal() {
    if (salvando) return;

    setModalAberto(false);
  }


  // ----------------------------------------------------------
  // ALTERAR CAMPO
  // ----------------------------------------------------------

  function alterarCampo(
    campo: keyof Professor,
    valor: string
  ) {
    setForm((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }


  // ----------------------------------------------------------
  // SALVAR PERFIL
  // ----------------------------------------------------------

  function salvarPerfil(
    event: React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    setSalvando(true);

    setTimeout(() => {

      setProfessor(form);

      setSalvando(false);

      setModalAberto(false);

    }, 500);
  }


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">


      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="
        sticky
        top-0
        z-30
        h-16
        border-b
        border-slate-200
        bg-white/95
        backdrop-blur
      ">

        <div className="
          flex
          h-full
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        ">


          {/* PESQUISA */}

          <div className="relative w-full max-w-xl">

            <Icon className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[20px]
              text-slate-400
            ">
              search
            </Icon>

            <input
              type="text"
              placeholder="Pesquisar acervo, turmas ou usuários..."
              className="
                w-full
                rounded-lg
                border
                border-slate-300
                bg-slate-50
                py-2
                pl-10
                pr-4
                text-sm
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-500
                focus:bg-white
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>


          {/* USUÁRIO */}

          <div className="
            ml-4
            flex
            items-center
            gap-3
            sm:gap-4
          ">


            {/* NOTIFICAÇÕES */}

            <button
              type="button"
              className="
                rounded-lg
                p-2
                text-slate-500
                transition
                hover:bg-slate-100
                hover:text-blue-600
              "
            >

              <Icon className="text-[21px]">
                notifications
              </Icon>

            </button>


            {/* AJUDA */}

            <button
              type="button"
              className="
                hidden
                rounded-lg
                p-2
                text-slate-500
                transition
                hover:bg-slate-100
                hover:text-blue-600
                sm:block
              "
            >

              <Icon className="text-[21px]">
                help
              </Icon>

            </button>


            <div className="
              hidden
              h-8
              w-px
              bg-slate-200
              sm:block
            " />


            {/* PERFIL LOGADO */}

            <div className="flex items-center gap-3">

              <div className="hidden text-right sm:block">

                <p className="
                  text-sm
                  font-semibold
                  text-slate-800
                ">
                  Prof. Dr. Roberto
                </p>

                <p className="
                  text-xs
                  text-slate-500
                ">
                  Gestão & Docência
                </p>

              </div>


              <div className="
                flex
                h-9
                w-9
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                border-slate-200
                bg-slate-100
                text-blue-600
              ">

                <Icon className="text-[25px]">
                  account_circle
                </Icon>

              </div>

            </div>

          </div>

        </div>

      </header>


      {/* =====================================================
          CONTEÚDO
      ====================================================== */}

      <main className="
        mx-auto
        w-full
        max-w-[1440px]
        px-4
        py-6
        sm:px-6
        lg:px-8
      ">

        <div className="flex flex-col gap-6">


          {/* =================================================
              PERFIL
          ================================================== */}

          <section className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          ">


            {/* BANNER */}

            <div
              className="
                relative
                h-48
                bg-cover
                bg-center
                sm:h-60
              "
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA4DL5eStz7eJ0F0jSnE_funZpjnQ5b0N34ECzQa5wnZJ_UZ89k-F7gm2TVCLXmJ04hVc_o00vBGIidpkeeC_HaA_WB2xtiB4_W8LsmHS9tBFxe880GZUQmRKsWjujwL0HAzriDBTj2TseN97B55E6hxZZCwh-NR7wZsXG0ob4gwZs7BN2D9q6PYSYJBQ9aIO7e1A7QXm72Gf6DwHozPuY2hYkp5ZoZhEXQrncfKQ9XuX7olq-lmdDjbA')",
              }}
            >

              <div className="
                absolute
                inset-0
                bg-gradient-to-t
                from-white
                via-white/50
                to-transparent
              " />


              {/* ANO LETIVO */}

              <div className="
                absolute
                right-4
                top-4
                flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-200
                bg-white/90
                px-3
                py-1.5
                text-xs
                font-medium
                text-slate-700
                shadow-sm
                backdrop-blur
              ">

                <span className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                " />

                Ano Letivo 2025 • 1º Semestre

              </div>

            </div>


            {/* INFORMAÇÕES */}

            <div className="
              -mt-16
              px-5
              pb-6
              sm:-mt-20
              sm:px-8
            ">

              <div className="
                relative
                flex
                flex-col
                gap-6
                md:flex-row
                md:items-end
                md:justify-between
              ">


                {/* FOTO + DADOS */}

                <div className="
                  flex
                  flex-col
                  gap-5
                  sm:flex-row
                  sm:items-end
                ">


                  {/* FOTO */}

                  <div className="relative shrink-0">

                    <div className="
                      h-28
                      w-28
                      overflow-hidden
                      rounded-2xl
                      border-4
                      border-white
                      bg-slate-100
                      shadow-lg
                      sm:h-36
                      sm:w-36
                    ">

                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlj410AAo5X7OeNeWW09MVWax5DXMhfrQoHxQkSNR-igvdBIR0gtKA0DCpHCkP3sC0MM49DSJpAp04oY4zHrEQGunhhvy5u-JIsiJR44NkWk54c_SjG7fsnXUXWZA366-JCd34AzHJer0tCIe84sKViM4aIc4Y9Y0aDCJRXkRKFZe4ggspN7rIlj5Rw4LgVWgoDpVJkwtUIzoCDOLbH2LuCNjwgbrAX1-tIWS9b0Oz_Rq9HZZx9YmQ1A"
                        alt="Professor"
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />

                    </div>


                    {/* STATUS */}

                    <span className="
                      absolute
                      bottom-2
                      right-0
                      flex
                      items-center
                      gap-1
                      rounded-full
                      bg-emerald-500
                      px-2
                      py-1
                      text-xs
                      font-semibold
                      text-white
                      shadow
                    ">

                      <Icon className="text-[14px]">
                        check_circle
                      </Icon>

                      Ativo

                    </span>

                  </div>


                  {/* DADOS */}

                  <div className="space-y-2">

                    <div className="
                      flex
                      flex-wrap
                      items-center
                      gap-3
                    ">

                      <h1 className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        sm:text-3xl
                      ">
                        {professor.nome}
                      </h1>


                      <span className="
                        rounded-full
                        bg-blue-50
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wide
                        text-blue-700
                      ">
                        Docência Superior
                      </span>

                    </div>


                    <p className="
                      text-base
                      font-medium
                      text-blue-600
                    ">
                      {professor.cargo}
                    </p>


                    <div className="
                      flex
                      flex-wrap
                      items-center
                      gap-x-4
                      gap-y-2
                      text-sm
                      text-slate-500
                    ">


                      <span className="
                        flex
                        items-center
                        gap-1.5
                      ">

                        <Icon className="
                          text-[18px]
                          text-blue-600
                        ">
                          library_books
                        </Icon>

                        {professor.departamento}

                      </span>


                      <span className="
                        hidden
                        text-slate-300
                        sm:inline
                      ">
                        •
                      </span>


                      <span className="
                        flex
                        items-center
                        gap-1.5
                      ">

                        <Icon className="
                          text-[18px]
                          text-blue-600
                        ">
                          badge
                        </Icon>

                        Matrícula:

                        <strong className="text-slate-800">
                          {professor.matricula}
                        </strong>

                      </span>


                      <span className="
                        hidden
                        text-slate-300
                        sm:inline
                      ">
                        •
                      </span>


                      <span className="
                        flex
                        items-center
                        gap-1.5
                      ">

                        <Icon className="
                          text-[18px]
                          text-blue-600
                        ">
                          mail
                        </Icon>

                        {professor.email}

                      </span>

                    </div>

                  </div>

                </div>


                {/* BOTÕES */}

                <div className="
                  flex
                  items-center
                  gap-2
                ">

                  <button
                    type="button"
                    onClick={abrirModal}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-blue-600
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-blue-700
                      active:scale-95
                    "
                  >

                    <Icon className="text-[18px]">
                      edit
                    </Icon>

                    Editar Perfil

                  </button>


                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-slate-100
                      px-3.5
                      py-2.5
                      text-sm
                      font-medium
                      text-slate-700
                      transition
                      hover:bg-slate-200
                    "
                  >

                    <Icon className="text-[18px]">
                      settings
                    </Icon>

                    <span className="hidden sm:inline">
                      Configurações
                    </span>

                  </button>

                </div>

              </div>

            </div>


            {/* BIO */}

            <div className="
              flex
              flex-col
              gap-4
              border-t
              border-slate-100
              bg-slate-50
              px-5
              py-5
              sm:px-8
              md:flex-row
              md:items-center
              md:justify-between
            ">

              <p className="
                max-w-3xl
                text-sm
                leading-relaxed
                text-slate-600
              ">
                {professor.bio}
              </p>


              <div className="
                flex
                flex-wrap
                items-center
                gap-2
              ">

                <span className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-400
                ">
                  Áreas:
                </span>


                {professor.areas.map((area) => (

                  <span
                    key={area}
                    className="
                      rounded-md
                      bg-white
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      text-slate-600
                      shadow-sm
                      ring-1
                      ring-slate-200
                    "
                  >
                    {area}
                  </span>

                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              MÉTRICAS
          ================================================== */}

          <section className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          ">

            <MetricCard
              titulo="Empréstimos Ativos"
              valor="03"
              descricao="Cota regular em dia"
              icone="menu_book"
              tipo="blue"
            />


            <MetricCard
              titulo="Pendências / Atrasos"
              valor="00"
              descricao="Nenhum débito registrado"
              icone="check_circle"
              tipo="green"
            />


            <MetricCard
              titulo="Cota Especial Docente"
              valor="30 Dias"
              descricao="Até 10 exemplares simultâneos"
              icone="event_available"
              tipo="blue"
            />


            <MetricCard
              titulo="Obras Recomendadas"
              valor="18"
              descricao="Vinculadas a 4 turmas"
              icone="group"
              tipo="orange"
            />

          </section>


          {/* =================================================
              CONTEÚDO PRINCIPAL
          ================================================== */}

          <div className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-12
          ">


            {/* =================================================
                COLUNA ESQUERDA
            ================================================== */}

            <div className="
              flex
              flex-col
              gap-6
              lg:col-span-7
            ">


              {/* DISCIPLINAS */}

              <section className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                sm:p-6
              ">

                <SectionHeader
                  titulo="Minhas Disciplinas & Turmas Ativas"
                  descricao="Gestão de turmas integradas ao acervo bibliográfico"
                  quantidade="4 Turmas"
                  icone="group"
                />


                <div className="space-y-3">

                  {disciplinas.map((disciplina) => (

                    <DisciplinaCard
                      key={disciplina.codigo}
                      disciplina={disciplina}
                    />

                  ))}

                </div>

              </section>


              {/* LIVROS */}

              <section className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                sm:p-6
              ">

                <div className="
                  mb-5
                  flex
                  items-center
                  justify-between
                  gap-4
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <div className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-50
                      text-blue-600
                    ">

                      <Icon className="text-[20px]">
                        library_books
                      </Icon>

                    </div>


                    <div>

                      <h2 className="
                        text-lg
                        font-semibold
                        text-slate-900
                      ">
                        Livros e Recursos Recomendados
                      </h2>

                      <p className="
                        text-xs
                        text-slate-500
                      ">
                        Títulos sugeridos diretamente para leituras obrigatórias e complementares
                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    className="
                      hidden
                      items-center
                      gap-1
                      text-xs
                      font-semibold
                      text-blue-600
                      hover:text-blue-700
                      sm:flex
                    "
                  >

                    Ver todos (18)

                    <Icon className="text-[16px]">
                      chevron_right
                    </Icon>

                  </button>

                </div>


                <div className="
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-3
                ">

                  {livros.map((livro) => (

                    <LivroCard
                      key={livro.titulo}
                      livro={livro}
                    />

                  ))}

                </div>

              </section>

            </div>


            {/* =================================================
                COLUNA DIREITA
            ================================================== */}

            <div className="
              flex
              flex-col
              gap-6
              lg:col-span-5
            ">


              {/* EMPRÉSTIMOS */}

              <section className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                sm:p-6
              ">

                <div className="
                  mb-5
                  flex
                  items-center
                  justify-between
                  gap-3
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <div className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-50
                      text-blue-600
                    ">

                      <Icon className="text-[20px]">
                        assignment_return
                      </Icon>

                    </div>


                    <div>

                      <h2 className="
                        text-lg
                        font-semibold
                        text-slate-900
                      ">
                        Meus Empréstimos Ativos
                      </h2>

                      <p className="
                        text-xs
                        text-slate-500
                      ">
                        Prazo docente ampliado de 30 dias
                      </p>

                    </div>

                  </div>


                  <span className="
                    whitespace-nowrap
                    rounded-md
                    bg-emerald-50
                    px-2
                    py-1
                    text-xs
                    font-semibold
                    text-emerald-600
                  ">
                    3 Obras em mãos
                  </span>

                </div>


                <div className="space-y-3">

                  {emprestimos.map((emprestimo) => (

                    <EmprestimoCard
                      key={emprestimo.titulo}
                      emprestimo={emprestimo}
                    />

                  ))}

                </div>


                <div className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-t
                  border-slate-100
                  pt-4
                ">

                  <span className="
                    text-xs
                    text-slate-500
                  ">

                    Total histórico:

                    <strong className="
                      ml-1
                      text-slate-700
                    ">
                      142 livros consultados
                    </strong>

                  </span>


                  <button
                    type="button"
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1
                      text-xs
                      font-semibold
                      text-blue-600
                    "
                  >

                    Ver extrato completo

                    <Icon className="text-[16px]">
                      chevron_right
                    </Icon>

                  </button>

                </div>

              </section>


              {/* PREFERÊNCIAS */}

              <section className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-blue-100
                bg-gradient-to-br
                from-blue-50
                to-white
                p-6
                shadow-sm
              ">

                <div className="relative z-10">

                  <div className="
                    mb-4
                    flex
                    items-center
                    gap-3
                  ">

                    <div className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-600
                      text-white
                    ">

                      <Icon className="text-[21px]">
                        settings
                      </Icon>

                    </div>


                    <div>

                      <h3 className="
                        text-lg
                        font-semibold
                        text-slate-900
                      ">
                        Preferências Docentes
                      </h3>

                      <p className="
                        text-xs
                        text-slate-500
                      ">
                        Notificações, listas automáticas e prazos
                      </p>

                    </div>

                  </div>


                  <p className="
                    mb-5
                    text-sm
                    leading-relaxed
                    text-slate-600
                  ">
                    Configure alertas para quando obras recomendadas forem
                    devolvidas, sincronize planos de aula com o Google
                    Classroom e ative reservas prioritárias para seminários.
                  </p>


                  <button
                    type="button"
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      bg-white
                      px-4
                      py-3
                      text-sm
                      font-medium
                      text-slate-700
                      shadow-sm
                      ring-1
                      ring-slate-200
                      transition
                      hover:bg-blue-600
                      hover:text-white
                    "
                  >

                    <span className="
                      flex
                      items-center
                      gap-2
                    ">

                      <Icon className="text-[19px]">
                        settings
                      </Icon>

                      Abrir Configurações do Docente

                    </span>


                    <Icon className="text-[18px]">
                      chevron_right
                    </Icon>

                  </button>

                </div>

              </section>

            </div>

          </div>

        </div>

      </main>


      {/* =====================================================
          MODAL DE EDIÇÃO
      ====================================================== */}

      {modalAberto && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-900/50
            p-4
            backdrop-blur-sm
          "
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget &&
              !salvando
            ) {
              fecharModal();
            }

          }}
        >

          <div className="
            max-h-[90vh]
            w-full
            max-w-2xl
            overflow-y-auto
            rounded-2xl
            bg-white
            shadow-2xl
          ">


            {/* HEADER MODAL */}

            <div className="
              flex
              items-center
              justify-between
              border-b
              border-slate-200
              bg-slate-50
              px-6
              py-4
            ">

              <div className="
                flex
                items-center
                gap-2.5
              ">

                <Icon className="
                  text-[21px]
                  text-blue-600
                ">
                  edit
                </Icon>

                <h3 className="
                  text-lg
                  font-semibold
                  text-slate-900
                ">
                  Editar Perfil do Docente
                </h3>

              </div>


              <button
                type="button"
                onClick={fecharModal}
                disabled={salvando}
                className="
                  rounded-lg
                  p-1.5
                  text-slate-400
                  transition
                  hover:bg-slate-200
                  hover:text-slate-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                <Icon className="text-[21px]">
                  close
                </Icon>

              </button>

            </div>


            {/* FORMULÁRIO */}

            <form
              onSubmit={salvarPerfil}
              className="space-y-5 p-6"
            >


              {/* NOME */}

              <Campo
                label="Nome Completo com Titulação"
                value={form.nome}
                onChange={(valor) =>
                  alterarCampo("nome", valor)
                }
              />


              {/* CARGO / DEPARTAMENTO */}

              <div className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
              ">

                <Campo
                  label="Cargo / Titulação"
                  value={form.cargo}
                  onChange={(valor) =>
                    alterarCampo("cargo", valor)
                  }
                />

                <Campo
                  label="Departamento"
                  value={form.departamento}
                  onChange={(valor) =>
                    alterarCampo("departamento", valor)
                  }
                />

              </div>


              {/* MATRÍCULA / EMAIL */}

              <div className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
              ">

                <Campo
                  label="Matrícula"
                  value={form.matricula}
                  onChange={(valor) =>
                    alterarCampo("matricula", valor)
                  }
                />

                <Campo
                  label="E-mail institucional"
                  value={form.email}
                  onChange={(valor) =>
                    alterarCampo("email", valor)
                  }
                />

              </div>


              {/* BIO */}

              <div>

                <label className="
                  mb-1.5
                  block
                  text-xs
                  font-semibold
                  text-slate-600
                ">
                  Biografia Acadêmica & Interesses
                </label>


                <textarea
                  rows={4}
                  value={form.bio}
                  onChange={(event) =>
                    alterarCampo(
                      "bio",
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-slate-300
                    bg-white
                    px-3.5
                    py-2.5
                    text-sm
                    text-slate-800
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                />

              </div>


              {/* BOTÕES */}

              <div className="
                flex
                items-center
                justify-end
                gap-3
                border-t
                border-slate-200
                pt-4
              ">

                <button
                  type="button"
                  onClick={fecharModal}
                  disabled={salvando}
                  className="
                    rounded-lg
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-slate-500
                    transition
                    hover:bg-slate-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Cancelar
                </button>


                <button
                  type="submit"
                  disabled={salvando}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-blue-600
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >

                  <Icon className="text-[18px]">
                    {salvando ? "sync" : "save"}
                  </Icon>

                  {salvando
                    ? "Salvando..."
                    : "Salvar Alterações"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


// ============================================================
// CARD DE MÉTRICA
// ============================================================

interface MetricCardProps {
  titulo: string;
  valor: string;
  descricao: string;
  icone: string;
  tipo: "blue" | "green" | "orange";
}

function MetricCard({
  titulo,
  valor,
  descricao,
  icone,
  tipo,
}: MetricCardProps) {

  const estilos = {

    blue: {
      fundo: "bg-blue-50",
      texto: "text-blue-600",
    },

    green: {
      fundo: "bg-emerald-50",
      texto: "text-emerald-600",
    },

    orange: {
      fundo: "bg-orange-50",
      texto: "text-orange-600",
    },

  };


  const estilo = estilos[tipo];


  return (
    <div className="
      flex
      items-center
      justify-between
      rounded-xl
      border
      border-slate-200
      bg-white
      p-5
      shadow-sm
    ">

      <div className="space-y-1">

        <p className="
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-slate-400
        ">
          {titulo}
        </p>


        <h3 className="
          text-3xl
          font-bold
          tracking-tight
          text-slate-900
        ">
          {valor}
        </h3>


        <p className={`
          text-xs
          font-medium
          ${estilo.texto}
        `}>
          {descricao}
        </p>

      </div>


      <div className={`
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        rounded-xl
        ${estilo.fundo}
        ${estilo.texto}
      `}>

        <Icon className="text-[23px]">
          {icone}
        </Icon>

      </div>

    </div>
  );
}


// ============================================================
// CABEÇALHO DE SEÇÃO
// ============================================================

interface SectionHeaderProps {
  titulo: string;
  descricao: string;
  quantidade: string;
  icone: string;
}

function SectionHeader({
  titulo,
  descricao,
  quantidade,
  icone,
}: SectionHeaderProps) {

  return (
    <div className="
      mb-5
      flex
      items-center
      justify-between
      gap-4
    ">

      <div className="
        flex
        items-center
        gap-3
      ">

        <div className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-blue-50
          text-blue-600
        ">

          <Icon className="text-[20px]">
            {icone}
          </Icon>

        </div>


        <div>

          <h2 className="
            text-lg
            font-semibold
            text-slate-900
          ">
            {titulo}
          </h2>

          <p className="
            text-xs
            text-slate-500
          ">
            {descricao}
          </p>

        </div>

      </div>


      <span className="
        hidden
        whitespace-nowrap
        rounded-md
        bg-slate-100
        px-2.5
        py-1
        text-xs
        font-medium
        text-blue-600
        sm:block
      ">
        {quantidade}
      </span>

    </div>
  );
}


// ============================================================
// CARD DE DISCIPLINA
// ============================================================

interface DisciplinaCardProps {
  disciplina: Disciplina;
}

function DisciplinaCard({
  disciplina,
}: DisciplinaCardProps) {

  const cores = {

    blue: "bg-blue-600 text-white",

    purple: "bg-violet-100 text-violet-700",

    orange: "bg-orange-500 text-white",

  };


  return (
    <div className="
      flex
      flex-col
      gap-4
      rounded-xl
      border
      border-slate-100
      bg-slate-50
      p-4
      transition
      hover:border-blue-100
      hover:bg-blue-50/40
      sm:flex-row
      sm:items-center
      sm:justify-between
    ">


      <div className="space-y-1">

        <div className="
          flex
          items-center
          gap-2
        ">

          <span className={`
            rounded
            px-2
            py-0.5
            text-xs
            font-semibold
            ${cores[disciplina.cor]}
          `}>
            {disciplina.codigo}
          </span>


          <h3 className="
            text-base
            font-semibold
            text-slate-900
          ">
            {disciplina.nome}
          </h3>

        </div>


        <p className="
          flex
          flex-wrap
          items-center
          gap-2
          text-xs
          text-slate-500
        ">

          <span>
            {disciplina.turma}
          </span>

          <span>
            •
          </span>

          <span className="
            font-medium
            text-slate-600
          ">
            {disciplina.alunos}
          </span>

        </p>

      </div>


      <div className="
        flex
        items-center
        gap-2
        self-end
        sm:self-center
      ">

        <span className="
          rounded-md
          bg-white
          px-2.5
          py-1
          text-xs
          text-slate-500
          shadow-sm
          ring-1
          ring-slate-200
        ">
          {disciplina.livros}
        </span>


        <button
          type="button"
          className="
            rounded-lg
            p-1.5
            text-blue-600
            transition
            hover:bg-blue-100
          "
        >

          <Icon className="text-[20px]">
            chevron_right
          </Icon>

        </button>

      </div>

    </div>
  );
}


// ============================================================
// CARD DE LIVRO
// ============================================================

interface LivroCardProps {
  livro: Livro;
}

function LivroCard({
  livro,
}: LivroCardProps) {

  return (
    <div className="
      group
      overflow-hidden
      rounded-xl
      border
      border-slate-200
      bg-slate-50
      p-3
      transition
      hover:-translate-y-0.5
      hover:shadow-md
    ">


      {/* IMAGEM */}

      <div className="
        relative
        mb-3
        h-44
        w-full
        overflow-hidden
        rounded-lg
        bg-slate-200
      ">

        <img
          src={livro.imagem}
          alt={livro.titulo}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-300
            group-hover:scale-105
          "
        />


        <span className={`
          absolute
          right-2
          top-2
          rounded
          px-2
          py-0.5
          text-xs
          font-semibold
          backdrop-blur
          ${
            livro.statusTipo === "disponivel"
              ? "bg-white/90 text-emerald-600"
              : "bg-white/90 text-orange-600"
          }
        `}>
          {livro.status}
        </span>

      </div>


      {/* INFORMAÇÕES */}

      <h4 className="
        line-clamp-1
        text-sm
        font-semibold
        text-slate-900
      ">
        {livro.titulo}
      </h4>


      <p className="
        text-xs
        text-slate-500
      ">
        {livro.autor}
      </p>


      <div className="
        mt-2
        flex
        items-center
        justify-between
        border-t
        border-slate-200
        pt-2
        text-xs
      ">

        <span className="text-blue-600">
          {livro.turma}
        </span>

        <span className="text-slate-500">
          {livro.copias}
        </span>

      </div>

    </div>
  );
}


// ============================================================
// CARD DE EMPRÉSTIMO
// ============================================================

interface EmprestimoCardProps {
  emprestimo: Emprestimo;
}

function EmprestimoCard({
  emprestimo,
}: EmprestimoCardProps) {

  return (
    <div className="
      rounded-xl
      border
      border-slate-100
      bg-slate-50
      p-4
    ">

      <div className="
        flex
        items-start
        justify-between
        gap-3
      ">

        <div>

          <h4 className="
            text-sm
            font-semibold
            text-slate-900
          ">
            {emprestimo.titulo}
          </h4>

          <p className="
            text-xs
            text-slate-500
          ">
            {emprestimo.autor}
          </p>

        </div>


        <span className="
          whitespace-nowrap
          rounded
          bg-blue-50
          px-2
          py-0.5
          text-xs
          font-medium
          text-blue-600
        ">
          {emprestimo.prazo}
        </span>

      </div>


      <div className="
        mt-3
        flex
        items-center
        justify-between
        border-t
        border-slate-200
        pt-2
        text-xs
        text-slate-500
      ">

        <span>
          Retirado em: {emprestimo.data}
        </span>


        <button
          type="button"
          className="
            flex
            items-center
            gap-1
            font-medium
            text-blue-600
            transition
            hover:text-blue-700
          "
        >

          <Icon className="text-[15px]">
            refresh
          </Icon>

          Renovar

        </button>

      </div>

    </div>
  );
}


// ============================================================
// CAMPO DO FORMULÁRIO
// ============================================================

interface CampoProps {
  label: string;
  value: string;
  onChange: (valor: string) => void;
}

function Campo({
  label,
  value,
  onChange,
}: CampoProps) {

  return (
    <div>

      <label className="
        mb-1.5
        block
        text-xs
        font-semibold
        text-slate-600
      ">
        {label}
      </label>


      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          rounded-lg
          border
          border-slate-300
          bg-white
          px-3.5
          py-2.5
          text-sm
          text-slate-800
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      />

    </div>
  );
}