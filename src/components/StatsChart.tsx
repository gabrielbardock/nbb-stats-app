import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import type { StatsRow } from "../services/nbbApi";

interface Props {
  data: StatsRow[];
  valueKey: string;
}

export function StatsChart({ data, valueKey }: Props) {
  if (!data.length) return null;

  const chartData = data.slice(0, 10).map(d => ({
    name: d.Jogador,
    value: Number(d[valueKey]) || 0
  }));

  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 12 }}>Top 10 jogadores</h3>

      {/* ⚠️ Altura fixa */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
