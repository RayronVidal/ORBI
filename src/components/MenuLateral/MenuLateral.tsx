import Logo1 from '../../assets/imagens/Logo1.png';
import { NavLink } from 'react-router-dom';

function MenuLateral() {
  return (
    <nav className="fixed left-0 top-0 h-full w-[280px] bg-[var(--color-background)] border-r border-outline-variant flex flex-col py-6 hidden md:flex z-50">

      {/* LOGO */}
      <div className="px-gutter mb-8 flex items-center gap-2">
        <div className="w-20 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-lg">
          <img
            src={Logo1}
            alt="Logo ORBI"
            className="p-0 m-0 w-20 h-20"
          />
        </div>

        <div>
          <h1 className="text-[var(--color-primary)] font-headline-md text-headline-md font-bold">
            ORBI
          </h1>

          <p className="font-label-md text-label-md text-on-surface-variant">
            sistema bibliotecário
          </p>
        </div>
      </div>

      {/* MENU PRINCIPAL */}
      <div className="flex-1 overflow-y-auto px-4 space-y-1">

        {/* PAINEL */}
        <NavLink
          to="/inicio"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "text-[var(--color-primary)] bg-secondary-container/50 border-l-4 border-[var(--color-primary)] font-bold"
                : "text-on-surface-variant hover:bg-surface-container-highest hover:text-[var(--color-primary-container)]"
            }`
          }
        >
          <span className="material-symbols-outlined">
            dashboard
          </span>

          <span className="font-label-md text-label-md">
            Painel
          </span>
        </NavLink>

        {/* CATÁLOGO */}
        <NavLink
          to="/catalogo"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "text-[var(--color-primary)] bg-secondary-container/50 border-l-4 border-[var(--color-primary)] font-bold"
                : "text-on-surface-variant hover:bg-surface-container-highest hover:text-[var(--color-primary-container)]"
            }`
          }
        >
          <span className="material-symbols-outlined">
            menu_book
          </span>

          <span className="font-label-md text-label-md">
            Catálogo
          </span>
        </NavLink>

        {/* EMPRÉSTIMOS */}
        <NavLink
          to="/emprestimos"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "text-[var(--color-primary)] bg-secondary-container/50 border-l-4 border-[var(--color-primary)] font-bold"
                : "text-on-surface-variant hover:bg-surface-container-highest hover:text-[var(--color-primary-container)]"
            }`
          }
        >
          <span className="material-symbols-outlined">
            bookmark_add
          </span>

          <span className="font-label-md text-label-md">
            Empréstimos
          </span>
        </NavLink>

        {/* DEVOLUÇÕES */}
        <NavLink
          to="/devolucoes"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "text-[var(--color-primary)] bg-secondary-container/50 border-l-4 border-[var(--color-primary)] font-bold"
                : "text-on-surface-variant hover:bg-surface-container-highest hover:text-[var(--color-primary-container)]"
            }`
          }
        >
          <span className="material-symbols-outlined">
            assignment_return
          </span>

          <span className="font-label-md text-label-md">
            Devoluções
          </span>
        </NavLink>

        {/* USUÁRIOS */}
        <NavLink
          to="/usuarios"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "text-[var(--color-primary)] bg-secondary-container/50 border-l-4 border-[var(--color-primary)] font-bold"
                : "text-on-surface-variant hover:bg-surface-container-highest hover:text-[var(--color-primary-container)]"
            }`
          }
        >
          <span className="material-symbols-outlined">
            group
          </span>

          <span className="font-label-md text-label-md">
            Alunos
          </span>
        </NavLink>

        {/* CONFIGURAÇÕES */}
        <NavLink
          to="/configuracoes"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "text-[var(--color-primary)] bg-secondary-container/50 border-l-4 border-[var(--color-primary)] font-bold"
                : "text-on-surface-variant hover:bg-surface-container-highest hover:text-[var(--color-primary-container)]"
            }`
          }
        >
          <span className="material-symbols-outlined">
            settings
          </span>

          <span className="font-label-md text-label-md">
            Configurações
          </span>
        </NavLink>

      </div>

      {/* MENU INFERIOR */}
      <div className="px-4 mt-auto pt-4 border-t border-outline-variant space-y-1">

        {/* AJUDA */}
        <NavLink
          to="/ajuda"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "text-[var(--color-primary)] bg-secondary-container/50 border-l-4 border-[var(--color-primary)] font-bold"
                : "text-on-surface-variant hover:bg-surface-container-highest hover:text-[var(--color-primary-container)]"
            }`
          }
        >
          <span className="material-symbols-outlined">
            help
          </span>

          <span className="font-label-md text-label-md">
            Ajuda
          </span>
        </NavLink>

        {/* PERFIL */}
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "text-[var(--color-primary)] bg-secondary-container/50 border-l-4 border-[var(--color-primary)] font-bold"
                : "text-on-surface-variant hover:bg-surface-container-highest hover:text-[var(--color-primary-container)]"
            }`
          }
        >
          <span className="material-symbols-outlined">
            account_circle
          </span>

          <span className="font-label-md text-label-md">
            Perfil
          </span>
        </NavLink>

        {/* SAIR */}
        <a
          className="text-[var(--color-error)] hover:text-red-500 flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-colors rounded-lg"
          href="#"
        >
          <span className="material-symbols-outlined">
            logout
          </span>

          <span className="font-label-md text-label-md">
            Sair
          </span>
        </a>

      </div>
    </nav>
  );
}

export default MenuLateral;