import Button from "../../../components/Button";
import React, { useState } from "react";

function Catalogo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex">
      {/* Main Content Area */}
      <main className="flex-1 ml-0  flex flex-col min-h-screen">
        {/* TopNavBar */}
        <header className="flex justify-between items-center h-16 px-gutter bg-surface border-b border-outline-variant sticky top-0 z-40">
          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* Search Area */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center relative">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
              placeholder="Search catalog..."
              type="text"
            />
          </div>

          <div className="flex-1 md:hidden"></div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-outline-variant mx-2 hidden md:block"></div>
            <button className="flex items-center gap-2 hover:bg-surface-container-low p-1 pr-3 rounded-full transition-all">
              <img
                className="w-8 h-8 rounded-full object-cover border border-outline-variant"
                alt="Librarian J."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAoebFgyIOSeuy1fI9eNLCYKN7kNezbVW-hifWmqw33afvydvb1-j2GEagKEW3Mcp52ZsNtI9EPfLFgJzdtjbHmqn9QvLI4SlwIkjCP5hZ_SEWmC6nLAN5xsU13xaUCF2HfO88wKZVx-eJGgre6k_8TGfZ77ljWcaqjfsWbQZqGinzHBOcEOpv57XAx5_ljeVE_2oY881QtsG6qZ7BP4Yn9sbEV-qYb0XTWB8_V8aIqTpJ0QIg-zp1Jg"
              />
              <span className="font-label-md text-label-md text-on-surface-variant hidden md:block">
                Librarian J.
              </span>
            </button>
          </div>
        </header>
        

        {/* Page Content */}
        <div className="flex-1 p-margin_mobile md:p-margin_desktop bg-surface-bright flex flex-col gap-stack_lg">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">
                Catalog Management
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Manage books, inventory, and availability.
              </p>
            </div>
            
            {/* Botão de Adicionar Livro */}
            {<Button text="Adicionar Livro" icon="add" NomeClasse="material-symbols-outlined"/>}
          </div>

          {/* Filters & Controls Bar */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="relative">
                <select className="appearance-none bg-surface-container-low border border-outline-variant text-on-surface font-body-md py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-primary transition-colors cursor-pointer">
                  <option>All Categories</option>
                  <option>Fiction</option>
                  <option>Non-Fiction</option>
                  <option>Science</option>
                  <option>History</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2.5 text-on-surface-variant pointer-events-none">
                  arrow_drop_down
                </span>
              </div>
              <div className="relative">
                <select className="appearance-none bg-surface-container-low border border-outline-variant text-on-surface font-body-md py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-primary transition-colors cursor-pointer">
                  <option>Status: All</option>
                  <option>Available</option>
                  <option>Checked Out</option>
                  <option>Reserved</option>
                  <option>Maintenance</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2.5 text-on-surface-variant pointer-events-none">
                  arrow_drop_down
                </span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  filter_list
                </span>
                Advanced Filters
              </button>
            </div>

            {/* Search & Sort */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
                  search
                </span>
                <input
                  className="w-full pl-9 pr-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                  placeholder="Search ISBN, Title..."
                  type="text"
                />
              </div>
              <button
                className="p-2 border border-outline-variant text-on-surface-variant rounded-lg hover:bg-surface-container-low transition-colors"
                title="Sort Options"
              >
                <span className="material-symbols-outlined text-[20px]">
                  sort
                </span>
              </button>
            </div>
          </div>

          {/* Data Table Container */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider border-b border-outline-variant">
                    <th className="py-3 px-4 font-medium w-12 text-center">
                      <input
                        className="rounded border-outline-variant text-primary focus:ring-primary"
                        type="checkbox"
                      />
                    </th>
                    <th className="py-3 px-4 font-medium">Book Details</th>
                    <th className="py-3 px-4 font-medium">ISBN</th>
                    <th className="py-3 px-4 font-medium">Category / Genre</th>
                    <th className="py-3 px-4 font-medium">Location</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high bg-surface-container-lowest">
                  {/* Row 1 */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-3 px-4 text-center">
                      <input
                        className="rounded border-outline-variant text-primary focus:ring-primary"
                        type="checkbox"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 bg-surface-container-highest rounded flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-outline">
                            book
                          </span>
                        </div>
                        <div>
                          <p className="font-title-lg text-title-lg text-on-surface font-semibold line-clamp-1">
                            The Design of Everyday Things
                          </p>
                          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">
                            Don Norman
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-body-md text-body-md text-on-surface">
                      978-0465050659
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-body-md text-body-md text-on-surface">
                        Design
                      </p>
                      <p className="font-label-md text-label-md text-on-surface-variant">
                        Non-Fiction
                      </p>
                    </td>
                    <td className="py-3 px-4 font-body-md text-body-md text-on-surface">
                      A2 - Shelf 4
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-md text-label-md font-medium bg-[#006242] text-white">
                        Available
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors"
                          title="Generate QR"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            qr_code_2
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container rounded-md transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-3 px-4 text-center">
                      <input
                        className="rounded border-outline-variant text-primary focus:ring-primary"
                        type="checkbox"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 bg-surface-container-highest rounded flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-outline">
                            book
                          </span>
                        </div>
                        <div>
                          <p className="font-title-lg text-title-lg text-on-surface font-semibold line-clamp-1">
                            Dune
                          </p>
                          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">
                            Frank Herbert
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-body-md text-body-md text-on-surface">
                      978-0441172719
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-body-md text-body-md text-on-surface">
                        Sci-Fi
                      </p>
                      <p className="font-label-md text-label-md text-on-surface-variant">
                        Fiction
                      </p>
                    </td>
                    <td className="py-3 px-4 font-body-md text-body-md text-on-surface">
                      F1 - Shelf 2
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-md text-label-md font-medium bg-surface-container-highest text-on-surface-variant">
                        Checked Out
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors"
                          title="Generate QR"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            qr_code_2
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container rounded-md transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-3 px-4 text-center">
                      <input
                        className="rounded border-outline-variant text-primary focus:ring-primary"
                        type="checkbox"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 bg-surface-container-highest rounded flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-outline">
                            book
                          </span>
                        </div>
                        <div>
                          <p className="font-title-lg text-title-lg text-on-surface font-semibold line-clamp-1">
                            Sapiens: A Brief History of Humankind
                          </p>
                          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">
                            Yuval Noah Harari
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-body-md text-body-md text-on-surface">
                      978-0062316097
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-body-md text-body-md text-on-surface">
                        History
                      </p>
                      <p className="font-label-md text-label-md text-on-surface-variant">
                        Non-Fiction
                      </p>
                    </td>
                    <td className="py-3 px-4 font-body-md text-body-md text-on-surface">
                      H3 - Shelf 1
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-md text-label-md font-medium bg-secondary-fixed text-on-secondary-fixed-variant">
                        Reserved
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors"
                          title="Generate QR"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            qr_code_2
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container rounded-md transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-surface border-t border-outline-variant px-4 py-3 flex items-center justify-between">
              <div className="font-body-md text-body-md text-on-surface-variant">
                Showing <span className="font-medium text-on-surface">1</span> to{" "}
                <span className="font-medium text-on-surface">10</span> of{" "}
                <span className="font-medium text-on-surface">97</span> results
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="px-3 py-1 border border-outline-variant rounded bg-surface-container-low text-on-surface-variant disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button className="px-3 py-1 border border-outline-variant rounded bg-surface text-on-surface hover:bg-surface-container-low transition-colors">
                  1
                </button>
                <button className="px-3 py-1 border border-primary rounded bg-primary-container text-on-primary-container font-medium">
                  2
                </button>
                <button className="px-3 py-1 border border-outline-variant rounded bg-surface text-on-surface hover:bg-surface-container-low transition-colors">
                  3
                </button>
                <span className="px-2 text-on-surface-variant">...</span>
                <button className="px-3 py-1 border border-outline-variant rounded bg-surface text-on-surface hover:bg-surface-container-low transition-colors">
                  10
                </button>
                <button className="px-3 py-1 border border-outline-variant rounded bg-surface text-on-surface hover:bg-surface-container-low transition-colors">
                  Next
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
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant flex flex-col max-h-[921px]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface">
              <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Add New Book
              </h3>
              <button
                className="text-on-surface-variant hover:bg-surface-container-highest p-1 rounded-full transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-title-lg text-title-lg border-b border-outline-variant pb-2">
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-md text-label-md font-bold text-on-surface">
                      ISBN *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-outline-variant rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="e.g. 978-xxxxxxxxxx"
                      type="text"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-md text-label-md font-bold text-on-surface">
                      Title *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-outline-variant rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="Book Title"
                      type="text"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="font-label-md text-label-md font-bold text-on-surface">
                      Author(s) *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-outline-variant rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="Comma separated for multiple"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Classification */}
              <div className="space-y-4">
                <h4 className="font-title-lg text-title-lg border-b border-outline-variant pb-2">
                  Classification
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-md text-label-md font-bold text-on-surface">
                      Category
                    </label>
                    <select className="w-full px-3 py-2 border border-outline-variant rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-surface">
                      <option>Select...</option>
                      <option>Fiction</option>
                      <option>Non-Fiction</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-md text-label-md font-bold text-on-surface">
                      Genre
                    </label>
                    <select className="w-full px-3 py-2 border border-outline-variant rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-surface">
                      <option>Select...</option>
                      <option>Sci-Fi</option>
                      <option>History</option>
                      <option>Design</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-md text-label-md font-bold text-on-surface">
                      Year
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-outline-variant rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="YYYY"
                      type="number"
                    />
                  </div>
                </div>
              </div>

              {/* Physical Details */}
              <div className="space-y-4">
                <h4 className="font-title-lg text-title-lg border-b border-outline-variant pb-2">
                  Inventory
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-md text-label-md font-bold text-on-surface">
                      Location / Shelf
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-outline-variant rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="e.g. A1 - Shelf 2"
                      type="text"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-md text-label-md font-bold text-on-surface">
                      Total Copies
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-outline-variant rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      min="1"
                      type="number"
                      defaultValue="1"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Upload */}
              <div className="space-y-2">
                <label className="font-label-md text-label-md font-bold text-on-surface">
                  Cover Image
                </label>
                <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[32px] mb-2">
                    cloud_upload
                  </span>
                  <span className="font-body-md">
                    Drag &amp; drop or click to upload
                  </span>
                  <span className="font-label-md text-label-md mt-1 opacity-70">
                    JPG, PNG (Max 2MB)
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-outline-variant bg-surface-container flex justify-end gap-3 rounded-b-2xl">
              {<Button text="Salvar Livro" icon="add" NomeClasse="material-symbols-outlined"/>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalogo;