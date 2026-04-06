import React, { useState } from "react";
import fundo from "../assets/fundo_sombrio.jpg";

const characters = [
  { id: 0, name: "Random", class: "? ? ?", image: null },
  { id: 1, name: "Korvus", class: "Necromante", image: "/korvus.jpeg" },
  { id: 2, name: "Arkanis", class: "Elemental", image: "/arkanis.jpeg" },
  { id: 3, name: "Cassian", class: "Paladino", image: "/cassian.jpeg" },
  { id: 4, name: "Nyxra", class: "Werewolf", image: "/nyxra.jpeg" },
  { id: 5, name: "Draven", class: "Vampiro", image: "/draven.jpeg" },
  { id: 6, name: "Artemis", class: "Huntress", image: "/artemis.jpeg" },
];

const EscolhaPersonagem = ({ onVoltar, onConfirmar, modo }) => {
  const maxSlots = modo === "pvp" || modo === "pve" ? 2 : 1;
  const [selectedIds, setSelectedIds] = useState([]);

  const togglePersonagem = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((favId) => favId !== id));
    } else if (selectedIds.length < maxSlots) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleConfirmar = () => {
    const heroisReais = characters.filter((c) => c.id !== 0);
    const finalSelection = selectedIds.map((id) => {
      if (id === 0) {
        const randomIndex = Math.floor(Math.random() * heroisReais.length);
        return heroisReais[randomIndex];
      }
      return characters.find((c) => c.id === id);
    });
    if (onConfirmar) onConfirmar(finalSelection);
  };

  return (
    <div className="min-h-screen w-screen text-white flex flex-col items-center py-8 font-mono relative overflow-x-hidden border-[12px] border-double border-slate-900">
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
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <button
          onClick={onVoltar}
          className="fixed top-6 left-8 text-yellow-400 hover:text-white transition-all text-xs uppercase tracking-widest z-30 bg-red-900 border-2 border-red-500 px-4 py-1 shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none"
        >
          &lt; Voltar
        </button>

        <div className="z-10 mb-10 text-center">
          <h1 className="text-5xl md:text-7xl tracking-tighter uppercase font-black italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 drop-shadow-[4px_4px_0px_#4a044e]">
            Escolha seu personagem
          </h1>
          <div className="mt-2 flex justify-center gap-2">
            <div
              className={`h-3 w-12 border-2 ${selectedIds.length >= 1 ? "bg-red-500 border-red-300" : "bg-slate-800 border-slate-700"}`}
            ></div>
            <div
              className={`h-3 w-12 border-2 ${selectedIds.length >= 2 ? "bg-blue-500 border-blue-300" : "bg-slate-800 border-slate-700"}`}
            ></div>
          </div>
        </div>

        <div className="w-full max-w-5xl px-8 mb-32">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {characters.map((char) => {
              const isSelected = selectedIds.includes(char.id);
              const playerIndex = selectedIds.indexOf(char.id);
              const canSelect = selectedIds.length < maxSlots || isSelected;

              return (
                <div
                  key={char.id}
                  onClick={() => togglePersonagem(char.id)}
                  className={`relative group cursor-pointer transition-all border-4 p-1
                    ${
                      isSelected
                        ? playerIndex === 0
                          ? "border-red-500 bg-red-950 scale-105 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                          : "border-blue-500 bg-blue-950 scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        : canSelect
                          ? "border-slate-700 bg-slate-900 hover:border-yellow-400"
                          : "border-black opacity-30 grayscale"
                    }`}
                >
                  <div className="overflow-hidden w-full aspect-[3/4] flex items-center justify-center bg-black border-2 border-slate-800">
                    {char.id === 0 ? (
                      <span className="text-7xl font-black text-slate-700 animate-pulse">
                        ?
                      </span>
                    ) : (
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        style={{ imageRendering: "pixelated" }}
                      />
                    )}
                  </div>

                  <div
                    className={`py-2 px-1 text-center w-full border-t-2 border-slate-800 ${isSelected ? "bg-black/50" : "bg-slate-900"}`}
                  >
                    <h2 className="text-lg font-black uppercase tracking-tighter truncate text-yellow-400">
                      {char.name}
                    </h2>
                    <p className="text-[10px] text-white uppercase font-bold bg-slate-800 inline-block px-2">
                      {char.class}
                    </p>
                  </div>

                  {isSelected && (
                    <div
                      className={`absolute -top-4 -left-4 px-3 py-1 text-sm font-black italic shadow-[4px_4px_0px_#000] border-2 
                      ${playerIndex === 0 ? "bg-red-600 border-red-300" : "bg-blue-600 border-blue-300"}`}
                    >
                      P{playerIndex + 1}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full bg-blue-900 py-6 flex justify-center border-t-4 border-blue-500 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] z-20">
        <button
          onClick={handleConfirmar}
          disabled={selectedIds.length === 0}
          className={`px-20 py-4 text-3xl font-black italic transition-all uppercase tracking-tighter
            ${
              selectedIds.length > 0
                ? "bg-yellow-500 text-black border-b-8 border-yellow-700 hover:bg-yellow-400 hover:border-yellow-600 active:border-b-0 active:translate-y-2 shadow-[0_5px_15px_rgba(234,179,8,0.4)]"
                : "bg-slate-700 text-slate-500 border-b-8 border-slate-800 opacity-50 cursor-not-allowed"
            }`}
        >
          {modo === "pvp"
            ? selectedIds.length === 2
              ? "Lute!"
              : "Pronto?"
            : selectedIds.length === 1
              ? "Pronto!"
              : "Escolha um personagem"}
        </button>
      </div>

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,0,0.06))] bg-[length:100%_4px,3px_100%]"></div>
      <div className="fixed inset-0 pointer-events-none z-40 animate-[pulse_5s_infinite] bg-white/5 opacity-10"></div>
    </div>
  );
};

export default EscolhaPersonagem;
