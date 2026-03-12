package ProjetoJogo;

import java.util.Random;
import javax.swing.JOptionPane;

public class Draven extends Lutador{

    public Draven() {
        super("Draven", 100, 25, 3, Tipo.LADINOS, Status.NORMAL);
    }

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null, "Draven é um vampiro milenar que se destaca por sua força e agilidade sobrenaturais. Ele é um mestre em combate corpo a corpo, utilizando suas garras afiadas para dilacerar seus inimigos. Draven é conhecido por sua sede insaciável de sangue e sua habilidade de se transformar em um morcego para se mover rapidamente pelo campo de batalha. Ele é um adversário temível, capaz de causar danos devastadores e se recuperar rapidamente de ferimentos.");
    }

    @Override
    public String getNomeAtaqueRapido() {
        return "Punho Vampírico";
    }

    @Override
    public String getNomeAtaqueEspecial() {
        return "Mordida Sombria";
    }

    @Override
    public String getNomeAtaquePassiva() {
        return "Forma de Morcego";
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
