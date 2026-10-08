import React, { useState } from "react";

function Catalogo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [mobileBookExpanded, setMobileBookExpanded] = useState(false);

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] font-[var(--font-family-base)] min-h-screen flex">
      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* TopNavBar */}
        <header className="flex justify-between items-center h-16 px-4 md:px-8 bg-[var(--color-surface-container-lowest)] border-b border-[var(--color-outline-variant)] sticky top-0 z-30">
          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)] rounded-full transition-all">
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* Search Area */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center relative">
            <span className="material-symbols-outlined absolute left-3 text-[var(--color-on-surface-variant)]">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)] rounded-full font-[var(--font-family-base)] text-[var(--color-on-surface)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-primary transition-shadow"
              placeholder="Buscar no catálogo..."
              type="text"
            />
          </div>

          <div className="flex-1 md:hidden"></div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)] rounded-full transition-all relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>

            <div className="h-8 w-px bg-outline-variant mx-2 hidden md:block"></div>

            <button className="flex items-center gap-2 hover:bg-[var(--color-surface-container-low)] p-1 pr-3 rounded-full transition-all">
              <img
                className="w-8 h-8 rounded-full object-cover border border-[var(--color-outline-variant)]"
                alt="Librarian J."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAoebFgyIOSeuy1fI9eNLCYKN7kNezbVW-hifWmqw33afvydvb1-j2GEagKEW3Mcp52ZsNtI9EPfLFgJzdtjbHmqn9QvLI4SlwIkjCP5hZ_SEWmC6nLAN5xsU13xaUCF2HfO88wKZVx-eJGgre6k_8TGfZ77ljWcaqjfsWbQZqGinzHBOcEOpv57XAx5_ljeVE_2oY881QtsG6qZ7BP4Yn9sbEV-qYb0XTWB8_V8aIqTpJ0QIg-zp1Jg"
              />
              <span className="font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] text-[var(--color-on-surface-variant)] hidden md:block">
                Librarian J.
              </span>
            </button>
            
          </div>
        </header>
        

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8 bg-[var(--color-background)] flex flex-col gap-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-2xl md:text-3xl text-[var(--color-on-background)] tracking-tight">
                Gerenciamento do catálogo
              </h2>
              <p className="font-[var(--font-family-base)] text-[length:var(--font-size-body-md)] text-[var(--color-on-surface-variant)] mt-1">
                Manage menu_books, inventory, and availability.
              </p>
            </div>
            
            {/* Botão de Adicionar livro */}
            {<button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[var(--color-primary-container)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-fixed-dim)]"><span className="material-symbols-outlined text-[20px]">add</span>Adicionar livro</button>}
          </div>

          {/* Filters & Controls Bar */}
          <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="relative">
                <select className="appearance-none bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] font-[var(--font-family-base)] py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-colors cursor-pointer">
                  <option>Todas as categorias</option>
                  <option>Ficção</option>
                  <option>Non-Ficção</option>
                  <option>Ciências</option>
                  <option>História</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2.5 text-[var(--color-on-surface-variant)] pointer-events-none">
                  chevron_right
                </span>
              </div>
              <div className="relative">
                <select className="appearance-none bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] font-[var(--font-family-base)] py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-colors cursor-pointer">
                  <option>Status: todos</option>
                  <option>Disponível</option>
                  <option>Emprestado</option>
                  <option>Reservado</option>
                  <option>Em manutenção</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2.5 text-[var(--color-on-surface-variant)] pointer-events-none">
                  chevron_right
                </span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-[var(--color-outline-variant)] text-[var(--color-on-surface-variant)] font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] rounded-lg hover:bg-[var(--color-surface-container-low)] transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  filter_list
                </span>
                Filtros avançados
              </button>
            </div>

            {/* Search & Sort */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[var(--color-on-surface-variant)] text-[18px]">
                  search
                </span>
                <input
                  className="w-full pl-9 pr-4 py-2 bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg font-[var(--font-family-base)] text-[var(--color-on-surface)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-primary transition-shadow"
                  placeholder="Buscar ISBN ou título..."
                  type="text"
                />
              </div>
              <button
                className="p-2 border border-[var(--color-outline-variant)] text-[var(--color-on-surface-variant)] rounded-lg hover:bg-[var(--color-surface-container-low)] transition-colors"
                title="Opções de ordenação"
              >
                <span className="material-symbols-outlined text-[20px]">
                  filter_list
                </span>
              </button>
            </div>
          </div>

          {/* Data Table Container */}
          <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-container-highest)] rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
            <div className="hidden md:block overflow-x-auto flex-1">
              <table className="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr className="w-full bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] uppercase tracking-wider border-b border-[var(--color-outline-variant)]">
                    
                    <th className="py-3 px-4 font-medium">Detalhes do livro</th>
                    <th className="py-3 px-4 font-medium">ISBN</th>
                    <th className="py-3 px-4 font-medium">Categoria</th>
                                        <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium text-right">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-surface-container-high)] bg-[var(--color-surface-container-lowest)]">
                  {/* Row 1 */}
                <tr className="hover:bg-[var(--color-surface-container-low)] transition-colors group">
                    
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 bg-[var(--color-surface-container-highest)] rounded flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[var(--color-outline)]">
                            menu_book
                          </span>
                        </div>
                        <div>
                          <p className="font-[var(--font-family-base)] text-[length:var(--font-size-title-lg)] text-[var(--color-on-surface)] font-semibold line-clamp-1">
                            Dune
                          </p>
                          <p className="font-[var(--font-family-base)] text-[length:var(--font-size-body-md)] text-[var(--color-on-surface-variant)] line-clamp-1">
                            Frank Herbert
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 md:px-3 font-[var(--font-family-base)] text-[length:var(--font-size-body-md)] text-[var(--color-on-surface)]">
                      978-0441172719
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-[var(--font-family-base)] text-[length:var(--font-size-body-md)] text-[var(--color-on-surface)]">
                        Ficção científica
                      </p>
                      <p className="font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] text-[var(--color-on-surface-variant)]">
                        Ficção
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] font-medium bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface-variant)]">
                        Emprestado
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() => setIsActionsOpen((open) => !open)}
                          aria-label="Abrir ações do livro"
                          aria-expanded={isActionsOpen}
                          className="inline-flex items-center justify-center gap-1 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-1 py-2 text-sm text-[var(--color-on-surface-variant)] transition-colors hover:bg-[var(--color-surface-container-low)] hover:text-[var(--color-on-surface)]"
                        >
                          <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                          <span>Ações</span>
                          <span className="material-symbols-outlined text-[16px]">
                            {isActionsOpen ? "expand_less" : "expand_more"}
                          </span>
                        </button>
                        {isActionsOpen && (
                          <div className="absolute right-0 z-20 mt-2 w-44 origin-top-right rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] py-1 text-left shadow-lg">
                            <button
                              type="button"
                              onClick={() => setIsActionsOpen(false)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--color-on-surface)] transition-colors hover:bg-[var(--color-surface-container-low)]"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                              Editar livro
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsActionsOpen(false)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--color-error)] transition-colors hover:bg-[var(--color-error-container)]"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                              Excluir livro
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                </tr>

                </tbody>
              </table>
            </div>

            {/* Mobile book card */}
            <div className="md:hidden p-3">
              <article className="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface)] p-4 shadow-sm">
                <button
                  type="button"
                  onClick={() => setMobileBookExpanded((expanded) => !expanded)}
                  aria-expanded={mobileBookExpanded}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <div className="flex h-14 w-11 shrink-0 items-center justify-center rounded bg-[var(--color-surface-container-highest)]">
                    <span className="material-symbols-outlined text-[var(--color-outline)]">menu_book</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[var(--color-on-surface)]">Dune</p>
                    <p className="truncate text-sm text-[var(--color-on-surface-variant)]">Frank Herbert</p>
                    <span className="mt-1 inline-flex rounded-full bg-[var(--color-surface-container-highest)] px-2 py-0.5 text-xs text-[var(--color-on-surface-variant)]">Emprestado</span>
                  </div>
                  <span className="material-symbols-outlined text-[var(--color-on-surface-variant)]">
                    {mobileBookExpanded ? "expand_less" : "expand_more"}
                  </span>
                </button>
                {mobileBookExpanded && (
                  <div className="mt-4 space-y-3 border-t border-[var(--color-outline-variant)] pt-3 text-sm">
                    <div><span className="text-[var(--color-on-surface-variant)]">ISBN</span><p className="break-all text-[var(--color-on-surface)]">978-0441172719</p></div>
                    <div><span className="text-[var(--color-on-surface-variant)]">Categoria</span><p className="text-[var(--color-on-surface)]">Ficção científica · Ficção</p></div>
                    <div className="flex justify-end">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsActionsOpen((open) => !open)}
                          aria-expanded={isActionsOpen}
                          className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)]"
                        >
                          <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                          Ações
                          <span className="material-symbols-outlined text-[16px]">{isActionsOpen ? "expand_less" : "expand_more"}</span>
                        </button>
                        {isActionsOpen && (
                          <div className="absolute right-0 z-20 mt-2 w-44 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] py-1 shadow-lg">
                            <button type="button" onClick={() => setIsActionsOpen(false)} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[var(--color-surface-container-low)]">
                              <span className="material-symbols-outlined text-[18px]">edit</span>Editar livro
                            </button>
                            <button type="button" onClick={() => setIsActionsOpen(false)} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[var(--color-error)] hover:bg-[var(--color-error-container)]">
                              <span className="material-symbols-outlined text-[18px]">delete</span>Excluir livro
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </div>

            {/* Pagination */}
            <div className="bg-[var(--color-surface)] border-t border-[var(--color-outline-variant)] px-4 py-3 flex items-center justify-between">
              <div className="font-[var(--font-family-base)] text-[length:var(--font-size-body-md)] text-[var(--color-on-surface-variant)]">
                Exibindo <span className="font-medium text-[var(--color-on-surface)]">1</span> to{" "}
                <span className="font-medium text-[var(--color-on-surface)]">10</span> of{" "}
                <span className="font-medium text-[var(--color-on-surface)]">97</span> resultados
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="px-3 py-1 border border-[var(--color-outline-variant)] rounded bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] disabled:opacity-50"
                  disabled
                >
                  Anterior
                </button>
                <button className="px-3 py-1 border border-[var(--color-outline-variant)] rounded bg-[var(--color-surface)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)] transition-colors">
                  1
                </button>
                <button className="px-3 py-1 border border-[var(--color-primary)] rounded bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] font-medium">
                  2
                </button>
                <button className="px-3 py-1 border border-[var(--color-outline-variant)] rounded bg-[var(--color-surface)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)] transition-colors">
                  3
                </button>
                <span className="px-2 text-[var(--color-on-surface-variant)]">...</span>
                <button className="px-3 py-1 border border-[var(--color-outline-variant)] rounded bg-[var(--color-surface)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)] transition-colors">
                  10
                </button>
                <button className="px-3 py-1 border border-[var(--color-outline-variant)] rounded bg-[var(--color-surface)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)] transition-colors">
                  Próxima
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal: New Book Form */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm"
          id="newBookModal"
        >
          <div className="bg-[var(--color-surface-container-lowest)] w-full max-w-2xl rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[var(--color-outline-variant)] flex flex-col max-h-[521px]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[var(--color-outline-variant)] flex justify-between items-center bg-[var(--color-surface)]">
              <h3 className="font-[var(--font-family-base)] text-[length:var(--font-size-headline-md)] text-[var(--color-on-surface)] font-semibold">
                Adicionar novo livro
              </h3>
              <button
                className="text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-highest)] p-1 rounded-full transition-colors"
                onClick={() => setIsModalOpen(false)} aria-label="Fechar formulário"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-[var(--font-family-base)] text-[length:var(--font-size-title-lg)] border-b border-[var(--color-outline-variant)] pb-2">
                  Informações básicas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] font-bold text-[var(--color-on-surface)]">
                      ISBN *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-[var(--color-outline-variant)] rounded-lg font-[var(--font-family-base)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="e.g. 978-xxxxxxxxxx"
                      type="text"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] font-bold text-[var(--color-on-surface)]">
                      Título *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-[var(--color-outline-variant)] rounded-lg font-[var(--font-family-base)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="Título do livro"
                      type="text"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] font-bold text-[var(--color-on-surface)]">
                      Autor(es) *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-[var(--color-outline-variant)] rounded-lg font-[var(--font-family-base)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="Separe os autores por vírgula"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Classificação */}
              <div className="space-y-4">
                <h4 className="font-[var(--font-family-base)] text-[length:var(--font-size-title-lg)] border-b border-[var(--color-outline-variant)] pb-2">
                  Classificação
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] font-bold text-[var(--color-on-surface)]">
                      Categoria
                    </label>
                    <select className="w-full px-3 py-2 border border-[var(--color-outline-variant)] rounded-lg font-[var(--font-family-base)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-primary focus:outline-none bg-[var(--color-surface)]">
                      <option>Selecione...</option>
                      <option>Ficção</option>
                      <option>Non-Ficção</option>
                    </select>
                  </div>
    
                  <div className="space-y-1">
                    <label className="font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] font-bold text-[var(--color-on-surface)]">
                      Ano
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-[var(--color-outline-variant)] rounded-lg font-[var(--font-family-base)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="YYYY"
                      type="number"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Upload */}
              <div className="space-y-2">
                <label className="font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] font-bold text-[var(--color-on-surface)]">
                  Imagem da capa
                </label>
                <div className="border-2 border-dashed border-[var(--color-outline-variant)] rounded-lg p-6 flex flex-col items-center justify-center text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)] transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[32px] mb-2">
                    add
                  </span>
                  <span className="font-[var(--font-family-base)]">
                    Arraste ou clique para enviar
                  </span>
                  <span className="font-[var(--font-family-base)] text-[length:var(--font-size-label-md)] mt-1 opacity-70">
                    JPG, PNG (máx. 2 MB)
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[var(--color-outline-variant)] bg-[var(--color-surface-container)] flex justify-end gap-3 rounded-b-2xl">
              <button type="button" onClick={() => setIsModalOpen(false)} className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-container)]">Salvar livro</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalogo;