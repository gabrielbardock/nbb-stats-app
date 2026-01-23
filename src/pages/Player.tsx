import "./Player.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlayer, type Player } from "../services/player";

export default function PlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getPlayer(id)
      .then(setPlayer)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="player-loading">Carregando...</div>;
  }

  if (!player) {
    return <div className="player-error">Atleta não encontrado</div>;
  }

  return (
    <div className="player-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <div className="player-card">
        <img
          src={player.avatar || "/avatar-placeholder.png"}
          alt={player.name}
        />

        <h1>{player.name}</h1>

        {player.number && (
          <div className="player-number">#{player.number}</div>
        )}

        {player.team_name && (
          <div className="player-team">{player.team_name}</div>
        )}
      </div>
    </div>
  );
}
