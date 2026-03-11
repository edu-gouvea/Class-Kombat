package ProjetoJogo;

public abstract class Lutador {
    
    private String nome;
    private int hp, dano, velocidade, barraespecial;

    public Lutador(){
        this.barraespecial = 0;
    }

    public abstract void mostraInformacoes();

    public String getNome(){
        return nome;
    }
    
    public int getHp() {
        return hp;
    }

    public int getDano() {
        return dano;
    }

    public int getVelocidade() {
        return velocidade;
    }

    public int getBarraespecial() {
        return barraespecial;
    }
    
}
