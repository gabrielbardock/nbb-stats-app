import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header.tsx";
import { Footer } from "./components/Footer/Footer.tsx";

import Stats from "./pages/Stats.tsx";
import Players from "./pages/Players.tsx";
import Teams from "./pages/Teams.tsx";
import PlayerPage from "./pages/Player.tsx";

function App() {
  return (
    <>
      <Header />

      <main className="app-container">
        <Routes>
          <Route path="/" element={<Stats />} />
          <Route path="/estatisticas" element={<Stats />} />
          <Route path="/atletas" element={<Players />} />
          <Route path="/equipes" element={<Teams />} />
          <Route path="/atletas/:id" element={<PlayerPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
