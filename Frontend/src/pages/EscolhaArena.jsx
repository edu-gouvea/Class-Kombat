// src/pages/EscolhaArena.jsx
import React, { useState } from "react";

// Importando as imagens da pasta assets
import artemisImg from "../assets/artemis_bg.png";
import dravenImg from "../assets/draven_bg.png";
import nyxraImg from "../assets/nyxra_bg.png";
import cassianImg from "../assets/cassian_bg.png";
import arkanisImg from "../assets/arkanis_bg.png";
import korvusImg from "../assets/korvus_bg.png";

const arenas = [
  { id: 0, name: "Aleatório", img: null, border: "border-white" },
  {
    id: 1,
    name: "Floresta de Artemis",
    img: artemisImg,
    border: "border-emerald-500",
  },
  {
    id: 2,
    name: "Castelo Draaven",
    img: dravenImg,
    border: "border-red-600",
  },
  {
    id: 3,
    name: "Pântano de Nyxra",
    img: nyxraImg,
    border: "border-purple-500",
  },
  {
    id: 4,
    name: "Templo Cassian",
    img: cassianImg,
    border: "border-yellow-500",
  },
  {
    id: 5,
    name: "Vácuo de Arkanis",
    img: arkanisImg,
    border: "border-blue-400",
  },
  {
    id: 6,
    name: "Abismo Korvus",
    img: korvusImg,
    border: "border-red-800",
  },
];

const EscolhaArena = ({ onVoltar, onConfirmar }) => {
  const [selectedArena, setSelectedArena] = useState(null);

  const handleConfirmar = () => {
    if (!selectedArena) return;
    let arenaFinal = selectedArena;
    if (selectedArena.id === 0) {
      const reais = arenas.filter((a) => a.id !== 0);
      arenaFinal = reais[Math.floor(Math.random() * reais.length)];
    }
    onConfirmar(arenaFinal);
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center py-8 font-mono border-[12px] border-double border-slate-900 overflow-x-hidden">
      <button
        onClick={onVoltar}
        className="fixed top-6 left-8 bg-red-900 border-2 border-red-500 px-4 py-1 text-xs shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none z-50 uppercase"
      >
        &lt; Voltar
      </button>

      <h1 className="text-4xl md:text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-10 uppercase tracking-tighter text-center">
        ESCOLHA ARENA
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 max-w-5xl w-full mb-32">
        {arenas.map((arena) => (
          <div
            key={arena.id}
            onClick={() => setSelectedArena(arena)}
            className={`relative h-32 border-4 cursor-pointer transition-all overflow-hidden group ${
              selectedArena?.id === arena.id
                ? `scale-105 ${arena.border} shadow-[0_0_20px_rgba(255,255,255,0.3)] z-10`
                : "border-slate-800 opacity-60 hover:opacity-100"
            }`}
          >
            <div className="w-full h-full bg-slate-900 relative">
              {arena.id === 0 ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                  <span className="text-5xl font-black text-white/20">?</span>
                </div>
              ) : (
                <img
                  src={arena.img} // Aqui ele usa a imagem importada
                  alt={arena.name}
                  className="w-full h-full object-cover"
                  style={{ imageRendering: "pixelated" }}
                />
              )}

              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_2px]"></div>
            </div>

            <div
              className={`absolute bottom-0 w-full py-1 text-[10px] font-black text-center uppercase border-t-2 ${
                selectedArena?.id === arena.id
                  ? "bg-white text-black border-white"
                  : "bg-black/90 text-white border-slate-800"
              }`}
            >
              {arena.name}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 w-full bg-blue-950 py-6 flex justify-center border-t-4 border-blue-800 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <button
          onClick={handleConfirmar}
          disabled={!selectedArena}
          className={`px-16 py-4 text-2xl font-black italic uppercase tracking-tighter transition-all ${
            selectedArena
              ? "bg-yellow-500 text-black border-b-8 border-yellow-700 active:border-b-0 active:translate-y-2 hover:bg-yellow-400"
              : "bg-slate-700 text-slate-500 cursor-not-allowed"
          }`}
        >
          {selectedArena ? "Fight!" : "Select Stage"}
        </button>
      </div>
    </div>
  );
};

export default EscolhaArena;
