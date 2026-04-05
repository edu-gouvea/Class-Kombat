package Backend.dto;

import Backend.Personagens.Lutador;

public class LutadorDTO {
    public String nome;
    public int hp;
    public int hpAtual;
    public int dano;

    public LutadorDTO(Lutador l) {
        this.nome = l.getNome();
        this.hp = l.getHp();
        this.hpAtual = l.getHpatual();
        this.dano = l.getDano();
    }

    public String toJSON() {
        return "{"
                + "\"nome\":\"" + nome + "\","
                + "\"hp\":" + hp + ","
                + "\"hpAtual\":" + hpAtual + ","
                + "\"dano\":" + dano
                + "}";
    }
}
