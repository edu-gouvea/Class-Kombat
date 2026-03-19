package Backend.Combates;

import Backend.ENUM.Acao;
import Backend.ENUM.Status;
import Backend.Personagens.Lutador;
import javax.swing.JOptionPane;

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
    public boolean revanche(){

        String resposta = JOptionPane.showInputDialog("Deseja uma Revanche?\n1) Sim\n2) Não");

        switch (resposta) {
            case "1" -> {
                return true;
            }
            case "2" -> {
                return false;
            }
            default -> {
                JOptionPane.showMessageDialog(null, "Opção inválida");
                return false;
            }
        }

    }
    
    public boolean confirma(){

        String resposta = JOptionPane.showInputDialog("Confirmar selecão?\n1) Sim\n2) Não");

        switch (resposta) {
            case "1" -> {
                return true;
            }
            case "2" -> {
                return false;
            }
            default -> {
                JOptionPane.showMessageDialog(null, "Opção inválida");
                return false;
            }
        }

    }

    public void executar(Lutador atacante, Lutador defensor, Acao acao){

        if(null == acao){
            atacante.habilidadePassiva(defensor);
        }
        else switch (acao) {
            case ATAQUE_RAPIDO -> atacante.habilidadePadrao(defensor);
            case ATAQUE_ESPECIAL -> atacante.habilidadeEspecial(defensor);
            default -> atacante.habilidadePassiva(defensor);
        }

    }

    public void mostrarStatus(Lutador l1, Lutador l2){
        
        System.out.println("--------------------");

        System.out.println(l1.getNome() + " HP: " + l1.getHpatual());
        System.out.println(l2.getNome() + " HP: " + l2.getHpatual());

        System.out.println("--------------------");

    }

    public boolean estaVivo(Lutador l1){
        return l1.getHpatual() > 0;
    }

    public void playerJogaPrimeiro(Lutador l1, Lutador l2){

        Acao a1 = escolherAcao(l1);
        if (!Status.isCongelado(l1.getStatus())){
            executar(l1, l2, a1);
            mostrarStatus(l1, l2);
            if(estaVivo(l2)==false){
                JOptionPane.showMessageDialog(null, l1.getNome() + " venceu!");
                return;
            }
        }
        Acao a2 = escolherAcao(l2);
        if(l2.getHp() > 0 && !Status.isCongelado(l2.getStatus())){
            executar(l2, l1, a2);
            mostrarStatus(l1, l2);
            if(estaVivo(l1)==false){
            JOptionPane.showMessageDialog(null, l2.getNome() + " venceu!");
            }
        
        }
    }

    public void resetarStats(Lutador l1){
        if(l1.getHpatual()==0){
            l1.setHpatual(l1.getHp());
        }
        else{
            l1.setHpatual((l1.getHp()-l1.getHpatual())+l1.getHpatual());
        }

        l1.setEspeciaisRestantes(3);
        l1.setStatus(Status.NORMAL);
    }

}
