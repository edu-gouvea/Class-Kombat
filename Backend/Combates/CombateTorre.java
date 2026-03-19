package Backend.Combates;
import Backend.Personagens.Arkanis;
import Backend.Personagens.Artemis;
import Backend.Personagens.Cassian;
import Backend.Personagens.Draven;
import Backend.Personagens.Korvus;
import Backend.Personagens.Lutador;
import Backend.Personagens.Nyxra;
import java.util.ArrayList;
import javax.swing.JOptionPane;

public class CombateTorre extends CombatePVE{

    private ArrayList<Lutador> lutadorestorre = new ArrayList<>();
    
    public void preencherArray(){
            lutadorestorre.add(new Arkanis());
            lutadorestorre.add(new Korvus());
            lutadorestorre.add(new Nyxra());
            lutadorestorre.add(new Cassian());
            lutadorestorre.add(new Artemis());
            lutadorestorre.add(new Draven());
        }
    public void removerArray(Lutador l){
        if(l==new Arkanis()){
            lutadorestorre.remove(0);
        }
        else if(l==new Korvus()){
            lutadorestorre.remove(1);
        }
        else if(l==new Nyxra()){
            lutadorestorre.remove(2);
        }
        else if(l==new Cassian()){
            lutadorestorre.remove(3);
        }
        else if(l==new Artemis()){
            lutadorestorre.remove(4);
        }
        else if(l==new Draven()){
            lutadorestorre.remove(5);
        }
    }

    public void fighttorre(Lutador l1) {
            preencherArray();
            removerArray(l1);
            Lutador l2=lutadorestorre.get(0);
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
            if(estaVivo(l2)==true){
                JOptionPane.showMessageDialog(null, "Infelizmente você foi derrotado pela torre mais sorte na próxima");

                return;
            }
            JOptionPane.showMessageDialog(null, "Você está pronto para prosseguir");
            resetarStats(l1);
            Lutador l3=lutadorestorre.get(1);
            mostrarStatus(l1, l3);
            while(estaVivo(l1)==true && estaVivo(l3)==true){
                
                l1.processarStatus();
                l3.processarStatus();


                if (l3.getVelocidade() > l1.getVelocidade()){
                    botJogaPrimeiro(l3, l1);

                }
                else if (l1.getVelocidade() > l3.getVelocidade()){
                    playerJogaPrimeiro(l1, l3);
                }
                else{
                    if (r.nextInt(2) == 0){
                        botJogaPrimeiro(l3, l1);
                    }else{
                        playerJogaPrimeiro(l1, l3);
                    }
                }
            }
            if(estaVivo(l3)==true){
                JOptionPane.showMessageDialog(null, "Infelizmente você foi derrotado pela torre mais sorte na próxima");
                return;
            }
            JOptionPane.showMessageDialog(null, "Você está pronto para prosseguir");
            resetarStats(l1);
            Lutador l4=lutadorestorre.get(2);
            mostrarStatus(l1, l4);
            while(estaVivo(l1)==true && estaVivo(l4)==true){
                
                l1.processarStatus();
                l4.processarStatus();


                if (l4.getVelocidade() > l1.getVelocidade()){
                    botJogaPrimeiro(l4, l1);

                }
                else if (l1.getVelocidade() > l4.getVelocidade()){
                    playerJogaPrimeiro(l1, l4);
                }
                else{
                    if (r.nextInt(2) == 0){
                        botJogaPrimeiro(l4, l1);
                    }else{
                        playerJogaPrimeiro(l1, l4);
                    }
                }
            }
            if(estaVivo(l4)==true){
                JOptionPane.showMessageDialog(null, "Infelizmente você foi derrotado pela torre mais sorte na próxima");

                return;
            }
            JOptionPane.showMessageDialog(null, "Você está pronto para prosseguir");
            resetarStats(l1);
            Lutador l5=lutadorestorre.get(4);
            mostrarStatus(l1, l5);
            while(estaVivo(l1)==true && estaVivo(l5)==true){
                
                l1.processarStatus();
                l5.processarStatus();


                if (l5.getVelocidade() > l1.getVelocidade()){
                    botJogaPrimeiro(l5, l1);

                }
                else if (l1.getVelocidade() > l5.getVelocidade()){
                    playerJogaPrimeiro(l1, l5);
                }
                else{
                    if (r.nextInt(2) == 0){
                        botJogaPrimeiro(l5, l1);
                    }else{
                        playerJogaPrimeiro(l1, l5);
                    }
                }
            }
            if(estaVivo(l5)==true){
                JOptionPane.showMessageDialog(null, "Infelizmente você foi derrotado pela torre mais sorte na próxima");

                return;
            }
            JOptionPane.showMessageDialog(null, "Você está pronto para prosseguir");
            resetarStats(l1);
            Lutador l6=lutadorestorre.get(5);
            mostrarStatus(l1, l6);
            while(estaVivo(l1)==true && estaVivo(l6)==true){
                
                l1.processarStatus();
                l6.processarStatus();


                if (l6.getVelocidade() > l1.getVelocidade()){
                    botJogaPrimeiro(l6, l1);

                }
                else if (l1.getVelocidade() > l6.getVelocidade()){
                    playerJogaPrimeiro(l1, l6);
                }
                else{
                    if (r.nextInt(2) == 0){
                        botJogaPrimeiro(l6, l1);
                    }else{
                        playerJogaPrimeiro(l1, l6);
                    }
                }
            }
            if(estaVivo(l6)==true){
                JOptionPane.showMessageDialog(null, "Infelizmente você foi derrotado pela torre mais sorte na próxima");
            }
            else{
                JOptionPane.showMessageDialog(null, "Parabéns você venceu A Torre");
            }

    
            
            
    }
    public ArrayList<Lutador> getLutadorestorre() {
        return lutadorestorre;
    }
    public void setLutadorestorre(ArrayList<Lutador> lutadorestorre) {
        this.lutadorestorre = lutadorestorre;
    }


    }

