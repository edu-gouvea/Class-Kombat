package ProjetoJogo;

import java.util.Random;
import javax.swing.JOptionPane;

public class Draven extends Lutador{

    public Draven() {
        super("Draven", 100, 25, 3, 2, Tipo.LADINOS, Status.NORMAL);
    }

    Random r = new Random();

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null, "Draven é um vampiro milenar que se destaca por sua força e agilidade sobrenaturais. Ele é um mestre em combate corpo a corpo, utilizando suas garras afiadas para dilacerar seus inimigos.\nDraven é conhecido por sua sede insaciável de sangue e sua habilidade de se transformar em um morcego para se mover rapidamente pelo campo de batalha.\nEle é um adversário temível, capaz de causar danos devastadores e se recuperar rapidamente de ferimentos.\n" +
        "HP: " + this.hp + "\nDano: " + this.dano + "\nVelocidade: " + this.velocidade + "\nForte contra: Magos" + "\nFraco contra: Combatentes"
        );
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
        
        int prob = Status.calculaProb(alvo.getStatus(), this.status, 90);
        
        if (r.nextInt(100) < prob){

            double mult = Tipo.vantagem(this.tipo, alvo.getTipo());

            int danoFinal = (int)(dano * mult);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " acertou " + getNomeAtaqueRapido());

        }else{
            System.out.println(nome + " falhou ao tentar " + getNomeAtaqueRapido());
        }
    }

    @Override
    public void habilidadeEspecial(Lutador alvo){
        
        if (especiaisRestantes <= 0){
            System.out.println(nome + " Sem especiais restantes");
            return;
        }
        
        especiaisRestantes--;

        int prob = Status.calculaProb(alvo.getStatus(), this.status, 60);
        int aleatorio = r.nextInt(100);

        if (aleatorio < prob){

            double mult = Tipo.vantagem(this.tipo, alvo.getTipo());

            int danoFinal = (int)(calculaDanoEspecial() * mult);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " acertou " + getNomeAtaqueEspecial());
            
            prob = Status.calculaProb(alvo.getStatus(), this.status, 40);
            
            if (aleatorio < prob){
                alvo.aplicarStatus(Status.SANGRAMENTO, 2);
                System.out.println(alvo.getNome() + " recebeu efeito de sangramento");
            }

        }else{
            System.out.println(nome + " falhou ao tentar " + getNomeAtaqueEspecial());
        }

    }

    @Override
    public void habilidadePassiva(Lutador alvo){
        this.aplicarStatus(Status.INVISIVEL, 1);
        System.out.println("Draven assumiu sua " + getNomeAtaquePassiva());
    }

    @Override
    public void mostraDetalhesHabilidadePadrao(){
        JOptionPane.showMessageDialog(null, "O vampiro avança com velocidade sobrenatural e desfere um golpe impulsionado por sua força vampírica, atingindo o inimigo antes que ele possa reagir.\n" + 
        "Dano: " + this.dano);
    }

    @Override
    public void mostraDetalhesHabilidadeEspecial(){
        JOptionPane.showMessageDialog(null, "Movendo-se nas sombras, o vampiro desaparece por um instante e reaparece atrás do adversário, cravando suas presas\n" +
        "Dano: " + calculaDanoEspecial() + "\nEfeito: possível sangramento no oponente causando dano a mais" + "\nEspeciais restantes: " + this.especiaisRestantes);
    }

    @Override
    public void mostraDetalhesHabilidadePassiva(){
        JOptionPane.showMessageDialog(null, "O vampiro se dissolve em uma nuvem de morcegos sombrios, tornando-se muito mais difícil de atingir por um curto período.\n" +
        "Dano: 0\nEfeito: torna Draven mais difícil de ser atingido no próximo turno");
    }

}
