package ProjetoJogo.Combates;

import ProjetoJogo.ENUM.Acao;
import ProjetoJogo.Personagens.Lutador;

public interface Combate {

    public abstract void fight(Lutador l1, Lutador l2);
    public abstract Acao escolherAcao(Lutador l);
    public abstract void executar(Lutador atacante, Lutador defensor, Acao acao);
    public abstract void mostrarStatus(Lutador l1, Lutador l2);
    public abstract void playerJogaPrimeiro(Lutador l1, Lutador l2);
}
