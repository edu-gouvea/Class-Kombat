package ProjetoJogo;

import javax.swing.JOptionPane;

public class NomeDoJogo {

    private Lutador lutadores[] = new Lutador[2];

    public void play(){
        menu();
        select();
        
    }

    private void menu(){
        String resposta = JOptionPane.showInputDialog("Bem vindo jogador! Deseja continuar ou parar por aqui?\n1) Continuar\n2) Parar");
        if (resposta.equals("2")){
            System.exit(0);
        }
    }
    
    private void select(){
        int i = 0;
        while(true){
            if (i > 1) break;
            String resposta = listaPersonagens();
            if (!listaInformacoes(resposta)) continue;
            if (!confirma()) continue;
            instancia(resposta, i);
            i++;
        }
    }

    private String listaPersonagens(){
        String resposta = JOptionPane.showInputDialog("Qual personagem voce quer?\n1) Personagem 1\n2) Personagem 2");
        return resposta;
    }
    
    private boolean listaInformacoes(String resposta){
        switch (resposta) {
            case "1":
                new Aleatorio1().mostraInformacoes();
                break;
            case "2":
                new Aleatorio2().mostraInformacoes();
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
                lutadores[i] = new Aleatorio1();
                break;
            case "2":
                lutadores[i] = new Aleatorio2();
                break;
            default:
                break;
        }
    }
}
