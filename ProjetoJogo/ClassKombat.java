package ProjetoJogo;

import javax.swing.JOptionPane;

public class ClassKombat {

    private Lutador lutadores[] = new Lutador[2];

    public void play(){
        menu();
        String escolha = escolheModo();
        select();
        new Combate().fight(lutadores[0], lutadores[1]);
    }

    private void menu(){
        String resposta = JOptionPane.showInputDialog("Bem vindo ao Class Kombat! Deseja continuar ou parar por aqui?\n1) Continuar\n2) Parar");
        if (resposta.equals("2")){
            System.exit(0);
        }
    }

    private String escolheModo(){
        String resposta = JOptionPane.showInputDialog("Qual modo deseja?\n1) PVP\n2) PVE");

        if (resposta.equals("1") || resposta.equals("2")){
            return resposta;
        }else{
            JOptionPane.showMessageDialog(null, "Opção inválida");
            return "";
        }
    }
    
    private void select(){
        int i = 0;
        while(true){
            if (i > 1) break;
            String resposta = listaPersonagens(i);
            if (!listaInformacoes(resposta)) continue;
            if (!confirma()) continue;
            instancia(resposta, i);
            i++;
        }
    }

    private String listaPersonagens(int i){
        String resposta = JOptionPane.showInputDialog("Player " + (i+1) + " escolha o personagem\n" +
                                                        "1) Arkanis\n2) Korvus\n" +
                                                        "3) Nyxra\n4) Cassian\n5) Draven\n6) Artemis");
        return resposta;
    }
    
    private boolean listaInformacoes(String resposta){
        switch (resposta) {
            case "1":
                new Arkanis().mostraInformacoes();
                break;
            case "2":
                new Korvus().mostraInformacoes();
                break;
            case "3":
                new Nyxra().mostraInformacoes();
                break;
            case "4":
                new Cassian().mostraInformacoes();
                break;
            case "5":
                new Draven().mostraInformacoes();
                break;
            case "6":
                new Artemis().mostraInformacoes();
                break;
            default:
                JOptionPane.showMessageDialog(null, "Opção inválida");
                return false;
        }
        return true;
    }

    private boolean confirma(){
        String resposta = JOptionPane.showInputDialog("Confirmar selecão?\n1) Sim\n2) Não");

        if (resposta.equals("1")){
            return true;
        }else if (resposta.equals("2")){
            return false;
        }else{
            JOptionPane.showMessageDialog(null, "Opção inválida");
            return false;
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
