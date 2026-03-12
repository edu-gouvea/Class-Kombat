package ProjetoJogo;

import java.util.Random;

import javax.swing.JOptionPane;

public class Nyxra extends Lutador{

    public Nyxra() {
        super("Nyxra", 120, 25, 3, Tipo.COMBATENTES, Status.NORMAL);
    }

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null,"Nyxra era uma pessoa qualquer até ser possuída por um espírito maligno, o que a transformou em uma criatura sombria e poderosa. Ela é conhecida por sua força bruta e habilidades de combate implacáveis, além de sua capacidade de se regenerar rapidamente de ferimentos. Nyxra é temida por seus inimigos e respeitada por seus aliados, pois é uma guerreira feroz que luta com tudo o que tem para proteger aqueles que ama.");
    }

    @Override
    public String getNomeAtaqueRapido() {
        return "Garras da Noite";
    }

    @Override
    public String getNomeAtaqueEspecial() {
        return "Presas do Abismo";
    }

    @Override
    public String getNomeAtaquePassiva() {
        return "Uivo do Terror";
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
            System.out.println(nome + "errou o ataque");
        }
    }

    @Override
    public void habilidadePassiva(Lutador alvo){

    }

    @Override
    public void mostraDetalhesGolpes(){

    }
    
}
