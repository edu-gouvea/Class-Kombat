package Backend.Personagens;

import java.util.Random;

import javax.swing.JOptionPane;

import Backend.ENUM.Status;
import Backend.ENUM.Tipo;

public class Korvus extends Lutador{

    public Korvus(){
        super("Korvus", 120, 20, 3, 2, Tipo.MAGOS, Status.NORMAL);
    }

    Random r = new Random();

    private int danoPassiva = this.dano / 2;
    private int hpMax = hp;

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null, "Korvus é um necromante poderoso, especializado em invocar os mortos e manipular a energia sombria. Ele é conhecido por sua sabedoria antiga e habilidades místicas que lhe permitem controlar o destino dos homens.\nKorvus é temido por sua capacidade de trazer mortos à vida e de desencadear temíveis maldições sobre seus inimigos.\n" +
        "HP: " + this.hp + "\nDano: " + this.dano + "\nVelocidade: " + this.velocidade + "\nForte contra: Combatentes" + "\nFraco contra: Ladinos"   
        );
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
       
        int prob = Status.calculaProb(alvo.getStatus(), this.status, 90);

        if (r.nextInt(100) < prob){

           double multTipo = Tipo.vantagem(this.tipo, alvo.getTipo());
            double multStatus = Status.vantagemDeDano(this.status);

            int danoFinal = (int)(dano * multTipo * multStatus);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " invocou " + getNomeAtaqueRapido()+ " e causou " 
                                + danoFinal + " de dano em " + alvo.getNome());
        }else{
            System.out.println(nome + " falhou ao invocar " + getNomeAtaqueRapido());
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
        
        if (r.nextInt(100) < prob){

            double multTipo = Tipo.vantagem(this.tipo, alvo.getTipo());
            double multStatus = Status.vantagemDeDano(this.status);

            int danoFinal = (int)(calculaDanoEspecial() * multTipo * multStatus);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " invocou o " + getNomeAtaqueEspecial()+ " e causou " 
                                + danoFinal + " de dano em " + alvo.getNome());

        }else{
            System.out.println(nome + " falhou ao invocar o " + getNomeAtaqueEspecial());
        }
    }

    @Override
    public void habilidadePassiva(Lutador alvo){
        alvo.receberDano(danoPassiva);
        this.hp += (danoPassiva);
        
        if (hp > hpMax){
            hp = hpMax;
        }

        System.out.println(nome + " conjurou o feitiço " + getNomeAtaquePassiva() + " e drenou " +
                            danoPassiva + " da vitalidade de " + alvo.getNome());
    }

    @Override
    public void mostraDetalhesHabilidadePadrao(){
        JOptionPane.showMessageDialog(null, "O necromante invoca pequenos esqueletos das profundezas da terra. As criaturas avançam rapidamente contra o inimigo e o atacam antes de se desfazerem em pó.\n" + 
        "Dano: " + this.dano);
    }

    @Override
    public void mostraDetalhesHabilidadeEspecial(){
        JOptionPane.showMessageDialog(null, "O necromante rasga o véu entre o mundo dos vivos e dos mortos, invocando um colosso cadavérico que emerge do chão e esmaga o oponente com força brutal.\n" +
        "Dano: " + calculaDanoEspecial() + "\nEspeciais restantes: " + this.especiaisRestantes);
    }

    @Override
    public void mostraDetalhesHabilidadePassiva(){
        JOptionPane.showMessageDialog(null, "Uma energia sombria envolve o inimigo enquanto o necromante arranca parte de sua essência vital, absorvendo-a para restaurar a própria vida.\n" +
        "Dano: " + (danoPassiva) + "\nEfeito: Korvus rouba a vida do oponente para recuperar sua vitalidade");
    }
    
}
