import { useState } from "react";
import Telainicial from "./pages/TelaInicial";
import EscolhaPersonagem from "./pages/EscolhaPersonagem";

function App() {
  // Estado para controlar a navegação entre as telas
  const [jogoIniciado, setJogoIniciado] = useState(false);

  // Estado opcional para armazenar o personagem que o jogador escolher
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);

  // Função chamada quando o jogador clica em "Confirmar" na seleção
  const aoConfirmarPersonagem = (personagem) => {
    setPersonagemSelecionado(personagem);
    console.log("Iniciando aventura com:", personagem.name);
    // Aqui você pode mudar para a tela de jogo/combate futuramente
  };

  return (
    <div className="App">
      {!jogoIniciado ? (
        /* Tela de Entrada */
        <Telainicial aoEntrar={() => setJogoIniciado(true)} />
      ) : (
        /* Tela de Seleção de Personagens */
        <EscolhaPersonagem
          onVoltar={() => setJogoIniciado(false)}
          onConfirmar={aoConfirmarPersonagem}
        />
      )}
    </div>
  );
}

export default App;
