package Backend;

import Backend.Personagens.*;

public class FactoryPersonagem {

    public static Lutador criar(String nome) {

        switch (nome.toLowerCase()) {
            case "artemis":
                return new Artemis();
            case "draven":
                return new Draven();
            case "nyxra":
                return new Nyxra();
            case "cassian":
                return new Cassian();
            case "arkanis":
                return new Arkanis();
            case "korvus":
                return new Korvus();
            default:
                return new Artemis();
        }
    }
}
