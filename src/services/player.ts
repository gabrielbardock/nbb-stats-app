import { API_URL } from "./config";

export interface Player {
  id: string;
  name: string;
  number?: string;
  avatar?: string;
  team_id?: string;
  team_name?: string;
}

export async function getPlayer(id: string): Promise<Player> {
  const res = await fetch(`${API_URL}/players/${id}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar atleta");
  }

  return res.json();
}
