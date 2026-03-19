package Backend.Combates;

import Backend.Personagens.Lutador;
import java.util.Random;

public class CombatePVP extends Combate{

    Random r = new Random();

    @Override
    public void fight(Lutador l1, Lutador l2){
        boolean res = true;
        while(res){
            mostrarStatus(l1, l2);
            while(estaVivo(l1)==true && estaVivo(l2)==true){
            
            l1.processarStatus();
            l2.processarStatus();
            

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
        res=revanche();
        if (res==true){
            resetarStats(l1);
            resetarStats(l2);
        }
    }
    }


}
