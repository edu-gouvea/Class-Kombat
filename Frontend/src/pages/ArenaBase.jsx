import React, { useState, useEffect } from "react";
import { atacar } from "../services/api";

// Mapa de nome do personagem → imagem (da pasta public)
const CHAR_IMAGES = {
  arkanis: {
    front: "/sprites/arkanis_front.png",
    back: "/sprites/arkanis_back.png",
  },
  artemis: {
    front: "/sprites/artemis_front.png",
    back: "/sprites/artemis_back.png",
  },
  cassian: {
    front: "/sprites/cassian_front.png",
    back: "/sprites/cassian_back.png",
  },
  draven: {
    front: "/sprites/draven_front.png",
    back: "/sprites/draven_back.png",
  },
  korvus: {
    front: "/sprites/korvus_front.png",
    back: "/sprites/korvus_back.png",
  },
  nyxra: {
    front: "/sprites/nyxra_front.png",
    back: "/sprites/nyxra_back.png",
  },
};

const ArenaBase = ({
  background,
  player,
  estadoJogo: estadoInicial,
  onSair,
}) => {
  const [estado, setEstado] = useState(estadoInicial);
  const [log, setLog] = useState("Combate iniciado! Escolha sua ação.");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (estadoInicial) setEstado(estadoInicial);
  }, [estadoInicial]);

  if (!estado) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-2xl font-black">
        Conectando ao servidor...
      </div>
    );
  }

  const { p1, p2, combateAtivo, vencedor } = estado;

  const handleAtacar = async (acao) => {
    if (!combateAtivo || carregando) return;
    setCarregando(true);
    try {
      const novoEstado = await atacar(acao);
      setEstado(novoEstado);
      setLog(novoEstado.log || "");
    } catch (e) {
      setLog("Erro ao conectar com o servidor. O backend está rodando?");
    } finally {
      setCarregando(false);
    }
  };

  const hpPercent = (hpAtual, hp) =>
    Math.max(0, Math.round((hpAtual / hp) * 100));
  const hpColor = (pct) =>
    pct > 50 ? "#22c55e" : pct > 25 ? "#eab308" : "#ef4444";

  const nomeP1 = p1.nome?.toLowerCase();
  const nomeP2 = p2.nome?.toLowerCase();

  const imgP1 = CHAR_IMAGES[nomeP1]?.back || null;
  const imgP2 = CHAR_IMAGES[nomeP2]?.front || null;

  return (
    <div
      className="w-screen h-screen relative font-mono overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/35 z-0" />

      {/* ── SPRITE P1 ───────────────────────────── */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          bottom: "22%",
          left: "23%", // 🔥 MAIS PRA DIREITA
          transform: "translateX(-50%)",
        }}
      >
        {imgP1 ? (
          <img
            src={imgP1}
            alt={p1.nome}
            style={{
              width: "450px", // 🔥 AUMENTOU
              height: "530px", // 🔥 AUMENTOU
              objectFit: "cover",
              objectPosition: "top",
              transform: "scaleX(1)",
              filter:
                p1.hpAtual <= 0
                  ? "grayscale(1) opacity(0.35) drop-shadow(2px 4px 0px #000)"
                  : "drop-shadow(3px 6px 0px rgba(0,0,0,0.8))",
              imageRendering: "pixelated",
            }}
          />
        ) : (
          <div
            style={{ width: 120, height: 160 }}
            className="bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center text-yellow-400 text-3xl font-black"
          >
            P1
          </div>
        )}
      </div>

      {/* ── SPRITE P2 ───────────────────────────── */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          bottom: "52%", // 🔥 MAIS PRA CIMA
          left: "76%",
          transform: "translateX(-50%)",
        }}
      >
        {imgP2 ? (
          <img
            src={imgP2}
            alt={p2.nome}
            style={{
              width: "190px", // 🔥 AUMENTOU
              height: "255px", // 🔥 AUMENTOU
              objectFit: "cover",
              objectPosition: "top",
              transform: "scaleX(-1)",
              filter:
                p2.hpAtual <= 0
                  ? "grayscale(1) opacity(0.35) drop-shadow(2px 4px 0px #000)"
                  : "drop-shadow(-3px 6px 0px rgba(0,0,0,0.8))",
              imageRendering: "auto",
            }}
          />
        ) : (
          <div
            style={{ width: 100, height: 135 }}
            className="bg-red-400/20 border-2 border-red-400 flex items-center justify-center text-red-400 text-3xl font-black"
          >
            P2
          </div>
        )}
      </div>

      {/* ── BARRAS DE HP ─────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start p-4 gap-4">
        {/* P1 */}
        <div className="flex-1 bg-black/75 border-2 border-yellow-500 p-3 max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            {imgP1 && (
              <img
                src={imgP1}
                alt={p1.nome}
                className="w-8 h-8 object-cover object-top border border-yellow-500"
              />
            )}
            <span className="text-yellow-400 font-black uppercase text-sm">
              {p1.nome}
            </span>
            {p1.status !== "NORMAL" && (
              <span className="text-[10px] bg-purple-800 text-white px-1 border border-purple-400">
                {p1.status}
              </span>
            )}
          </div>
          <div className="text-[10px] text-gray-400 mb-1">
            HP: {p1.hpAtual} / {p1.hp} • Especiais: {p1.especiaisRestantes}
          </div>
          <div className="w-full h-3 bg-gray-800 border border-gray-600">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${hpPercent(p1.hpAtual, p1.hp)}%`,
                backgroundColor: hpColor(hpPercent(p1.hpAtual, p1.hp)),
              }}
            />
          </div>
        </div>

        <div className="text-white font-black text-2xl italic drop-shadow z-10 self-center">
          VS
        </div>

        {/* P2 */}
        <div className="flex-1 bg-black/75 border-2 border-red-500 p-3 max-w-xs">
          <div className="flex items-center justify-end gap-2 mb-1">
            <span className="text-red-400 font-black uppercase text-sm">
              {p2.nome}
            </span>
            {p2.status !== "NORMAL" && (
              <span className="text-[10px] bg-purple-800 text-white px-1 border border-purple-400">
                {p2.status}
              </span>
            )}
            {imgP2 && (
              <img
                src={imgP2}
                alt={p2.nome}
                className="w-8 h-8 object-cover object-top border border-red-500"
              />
            )}
          </div>
          <div className="text-[10px] text-gray-400 mb-1 text-right">
            HP: {p2.hpAtual} / {p2.hp}
          </div>
          <div className="w-full h-3 bg-gray-800 border border-gray-600">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${hpPercent(p2.hpAtual, p2.hp)}%`,
                backgroundColor: hpColor(hpPercent(p2.hpAtual, p2.hp)),
                float: "right",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── FIM DE JOGO ─────────────────── */}
      {!combateAtivo && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80">
          <h2 className="text-6xl font-black italic text-yellow-400 mb-2 uppercase drop-shadow-[0_0_20px_gold]">
            {vencedor === p1.nome ? "Vitória!" : "Derrota!"}
          </h2>
          <p className="text-white text-xl mb-8">
            {vencedor} venceu o combate!
          </p>
          <button
            onClick={onSair}
            className="bg-yellow-500 text-black font-black text-xl px-12 py-3 border-b-8 border-yellow-700 hover:bg-yellow-400 active:border-b-0 active:translate-y-2 transition-all uppercase"
          >
            Menu Principal
          </button>
        </div>
      )}

      {/* ── LOG + BOTÕES ─────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="mx-4 mb-2">
          <div className="bg-black/85 border-2 border-gray-600 p-3 min-h-[52px]">
            <p className="text-white text-sm leading-relaxed">
              {carregando ? "⚔️ Executando ação..." : log}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-4 pt-0">
          <button
            onClick={() => handleAtacar("ATAQUE_RAPIDO")}
            disabled={!combateAtivo || carregando}
            className="bg-blue-700 hover:bg-blue-600 disabled:opacity-40 text-white font-black py-3 px-2 border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 transition-all text-sm uppercase flex flex-col items-center"
          >
            <span className="text-[10px] text-blue-300 font-normal normal-case mb-0.5">
              Ataque Rápido
            </span>
            {p1.ataques?.rapido ?? "—"}
          </button>

          <button
            onClick={() => handleAtacar("ATAQUE_ESPECIAL")}
            disabled={!combateAtivo || carregando || p1.especiaisRestantes <= 0}
            className="bg-purple-700 hover:bg-purple-600 disabled:opacity-40 text-white font-black py-3 px-2 border-b-4 border-purple-900 active:border-b-0 active:translate-y-1 transition-all text-sm uppercase flex flex-col items-center"
          >
            <span className="text-[10px] text-purple-300 font-normal normal-case mb-0.5">
              Especial{" "}
              {p1.especiaisRestantes > 0 ? `(${p1.especiaisRestantes}x)` : "—"}
            </span>
            {p1.ataques?.especial ?? "—"}
          </button>

          <button
            onClick={() => handleAtacar("ATAQUE_PASSIVA")}
            disabled={!combateAtivo || carregando}
            className="bg-green-800 hover:bg-green-700 disabled:opacity-40 text-white font-black py-3 px-2 border-b-4 border-green-900 active:border-b-0 active:translate-y-1 transition-all text-sm uppercase flex flex-col items-center"
          >
            <span className="text-[10px] text-green-300 font-normal normal-case mb-0.5">
              Passiva
            </span>
            {p1.ataques?.passiva ?? "—"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArenaBase;
