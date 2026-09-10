import Logo1 from '../../../assets/imagens/Logo1.png';

function AcesseSuaConta() {
  return (
    <div className="bg-background text-on-background min-h-screen flex">

      <div className="flex-1 flex w-full">

        <div className="hidden lg:flex w-1/2 bg-surface-container relative overflow-hidden flex-col justify-between p-12">

          <div className="relative z-10">
            <h1 className="font-display-lg text-5xl text-[var(--color-primary)] mb-4 flex items-center align-left font-bold">
                
              <h2>ORBI</h2>

              <img src={Logo1} alt="ORBI" className='p-0 m-0 w-40 h-40'/>


            </h1>

            <p className="font-headline-sm text-headline-sm text-on-surface-variant max-w-md font-semibold text-[var(--color-on-secondary-fixed-variant)]">
              Potencializando a descoberta acadêmica por meio da gestão inteligente de bibliotecas.
            </p>
          </div>

          <div className="absolute inset-0 z-0">

            <div
              className="w-full h-full bg-cover bg-center opacity-40"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQNyXcQuUZC5sQdDSRj-dYMh5yrjj1CLsAwDo57MfRTYzqy2cUESIIUGMBGfWBL5C1fuCoGoiHMoEeb9XxtZiC7rvJixz-bkez2PRurx4KFChFL-MwQk4Li6CYlSUIB7-OCX-yKnJiy25-rW9Vr8G36PcGD94XxiDGY4sLr9aEqn9oJblG_z5ZZFugBQAjvbInpagAdxq7h_ZZ7Ok1rIWHBCCT_xS5RgyZQt3b2yE-rO4xFggbgrxslg')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-surface-container via-surface-container/80 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center gap-4 text-on-surface-variant font-label-lg text-label-lg">

            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--color-primary)]">
                check_circle
              </span>
              Acesso Institucional Seguro
            </span>

            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--color-primary)]">
                check_circle
              </span>
              Catálogo Completo
            </span>

          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 bg-surface relative z-10">

          <div className="w-full max-w-md space-y-8">

            {/* Mobile */}
            <div className="lg:hidden text-center mb-8">

              <h1 className="font-display-lg text-display-lg text-primary flex items-center justify-center flex-col">
                <img src={Logo1} alt="ORBI" className='p-0 m-0 w-60 h-60'/>
              </h1>

              <p className="font-body-md text-body-md text-on-surface-variant text-xl">
                sistema bibliotecário
              </p>

            </div>

            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2 font-bold text-3xl">
                SEJA BEM-VINDO
              </h2>

              <p className="font-body-md text-body-md text-on-surface-variant font-medium text-[var(--color-on-secondary-fixed-variant)]">
                Por favor, insira suas credenciais para acessar sua conta.
              </p>
            </div>

            <form action="#" className="space-y-6" method="POST">

              <div>

                <label
                  className="block font-label-md text-label-md text-on-surface font-bold mb-1"
                  htmlFor="identifier"
                >
                  E-mail ou Matrícula
                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[var(--color-on-secondary-container)]">
                        person
                    </span>
                  </div>

                  <input
                    autoComplete="username"
                    className="pl-10 block w-full rounded font-body-md text-body-md border-outline-variant bg-surface-container-lowest text-on-surface focus:ring-primary focus:border-primary focus:border-2 py-3 px-4 shadow-md"
                    id="identifier"
                    name="identifier"
                    placeholder="Insira sua e-mail ou matrícula"
                    required
                    type="text"
                  />

                </div>
              </div>

              <div>

                <label
                  className="block font-label-md text-label-md text-on-surface font-bold mb-1"
                  htmlFor="password"
                >
                  Senha
                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[var(--color-on-secondary-container)]">
                        lock
                    </span>
                  </div>

                  <input
                    autoComplete="current-password"
                    className="pl-10 block w-full rounded font-body-md text-body-md border-outline-variant bg-surface-container-lowest text-on-surface focus:ring-primary focus:border-primary focus:border-2 py-3 px-4 shadow-md"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type="password"
                  />

                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-primary transition-colors text-red"
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  </button>

                </div>
              </div>

              <div className="flex items-center justify-between">

                <div className="flex items-center">

                  <input
                    className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-lowest cursor-pointer"
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                  />

                  <label
                    className="ml-2 block font-body-md text-body-md text-on-surface-variant cursor-pointer"
                    htmlFor="remember-me"
                  >
                    Lembre-se
                  </label>

                </div>

                <div className="text-sm">

                  <a
                    className="font-label-lg text-label-lg text-[var(--color-primary)] hover:text-[var(--color-on-primary-fixed-variant)] font-semibold transition-colors"
                    href="#"
                  >
                    Esqueceu a senha?
                  </a>

                </div>

              </div>

              <div>

                <button
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded  text-[var(--color-on-primary)] font-label-lg text-label-lg bg-[var(--color-primary-container)] hover:bg-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors h-[48px] items-center shadow-sm cursor-pointer"
                  type="submit"
                >
                Entrar em ORBI

                  <span className="material-symbols-outlined ml-2">
                    login
                  </span>

                </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AcesseSuaConta;