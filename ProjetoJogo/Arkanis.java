package ProjetoJogo;

import java.util.Random;

import javax.swing.JOptionPane;

public class Arkanis extends Lutador{

    public Arkanis(){
        super("Arkanis", 100, 20, 3,Tipo.MAGOS, Status.NORMAL);
    }

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null, "Arkanis é a rainha dos magos, devido ao seu grande talento para a magia ela foi capaz de dominar os quatro elementos e se tornar a mais poderosa maga do reino, ela é conhecida por sua inteligência e astúcia, além de ser uma líder nata, ela é respeitada por todos os magos do reino e tem um grande poder de influência sobre eles.");
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
