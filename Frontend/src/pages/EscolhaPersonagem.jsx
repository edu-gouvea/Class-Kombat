import React, { useState } from "react";

// Importação das imagens
import imgKorvus from "../assets/korvus.jpeg";
import imgArkanis from "../assets/arkanis.jpeg";
import imgCassian from "../assets/cassian.jpeg";
import imgNyxra from "../assets/nyxra.jpeg";
import imgDraaven from "../assets/draven.jpeg";
import imgArtemis from "../assets/artemis.jpeg";

const characters = [
  // A opção "Aleatório" tem um ID especial (0)
  { id: 0, name: "Aleatório", class: "Sorte do Destino", image: null },
  { id: 1, name: "Korvus", class: "Necromante", image: imgKorvus },
  { id: 2, name: "Arkanis", class: "Maga Elemental", image: imgArkanis },
  { id: 3, name: "Cassian", class: "Paladino Dracônico", image: imgCassian },
  { id: 4, name: "Nyxra", class: "Lobisomem", image: imgNyxra },
  { id: 5, name: "Draaven", class: "Vampiro", image: imgDraaven },
  { id: 6, name: "Artemis", class: "Caçadora", image: imgArtemis },
];

const EscolhaPersonagem = ({ onVoltar, onConfirmar }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const togglePersonagem = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((favId) => favId !== id));
    } else if (selectedIds.length < 2) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleConfirmar = () => {
    // Filtra os heróis reais (IDs de 1 a 6) para o sorteio
    const heroisReais = characters.filter((c) => c.id !== 0);

    // Mapeia as escolhas. Se for ID 0, sorteia um herói real aleatório
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
    <div className="min-h-screen w-screen bg-slate-950 text-white flex flex-col items-center py-12 font-mono relative overflow-x-hidden">
      <button
        onClick={onVoltar}
        className="fixed top-6 left-8 text-slate-400 hover:text-white transition-colors text-sm uppercase tracking-tighter z-30 bg-slate-950/50 p-2 rounded"
      >
        &lt; Voltar ao Menu
      </button>

      <div className="z-10 mb-6 text-center">
        <h1 className="text-4xl md:text-5xl tracking-widest uppercase border-b-4 border-purple-600 pb-2 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">
          Escolha seu Herói
        </h1>
        <p className="mt-4 text-purple-400 animate-pulse uppercase tracking-widest text-sm">
          {selectedIds.length} / 2 Selecionados
        </p>
      </div>

      <div className="w-full max-w-6xl px-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {characters.map((char) => {
            const isSelected = selectedIds.includes(char.id);
            const canSelect = selectedIds.length < 2 || isSelected;

            return (
              <div
                key={char.id}
                onClick={() => togglePersonagem(char.id)}
                className={`group cursor-pointer transition-all duration-300 border-4 p-1 relative flex flex-col items-center
                  ${
                    isSelected
                      ? "border-yellow-400 scale-105 shadow-[0_0_30px_rgba(250,204,21,0.4)] bg-slate-900"
                      : canSelect
                        ? "border-slate-800 hover:border-purple-500 bg-slate-900/50"
                        : "border-slate-900 opacity-40 grayscale"
                  }`}
              >
                <div className="overflow-hidden w-full aspect-square flex items-center justify-center bg-slate-900">
                  {char.id === 0 ? (
                    /* Símbolo de Interrogação para o Aleatório */
                    <span className="text-8xl font-black text-purple-600 animate-pulse group-hover:scale-110 transition-transform">
                      ?
                    </span>
                  ) : (
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ imageRendering: "pixelated" }}
                    />
                  )}
                </div>

                <div className="py-4 text-center w-full bg-slate-900/80">
                  <h2 className="text-2xl font-bold uppercase italic tracking-tight">
                    {char.name}
                  </h2>
                  <p className="text-slate-400 text-sm uppercase">
                    {char.class}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-black px-3 py-1 text-xs font-extrabold shadow-lg animate-bounce z-10">
                    P{selectedIds.indexOf(char.id) + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto py-8 z-10 sticky bottom-0 w-full flex justify-center bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
        <button
          onClick={handleConfirmar}
          disabled={selectedIds.length === 0}
          className={`px-16 py-4 text-2xl font-black transition-all uppercase tracking-widest
            ${
              selectedIds.length > 0
                ? "bg-purple-600 hover:bg-purple-500 cursor-pointer shadow-[0_0_20px_rgba(147,51,234,0.6)] text-white"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
            }`}
        >
          {selectedIds.length === 2 ? "Confirmar Dupla" : "Confirmar Início"}
        </button>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle,_transparent_20%,_black_100%)]"></div>
    </div>
  );
};

export default EscolhaPersonagem;
