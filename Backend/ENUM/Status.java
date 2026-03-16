package Backend.ENUM;

public enum Status {

    NORMAL,
    SANGRAMENTO,
    ENVENENAMENTO,
    DANO_REDUZIDO,
    DANO_AUMENTADO,
    CONGELADO,
    FOCO,
    INVISIVEL;

    public static int calculaProb(Status statusAlvo, Status statusAtaque, int prob){
        if (statusAlvo == Status.INVISIVEL){
            prob *= 0.7;
        }if(statusAtaque == Status.FOCO){
            prob *= 1.3;
        }

        return prob;
    }

    public static double vantagemDeDano(Status statusAlvo){
        if (statusAlvo == Status.DANO_REDUZIDO){
            return 0.8;
        }
        return 1.0;
    }
    public static boolean isCongelado(Status status){
        return status == Status.CONGELADO;
    }
    
}
