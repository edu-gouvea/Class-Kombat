package Backend.Combates;

import java.util.Random;

import javax.swing.JOptionPane;

import Backend.ENUM.Acao;
import Backend.ENUM.Status;
import Backend.Personagens.Lutador;

public class CombatePVE extends Combate{

    Random r = new Random();

    @Override
    public void fight(Lutador l1, Lutador l2) {
    
        while(l1.getHp() > 0 && l2.getHp() > 0){
            
            l1.processarStatus();
            l2.processarStatus();

            mostrarStatus(l1, l2);

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

        mostrarStatus(l1, l2);

        if(l1.getHp() > 0){
            JOptionPane.showMessageDialog(null, l1.getNome() + " venceu!");
        }else{
            JOptionPane.showMessageDialog(null, l2.getNome() + " venceu!");
        }
    }

    private void botJogaPrimeiro(Lutador bot, Lutador l){
        Acao abot = botEscolherAcao();
        if(!Status.isCongelado(bot.getStatus())){
            executar(bot, l, abot);
        }
        Acao a = escolherAcao(l);
        if(l.getHp() > 0 && !Status.isCongelado(l.getStatus())){
            executar(l, bot, a);
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
