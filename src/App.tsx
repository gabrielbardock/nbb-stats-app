import { useEffect, useState } from "react";
import { getStats, type StatsRow, type StatsFilters } from "./services/nbbApi";
import { StatsTable } from "./components/StatsTable";
import { StatsFilters as Filters } from "./components/StatsFilters";
import "./styles/statsTable.css";

const DEFAULT_FILTERS: StatsFilters = {
  season: "2025-26",
  fase: "regular",
  categ: "pontos",
  tipo: "avg",
  quem: "athletes",
};

function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [data, setData] = useState<StatsRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    getStats(filters)
      .then(setData)
      .finally(() => setLoading(false));
  }, [filters]);

  const filteredData = data.filter((item) => {
    if (!search.trim()) return true;

    const value = search.toLowerCase();

    return (
      item.Jogador?.toLowerCase().includes(value) ||
      item.Equipe?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="app-container">
      <h1 className="app-title">📊 Estatísticas NBB</h1>

      <div className="filters-bar">
        <Filters filters={filters} onChange={setFilters} />

        <input
          className="search-input"
          type="text"
          placeholder={
            filters.quem === "teams"
              ? "Buscar time..."
              : "Buscar jogador..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <StatsTable data={filteredData} />
      )}
    </div>
  );
}

export default App;
