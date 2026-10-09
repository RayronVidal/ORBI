import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo1 from '../../assets/imagens/Logo1.png';

const linksPrincipais = [
  { to: '/dashboard', icon: 'dashboard', label: 'Painel' },
  { to: '/catalogo', icon: 'menu_book', label: 'Catálogo' },
  { to: '/emprestimos', icon: 'bookmark_add', label: 'Empréstimos' },
  { to: '/devolucoes', icon: 'assignment_return', label: 'Devoluções' },
  { to: '/usuarios', icon: 'group', label: 'Alunos' },
];

const linksInferiores = [
  { to: '/ajuda', icon: 'help', label: 'Ajuda' },
  { to: '/perfil', icon: 'account_circle', label: 'Perfil' },
];

function MenuLateral() {
  const [recolhido, setRecolhido] = useState(false);
  const navigate = useNavigate();
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  useEffect(() => {
    const fecharComEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuMobileAberto(false);
    };

    window.addEventListener('keydown', fecharComEscape);
    return () => window.removeEventListener('keydown', fecharComEscape);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center rounded-lg py-3 transition-all duration-200 ${recolhido ? 'justify-center px-2' : 'gap-3 px-4'} ${
      isActive
        ? 'text-[var(--color-primary)] bg-secondary-container/50 border-l-4 border-[var(--color-primary)] font-bold'
        : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-[var(--color-primary-container)]'
    }`;

  const renderLink = (link: (typeof linksPrincipais)[number]) => (
    <NavLink
      key={link.to}
      to={link.to}
      onClick={() => setMenuMobileAberto(false)}
      title={recolhido ? link.label : undefined}
      aria-label={link.label}
      className={linkClass}
    >
      <span className="material-symbols-outlined shrink-0" aria-hidden="true">
        {link.icon}
      </span>
      <span className={`font-label-md text-label-md whitespace-nowrap ${recolhido ? 'md:hidden' : ''}`}>{link.label}</span>
    </NavLink>
  );

  return (
    <>
      {/* Cabeçalho fixo exibido somente em telas pequenas. */}
      <header className="fixed inset-x-0 top-0 z-[60] flex h-16 items-center gap-3 border-b border-outline-variant bg-[var(--color-background)] px-4 md:hidden">
        <button
          type="button"
          onClick={() => setMenuMobileAberto(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-primary)] transition-colors hover:bg-surface-container-highest"
          aria-label="Abrir menu de navegação"
          aria-expanded={menuMobileAberto}
        >
          <span className="material-symbols-outlined" aria-hidden="true">menu</span>
        </button>
        <img src={Logo1} alt="Logo ORBI" className="h-9 w-9 object-contain" />
        <div className="leading-tight">
          <h1 className="font-bold text-[var(--color-primary)]">ORBI</h1>
          <p className="text-xs text-on-surface-variant">sistema bibliotecário</p>
        </div>
      </header>

      {/* Fundo escurecido do menu mobile. */}
      {menuMobileAberto && (
        <button
          type="button"
          aria-label="Fechar menu de navegação"
          onClick={() => setMenuMobileAberto(false)}
          className="fixed inset-0 z-[70] bg-black/40 md:hidden"
        />
      )}

      <nav
        aria-label="Navegação principal"
        className={`fixed left-0 top-0 z-[80] flex h-dvh shrink-0 flex-col border-r border-outline-variant bg-[var(--color-background)] py-6 transition-[width,transform] duration-300 ease-in-out
          w-[280px]
          ${menuMobileAberto ? 'translate-x-0' : '-translate-x-full'}
          md:sticky md:top-0 md:left-auto md:z-auto md:translate-x-0 md:self-start ${recolhido ? 'md:w-20' : 'md:w-[280px]'}`}
      >
        {/* Cabeçalho e controles do menu. */}
        <div className={`mb-8 flex min-h-12 items-center ${recolhido ? 'justify-center px-2' : 'justify-between px-5'}`}>
          <div className={`flex min-w-0 items-center gap-3 ${recolhido ? 'md:hidden' : ''}`}>
            <img src={Logo1} alt="Logo ORBI" className="h-15 w-15 shrink-0 object-contain" />
            <div className="min-w-0">
              <h1 className="font-bold text-[var(--color-primary)]">ORBI</h1>
              <p className="whitespace-nowrap text-xs text-on-surface-variant">sistema bibliotecário</p>
            </div>
          </div>

          {recolhido && (
            <img src={Logo1} alt="Logo ORBI" className="hidden h-10 w-10 object-contain md:block" />
          )}

          <button
            type="button"
            onClick={() => setMenuMobileAberto(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-highest md:hidden"
            aria-label="Fechar menu"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>

          <button
            type="button"
            onClick={() => setRecolhido((valor) => !valor)}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-highest md:flex"
            aria-label={recolhido ? 'Expandir menu lateral' : 'Recolher menu lateral'}
            title={recolhido ? 'Expandir menu' : 'Recolher menu'}
          >
            <span className="material-symbols-outlined rounded-full p-1 text-[var(--color-on-secondary-container)] hover:bg-[var(--color-secondary-container)]" aria-hidden="true">
              {recolhido ? 'left_panel_open' : 'left_panel_close'}
            </span>
          </button>
        </div>

        {/* Navegação principal. */}
        <div className={`flex-1 space-y-1 overflow-y-auto ${recolhido ? 'px-2' : 'px-4'}`}>
          {linksPrincipais.map(renderLink)}
        </div>

        {/* Navegação inferior. */}
        <div className={`mt-auto space-y-1 border-t border-outline-variant pt-4 ${recolhido ? 'px-2' : 'px-4'}`}>
          {linksInferiores.map(renderLink)}

          <button
            type="button"
            title={recolhido ? 'Sair' : undefined}
            onClick={() => {
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('usuario');
              localStorage.removeItem('token');
              localStorage.removeItem('usuario');
              setMenuMobileAberto(false);
              navigate('/');
            }}
            className={`flex w-full items-center rounded-lg py-3 text-[var(--color-error)] transition-colors hover:bg-surface-container-highest hover:text-red-500 ${recolhido ? 'justify-center px-2' : 'gap-3 px-4'}`}
          >
            <span className="material-symbols-outlined shrink-0" aria-hidden="true">logout</span>
            {!recolhido && <span className="font-label-md text-label-md">Sair</span>}
          </button>
        </div>
      </nav>
    </>
  );
}

export default MenuLateral;
