
import Button from "../../../components/Button";

export default function Inicio() {
  return (
      <main className="min-h-screen overflow-y-auto bg-[var(--color-background)] rounded-lg text-[var(--color-on-background)] font-[var(--font-family-base)]">
      <div className="flex-1 overflow-y-auto p-[var(--margin-desktop)] pb-24 shadow-lg">
        <div className="max-w-[var(--container-max-widt)] display-right space-y-[var(--stack-lg)]">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-semibold text-2xl text-(--color-on-surface-variant)">
                Visão geral
              </h2>
              <p className="font-normal text-lg text-[var(--color-on-surface-variant)] mt-1">
                Status do sistema e principais métricas
              </p>
            </div>
            
            {<Button text="Exportar relatório" NomeClasse="material-symbols-outlined" icon="download"/>}
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-[var(--stack-md)]">
            
            <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-4 flex flex-col gap-2 hover:bg-[var(--color-surface-container-low)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-[var(--color-primary)] bg-[color:color-mix(in_srgb,var(--color-primary-container) 10%,transparent)] p-2 rounded-full">
                  library_books
                </span>
                
              </div>
              <div className="mt-2">
                <h3 className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)] uppercase tracking-wider">
                  Livros
                </h3>
                <p className="font-semibold text-[var(--font-size-headline-md)] text-[var(--color-on-surface)]">
                  124,592
                </p>
              </div>
            </div>
            
            <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-4 flex flex-col gap-2 hover:bg-[var(--color-surface-container-low)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-[var(--color-tertiary)] bg-[color:color-mix(in_srgb,var(--color-tertiary-container) 10%,transparent)] p-2 rounded-full">
                  check_circle
                </span>
              </div>
              <div className="mt-2">
                <h3 className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)] uppercase tracking-wider">
                  Avaliação
                </h3>
                <p className="font-semibold text-[var(--font-size-headline-md)] text-[var(--color-on-surface)]">
                  98,230
                </p>
              </div>
            </div>
            {/* Loaned */}
            <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-4 flex flex-col gap-2 hover:bg-[var(--color-surface-container-low)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined">
                    book_5
                </span>
                
              </div>
              <div className="mt-2">
                <h3 className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)] uppercase tracking-wider">
                  Empréstimos
                </h3>
                <p className="font-semibold text-[var(--font-size-headline-md)] text-[var(--color-on-surface)]">
                  25,841
                </p>
              </div>
            </div>
            {/* Overdue */}
            <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-4 flex flex-col gap-2 hover:bg-[var(--color-surface-container-low)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-[var(--color-error)] bg-[var(--color-error-container)] p-2 rounded-full">
                  warning
                </span>
                
              </div>
              <div className="mt-2">
                <h3 className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)] uppercase tracking-wider">
                  Atrasados
                </h3>
                <p className="font-semibold text-[var(--font-size-headline-md)] text-[var(--color-error)]">
                  521
                </p>
              </div>
            </div>
            {/* Reservations */}
            <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-4 flex flex-col gap-2 hover:bg-[var(--color-surface-container-low)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-[var(--color-secondary)] bg-[var(--color-secondary-container)] p-2 rounded-full">
                  event_available
                </span>
              </div>
              <div className="mt-2">
                <h3 className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)] uppercase tracking-wider">
                  Reservados
                </h3>
                <p className="font-semibold text-[var(--font-size-headline-md)] text-[var(--color-on-surface)]">
                  3,102
                </p>
              </div>
            </div>
            {/* Active Students */}
            <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-4 flex flex-col gap-2 hover:bg-[var(--color-surface-container-low)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-[var(--color-primary)] bg-[color:color-mix(in_srgb,var(--color-primary-container) 10%,transparent)] p-2 rounded-full">
                  group
                </span>
              </div>
              <div className="mt-2">
                <h3 className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)] uppercase tracking-wider">
                  Alunos
                </h3>
                <p className="font-semibold text-[var(--font-size-headline-md)] text-[var(--color-on-surface)]">
                  14,290
                </p>
              </div>
            </div>
          </div>
          

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--stack-md)] h-auto lg:h-[400px]">
            {/* Main Chart Area */}
            <div className="lg:col-span-2 bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-[var(--font-size-title-lg)] text-[var(--color-on-surface)]">
                  Loans vs Returns
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-[var(--font-size-label-md)] font-medium bg-[var(--color-surface-container-highest)] rounded-md text-[var(--color-on-surface)]">
                    Week
                  </button>
                  <button className="px-3 py-1 text-[var(--font-size-label-md)] font-medium text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] rounded-md">
                    Month
                  </button>
                  <button className="px-3 py-1 text-[var(--font-size-label-md)] font-medium text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] rounded-md">
                    Year
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-[var(--color-surface-container-low)] rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for actual chart */}
                <div className="absolute inset-x-0 bottom-0 h-3/4 flex items-end justify-around px-4 opacity-50">
                  <div className="w-12 bg-[var(--color-primary-fixed)] rounded-t-sm h-[40%] relative">
                    <div className="absolute bottom-0 w-full bg-[var(--color-primary)] h-1/2 rounded-t-sm"></div>
                  </div>
                  <div className="w-12 bg-[var(--color-primary-fixed)] rounded-t-sm h-[60%] relative">
                    <div className="absolute bottom-0 w-full bg-[var(--color-primary)] h-[40%] rounded-t-sm"></div>
                  </div>
                  <div className="w-12 bg-[var(--color-primary-fixed)] rounded-t-sm h-[80%] relative">
                    <div className="absolute bottom-0 w-full bg-[var(--color-primary)] h-[70%] rounded-t-sm"></div>
                  </div>
                  <div className="w-12 bg-[var(--color-primary-fixed)] rounded-t-sm h-[50%] relative">
                    <div className="absolute bottom-0 w-full bg-[var(--color-primary)] h-[30%] rounded-t-sm"></div>
                  </div>
                  <div className="w-12 bg-[var(--color-primary-fixed)] rounded-t-sm h-[90%] relative">
                    <div className="absolute bottom-0 w-full bg-[var(--color-primary)] h-[85%] rounded-t-sm"></div>
                  </div>
                  <div className="w-12 bg-[var(--color-primary-fixed)] rounded-t-sm h-[70%] relative">
                    <div className="absolute bottom-0 w-full bg-[var(--color-primary)] h-[60%] rounded-t-sm"></div>
                  </div>
                </div>
                <span className="font-normal text-[var(--color-on-surface-variant)] z-10 bg-[color:color-mix(in_srgb,var(--color-surface) 80%,transparent)] px-4 py-2 rounded-lg">
                  Chart Visualization Area
                </span>
              </div>
            </div>
            {/* Secondary Data Area */}
            <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-6 flex flex-col">
              <h3 className="font-semibold text-[var(--font-size-title-lg)] text-[var(--color-on-surface)] mb-4">
                Top Categories
              </h3>
              <div className="flex-1 flex flex-col justify-center gap-4">
                {/* Category Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]"></div>
                    <span className="font-normal text-[var(--font-size-body-md)] text-[var(--color-on-surface)]">
                      Computer Science
                    </span>
                  </div>
                  <span className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)]">
                    35%
                  </span>
                </div>
                {/* Category Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[var(--color-primary-fixed)]"></div>
                    <span className="font-normal text-[var(--font-size-body-md)] text-[var(--color-on-surface)]">
                      Fiction
                    </span>
                  </div>
                  <span className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)]">
                    25%
                  </span>
                </div>
                {/* Category Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[var(--color-tertiary)]"></div>
                    <span className="font-normal text-[var(--font-size-body-md)] text-[var(--color-on-surface)]">
                      History
                    </span>
                  </div>
                  <span className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)]">
                    20%
                  </span>
                </div>
                {/* Category Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[var(--color-tertiary-fixed-dim)]"></div>
                    <span className="font-normal text-[var(--font-size-body-md)] text-[var(--color-on-surface)]">
                      Mathematics
                    </span>
                  </div>
                  <span className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)]">
                    15%
                  </span>
                </div>
                {/* Donut Chart Placeholder */}
                <div className="mt-4 flex justify-center">
                  <div className="w-32 h-32 rounded-full border-[16px] border-[var(--color-primary-fixed)] relative">
                    <div
                      className="absolute inset-0 border-[16px] border-[var(--color-primary)] rounded-full"
                      style={{
                        clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 50%)",
                      }}
                    ></div>
                    <div
                      className="absolute inset-0 border-[16px] border-[var(--color-tertiary)] rounded-full"
                      style={{
                        clipPath:
                          "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Recent Activity Feed */}
          <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-[var(--font-size-title-lg)] text-[var(--color-on-surface)]">
                Recent Activity
              </h3>
              <a
                className="font-medium text-[var(--font-size-label-md)] text-[var(--color-primary)] hover:underline"
                href="#"
              >
                View All
              </a>
            </div>
            <div className="space-y-4">
              {/* Activity Item */}
              <div className="flex items-start gap-4 pb-4 border-b border-[var(--color-surface-container-highest)] last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary-container) 10%,transparent)] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[var(--color-primary)]">
                    4g_mobiledata
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-normal text-[var(--font-size-body-md)] text-[var(--color-on-surface)]">
                    <span className="font-semibold">Sarah Jenkins</span> checked
                    out{" "}
                    <span className="italic">Introduction to Algorithms</span>
                  </p>
                  <p className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)] mt-1">
                    2 mins ago • Main Library Branch
                  </p>
                </div>
                <span className="px-2 py-1 bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] rounded font-medium text-[var(--font-size-label-md)]">
                  Loan
                </span>
              </div>
              {/* Activity Item */}
              <div className="flex items-start gap-4 pb-4 border-b border-[var(--color-surface-container-highest)] last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-[color:color-mix(in_srgb,var(--color-tertiary-container) 10%,transparent)] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[var(--color-tertiary)]">
                    assignment_return
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-normal text-[var(--font-size-body-md)] text-[var(--color-on-surface)]">
                    <span className="font-semibold">Michael Chang</span>{" "}
                    returned{" "}
                    <span className="italic">
                      The Design of Everyday Things
                    </span>
                  </p>
                  <p className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)] mt-1">
                    15 mins ago • Self-Service Kiosk 3
                  </p>
                </div>
                <span className="px-2 py-1 bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] rounded font-medium text-[var(--font-size-label-md)]">
                  Return
                </span>
              </div>
              {/* Activity Item */}
              <div className="flex items-start gap-4 pb-4 border-b border-[var(--color-surface-container-highest)] last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-[color:color-mix(in_srgb,var(--color-error-container) 20%,transparent)] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[var(--color-error)]">
                    warning
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-normal text-[var(--font-size-body-md)] text-[var(--color-on-surface)]">
                    <span className="font-semibold">System Alert:</span> 12
                    books marked as overdue today.
                  </p>
                  <p className="font-medium text-[var(--font-size-label-md)] text-[var(--color-on-surface-variant)] mt-1">
                    1 hour ago • Automated Process
                  </p>
                </div>
                <span className="px-2 py-1 bg-[var(--color-error-container)] text-[var(--color-on-error-container)] rounded font-medium text-[var(--font-size-label-md)]">
                  Alert
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
