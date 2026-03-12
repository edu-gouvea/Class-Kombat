package ProjetoJogo;

import java.util.Random;

import javax.swing.JOptionPane;

public class Korvus extends Lutador{

    public Korvus(){
        super("Korvus", 120, 20, 3, Tipo.MAGOS, Status.NORMAL);
    }

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null, "Korvus é um necromante poderoso, especializado em invocar os mortos e manipular a energia sombria. Ele é conhecido por sua sabedoria antiga e habilidades místicas que lhe permitem controlar o destino dos homens. Korvus é temido por sua capacidade de trazer mortos à vida e de desencadear temíveis maldições sobre seus inimigos.");
    }

    @Override
    public String getNomeAtaqueRapido() {
        return "Servos da Tumba";
    }

    @Override
    public String getNomeAtaqueEspecial() {
        return "Colosso da Cripta";
    }

    @Override
    public String getNomeAtaquePassiva() {
        return "Drenar Alma";
    }

    @Override
    public void habilidadePadrao(Lutador alvo){
        Random r = new Random();
        int prob = (int) Status.calculaProb(alvo.status, this.status, 90);

        if (r.nextInt(100) < prob){

            double mult = Tipo.vantagem(this.tipo, alvo.tipo);

            int danoFinal = (int)(dano * mult);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " acertou servos da tumba");
        }else{
            System.out.println(nome + "falhou ao invocar os servos da tumba");
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

            System.out.println(nome + " acertou o Colosso da Cripta");

        }else{
            System.out.println(nome + " Falhou ao invocar o Colosso da Cripta");
        }
    }

    @Override
    public void habilidadePassiva(Lutador alvo){

    }

    @Override
    public void mostraDetalhesGolpes(){

    }
    
}
