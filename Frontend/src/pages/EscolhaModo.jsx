import React from "react";
import fundo from "../assets/fundo_sombrio.jpg";

const EscolhaModo = ({ onSelecionarModo, onVoltar }) => {
  return (
    <div className="h-screen w-screen text-white flex flex-col items-center justify-center font-mono relative overflow-hidden border-[12px] border-double border-slate-900">
      {/* 🔥 IMAGEM DE FUNDO DESFOCADA */}
      <div
        className="absolute inset-0 z-0 scale-110"
        style={{
          backgroundImage: `url(${fundo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      ></div>

      {/* ESCURECIMENTO */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Botão Voltar */}
        <button
          onClick={onVoltar}
          className="absolute top-8 left-8 text-yellow-500 hover:text-white transition-all text-sm uppercase tracking-widest z-30 bg-red-900 border-2 border-red-500 px-4 py-1 shadow-[4px_4px_0px_#000]"
        >
          &lt; VOLTAR
        </button>

        {/* Título */}
        <div className="mb-20 relative">
          <h1 className="text-6xl md:text-8xl tracking-tighter uppercase font-black italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 drop-shadow-[4px_4px_0px_#4a044e]">
            ESCOLHA O MODO
          </h1>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
        </div>

        {/* MODOS */}
        <div className="flex flex-col md:flex-row gap-12 w-full max-w-6xl px-8">
          {/* PvE */}
          <div
            onClick={() => onSelecionarModo("pve")}
            className="group flex-1 cursor-pointer transition-all border-4 border-blue-900 bg-slate-900 p-6 relative flex flex-col items-center shadow-[8px_8px_0px_#1e3a8a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#3b82f6] active:translate-x-[2px] active:translate-y-[2px]"
          >
            <div className="bg-blue-600 w-full text-center py-1 mb-4 border-b-4 border-blue-900 font-bold italic">
              SINGLE PLAYER
            </div>
            <div className="text-7xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
              🕹️
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white group-hover:animate-pulse">
              1P VS CPU
            </h2>
            <p className="text-blue-400 text-[10px] mt-4 uppercase font-bold text-center leading-tight">
              Lute contra a máquina <br /> Encare os desafios
            </p>
          </div>

          {/* PvP */}
          <div
            onClick={() => onSelecionarModo("pvp")}
            className="group flex-1 cursor-pointer transition-all border-4 border-red-900 bg-slate-900 p-6 relative flex flex-col items-center shadow-[8px_8px_0px_#7f1d1d] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#ef4444] active:translate-x-[2px] active:translate-y-[2px]"
          >
            <div className="bg-red-600 w-full text-center py-1 mb-4 border-b-4 border-red-900 font-bold italic">
              MULTI PLAYER
            </div>
            <div className="text-7xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
              🥊
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white group-hover:animate-pulse">
              1P VS 2P
            </h2>
            <p className="text-red-400 text-[10px] mt-4 uppercase font-bold text-center leading-tight">
              Derrote seu amigo <br /> Numa batalha
            </p>
          </div>

          {/* TORRE */}
          <div
            onClick={() => onSelecionarModo("torre")}
            className="group flex-1 cursor-pointer transition-all border-4 border-yellow-900 bg-slate-900 p-6 relative flex flex-col items-center shadow-[8px_8px_0px_#78350f] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#facc15] active:translate-x-[2px] active:translate-y-[2px]"
          >
            <div className="bg-yellow-600 w-full text-center py-1 mb-4 border-b-4 border-yellow-900 font-bold italic">
              TORRE
            </div>
            <div className="text-7xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
              🏆
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white group-hover:animate-pulse">
              MODO TORRE
            </h2>
            <p className="text-yellow-400 text-[10px] mt-4 uppercase font-bold text-center leading-tight">
              Derrote vários inimigos <br /> Suba na torre
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full bg-blue-900 py-2 flex justify-around items-center border-t-4 border-blue-500">
          <span className="text-yellow-400 text-xs font-bold tracking-[0.2em]">
            The POO game
          </span>
          <span className="text-white text-[10px] animate-bounce">
            package Class Kombat
          </span>
          <span className="text-yellow-400 text-xs font-bold tracking-[0.2em]">
            import combate
          </span>
        </div>
      </div>

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-30 select-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,0,0.06))] bg-[length:100%_4px,3px_100%]"></div>

      {/* Flicker */}
      <div className="fixed inset-0 pointer-events-none z-40 animate-[pulse_5s_infinite] bg-white/5 opacity-10"></div>
    </div>
  );
};

export default EscolhaModo;
