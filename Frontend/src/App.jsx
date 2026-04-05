import React, { useState } from "react";
import TelaInicial from "./pages/TelaInicial";
import EscolhaModo from "./pages/EscolhaModo";
import EscolhaPersonagem from "./pages/EscolhaPersonagem";
import EscolhaArena from "./pages/EscolhaArena";
import { iniciarJogo } from "./services/api";

import ArenaArtemis from "./pages/ArenaArtemis";
import ArenaDraven from "./pages/ArenaDraven";
import ArenaNyxra from "./pages/ArenaNyxra";
import ArenaCassian from "./pages/ArenaCassian";
import ArenaArkanis from "./pages/ArenaArkanis";
import ArenaKorvus from "./pages/ArenaKorvus";

// Lista de todos os personagens disponíveis (para sorteio quando necessário)
const TODOS_PERSONAGENS = [
  "arkanis",
  "artemis",
  "cassian",
  "draven",
  "korvus",
  "nyxra",
];

function App() {
  const [tela, setTela] = useState("inicial");
  const [configJogo, setConfigJogo] = useState({
    modo: null,
    herois: [],
    arena: null,
    estadoJogo: null,
  });

  const navegar = (proxima) => setTela(proxima);

  const selecionarModo = (modo) => {
    setConfigJogo((p) => ({ ...p, modo }));
    navegar("personagem");
  };

  // Só salva o personagem e vai pra tela de arena — ainda NÃO chama o backend
  const confirmarPersonagem = (herois) => {
    setConfigJogo((p) => ({ ...p, herois }));
    navegar("arena");
  };

  // Arena escolhida → agora sim chama o backend com o inimigo correto
  const confirmarArena = async (arena) => {
    const p1Nome = configJogo.herois[0]?.name?.toLowerCase() ?? "arkanis";

    // P2 é o segundo personagem escolhido pelo jogador; se não escolheu, sorteia
    let p2Nome = configJogo.herois[1]?.name?.toLowerCase();
    if (!p2Nome) {
      const opcoes = TODOS_PERSONAGENS.filter((n) => n !== p1Nome);
      p2Nome = opcoes[Math.floor(Math.random() * opcoes.length)];
    }

    const estado = await iniciarJogo(p1Nome, p2Nome);
    console.log("Estado inicial:", estado);

    setConfigJogo((p) => ({ ...p, arena, estadoJogo: estado }));
    navegar("jogo");
  };

  const voltar = () => {
    if (tela === "modo") navegar("inicial");
    if (tela === "personagem") navegar("modo");
    if (tela === "arena") navegar("personagem");
    if (tela === "jogo") navegar("arena");
  };

  const renderizarJogo = () => {
    const id = Number(configJogo.arena?.id);

    const gameProps = {
      player: configJogo.herois[0],
      estadoJogo: configJogo.estadoJogo,
      setConfigJogo,
      onSair: () => setTela("inicial"),
    };

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
        </div>
      )}
    </div>
  );
}

export default App;
