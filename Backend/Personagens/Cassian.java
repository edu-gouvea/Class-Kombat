package Backend.Personagens;

import java.util.Random;

import javax.swing.JOptionPane;

import Backend.ENUM.Status;
import Backend.ENUM.Tipo;

public class Cassian extends Lutador{

    public Cassian() {
        super("Cassian", 130, 20, 3, 1, Tipo.COMBATENTES, Status.NORMAL);
    }

    Random r = new Random();

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null, "Cassian é um paladino devoto do Deus da Luz, ele é conhecido por sua força e coragem em batalha, além de sua habilidade de curar a si mesmo e aos outros.\nEle é um defensor da justiça e da ordem, e está sempre disposto a lutar contra as forças do mal para proteger os inocentes. Cassian é respeitado por seus aliados e temido por seus inimigos.\n" +
        "HP: " + this.hp + "\nDano: " + this.dano + "\nVelocidade: " + this.velocidade + "\nForte contra: Ladinos" + "\nFraco contra: Magos"  
        );
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

    private double cassianDanoAumentado(){
        if (this.status == Status.DANO_AUMENTADO){
            return 1.2;
        }
        return 1.0;
    }

    @Override
    public void habilidadePadrao(Lutador alvo){

        int prob = Status.calculaProb(alvo.getStatus(), this.status, 90);

        if (r.nextInt(100) < prob){

            double multTipo = Tipo.vantagem(this.tipo, alvo.getTipo());
            double multStatus = Status.vantagemDeDano(this.status);

            int danoFinal = (int)(cassianDanoAumentado() * dano * multTipo * multStatus);

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

        int prob = Status.calculaProb(alvo.getStatus(), this.status, 60);
        
        if (r.nextInt(100) < prob){

            double multTipo = Tipo.vantagem(this.tipo, alvo.getTipo());
            double multStatus = Status.vantagemDeDano(this.status);

            int danoFinal = (int)(cassianDanoAumentado() * calculaDanoEspecial() * multTipo * multStatus);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " acertou " + getNomeAtaqueEspecial()+ " e causou " 
                                + danoFinal + " de dano em " + alvo.getNome());

        }else{
            System.out.println(nome + " falhou ao tentar " + getNomeAtaqueEspecial());
        }
    }

    @Override
    public void habilidadePassiva(Lutador alvo){

        this.aplicarStatus(Status.DANO_AUMENTADO, 2);
        System.out.println(nome + " realizou " + getNomeAtaquePassiva() +
                            " e receberá aumento de dano no próximo turno");
        
        int prob = Status.calculaProb(alvo.getStatus(), this.status, 65);

        if (r.nextInt(100) < prob){
            alvo.aplicarStatus(Status.DANO_REDUZIDO, 2);
            System.out.println(getNomeAtaquePassiva() + " obteve resultado máximo e fará " + alvo.getNome() +
                            " receber redução de dano no próximo turno");
        }
        
    }

    @Override
    public void mostraDetalhesHabilidadePadrao(){
        JOptionPane.showMessageDialog(null, "Com disciplina e precisão, o paladino desfere um golpe firme com sua espada sagrada, canalizando uma pequena parcela de sua fé no ataque.\n" + 
        "Dano: " + this.dano);
    }

    @Override
    public void mostraDetalhesHabilidadeEspecial(){
        JOptionPane.showMessageDialog(null, "O paladino invoca a luz de sua divindade. Sua espada brilha com uma aura dourada antes de desferir um golpe poderoso que cai sobre o inimigo como um julgamento celestial.\n" +
        "Dano: " + calculaDanoEspecial() + "\nEspeciais restantes: " + this.especiaisRestantes);
    }

    @Override
    public void mostraDetalhesHabilidadePassiva(){
        JOptionPane.showMessageDialog(null, "O paladino ergue sua espada e faz uma breve oração. A luz divina envolve seu corpo, fortalecendo sua armadura e guiando seus próximos ataques.\n" +
        "Dano: 0\nEfeito: possível aumento de dano para Cassian e redução de dano para o oponente no próximo turno");
    }
    
}
