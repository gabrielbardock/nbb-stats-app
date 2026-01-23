import { API_URL } from "./config";

export interface Player {
  id: string;
  name: string;
  number?: string;
  avatar?: string;
  team_id: string;
  team_name: string;
}

export interface PlayersFilters {
  season: string;
  team_id?: string;
  limit?: number;
  offset?: number;
}

export async function getPlayers(filters: PlayersFilters) {
  const params = new URLSearchParams({
    season: filters.season,
    limit: String(filters.limit ?? 50),
    offset: String(filters.offset ?? 0),
  });

  if (filters.team_id) {
    params.append("team_id", filters.team_id);
  }

  const response = await fetch(
    `${API_URL}/players?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar jogadores");
  }

  return response.json() as Promise<Player[]>;
}
