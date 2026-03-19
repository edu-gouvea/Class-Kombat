package Backend.Personagens;

import Backend.ENUM.Status;
import Backend.ENUM.Tipo;
import java.util.Random;
import javax.swing.JOptionPane;

public class Nyxra extends Lutador{

    public Nyxra() {
        super("Nyxra", 110,110, 12, 3, 2, Tipo.COMBATENTES, Status.NORMAL);
    }

    Random r = new Random();

    @Override
    public void mostraInformacoes(){
        JOptionPane.showMessageDialog(null,"""
                                           Nyxra era uma pessoa qualquer até ser possuída por um espírito maligno, o que a transformou em uma criatura sombria e poderosa. Ela é conhecida por sua força bruta e habilidades de combate implacáveis, além de sua capacidade de se regenerar rapidamente de ferimentos.
                                           Nyxra é temida por seus inimigos e respeitada por seus aliados, pois é uma guerreira feroz que luta com tudo o que tem para proteger aqueles que ama.
                                           HP: """ + this.hp + "\nDano: " + this.dano + "\nVelocidade: " + this.velocidade + "\nForte contra: Ladinos" + "\nFraco contra: Magos"    
        );
    }

    @Override
    public String getNomeAtaqueRapido() {
        return "Garras da Noite";
    }

    @Override
    public String getNomeAtaqueEspecial() {
        return "Presas do Abismo";
    }

    @Override
    public String getNomeAtaquePassiva() {
        return "Uivo do Terror";
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
            System.out.println(nome + " errou ao tentar " + getNomeAtaqueRapido());
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

            int danoFinal = (int)(calculaDanoEspecial() * multTipo * multStatus);

            alvo.receberDano(danoFinal);

            System.out.println(nome + " acertou " + getNomeAtaqueEspecial()+ " e causou " 
                                + danoFinal + " de dano em " + alvo.getNome());

        }else{
            System.out.println(nome + " falhou ao tentar " + getNomeAtaqueEspecial());
        }
    }

    @Override
    public void habilidadePassiva(Lutador alvo){
        this.aplicarStatus(Status.FOCO, 2);
        System.out.println(nome + " fez o " + getNomeAtaquePassiva() + 
                            " e terá mais chance de acertar o próximo golpe");
    }

    @Override
    public void mostraDetalhesHabilidadePadrao(){
        JOptionPane.showMessageDialog(null, """
                                            A lobisomem rasga o ar com suas garras envoltas em energia sombria. A magia da maldição se projeta junto ao golpe, criando cortes de sombra que atingem o inimigo rapidamente.
                                            Dano: """ + this.dano);
    }

    @Override
    public void mostraDetalhesHabilidadeEspecial(){
        JOptionPane.showMessageDialog(null, """
                                            A maldição da lua desperta sua forma mais feroz. Sombras se acumulam ao redor de sua boca e se transformam em presas espectrais que avançam contra o inimigo com violência sobrenatural.
                                            Dano: """ + calculaDanoEspecial() + "\nEspeciais restantes: " + this.especiaisRestantes);
    }

    @Override
    public void mostraDetalhesHabilidadePassiva(){
        JOptionPane.showMessageDialog(null, """
                                            A lobisomem solta um uivo carregado de magia sombria. O som ecoa como um presságio de morte, fazendo o adversário tremer de medo e perder parte de sua capacidade de defesa.
                                            Dano: 0
                                            Efeito: Nyxra tem mais chance de acertar o próximo golpe""");
    }
    
}
