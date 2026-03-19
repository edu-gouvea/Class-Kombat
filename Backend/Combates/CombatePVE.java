package Backend.Combates;

import Backend.ENUM.Acao;
import Backend.ENUM.Status;
import Backend.Personagens.Lutador;
import java.util.Random;
import javax.swing.JOptionPane;

public class CombatePVE extends Combate{

    Random r = new Random();

    @Override
    public void fight(Lutador l1, Lutador l2) {
        boolean res = true;
        while(res){
            mostrarStatus(l1, l2);
            while(estaVivo(l1)==true && estaVivo(l2)==true){
                
                l1.processarStatus();
                l2.processarStatus();


                if (l2.getVelocidade() > l1.getVelocidade()){
                    botJogaPrimeiro(l2, l1);

                }
                else if (l1.getVelocidade() > l2.getVelocidade()){
                    playerJogaPrimeiro(l1, l2);
                }
                else{
                    if (r.nextInt(2) == 0){
                        botJogaPrimeiro(l2, l1);
                    }else{
                        playerJogaPrimeiro(l1, l2);
                    }
                }
            }
            res=revanche();
            if (res==true){
                resetarStats(l1);
                resetarStats(l2);
            }
        }
    }


    @Override
    public void playerJogaPrimeiro(Lutador l1, Lutador l2){

        Acao a1 = escolherAcao(l1);
        if (!Status.isCongelado(l1.getStatus())){
            executar(l1, l2, a1);
            mostrarStatus(l1, l2);
            if(estaVivo(l2)==false){
                JOptionPane.showMessageDialog(null, l1.getNome() + " venceu!");
                return;
            }
        }
        Acao a2 = botEscolherAcao();
        if(l2.getHp() > 0 && !Status.isCongelado(l2.getStatus())){
            executar(l2, l1, a2);
            mostrarStatus(l1, l2);
            if(estaVivo(l1)==false){
                JOptionPane.showMessageDialog(null, l2.getNome() + " venceu!");
            }
    }
    }


    protected void botJogaPrimeiro(Lutador bot, Lutador l){
        Acao abot = botEscolherAcao();
        if(!Status.isCongelado(bot.getStatus())){
            executar(bot, l, abot);
            mostrarStatus(bot, l);
            if(estaVivo(l)==false){
                JOptionPane.showMessageDialog(null, bot.getNome() + " venceu!");
                return;
            }
        }
        Acao a = escolherAcao(l);
        if(l.getHp() > 0 && !Status.isCongelado(l.getStatus())){
            executar(l, bot, a);
            mostrarStatus(bot, l);
            if(estaVivo(bot)==false){
                JOptionPane.showMessageDialog(null, l.getNome() + " venceu!");
            }
        
        }
    }

    private Acao botEscolherAcao(){

        int bot = r.nextInt(1, 4);

        if (bot == 1){
            return Acao.ATAQUE_RAPIDO;
        }else if (bot == 2){
            return Acao.ATAQUE_ESPECIAL;
        }

        return Acao.ATAQUE_PASSIVA;
    }

}

