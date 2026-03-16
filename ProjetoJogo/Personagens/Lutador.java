package ProjetoJogo.Personagens;

import ProjetoJogo.ENUM.Status;
import ProjetoJogo.ENUM.Tipo;

public abstract class Lutador {
    
    protected String nome;
    protected int hp, dano, especiaisRestantes, velocidade, duracaoStatus;
    protected Tipo tipo;
    protected Status status;

    public Lutador(String nome, int hp, int dano, int especiaisRestantes, int velocidade, Tipo tipo, Status status) {
        this.nome = nome;
        this.hp = hp;
        this.dano = dano;
        this.tipo = tipo;
        this.status = status;
        this.especiaisRestantes = especiaisRestantes;
        this.velocidade = velocidade;
        this.duracaoStatus = 0;
    }

    public abstract String getNomeAtaqueRapido();
    public abstract String getNomeAtaqueEspecial();
    public abstract String getNomeAtaquePassiva();

    public abstract void mostraInformacoes();
    public abstract void habilidadePadrao(Lutador alvo);
    public abstract void habilidadeEspecial(Lutador alvo);
    public abstract void habilidadePassiva(Lutador alvo);
    public abstract void mostraDetalhesHabilidadePadrao();
    public abstract void mostraDetalhesHabilidadeEspecial();
    public abstract void mostraDetalhesHabilidadePassiva();

    public void receberDano(int dano){
        hp -= dano;

        if (hp < 0){
            hp = 0;
        }
    }

    public void aplicarStatus(Status novo, int duracao){
        this.status = novo;
        this.duracaoStatus = duracao;
    }

    public void processarStatus(){

    if(status == Status.SANGRAMENTO){
        hp -= 5;
        System.out.println(nome + " sofreu 5 de dano por sangramento");
    }
    if (status == Status.ENVENENAMENTO){
        hp -= 7;
        System.out.println(nome + " sofreu 5 de dano por sangramento");
    }
    if (status == Status.DANO_REDUZIDO){
        dano *= 0.8;
        System.out.println(nome + " sofreu redução de dano");
    }
    if (status == Status.DANO_REDUZIDO){
        dano *= 1.2;
        System.out.println(nome + " recebeu aumento de dano");
    }
    if (status == Status.CONGELADO){
        System.out.println(nome + " está congelado e perdeu o turno");
    }
    if (status == Status.FOCO){
        System.out.println(nome + " está com mais chance de acertar próximo golpe");
    }
    if (status == Status.INVISIVEL){
        System.out.println(nome + " está com menos chance de ser atingido pelo próximo golpe");
    }

    if(duracaoStatus <= 0){
        status = Status.NORMAL;
    }

    duracaoStatus--;

}
    
    public int calculaDanoEspecial(){
        return dano * 2;
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

    public Tipo getTipo(){
        return tipo;
    }

    public Status getStatus(){
        return status;
    }

    public int getEspeciasRestantes(){
        return especiaisRestantes;
    }

    public int getVelocidade(){
        return velocidade;
    }

}
