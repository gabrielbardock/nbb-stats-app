import { useEffect, useState } from "react";

interface Props {
  data: any[];
}

const PAGE_SIZE = 50;

export function StatsTable({ data }: Props) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [data]);

  if (!data.length) return <div className="loading">Sem dados</div>;

  const columns = Object.keys(data[0]);
  const visibleData = data.slice(0, visible);

  return (
    <>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>#</th>
              {columns.map(c => <th key={c}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row, i) => (
              <tr key={i}>
                <td className="rank">{i + 1}</td>
                {columns.map(c => <td key={c}>{row[c]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visible < data.length && (
        <div className="load-more-container">
          <button
            className="load-more-btn"
            onClick={() => setVisible((v: number) => v + PAGE_SIZE)}
          >
            Mostrar mais
          </button>
        </div>
      )}
    </>
  );
}
