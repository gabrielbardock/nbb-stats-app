import { API_URL } from "./config";

export interface Team {
  id: string;
  shortname: string;
}

export async function getTeams(season: string) {
  const params = new URLSearchParams({ season });

  const response = await fetch(
    `${API_URL}/teams?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar times");
  }

  return response.json() as Promise<Team[]>;
}
