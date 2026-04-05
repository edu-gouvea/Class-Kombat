package Backend;

import Backend.ENUM.Acao;
import Backend.ENUM.Status;
import Backend.Personagens.Lutador;

public class Jogo {

    public static Lutador p1;
    public static Lutador p2;

    public static void iniciar(String nome1, String nome2) {
        p1 = FactoryPersonagem.criar(nome1);
        p2 = FactoryPersonagem.criar(nome2);
    }

    public static String atacar(String acaoStr) {
        StringBuilder log = new StringBuilder();

        // Processar status de início de turno
        p1.processarStatus();
        p2.processarStatus();

        // Turno do player
        if (!Status.isCongelado(p1.getStatus())) {
            Acao acao = parseAcao(acaoStr);
            log.append(executarAcao(p1, p2, acao));
        } else {
            log.append(p1.getNome()).append(" está congelado e perdeu o turno! ");
        }

        // Turno do bot (só age se ainda estiver vivo)
        if (p2.getHpatual() > 0) {
            if (!Status.isCongelado(p2.getStatus())) {
                log.append(executarAcao(p2, p1, botEscolherAcao()));
            } else {
                log.append(p2.getNome()).append(" está congelado e perdeu o turno! ");
            }
        }

        return getEstado(log.toString());
    }

    private static String executarAcao(Lutador atacante, Lutador defensor, Acao acao) {
        int hpDefAntes      = defensor.getHpatual();
        int hpAtacanteAntes = atacante.getHpatual();

        switch (acao) {
            case ATAQUE_RAPIDO:
                atacante.habilidadePadrao(defensor);
                break;
            case ATAQUE_ESPECIAL:
                atacante.habilidadeEspecial(defensor);
                break;
            case ATAQUE_PASSIVA:
                atacante.habilidadePassiva(defensor);
                break;
        }

        int danoCausado  = hpDefAntes - defensor.getHpatual();
        int curaRecebida = atacante.getHpatual() - hpAtacanteAntes;

        String nomeAtaque;
        switch (acao) {
            case ATAQUE_RAPIDO:
                nomeAtaque = atacante.getNomeAtaqueRapido();
                break;
            case ATAQUE_ESPECIAL:
                nomeAtaque = atacante.getNomeAtaqueEspecial();
                break;
            default:
                nomeAtaque = atacante.getNomeAtaquePassiva();
                break;
        }

        StringBuilder msg = new StringBuilder();
        if (danoCausado > 0) {
            msg.append(atacante.getNome()).append(" usou ").append(nomeAtaque)
               .append(" e causou ").append(danoCausado).append(" de dano em ")
               .append(defensor.getNome()).append(". ");
        } else {
            msg.append(atacante.getNome()).append(" usou ").append(nomeAtaque).append(". ");
        }
        if (curaRecebida > 0) {
            msg.append(atacante.getNome()).append(" recuperou ")
               .append(curaRecebida).append(" HP. ");
        }

        return msg.toString();
    }

    private static Acao botEscolherAcao() {
        return Acao.values()[(int)(Math.random() * 3)];
    }

    private static Acao parseAcao(String s) {
        try {
            return Acao.valueOf(s.toUpperCase());
        } catch (Exception e) {
            return Acao.ATAQUE_RAPIDO; // fallback se vier algo inesperado
        }
    }

    public static String getEstado(String log) {
        boolean combateAtivo = p1.getHpatual() > 0 && p2.getHpatual() > 0;
        String vencedor = "";
        if (!combateAtivo) {
            vencedor = p1.getHpatual() > 0 ? p1.getNome() : p2.getNome();
        }

        // Escapa caracteres que quebrariam o JSON
        String logSeguro = log.replace("\\", "\\\\")
                              .replace("\"", "'")
                              .replace("\n", " ")
                              .replace("\r", "");

        return "{"
            + "\"combateAtivo\":"  + combateAtivo + ","
            + "\"vencedor\":\""    + vencedor + "\","
            + "\"log\":\""         + logSeguro + "\","
            + "\"p1\":{"
                + "\"nome\":\""              + p1.getNome()              + "\","
                + "\"hp\":"                  + p1.getHp()                + ","
                + "\"hpAtual\":"             + p1.getHpatual()           + ","
                + "\"status\":\""            + p1.getStatus().name()     + "\","
                + "\"especiaisRestantes\":"  + p1.getEspeciasRestantes() + ","
                + "\"ataques\":{"
                    + "\"rapido\":\""  + p1.getNomeAtaqueRapido()  + "\","
                    + "\"especial\":\"" + p1.getNomeAtaqueEspecial() + "\","
                    + "\"passiva\":\""  + p1.getNomeAtaquePassiva()  + "\""
                + "}"
            + "},"
            + "\"p2\":{"
                + "\"nome\":\""              + p2.getNome()              + "\","
                + "\"hp\":"                  + p2.getHp()                + ","
                + "\"hpAtual\":"             + p2.getHpatual()           + ","
                + "\"status\":\""            + p2.getStatus().name()     + "\","
                + "\"especiaisRestantes\":"  + p2.getEspeciasRestantes() + ","
                + "\"ataques\":{"
                    + "\"rapido\":\""   + p2.getNomeAtaqueRapido()  + "\","
                    + "\"especial\":\"" + p2.getNomeAtaqueEspecial() + "\","
                    + "\"passiva\":\""  + p2.getNomeAtaquePassiva()  + "\""
                + "}"
            + "}"
        + "}";
    }
}