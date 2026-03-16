package Backend.Combates;

import java.util.Random;
import javax.swing.JOptionPane;

import Backend.Personagens.Lutador;

public class CombatePVP extends Combate{

    Random r = new Random();

    @Override
    public void fight(Lutador l1, Lutador l2){

        while(l1.getHp() > 0 && l2.getHp() > 0){
            
            l1.processarStatus();
            l2.processarStatus();
            
            mostrarStatus(l1, l2);

            if (l2.getVelocidade() > l1.getVelocidade()){
                playerJogaPrimeiro(l2, l1);
            }
            else if (l1.getVelocidade() > l2.getVelocidade()){
                playerJogaPrimeiro(l1, l2);
            }
            else{
                if (r.nextInt(2) == 0){
                    playerJogaPrimeiro(l1, l2);
                }else{
                    playerJogaPrimeiro(l2, l1);
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


}
