import { useMemo, useState } from "react";
import "./Emprestimos.css";

type Aba = "ativos" | "atrasados" | "historico";
type Status = "Ativo" | "Atrasado";

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
  status: Status;
}

const emprestimos: Emprestimo[] = [
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
];

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    filter: <><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></>,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function formatDate(value: string) {
  const [day, month, year] = value.split("/");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return { first: `${months[Number(month) - 1]} ${day},`, second: year };
}

function Emprestimos() {
  const [aba, setAba] = useState<Aba>("ativos");
  const [aluno, setAluno] = useState("");
  const [livro, setLivro] = useState("");
  const [data, setData] = useState("Qualquer período");
  const [busca, setBusca] = useState("");

  const contagemAtivos = emprestimos.filter((item) => item.status === "Ativo").length;
  const contagemAtrasados = emprestimos.filter((item) => item.status === "Atrasado").length;

  const filtrados = useMemo(() => emprestimos.filter((item) => {
    const termo = busca.trim().toLowerCase();
    const correspondeBusca = !termo || [item.aluno, item.alunoId, item.livro, item.autor].some((v) => v.toLowerCase().includes(termo));
    const correspondeAluno = !aluno || item.aluno.toLowerCase().includes(aluno.toLowerCase()) || item.alunoId.toLowerCase().includes(aluno.toLowerCase());
    const correspondeLivro = !livro || item.livro.toLowerCase().includes(livro.toLowerCase()) || item.autor.toLowerCase().includes(livro.toLowerCase());
    const correspondeAba = aba === "historico" || (aba === "ativos" ? item.status === "Ativo" : item.status === "Atrasado");
    return correspondeBusca && correspondeAluno && correspondeLivro && correspondeAba;
  }), [aba, aluno, livro, busca]);

  return (
    <div className="loans-page">
      <header className="loans-topbar">
        <div className="topbar-search">
          <Icon name="search" size={21} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Search loans, students, or books..." />
        </div>
        <div className="topbar-actions">
          <button   className="icon-button notification" aria-label="Notificações"><Icon name="bell" size={22} /><span /></button>
          <div className="profile-avatar">HU</div>
        </div>
      </header>

      <main className="loans-content">
        <section className="loans-heading">
          <div>
            <h1>Loan Management</h1>
            <p>Manage active book loans, track overdue items, and process returns.</p>
          </div>
          <button className="new-loan-button"><Icon name="plus" size={21} /> New Loan</button>
        </section>

        <div className="loan-tabs" role="tablist">
          <button className={aba === "ativos" ? "active" : ""} onClick={() => setAba("ativos")} role="tab">Active Loans ({contagemAtivos + contagemAtrasados + 19})</button>
          <button className={aba === "atrasados" ? "active" : ""} onClick={() => setAba("atrasados")} role="tab">Overdue ({contagemAtrasados + 2})</button>
          <button className={aba === "historico" ? "active" : ""} onClick={() => setAba("historico")} role="tab">History</button>
        </div>

        <section className="filter-card">
          <label>
            <span>Student</span>
            <input value={aluno} onChange={(e) => setAluno(e.target.value)} placeholder="Name or ID" />
          </label>
          <label>
            <span>Book Title</span>
            <input value={livro} onChange={(e) => setLivro(e.target.value)} placeholder="Title or ISBN" />
          </label>
          <label>
            <span>Due Date</span>
            <select value={data} onChange={(e) => setData(e.target.value)}>
              <option>Qualquer período</option>
              <option>Vence hoje</option>
              <option>Vence esta semana</option>
            </select>
          </label>
          <button className="filter-button"><Icon name="filter" size={17} /> Filter</button>
        </section>

        <section className="table-card">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>STUDENT</th><th>BOOK DETAILS</th><th>LOAN DATE</th><th>DUE DATE</th><th>STATUS</th><th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((item) => {
                  const loan = formatDate(item.dataEmprestimo);
                  const due = formatDate(item.dataDevolucao);
                  return (
                    <tr key={item.id} className={item.status === "Atrasado" ? "overdue-row" : ""}>
                      <td>
                        <div className="student-cell"><div className="initials">{item.iniciais}</div><div><strong>{item.aluno}</strong><small>ID: {item.alunoId}</small></div></div>
                      </td>
                      <td><div className="book-cell"><strong>{item.livro}</strong><small>{item.autor}</small></div></td>
                      <td><div className="date-cell"><span>{loan.first}</span><span>{loan.second}</span></div></td>
                      <td><div className={`date-cell ${item.status === "Atrasado" ? "danger" : ""}`}><span>{due.first}</span><span>{due.second}</span><small>{item.prazo}</small></div></td>
                      <td><span className={`status-pill ${item.status === "Atrasado" ? "overdue" : "active"}`}>{item.status}</span></td>
                      <td><button className="more-button" aria-label={`Ações para ${item.aluno}`}><Icon name="more" size={20} /> </button></td>
                    </tr>                                                  
                  );
                })}
                {filtrados.length === 0 && <tr><td colSpan={6} className="empty-row">Nenhum empréstimo encontrado.</td></tr>}
              </tbody>
            </table>
          </div>
          <footer className="table-footer">
            <span>Showing {filtrados.length || 0} of 24 loans</span>
            <div className="pagination">
              <button disabled><Icon name="chevronLeft" size={19} /></button><button className="selected">1</button><button>2</button><button>3</button><button><Icon name="chevronRight" size={19} /></button>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Emprestimos;
