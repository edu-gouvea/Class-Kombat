package ProjetoJogo.Combates;

import java.util.Random;

import javax.swing.JOptionPane;

import ProjetoJogo.ENUM.Acao;
import ProjetoJogo.ENUM.Status;
import ProjetoJogo.Personagens.Lutador;

public class CombatePVP implements Combate{

    Random r = new Random();

    @Override
    public void fight(Lutador l1, Lutador l2){

        while(l1.getHp() > 0 && l2.getHp() > 0){
            
            l1.processarStatus();
            l2.processarStatus();
            
            mostrarStatus(l1, l2);

            if (l2.getVelocidade() > l1.getVelocidade()){
                playerJogaPrimeiro(l2, l1);
            }
            else if (l1.getVelocidade() > l2.getVelocidade()){
                playerJogaPrimeiro(l1, l2);
            }
            else{
                if (r.nextInt(2) == 0){
                    playerJogaPrimeiro(l1, l2);
                }else{
                    playerJogaPrimeiro(l2, l1);
                }
            }

            
        }

        mostrarStatus(l1, l2);

        if(l1.getHp() > 0){
            JOptionPane.showMessageDialog(null, l1.getNome() + " venceu!");
        }else{
            JOptionPane.showMessageDialog(null, l2.getNome() + " venceu!");
        }
    }

    @Override
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

    @Override
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

    private boolean confirma(){
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

    @Override
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

    @Override
    public void mostrarStatus(Lutador l1, Lutador l2){

        System.out.println("--------------------");

        System.out.println(l1.getNome() + " HP: " + l1.getHp());
        System.out.println(l2.getNome() + " HP: " + l2.getHp());

        System.out.println("--------------------");

    }

}
