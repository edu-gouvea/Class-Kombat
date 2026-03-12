import { useState } from "react";
import Telainicial from "./pages/TelaInicial"; // Importa a tela que criamos

function App() {
  // Esse estado vai controlar se estamos na tela inicial ou já entramos no jogo
  const [jogoIniciado, setJogoIniciado] = useState(false);

  return (
    <div className="App">
      {/* Se o jogo NÃO iniciou, mostra a Tela Inicial */}
      {!jogoIniciado ? (
        <Telainicial aoEntrar={() => setJogoIniciado(true)} />
      ) : (
        /* Quando você clicar, essa div abaixo vai aparecer (sua próxima tela) */
        <div className="h-screen w-screen bg-slate-900 flex items-center justify-center text-white">
          <h1 className="text-4xl font-mono">TELA DE SELEÇÃO DE PERSONAGENS</h1>
          <button
            onClick={() => setJogoIniciado(false)}
            className="ml-4 p-2 border border-white hover:bg-white hover:text-black transition"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
