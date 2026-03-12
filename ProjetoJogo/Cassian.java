package ProjetoJogo;

import java.util.Random;

import javax.swing.JOptionPane;

public class Cassian extends Lutador{

    public Cassian() {
        super("Cassian", 130, 20, 3, Tipo.COMBATENTES, Status.NORMAL);
    }

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null, "Cassian é um paladino devoto do Deus da Luz, ele é conhecido por sua força e coragem em batalha, além de sua habilidade de curar a si mesmo e aos outros. Ele é um defensor da justiça e da ordem, e está sempre disposto a lutar contra as forças do mal para proteger os inocentes. Cassian é respeitado por seus aliados e temido por seus inimigos.");
    }
    }

    @Override
    public String getNomeAtaqueRapido() {
        return "Ataque Consagrado";
    }

    @Override
    public String getNomeAtaqueEspecial() {
        return "Julgamento Divino";
    }

    @Override
    public String getNomeAtaquePassiva() {
        return "Oração de Proteção";
    }

    @Override
    public void habilidadePadrao(Lutador alvo){
        Random r = new Random();
        int prob = (int) Status.calculaProb(alvo.status, this.status, 90);

        if (r.nextInt(100) < prob){

            double mult = Tipo.vantagem(this.tipo, alvo.tipo);

            int danoFinal = (int)(dano * mult);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " acertou ataque rápido");
        }else{
            System.out.println(nome + "errou o ataque");
        }
    }

    @Override
    public void habilidadeEspecial(Lutador alvo){
        if (especiaisRestantes <= 0){
            System.out.println("Sem especiais restantes");
            return;
        }
        
        especiaisRestantes--;

        Random r = new Random();
        int prob = (int) Status.calculaProb(alvo.status, this.status, 60);

        if (r.nextInt(100) < prob){

            double mult = Tipo.vantagem(this.tipo, alvo.tipo);

            int danoFinal = (int)(dano * mult);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " acertou ataque especial");

        }else{
            System.out.println(nome + " errou o ataque");
        }
    }

    @Override
    public void habilidadePassiva(Lutador alvo){

    }

    @Override
    public void mostraDetalhesGolpes(){

    }
    
}
