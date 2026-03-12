package ProjetoJogo;

public enum Tipo {

    LADINOS,
    COMBATENTES,
    MAGOS;

    public static double vantagem(Tipo atacante, Tipo defensor){
        
        if (atacante == Tipo.LADINOS && defensor == Tipo.MAGOS)
            return 1.25;

        if (atacante == Tipo.MAGOS && defensor == Tipo.COMBATENTES)
            return 1.25;

        if (atacante == Tipo.COMBATENTES && defensor == Tipo.LADINOS)
            return 1.25;

        return 1.0;

    }
}
