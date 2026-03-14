package ProjetoJogo;

import java.util.Random;

import javax.swing.JOptionPane;

public class Arkanis extends Lutador{

    public Arkanis(){
        super("Arkanis", 100, 20, 3,2, Tipo.MAGOS, Status.NORMAL);
    }

    Random r = new Random();

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null, "Arkanis é a rainha dos magos, devido ao seu grande talento para a magia ela foi capaz de dominar os quatro elementos e se tornar a mais poderosa maga do reino.\nEla é conhecida por sua inteligência e astúcia, além de ser uma líder nata, ela é respeitada por todos os magos do reino e tem um grande poder de influência sobre eles.\n" +
        "HP: " + this.hp + "\nDano: " + this.dano + "\nVelocidade: " + this.velocidade + "\nForte contra: Combatentes" + "\nFraco contra: Ladinos"    
        );
    }

    @Override
    public String getNomeAtaqueRapido() {
        return "Faísca Arcana";
    }

    @Override
    public String getNomeAtaqueEspecial() {
        return "Explosão Ígnea";
    }

    @Override
    public String getNomeAtaquePassiva() {
        return "Prisão de Gelo";
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
            System.out.println(nome + " falhou ao conjurar a " + getNomeAtaqueRapido());
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
        
        if (r.nextInt(100) < prob){

            double mult = Tipo.vantagem(this.tipo, alvo.getTipo());

            int danoFinal = (int)(calculaDanoEspecial() * mult);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " acertou " + getNomeAtaqueEspecial());

        }else{
            System.out.println(nome + " falhou ao conjurar a " + getNomeAtaqueEspecial());
        }
    }

    @Override
    public void habilidadePassiva(Lutador alvo){
        
        int prob = Status.calculaProb(alvo.getStatus(), this.status, 50);

        if (r.nextInt(100) < prob){

            alvo.aplicarStatus(Status.CONGELADO, 1);
            
            System.out.println(nome + " acertou " + getNomeAtaquePassiva());

        }else{
            System.out.println(nome + " falhou ao conjurar a " + getNomeAtaquePassiva());
        }
    }

    @Override
    public void mostraDetalhesHabilidadePadrao(){
        JOptionPane.showMessageDialog(null, "A maga concentra energia arcana na ponta de sua mão e libera uma pequena descarga elétrica que atinge rapidamente o inimigo.\n" + 
        "Dano: " + this.dano);
    }

    @Override
    public void mostraDetalhesHabilidadeEspecial(){
        JOptionPane.showMessageDialog(null, "Canalizando poder elemental, a maga conjura uma esfera de fogo intensamente quente que é lançada contra o oponente e explode em chamas.\n" +
        "Dano: " + calculaDanoEspecial() + "\nEspeciais restantes: " + this.especiaisRestantes);
    }

    @Override
    public void mostraDetalhesHabilidadePassiva(){
        JOptionPane.showMessageDialog(null, "A maga invoca o frio do inverno eterno, congelando o inimigo em uma camada de gelo que reduz seus movimentos.\n" +
        "Dano: 0\nEfeito: possível congelamento no oponente por 1 turno");
    }

    
}
