package Backend.Combates;

import javax.swing.JOptionPane;

import Backend.ENUM.Acao;
import Backend.ENUM.Status;
import Backend.Personagens.Lutador;

public abstract class Combate{

    public abstract void fight(Lutador l1, Lutador l2);

    public Acao escolherAcao(Lutador l){

        while (true){
            String resposta = JOptionPane.showInputDialog(
            l.getNome() + " escolha ação:\n1) " + l.getNomeAtaqueRapido() + "\n2) " + l.getNomeAtaqueEspecial() + "\n3) " + l.getNomeAtaquePassiva());

            if(resposta.equals("1")){
                l.mostraDetalhesHabilidadePadrao();
                if (!confirma()) continue;
                return Acao.ATAQUE_RAPIDO;
            }
            if (resposta.equals("2")){
                l.mostraDetalhesHabilidadeEspecial();
                if (!confirma()) continue;
                return Acao.ATAQUE_ESPECIAL;
            }

            l.mostraDetalhesHabilidadePassiva();
            if (!confirma()) continue;
            return Acao.ATAQUE_PASSIVA;
        }

    }
    
    public boolean confirma(){

        String resposta = JOptionPane.showInputDialog("Confirmar selecão?\n1) Sim\n2) Não");

        if (resposta.equals("1")){
            return true;
        }else if (resposta.equals("2")){
            return false;
        }else{
            JOptionPane.showMessageDialog(null, "Opção inválida");
            return false;
        }

    }

    public void executar(Lutador atacante, Lutador defensor, Acao acao){

        if(acao == Acao.ATAQUE_RAPIDO){
            atacante.habilidadePadrao(defensor);
        }
        else if (acao == Acao.ATAQUE_ESPECIAL){
            atacante.habilidadeEspecial(defensor);
        }else{
            atacante.habilidadePassiva(defensor);
        }

    }

    public void mostrarStatus(Lutador l1, Lutador l2){
        
        System.out.println("--------------------");

        System.out.println(l1.getNome() + " HP: " + l1.getHp());
        System.out.println(l2.getNome() + " HP: " + l2.getHp());

        System.out.println("--------------------");

    }

    public void playerJogaPrimeiro(Lutador l1, Lutador l2){

        Acao a1 = escolherAcao(l1);
        if (!Status.isCongelado(l1.getStatus())){
            executar(l1, l2, a1);
        }
        Acao a2 = escolherAcao(l2);
        if(l2.getHp() > 0 && !Status.isCongelado(l2.getStatus())){
            executar(l2, l1, a2);
        }

    }

}
