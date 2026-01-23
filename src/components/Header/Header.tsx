import { useEffect, useState } from "react";
import "./Header.css";

export function Header() {
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("estatisticas")) {
      setActiveTab("stats");
    } else if (path.includes("atletas")) {
      setActiveTab("players");
    } else if (path.includes("equipes")) {
      setActiveTab("teams");
    } else {
      setActiveTab("");
    }
  },[])

   return (
    <header className="header">
      <div className="header-container">
        <img width={90} src='../public/nbb-stats-logo.png' alt="" />

        <nav className="nav">
          <a href="/estatisticas" className={`nav-link ${activeTab === "stats" ? "active" : ""}`}>
            Estatísticas
          </a>
          <a href="/atletas" className={`nav-link ${activeTab === "players" ? "active" : ""}`}>
            Atletas
          </a>
          <a href="/equipes" className={`nav-link ${activeTab === "teams" ? "active" : ""}`}>
            Times
          </a>
        </nav>
      </div>
    </header>
  );
}
