import { API_URL } from "./config";

export interface StatsFilters {
  season: string;
  fase: string;
  categ: string;
  tipo: "avg" | "sum";
  quem: "athletes" | "teams";
  sofrido?: boolean;
}

export interface StatsRow {
  [key: string]: any;
}

export async function getStats(filters: StatsFilters) {
  const params = new URLSearchParams({
    season: filters.season,
    fase: filters.fase,
    categ: filters.categ,
    tipo: filters.tipo,
    quem: filters.quem,
    sofrido: String(filters.sofrido ?? false),
  });

  const response = await fetch(
    `${API_URL}/stats?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar estatísticas");
  }

  return response.json() as Promise<StatsRow[]>;
}
