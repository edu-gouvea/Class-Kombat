package Backend.ClassKombat;

import Backend.Combates.CombatePVE;
import Backend.Combates.CombatePVP;
import Backend.Combates.CombateTorre;
import Backend.Personagens.Arkanis;
import Backend.Personagens.Artemis;
import Backend.Personagens.Cassian;
import Backend.Personagens.Draven;
import Backend.Personagens.Korvus;
import Backend.Personagens.Lutador;
import Backend.Personagens.Nyxra;
import java.util.Random;
import javax.swing.JOptionPane;

public class ClassKombat {

    private final Lutador lutadores[] = new Lutador[2];

    public void play(){
        menu();
        String escolha = escolheModo();
        select(escolha);
        rodaModo(escolha);
    }

    private void menu(){
        String resposta = JOptionPane.showInputDialog("Bem vindo ao Class Kombat! Deseja continuar ou parar por aqui?\n1) Continuar\n2) Parar");
        if (resposta.equals("2")){
            System.exit(0);
        }
    }


    private void rodaModo(String modo){
        switch (modo) {
            case "1" -> new CombatePVP().fight(lutadores[0], lutadores[1]);
            case "2" -> new CombatePVE().fight(lutadores[0], lutadores[1]);
            default -> new CombateTorre().fighttorre(lutadores[0]);
        }
    }

    private String escolheModo(){
        
        while (true){
            String resposta = JOptionPane.showInputDialog("Qual modo deseja?\n1) PVP\n2) PVE\n3) Torre");
            
            if (resposta.equals("1") || resposta.equals("2") || resposta.equals("3")){
                return resposta;
            }else{
                JOptionPane.showMessageDialog(null, "Opção inválida");
            }
        }

    }
    
    private void select(String modo){
        int i = 0;
        while(true){
            if(modo.equals("1")|| modo.equals("2")){
                if (i > 1) break;
                String resposta = listaPersonagens(i);
                if (!listaInformacoes(resposta)) continue;
                if (!confirma()) continue;
                instancia(resposta, i);
                i++;
            }
            else{
                if (i > 0) break;
                String resposta = listaPersonagens(i);
                if (!listaInformacoes(resposta)) continue;
                if (!confirma()) continue;
                instancia(resposta, i);
                i++;
            }
        }
    }

    private String listaPersonagens(int i){
        String resposta = JOptionPane.showInputDialog("Player " + (i+1) + " escolha o personagem\n" +
                                                        "1) Arkanis\n2) Korvus\n" +
                                                        "3) Nyxra\n4) Cassian\n5) Draven\n6) Artemis\n" +
                                                        "7) Personagem aleatório");
        if (resposta.equals("7")){
            Random r = new Random();
            return String.valueOf(r.nextInt(1, 7));
        }
        return resposta;
    }
    
    private boolean listaInformacoes(String resposta){
        switch (resposta) {
            case "1" -> new Arkanis().mostraInformacoes();
            case "2" -> new Korvus().mostraInformacoes();
            case "3" -> new Nyxra().mostraInformacoes();
            case "4" -> new Cassian().mostraInformacoes();
            case "5" -> new Draven().mostraInformacoes();
            case "6" -> new Artemis().mostraInformacoes();
            default -> {
                JOptionPane.showMessageDialog(null, "Opção inválida");
                return false;
            }
        }
        return true;
    }

    private boolean confirma(){
        String resposta = JOptionPane.showInputDialog("Confirmar selecão?\n1) Sim\n2) Não");

        switch (resposta) {
            case "1" -> {
                return true;
            }
            case "2" -> {
                return false;
            }
            default -> {
                JOptionPane.showMessageDialog(null, "Opção inválida");
                return false;
            }
        }
    }

    public void instancia(String resposta, int i){
        switch (resposta) {
            case "1":
                lutadores[i] = new Arkanis();
                break;
            case "2":
                lutadores[i] = new Korvus();
                break;
            case "3":
                lutadores[i] = new Nyxra();
                break;
            case "4":
                lutadores[i] = new Cassian();
                break;
            case "5":
                lutadores[i] = new Draven();
                break;
            case "6":
                lutadores[i] = new Artemis();
                break;
            default:
                break;
        }
    }
}
