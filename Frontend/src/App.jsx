import React, { useState } from "react";
import TelaInicial        from "./pages/TelaInicial";
import EscolhaModo        from "./pages/EscolhaModo";
import EscolhaPersonagem  from "./pages/EscolhaPersonagem";
import EscolhaArena       from "./pages/EscolhaArena";
import { iniciarJogo }    from "./services/api";

import ArenaArtemis from "./pages/ArenaArtemis";
import ArenaDraven  from "./pages/ArenaDraven";
import ArenaNyxra   from "./pages/ArenaNyxra";
import ArenaCassian from "./pages/ArenaCassian";
import ArenaArkanis from "./pages/ArenaArkanis";
import ArenaKorvus  from "./pages/ArenaKorvus";

// Arena de cada personagem (usado pelo PVE e Torre)
const ARENA_DO_INIMIGO = {
  artemis: 1, draven: 2, nyxra: 3,
  cassian: 4, arkanis: 5, korvus: 6,
};

// Sequência padrão da Torre
const TODOS = ["arkanis", "korvus", "nyxra", "cassian", "artemis", "draven"];

// Retorna o componente de arena correto para o arenaId
function ArenaComponente({ arenaId, ...props }) {
  switch (arenaId) {
    case 1:  return <ArenaArtemis {...props} />;
    case 2:  return <ArenaDraven  {...props} />;
    case 3:  return <ArenaNyxra   {...props} />;
    case 4:  return <ArenaCassian {...props} />;
    case 5:  return <ArenaArkanis {...props} />;
    case 6:  return <ArenaKorvus  {...props} />;
    default: return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
        <h2 className="text-2xl font-black mb-4">ARENA NÃO SELECIONADA</h2>
        <button onClick={props.onSair} className="bg-white text-black px-4 py-2 font-bold">VOLTAR</button>
      </div>
    );
  }
}

function App() {
  const [tela, setTela] = useState("inicial");
  const [config, setConfig] = useState({
    modo: null,
    herois: [],
    arena: null,
    estadoJogo: null,
    torreSequencia: [],
    torreIndex: 0,
  });

  const navegar = (t) => setTela(t);

  // ── Seleção de modo ───────────────────────────────────────────────────────
  const selecionarModo = (modo) => {
    setConfig((p) => ({ ...p, modo }));
    navegar("personagem");
  };

  // ── Seleção de personagem ─────────────────────────────────────────────────
  // Torre e PVE: só 1 herói; PVP: 2 heróis
  const confirmarPersonagem = (herois) => {
    setConfig((p) => ({ ...p, herois }));

    if (config.modo === "torre") {
      // Torre: pula seleção de arena, inicia direto
      iniciarTorre(herois, 0);
    } else {
      navegar("arena");
    }
  };

  // ── Modo Torre ────────────────────────────────────────────────────────────
  const iniciarTorre = async (herois, index) => {
    const p1Nome    = herois[0]?.name?.toLowerCase() ?? "arkanis";
    const sequencia = TODOS.filter((n) => n !== p1Nome);
    const p2Nome    = sequencia[index];
    const estado    = await iniciarJogo(p1Nome, p2Nome);

    setConfig((p) => ({
      ...p,
      herois,
      arena:          { id: ARENA_DO_INIMIGO[p2Nome] ?? 1 },
      estadoJogo:     estado,
      torreSequencia: sequencia,
      torreIndex:     index,
    }));
    navegar("jogo");
  };

  const proximaLutaTorre = async (proximoIndex) => {
    const p1Nome = config.herois[0]?.name?.toLowerCase() ?? "arkanis";
    const p2Nome = config.torreSequencia[proximoIndex];
    const estado = await iniciarJogo(p1Nome, p2Nome);

    setConfig((p) => ({
      ...p,
      arena:      { id: ARENA_DO_INIMIGO[p2Nome] ?? 1 },
      estadoJogo: estado,
      torreIndex: proximoIndex,
    }));
    // Força re-mount do ArenaBase
    navegar("loading");
    setTimeout(() => navegar("jogo"), 60);
  };

  // ── Modo PVE e PVP ────────────────────────────────────────────────────────
  const confirmarArena = async (arena) => {
    const p1Nome = config.herois[0]?.name?.toLowerCase() ?? "arkanis";
    const p2Nome =
      config.modo === "pvp" && config.herois[1]
        ? config.herois[1].name.toLowerCase()
        : config.modo === "pve" && config.herois[1]
          ? config.herois[1].name.toLowerCase()
          : (TODOS.find((n) => ARENA_DO_INIMIGO[n] === arena.id) ?? "draven");

    const estado = await iniciarJogo(p1Nome, p2Nome);
    setConfig((p) => ({ ...p, arena, estadoJogo: estado }));
    navegar("jogo");
  };

  // ── Voltar ────────────────────────────────────────────────────────────────
  const voltar = () => {
    if (tela === "modo")       navegar("inicial");
    if (tela === "personagem") navegar("modo");
    if (tela === "arena")      navegar("personagem");
    if (tela === "jogo")       navegar("arena");
  };

  // ── Props comuns para o componente de arena ───────────────────────────────
  const gameProps = {
    player:     config.herois[0],
    estadoJogo: config.estadoJogo,
    onSair:     () => navegar("inicial"),
    modo:       config.modo,
    // Torre
    ...(config.modo === "torre" && {
      torreInfo: {
        sequencia:     config.torreSequencia,
        index:         config.torreIndex,
        onProximaLuta: proximaLutaTorre,
      },
    }),
    // PVP: passa o segundo jogador
    ...(config.modo === "pvp" && {
      playerDois: config.herois[1],
    }),
  };

  return (
    <div className="bg-slate-950 min-h-screen selection:bg-yellow-500 selection:text-black">
      {tela === "inicial"    && <TelaInicial aoEntrar={() => navegar("modo")} />}
      {tela === "modo"       && <EscolhaModo onSelecionarModo={selecionarModo} onVoltar={voltar} />}
      {tela === "personagem" && (
        <EscolhaPersonagem
          modo={config.modo}
          onConfirmar={confirmarPersonagem}
          onVoltar={voltar}
        />
      )}
      {tela === "arena"      && <EscolhaArena onConfirmar={confirmarArena} onVoltar={voltar} />}
      {tela === "jogo"       && config.arena && (
        <ArenaComponente arenaId={Number(config.arena.id)} {...gameProps} />
      )}
      {tela === "loading"    && (
        <div className="h-screen flex items-center justify-center bg-black text-yellow-400 text-2xl font-black animate-pulse">
          ⚔️ Próxima luta...
        </div>
      )}
    </div>
  );
}

export default App;