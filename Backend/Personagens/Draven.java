package Backend.Personagens;

import Backend.ENUM.Status;
import Backend.ENUM.Tipo;
import java.util.Random;
import javax.swing.JOptionPane;

public class Draven extends Lutador{

    public Draven() {
        super("Draven", 92, 92,11, 3, 2, Tipo.LADINOS, Status.NORMAL);
    }

    Random r = new Random();

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null, """
                                            Draven é um vampiro milenar que se destaca por sua força e agilidade sobrenaturais. Ele é um mestre em combate corpo a corpo, utilizando suas garras afiadas para dilacerar seus inimigos.
                                            Draven é conhecido por sua sede insaciável de sangue e sua habilidade de se transformar em um morcego para se mover rapidamente pelo campo de batalha.
                                            Ele é um adversário temível, capaz de causar danos devastadores e se recuperar rapidamente de ferimentos.
                                            HP: """ + this.hp + "\nDano: " + this.dano + "\nVelocidade: " + this.velocidade + "\nForte contra: Magos" + "\nFraco contra: Combatentes"
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

            double multTipo = Tipo.vantagem(this.tipo, alvo.getTipo());
            double multStatus = Status.vantagemDeDano(this.status);

            int danoFinal = (int)(dano * multTipo * multStatus);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " acertou " + getNomeAtaqueRapido()+ " e causou " 
                                + danoFinal + " de dano em " + alvo.getNome());

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

        int prob = Status.calculaProb(alvo.getStatus(), this.status, 65);
        int aleatorio = r.nextInt(100);

        if (aleatorio < prob){

            double multTipo = Tipo.vantagem(this.tipo, alvo.getTipo());
            double multStatus = Status.vantagemDeDano(this.status);

            int danoFinal = (int)(calculaDanoEspecial() * multTipo * multStatus);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " acertou " + getNomeAtaqueEspecial()+ " e causou " 
                                + danoFinal + " de dano em " + alvo.getNome());
            
            prob = Status.calculaProb(alvo.getStatus(), this.status, 50);
            
            if (aleatorio < prob){
                alvo.aplicarStatus(Status.SANGRAMENTO, 3);
                System.out.println(getNomeAtaqueEspecial() + " obteve resultado máximo e fez " + alvo.getNome() + 
                                    " receber efeito de sangramento");
            }

        }else{
            System.out.println(nome + " falhou ao tentar " + getNomeAtaqueEspecial());
        }

    }

    @Override
    public void habilidadePassiva(Lutador alvo){
        this.aplicarStatus(Status.INVISIVEL, 2);
        System.out.println("Draven assumiu sua " + getNomeAtaquePassiva());
    }

    @Override
    public void mostraDetalhesHabilidadePadrao(){
        JOptionPane.showMessageDialog(null, """
                                            O vampiro avança com velocidade sobrenatural e desfere um golpe impulsionado por sua força vampírica, atingindo o inimigo antes que ele possa reagir.
                                            Dano: """ + this.dano);
    }

    @Override
    public void mostraDetalhesHabilidadeEspecial(){
        JOptionPane.showMessageDialog(null, """
                                            Movendo-se nas sombras, o vampiro desaparece por um instante e reaparece atrás do adversário, cravando suas presas
                                            Dano: """ + calculaDanoEspecial() + "\nEfeito: possível sangramento no oponente causando dano a mais" + "\nEspeciais restantes: " + this.especiaisRestantes);
    }

    @Override
    public void mostraDetalhesHabilidadePassiva(){
        JOptionPane.showMessageDialog(null, """
                                            O vampiro se dissolve em uma nuvem de morcegos sombrios, tornando-se muito mais difícil de atingir por um curto período.
                                            Dano: 0
                                            Efeito: torna Draven mais difícil de ser atingido no pr\u00f3ximo turno""");
    }

}
