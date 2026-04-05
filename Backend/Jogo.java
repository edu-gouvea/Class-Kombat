package Backend;

import Backend.Personagens.Lutador;

public class Jogo {

    public static Lutador p1;
    public static Lutador p2;

    public static void iniciar(String nome1, String nome2) {
        p1 = FactoryPersonagem.criar(nome1);
        p2 = FactoryPersonagem.criar(nome2);
    }

    public static String atacar() {

        p1.habilidadePadrao(p2);

        // turno inimigo (simples)
        if (p2.getHpatual() > 0) {
            p2.habilidadePadrao(p1);
        }

        return getEstado();
    }

    public static String getEstado() {
        return "{"
                + "\"p1\":{"
                + "\"nome\":\"" + p1.getNome() + "\","
                + "\"hp\":" + p1.getHpatual()
                + "},"
                + "\"p2\":{"
                + "\"nome\":\"" + p2.getNome() + "\","
                + "\"hp\":" + p2.getHpatual()
                + "}"
                + "}";
    }
}