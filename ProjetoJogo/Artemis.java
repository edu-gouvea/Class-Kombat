package ProjetoJogo;

import java.util.Random;

import javax.swing.JOptionPane;

public class Artemis extends Lutador{
    
    public Artemis(){
        super("Artemis", 100, 20, 3, Tipo.LADINOS, Status.NORMAL);
    }

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null, "Artemis é uma caçadora de recompensas ágil e letal, especializada em ataques à distância. Com sua mira precisa e habilidades furtivas, ela é capaz de eliminar alvos rapidamente antes que eles percebam sua presença. Artemis é conhecida por sua astúcia e capacidade de se adaptar a diferentes situações de combate, tornando-a uma adversária formidável para qualquer oponente.");
    }

    @Override
    public String getNomeAtaqueRapido() {
        return "Disparo Preciso";
    }

    @Override
    public String getNomeAtaqueEspecial() {
        return "Rajada de Flechas";
    }

    @Override
    public String getNomeAtaquePassiva() {
        return "Flecha Venenosa";
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
        JOptionPane.showInternalMessageDialog(null, "");
    }

}
