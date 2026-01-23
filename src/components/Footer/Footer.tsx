import "./Footer.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {year} <strong>NBB Stats</strong>
        </p>
        <p className="footer-text">
          Dados coletados do site oficial da LNB. Projeto não-oficial.
        </p>
      </div>
    </footer>
  );
}
