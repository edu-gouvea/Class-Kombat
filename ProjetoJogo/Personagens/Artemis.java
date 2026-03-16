package ProjetoJogo.Personagens;

import java.util.Random;

import javax.swing.JOptionPane;

import ProjetoJogo.ENUM.Status;
import ProjetoJogo.ENUM.Tipo;

public class Artemis extends Lutador{
    
    public Artemis(){
        super("Artemis", 100, 20, 3, 3, Tipo.LADINOS, Status.NORMAL);
    }

    Random r = new Random();

    private int danoPassiva = dano / 2; 

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null, "Artemis é uma caçadora de recompensas ágil e letal, especializada em ataques à distância. Com sua mira precisa e habilidades furtivas, ela é capaz de eliminar alvos rapidamente antes que eles percebam sua presença.\nArtemis é conhecida por sua astúcia e capacidade de se adaptar a diferentes situações de combate, tornando-a uma adversária formidável para qualquer oponente.\n" +
        "HP: " + this.hp + "\nDano: " + this.dano + "\nVelocidade: " + this.velocidade + "\nForte contra: Magos" + "\nFraco contra: Combatentes"   
        );
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
        
        int prob = Status.calculaProb(alvo.getStatus(), this.status, 90);

        if (r.nextInt(100) < prob){

            double mult = Tipo.vantagem(this.tipo, alvo.getTipo());

            int danoFinal = (int)(dano * mult);

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

            double mult = Tipo.vantagem(this.tipo, alvo.getTipo());

            int danoFinal = (int)(calculaDanoEspecial() * mult);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " acertou " + getNomeAtaqueEspecial()+ " e causou " 
                                + danoFinal + " de dano em " + alvo.getNome());
            
        }else{
            System.out.println(nome + " falhou ao tentar " + getNomeAtaqueEspecial());
        }
    }

    @Override
    public void habilidadePassiva(Lutador alvo){

        int prob = Status.calculaProb(alvo.getStatus(), this.status, 80);

        int aleatorio = r.nextInt(100);

        if (aleatorio < prob){
            System.out.println(nome + " acertou " + getNomeAtaquePassiva());

            alvo.receberDano(danoPassiva);
            
            aleatorio = r.nextInt(100);

            if (aleatorio < prob){
                alvo.aplicarStatus(Status.ENVENENAMENTO, 2);
                System.out.println(getNomeAtaquePassiva() + " obteve resultado máximo e fez " + alvo.getNome() +
                                " receber envenenamento");
            }
        }else{
            System.out.println(nome + " falhou ao tentar " + getNomeAtaquePassiva());
        }
    }

    @Override
    public void mostraDetalhesHabilidadePadrao(){
        JOptionPane.showMessageDialog(null, "A arqueira dispara uma flecha veloz e certeira em direção ao inimigo, aproveitando qualquer abertura em sua defesa.\n" +
        "Dano: " + this.dano);
    }

    @Override
    public void mostraDetalhesHabilidadeEspecial(){
        JOptionPane.showMessageDialog(null, "Com incrível habilidade, a arqueira dispara três flechas em rápida sucessão, formando uma rajada mortal que atinge o oponente quase ao mesmo tempo.\n" +
        "Dano: " + calculaDanoEspecial() + "\nEspeciais restantes: " + this.especiaisRestantes);
    }

    @Override
    public void mostraDetalhesHabilidadePassiva(){
        JOptionPane.showMessageDialog(null, "A arqueira dispara uma flecha revestida com um veneno mortal. Mesmo após o impacto, o veneno continua corroendo a vitalidade do inimigo ao longo do tempo.\n" +
        "Dano: "+ (danoPassiva) + "\nEfeito: possível envenenamento no oponente causando dano contínuo");
    }

}
