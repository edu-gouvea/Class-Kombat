package ProjetoJogo;

public abstract class Lutador {
    
    protected String nome;
    protected int hp, dano, especiaisRestantes;
    protected Tipo tipo;
    protected Status status;

    public Lutador(String nome, int hp, int dano, int especiaisRestantes, Tipo tipo, Status status) {
        this.nome = nome;
        this.hp = hp;
        this.dano = dano;
        this.tipo = tipo;
        this.status = status;
        this.especiaisRestantes = especiaisRestantes;
    }

    public abstract String getNomeAtaqueRapido();
    public abstract String getNomeAtaqueEspecial();
    public abstract String getNomeAtaquePassiva();

    public abstract void mostraInformacoes();
    public abstract void habilidadePadrao(Lutador alvo);
    public abstract void habilidadeEspecial(Lutador alvo);
    public abstract void habilidadePassiva(Lutador alvo);
    public abstract void mostraDetalhesGolpes();

    public void aplicarStatus(){
        if (status == Status.SANGRAMENTO){
            this.receberDano(5);
            System.out.println(nome + " sofreu 5 de dano por sangramento");
        }
        if (status == Status.DANO_AUMENTADO){
            dano *= 1.2;
        }
        if (status == Status.DANO_REDUZIDO){
            dano *= 0.8;
        }
    }
    public void receberDano(int dano){
        hp -= dano;
    }

    public String getNome(){
        return nome;
    }
    
    public int getHp() {
        return hp;
    }

    public int getDano() {
        return dano;
    }

    public int getEspeciasRestantes(){
        return especiaisRestantes;
    }
    
}
