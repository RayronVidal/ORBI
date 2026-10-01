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

  email: "marcos.silveira@orbi.edu.br"
};

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


                     z

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


                {/* {professor.areas.map((area) => (

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

                ))} */}

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
// ===========================================================


// ============================================================
// CARD DE LIVRO
// ============================================================




// ============================================================
// CARD DE EMPRÉSTIMO
// ============================================================


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