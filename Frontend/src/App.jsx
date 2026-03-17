import React, { useState } from "react";
import TelaInicial from "./pages/TelaInicial";
import EscolhaModo from "./pages/EscolhaModo";
import EscolhaPersonagem from "./pages/EscolhaPersonagem";

function App() {
  const [tela, setTela] = useState("inicial");
  const [configJogo, setConfigJogo] = useState({
    modo: null,
    herois: [],
  });

  const irParaEscolhaModo = () => setTela("modo");

  const escolherModo = (modoSelecionado) => {
    setConfigJogo((prev) => ({ ...prev, modo: modoSelecionado }));
    setTela("personagem");
  };

  const confirmarSelecao = (heroisSelecionados) => {
    setConfigJogo((prev) => ({ ...prev, herois: heroisSelecionados }));
    setTela("jogo");
  };

  const voltar = () => {
    if (tela === "modo") setTela("inicial");
    if (tela === "personagem") setTela("modo");
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* ALTERADO DE onIniciar PARA aoEntrar */}
      {tela === "inicial" && <TelaInicial aoEntrar={irParaEscolhaModo} />}

      {tela === "modo" && (
        <EscolhaModo onSelecionarModo={escolherModo} onVoltar={voltar} />
      )}

      {tela === "personagem" && (
        <EscolhaPersonagem onConfirmar={confirmarSelecao} onVoltar={voltar} />
      )}

      {tela === "jogo" && (
        <div className="flex flex-col items-center justify-center h-screen text-white font-mono">
          <h1 className="text-4xl mb-4 uppercase italic font-black text-purple-500">
            {configJogo.modo} Iniciado!
          </h1>
          <div className="flex gap-4">
            {configJogo.herois.map((h) => (
              <div key={h.id} className="border-2 border-white p-4">
                <p>{h.name}</p>
                <p className="text-xs text-slate-400">{h.class}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setTela("inicial")}
            className="mt-10 text-red-500 font-bold hover:underline"
          >
            SAIR
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
