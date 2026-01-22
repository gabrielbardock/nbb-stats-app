interface Props {
  filters: {
    season: string;
    fase: string;
    categ: string;
    tipo: "avg" | "sum";
    quem: "athletes" | "teams";
  };
  onChange: (filters: Props["filters"]) => void;
}

const seasons = [
  "2008-09","2009-10","2010-11","2011-12","2012-13","2013-14",
  "2014-15","2015-16","2016-17","2017-18","2018-19","2019-20",
  "2020-21","2021-22","2022-23","2023-24","2024-25","2025-26"
];

const fases = ["regular", "playoffs", "total"];

const categs = [
  "pontos","rebotes","assistencias","arremessos",
  "bolas-recuperadas","tocos","erros",
  "eficiencia","duplos-duplos","enterradas"
];

export function StatsFilters({ filters, onChange }: Props) {
  function update(key: string, value: string) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="filters">
      <select
        value={filters.season}
        onChange={e => update("season", e.target.value)}
      >
        {seasons.map(s => <option key={s}>{s}</option>)}
      </select>

      <select
        value={filters.fase}
        onChange={e => update("fase", e.target.value)}
      >
        {fases.map(f => <option key={f}>{f}</option>)}
      </select>

      <select
        value={filters.categ}
        onChange={e => update("categ", e.target.value)}
      >
        {categs.map(c => <option key={c}>{c}</option>)}
      </select>

      <select
        value={filters.tipo}
        onChange={e => update("tipo", e.target.value)}
      >
        <option value="avg">Média</option>
        <option value="sum">Total</option>
      </select>

      <select
        value={filters.quem}
        onChange={e => update("quem", e.target.value)}
      >
        <option value="athletes">Jogadores</option>
        <option value="teams">Times</option>
      </select>
    </div>
  );
}
