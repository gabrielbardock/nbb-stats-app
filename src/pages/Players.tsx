import "./Players.css";
import { useEffect, useMemo, useState } from "react";
import { getPlayers, type Player } from "../services/players";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LIMIT = 500;

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [offset, setOffset] = useState(0);

  const [searchName, setSearchName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const [isLoadingAll, setIsLoadingAll] = useState(false);

  const [searchParams] = useSearchParams();
  const teamIdFromUrl = searchParams.get("team");

  const navigate = useNavigate();

  /* ===== Fetch inicial ===== */

  useEffect(() => {
    setOffset(0);
    setPlayers([]);
    setIsLoadingAll(false);

    getPlayers({
      season: "97",
      team_id: teamIdFromUrl ?? undefined,
      limit: LIMIT,
      offset: 0,
    }).then(setPlayers);
  }, [teamIdFromUrl]);

  /* ===== Buscar TODOS quando pesquisar nome ===== */

  useEffect(() => {
    if (searchName.trim().length < 2 || isLoadingAll) return;

    async function loadAllPlayers() {
      setIsLoadingAll(true);

      let all: Player[] = [];
      let currentOffset = 0;

      while (true) {
        const batch = await getPlayers({
          season: "97",
          team_id: teamIdFromUrl ?? undefined,
          limit: LIMIT,
          offset: currentOffset,
        });

        all = [...all, ...batch];

        if (batch.length < LIMIT) break;
        currentOffset += LIMIT;
      }

      setPlayers(all);
    }

    loadAllPlayers();
  }, [searchName, teamIdFromUrl, isLoadingAll]);

  function loadMore() {
    getPlayers({
      season: "97",
      team_id: teamIdFromUrl ?? undefined,
      limit: LIMIT,
      offset: offset + LIMIT,
    }).then(data => {
      setPlayers(prev => [...prev, ...data]);
      setOffset(prev => prev + LIMIT);
    });
  }

  /* ===== Filtro FRONT-END ===== */

  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const matchName =
        player.name
          .toLowerCase()
          .includes(searchName.toLowerCase());

      const matchTeam =
        !selectedTeam || player.team_name === selectedTeam;

      return matchName && matchTeam;
    });
  }, [players, searchName, selectedTeam]);

  /* ===== Times únicos para o select ===== */

  const teams = useMemo(() => {
    const map = new Map<string, string>();

    players.forEach(p => {
      if (p.team_id && p.team_name) {
        map.set(p.team_id, p.team_name);
      }
    });

    return Array.from(map.entries()).map(([id, name]) => ({
      id,
      name,
    }));
  }, [players]);

  return (
    <div className="players-page">
      <h1>Atletas NBB Caixa 2025-26</h1>

      {/* ===== Filtros ===== */}
      <div className="players-filters">
        <input
          type="text"
          placeholder="Buscar jogador pelo nome..."
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />

        <select
          value={selectedTeam}
          onChange={e => setSelectedTeam(e.target.value)}
        >
          <option value="">Todos os times</option>

          {teams.map(team => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div className="players-count">
        Mostrando {filteredPlayers.length} jogadores
      </div>

      {/* ===== Lista ===== */}
      <div className="players-list">
        {filteredPlayers.map(p => (
          <div key={p.id} className="player-row" onClick={() => navigate(`/atletas/${p.id}`)}>
            <img
              src={p.avatar || "/avatar-placeholder.png"}
              alt={p.name}
            />

            <div className="player-info">
              <strong>{p.name}</strong>
              <span>{p.team_name}</span>
            </div>

            {p.number && (
              <div className="player-number">
                #{p.number}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===== Load more (desativado durante busca) ===== */}
      {!searchName && players.length >= LIMIT && (
        <button className="load-more" onClick={loadMore}>
          Mostrar mais
        </button>
      )}
    </div>
  );
}
