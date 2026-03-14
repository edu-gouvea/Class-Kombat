package ProjetoJogo;

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
    public static boolean isCongelado(Status status){
        return status == Status.CONGELADO;
    }
    
}
