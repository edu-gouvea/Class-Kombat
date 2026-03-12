package ProjetoJogo;

import javax.swing.JOptionPane;

public class Combate {

    public void fight(Lutador l1, Lutador l2){

        while(l1.getHp() > 0 && l2.getHp() > 0){

            mostrarStatus(l1, l2);

            Acao a1 = escolherAcao(l1);
            Acao a2 = escolherAcao(l2);

            executar(l1, l2, a1);
            if(l2.getHp() > 0 && l2.status != Status.CONGELADO){
                executar(l2, l1, a2);
            }
        
            l1.aplicarStatus();
            l2.aplicarStatus();
        }

        if(l1.getHp() > 0){
            JOptionPane.showMessageDialog(null, l1.getNome() + " venceu!");
        }else{
            JOptionPane.showMessageDialog(null, l2.getNome() + " venceu!");
        }
    }

    private Acao escolherAcao(Lutador l){

        String resposta = JOptionPane.showInputDialog(
            l.getNome() + " escolha ação:\n1) Ataque rápido\n2) Ataque especial\n3) Ataque Passiva");

        if(resposta.equals("1")){
            return Acao.ATAQUE_RAPIDO;
        }
        if (resposta.equals("2")){
            return Acao.ATAQUE_ESPECIAL;
        }

        return Acao.ATAQUE_PASSIVA;

    }

    private void executar(Lutador atacante, Lutador defensor, Acao acao){

        if(acao == Acao.ATAQUE_RAPIDO){
            atacante.habilidadePadrao(defensor);
        }
        else{
            atacante.habilidadeEspecial(defensor);
        }

    }

    private void mostrarStatus(Lutador l1, Lutador l2){

        System.out.println("--------------------");

        System.out.println(l1.getNome() + " HP: " + l1.getHp());
        System.out.println(l2.getNome() + " HP: " + l2.getHp());

        System.out.println("--------------------");

    }

}
