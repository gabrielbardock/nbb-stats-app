import "./Teams.css";
import { useEffect, useState } from "react";
import { getTeams, type Team } from "../services/teams";
import { useNavigate } from "react-router-dom";

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTeams("97").then(setTeams);
  }, []);

  return (
    <div>
      <h1>Times no NBB Caixa 2025-26</h1>

      <div className="teams-grid">
        {teams.map(team => (
          <div key={team.id} className="team-card">
            {/* Escudo entra aqui depois */}
            <div className="team-placeholder">
              {team.shortname.charAt(0)}
            </div>

            <h3>{team.shortname}</h3>

            <button
              onClick={() =>
                navigate(`/atletas?team=${team.id}`)
              }
            >
              Mostrar jogadores
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
