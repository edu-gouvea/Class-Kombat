package ProjetoJogo;

public enum Status {

    NORMAL,
    SANGRAMENTO,
    DANO_REDUZIDO,
    DANO_AUMENTADO,
    CONGELADO,
    FOCO,
    INVISIVEL;

    public static double calculaProb(Status statusAlvo, Status statusAtaque, int prob){
        if (statusAlvo == Status.INVISIVEL){
            return prob * 0.8;
        }else if(statusAtaque == Status.FOCO){
            return prob * 1.2;
        }else{
            return (double) prob;
        }
    }
    public static boolean isCongelado(Status status){
        return status == Status.CONGELADO;
    }
    
}
