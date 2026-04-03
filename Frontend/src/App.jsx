import React, { useState } from "react";
import TelaInicial from "./pages/TelaInicial";
import EscolhaModo from "./pages/EscolhaModo";
import EscolhaPersonagem from "./pages/EscolhaPersonagem";
import EscolhaArena from "./pages/EscolhaArena";

// Imports das Arenas
import ArenaArtemis from "./pages/ArenaArtemis";
import ArenaDraven from "./pages/ArenaDraven";
import ArenaNyxra from "./pages/ArenaNyxra";
import ArenaCassian from "./pages/ArenaCassian";
import ArenaArkanis from "./pages/ArenaArkanis";
import ArenaKorvus from "./pages/ArenaKorvus";

function App() {
  const [tela, setTela] = useState("inicial");
  const [configJogo, setConfigJogo] = useState({
    modo: null,
    herois: [],
    arena: null,
  });

  const navegar = (proxima) => setTela(proxima);

  const selecionarModo = (modo) => {
    setConfigJogo((p) => ({ ...p, modo }));
    navegar("personagem");
  };

  const confirmarPersonagem = (herois) => {
    setConfigJogo((p) => ({ ...p, herois }));
    navegar("arena");
  };

  const confirmarArena = (arena) => {
    console.log("Arena selecionada:", arena); // DEBUG
    setConfigJogo((p) => ({ ...p, arena }));
    navegar("jogo");
  };

  const voltar = () => {
    if (tela === "modo") navegar("inicial");
    if (tela === "personagem") navegar("modo");
    if (tela === "arena") navegar("personagem");
    if (tela === "jogo") navegar("arena");
  };

  const renderizarJogo = () => {
    // 🔥 FORÇA número (resolve bug de string)
    const id = Number(configJogo.arena?.id);

    console.log("ID da arena:", id);

    const gameProps = {
      player: configJogo.herois[0],
      onSair: () => setTela("inicial"),
    };

    if (!id) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
          <h2 className="text-2xl font-black mb-4">ARENA NÃO SELECIONADA</h2>
          <button
            onClick={() => setTela("arena")}
            className="bg-white text-black px-4 py-2 font-bold"
          >
            VOLTAR
          </button>
        </div>
      );
    }

    switch (id) {
      case 1:
        return <ArenaArtemis {...gameProps} />;
      case 2:
        return <ArenaDraven {...gameProps} />;
      case 3:
        return <ArenaNyxra {...gameProps} />;
      case 4:
        return <ArenaCassian {...gameProps} />;
      case 5:
        return <ArenaArkanis {...gameProps} />;
      case 6:
        return <ArenaKorvus {...gameProps} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
            <h2 className="text-2xl font-black mb-4">ERRO AO CARREGAR ARENA</h2>
            <button
              onClick={() => setTela("arena")}
              className="bg-white text-black px-4 py-2 font-bold"
            >
              VOLTAR
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen selection:bg-yellow-500 selection:text-black">
      {tela === "inicial" && <TelaInicial aoEntrar={() => navegar("modo")} />}

      {tela === "modo" && (
        <EscolhaModo onSelecionarModo={selecionarModo} onVoltar={voltar} />
      )}

      {tela === "personagem" && (
        <EscolhaPersonagem
          onConfirmar={confirmarPersonagem}
          onVoltar={voltar}
        />
      )}

      {tela === "arena" && (
        <EscolhaArena onConfirmar={confirmarArena} onVoltar={voltar} />
      )}

      {tela === "jogo" && (
        <div className="relative w-full h-full animate-in fade-in duration-700">
          {renderizarJogo()}

          <button
            onClick={() => setTela("inicial")}
            className="fixed top-4 right-4 z-50 bg-red-600 text-white px-3 py-1 text-[10px] font-black border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-red-500 active:translate-y-1 active:shadow-none transition-all uppercase"
          >
            Sair da Luta
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
