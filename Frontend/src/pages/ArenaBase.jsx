import React, { useState, useEffect } from "react";
import { atacar } from "../services/api";

import arkanisBack  from "../assets/sprites/arkanis_back.png";
import arkanisFront from "../assets/sprites/arkanis_front.png";
import artemisBack  from "../assets/sprites/artemis_back.png";
import artemisFront from "../assets/sprites/artemis_front.png";
import cassianBack  from "../assets/sprites/cassian_back.png";
import cassianFront from "../assets/sprites/cassian_front.png";
import dravenBack   from "../assets/sprites/draven_back.png";
import dravenFront  from "../assets/sprites/draven_front.png";
import korvusBack   from "../assets/sprites/korvus_back.png";
import korvusFront  from "../assets/sprites/korvus_front.png";
import nyxraBack    from "../assets/sprites/nyxra_back.png";
import nyxraFront   from "../assets/sprites/nyxra_front.png";

const SPRITE = {
  arkanis: { back: arkanisBack,  front: arkanisFront },
  artemis: { back: artemisBack,  front: artemisFront },
  cassian: { back: cassianBack,  front: cassianFront },
  draven:  { back: dravenBack,   front: dravenFront  },
  korvus:  { back: korvusBack,   front: korvusFront  },
  nyxra:   { back: nyxraBack,    front: nyxraFront   },
};

const AVATAR = {
  arkanis: "/arkanis.jpeg",
  artemis: "/artemis.jpeg",
  cassian: "/cassian.jpeg",
  draven:  "/draven.jpeg",
  korvus:  "/korvus.jpeg",
  nyxra:   "/nyxra.jpeg",
};

const getSprite = (nome, view) => SPRITE[nome?.toLowerCase()]?.[view] ?? null;
const getAvatar = (nome)       => AVATAR[nome?.toLowerCase()] ?? null;

const ArenaBase = ({ background, player, playerDois, estadoJogo: estadoInicial, onSair, modo, torreInfo }) => {
  const [estado,     setEstado]     = useState(estadoInicial);
  const [log,        setLog]        = useState("Combate iniciado! Escolha sua ação.");
  const [carregando, setCarregando] = useState(false);
  const [fasePvp,    setFasePvp]    = useState("p1");
  const [acaoP1,     setAcaoP1]     = useState(null);

  const isPvp  = modo === "pvp";
  const isTorre = modo === "torre";

  useEffect(() => {
    if (estadoInicial) {
      setEstado(estadoInicial);
      setFasePvp("p1");
      setAcaoP1(null);
    }
  }, [estadoInicial]);

  if (!estado) {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"#000", color:"#fff", fontSize:24, fontWeight:900 }}>
        Conectando ao servidor...
      </div>
    );
  }

  const { p1, p2, combateAtivo, vencedor } = estado;

  // ── Ataque ────────────────────────────────────────────────────────────────
  const handleAtacar = async (acao) => {
    if (!combateAtivo || carregando) return;

    if (isPvp) {
      if (fasePvp === "p1") {
        setAcaoP1(acao);
        setFasePvp("p2");
        setLog(`⚔️ ${p1.nome} escolheu! Agora é a vez de ${p2.nome}.`);
        return;
      } else {
        setCarregando(true);
        try {
          const novoEstado = await atacar(`${acaoP1}|${acao}`);
          setEstado(novoEstado);
          setLog(novoEstado.log || "");
        } catch { setLog("Erro ao conectar com o servidor."); }
        finally { setCarregando(false); setFasePvp("p1"); setAcaoP1(null); }
      }
    } else {
      setCarregando(true);
      try {
        const novoEstado = await atacar(acao);
        setEstado(novoEstado);
        setLog(novoEstado.log || "");
      } catch { setLog("Erro ao conectar com o servidor. O backend está rodando?"); }
      finally { setCarregando(false); }
    }
  };

  const hpPct   = (cur, max) => Math.max(0, Math.round((cur / max) * 100));
  const hpColor = (pct) => pct > 50 ? "#22c55e" : pct > 25 ? "#eab308" : "#ef4444";

  const lutadorAtual = isPvp && fasePvp === "p2" ? p2 : p1;
  const avatarP1     = player?.image    || getAvatar(p1.nome);
  const avatarP2     = playerDois?.image || getAvatar(p2.nome);
  const spriteBack   = getSprite(p1.nome, "back");
  const spriteFront  = getSprite(p2.nome, "front");

  const playerVenceu = vencedor === p1.nome;
  const torreAcabou  = isTorre && torreInfo && torreInfo.index >= torreInfo.sequencia.length - 1;

  const bannerColor = fasePvp === "p1" ? "#eab308" : "#ef4444";
  const bannerBg    = fasePvp === "p1" ? "rgba(120,80,0,0.35)" : "rgba(120,0,0,0.35)";

  return (
    <div style={{ position:"relative", width:"100vw", height:"100vh", fontFamily:"monospace", overflow:"hidden", display:"flex", flexDirection:"column" }}>

      {/* ── FUNDO ──────────────────────────────────────────── */}
      <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:`url(${background})`, backgroundSize:"cover", backgroundPosition:"center" }} />
      <div style={{ position:"absolute", inset:0, zIndex:1, background:"rgba(0,0,0,0.42)" }} />

      {/* ── BARRAS DE HP ───────────────────────────────────── */}
      <div style={{ position:"relative", zIndex:10, display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"10px 12px 6px", gap:12 }}>

        {/* P1 */}
        <div style={{ flex:1, maxWidth:290, background:"rgba(0,0,0,0.85)", border:"2px solid #eab308", padding:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {avatarP1 && <img src={avatarP1} alt={p1.nome} style={{ width:52, height:52, objectFit:"cover", objectPosition:"top", border:"2px solid #eab308", flexShrink:0 }} />}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap", marginBottom:2 }}>
                <span style={{ color:"#fde047", fontWeight:900, textTransform:"uppercase", fontSize:13 }}>{p1.nome}</span>
                {isPvp && <span style={{ fontSize:9, background:"#92400e", color:"#fde047", padding:"1px 5px", border:"1px solid #eab308", fontWeight:700 }}>P1</span>}
                {p1.status !== "NORMAL" && <span style={{ fontSize:9, background:"#6b21a8", color:"#e9d5ff", padding:"1px 4px", border:"1px solid #a855f7" }}>{p1.status}</span>}
              </div>
              <div style={{ fontSize:10, color:"#9ca3af", marginBottom:3 }}>{p1.hpAtual} / {p1.hp} HP • ✦ {p1.especiaisRestantes}</div>
              <div style={{ width:"100%", height:10, background:"#1f2937", border:"1px solid #4b5563", borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${hpPct(p1.hpAtual,p1.hp)}%`, backgroundColor:hpColor(hpPct(p1.hpAtual,p1.hp)), transition:"width 0.5s" }} />
              </div>
            </div>
          </div>
        </div>

        {/* VS */}
        <div style={{ color:"white", fontWeight:900, fontSize:20, fontStyle:"italic", alignSelf:"center", textShadow:"2px 2px 0 #000", flexShrink:0 }}>VS</div>

        {/* P2 */}
        <div style={{ flex:1, maxWidth:290, background:"rgba(0,0,0,0.85)", border:"2px solid #ef4444", padding:8 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", gap:8 }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap", justifyContent:"flex-end", marginBottom:2 }}>
                {p2.status !== "NORMAL" && <span style={{ fontSize:9, background:"#6b21a8", color:"#e9d5ff", padding:"1px 4px", border:"1px solid #a855f7" }}>{p2.status}</span>}
                {isPvp && <span style={{ fontSize:9, background:"#7f1d1d", color:"#fca5a5", padding:"1px 5px", border:"1px solid #ef4444", fontWeight:700 }}>P2</span>}
                <span style={{ color:"#fca5a5", fontWeight:900, textTransform:"uppercase", fontSize:13 }}>{p2.nome}</span>
              </div>
              <div style={{ fontSize:10, color:"#9ca3af", textAlign:"right", marginBottom:3 }}>{p2.hpAtual} / {p2.hp} HP</div>
              <div style={{ width:"100%", height:10, background:"#1f2937", border:"1px solid #4b5563", borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${hpPct(p2.hpAtual,p2.hp)}%`, backgroundColor:hpColor(hpPct(p2.hpAtual,p2.hp)), transition:"width 0.5s", float:"right" }} />
              </div>
            </div>
            {avatarP2 && <img src={avatarP2} alt={p2.nome} style={{ width:52, height:52, objectFit:"cover", objectPosition:"top", border:"2px solid #ef4444", flexShrink:0 }} />}
          </div>
        </div>
      </div>

      {/* ── BANNER PVP ─────────────────────────────────────── */}
      {isPvp && combateAtivo && !carregando && (
        <div style={{ position:"relative", zIndex:10, textAlign:"center", padding:"4px 0", background:bannerBg, border:`1px solid ${bannerColor}`, margin:"0 12px" }}>
          <span style={{ color:bannerColor, fontWeight:900, fontSize:12, textTransform:"uppercase", letterSpacing:2 }}>
            {fasePvp === "p1" ? `⚔️ ${p1.nome} — escolha seu ataque` : `⚔️ ${p2.nome} — escolha seu ataque`}
          </span>
        </div>
      )}

      {/* ── ARENA (área elástica com sprites absolutos) ─────── */}
      <div style={{ position:"relative", zIndex:10, flex:1 }}>

        {/* P1 — costas, pé na plataforma esquerda (~72% de baixo) */}
        {spriteBack && (
          <img src={spriteBack} alt={p1.nome}
            style={{
              position:"absolute",
              bottom:"28%",   /* alinha o pé com a plataforma */
              left:"4%",
              height:"52%",   /* ~52% da altura da arena */
              width:"auto",
              objectFit:"contain",
              objectPosition:"bottom",
              imageRendering:"pixelated",
              opacity: p1.hpAtual <= 0 ? 0.2 : 1,
              filter: p1.hpAtual <= 0 ? "grayscale(1)" : "drop-shadow(4px 8px 6px rgba(0,0,0,0.9))",
              transition:"opacity 0.5s, filter 0.5s",
            }}
          />
        )}

        {/* P2 — frente, pé na plataforma direita (~72% de baixo) */}
        {spriteFront && (
          <img src={spriteFront} alt={p2.nome}
            style={{
              position:"absolute",
              bottom:"28%",
              right:"4%",
              height:"42%",
              width:"auto",
              objectFit:"contain",
              objectPosition:"bottom",
              imageRendering:"pixelated",
              opacity: p2.hpAtual <= 0 ? 0.2 : 1,
              filter: p2.hpAtual <= 0 ? "grayscale(1)" : "drop-shadow(-4px 8px 6px rgba(0,0,0,0.9))",
              transition:"opacity 0.5s, filter 0.5s",
            }}
          />
        )}
      </div>

      {/* ── FIM DE JOGO ────────────────────────────────────── */}
      {!combateAtivo && (
        <div style={{ position:"absolute", inset:0, zIndex:40, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.90)" }}>

          {/* Torre: campeão */}
          {isTorre && playerVenceu && torreAcabou && (<>
            <div style={{ fontSize:13, color:"#fde047", fontWeight:900, letterSpacing:4, marginBottom:8, textTransform:"uppercase" }}>🏆 MODO TORRE 🏆</div>
            <h2 style={{ fontSize:60, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", marginBottom:8, color:"#fde047", textShadow:"0 0 30px gold" }}>Campeão!</h2>
            <p style={{ color:"white", fontSize:18, marginBottom:28 }}>Você conquistou a Torre!</p>
            <button onClick={onSair} style={estiloBtn("#eab308","#78350f","black")}>Menu Principal</button>
          </>)}

          {/* Torre: próxima luta */}
          {isTorre && playerVenceu && !torreAcabou && (<>
            <div style={{ fontSize:13, color:"#86efac", fontWeight:700, letterSpacing:3, marginBottom:8, textTransform:"uppercase" }}>
              Luta {torreInfo.index + 1} / {torreInfo.sequencia.length} concluída
            </div>
            <h2 style={{ fontSize:60, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", marginBottom:8, color:"#4ade80", textShadow:"0 0 30px #16a34a" }}>Vitória!</h2>
            <p style={{ color:"white", fontSize:18, marginBottom:28 }}>
              Próximo: <strong style={{ color:"#fde047" }}>{torreInfo.sequencia[torreInfo.index + 1]}</strong>
            </p>
            <button onClick={() => torreInfo.onProximaLuta(torreInfo.index + 1)} style={estiloBtn("#16a34a","#14532d","white")}>⚔️ Próxima Luta</button>
          </>)}

          {/* Torre: derrota */}
          {isTorre && !playerVenceu && (<>
            <div style={{ fontSize:13, color:"#f87171", fontWeight:700, letterSpacing:3, marginBottom:8, textTransform:"uppercase" }}>Torre — Luta {torreInfo.index + 1}</div>
            <h2 style={{ fontSize:60, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", marginBottom:8, color:"#ef4444", textShadow:"0 0 30px #dc2626" }}>Derrota!</h2>
            <p style={{ color:"white", fontSize:18, marginBottom:28 }}>{vencedor} te eliminou da Torre.</p>
            <button onClick={onSair} style={estiloBtn("#dc2626","#7f1d1d","white")}>Menu Principal</button>
          </>)}

          {/* PVE / PVP normal */}
          {!isTorre && (<>
            <h2 style={{ fontSize:64, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", marginBottom:8, color: playerVenceu ? "#fde047" : "#ef4444", textShadow:`0 0 30px ${playerVenceu ? "gold" : "#dc2626"}` }}>
              {playerVenceu ? "Vitória!" : "Derrota!"}
            </h2>
            <p style={{ color:"white", fontSize:18, marginBottom:32 }}>{vencedor} venceu o combate!</p>
            <button onClick={onSair} style={estiloBtn("#eab308","#78350f","black")}>Menu Principal</button>
          </>)}
        </div>
      )}

      {/* ── LOG ────────────────────────────────────────────── */}
      <div style={{ position:"relative", zIndex:10, margin:"0 12px 6px" }}>
        <div style={{ background:"rgba(0,0,0,0.88)", border:"2px solid #4b5563", padding:"6px 12px", minHeight:44 }}>
          <p style={{ color:"white", fontSize:13, lineHeight:1.5, margin:0 }}>
            {carregando ? "⚔️ Executando..." : log}
          </p>
        </div>
      </div>

      {/* ── BOTÕES DE AÇÃO ─────────────────────────────────── */}
      <div style={{ position:"relative", zIndex:10, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, padding:"0 12px 12px" }}>

        <button onClick={() => handleAtacar("ATAQUE_RAPIDO")}
          disabled={!combateAtivo || carregando}
          style={estiloAcao("#1d4ed8","#1e3a8a", !combateAtivo || carregando)}>
          <span style={{ fontSize:22 }}>⚡</span>
          <span style={{ fontSize:10, color:"#93c5fd", fontWeight:600 }}>Ataque Rápido</span>
          <span style={{ fontSize:12, fontWeight:900, textTransform:"uppercase", textAlign:"center", lineHeight:1.2 }}>{lutadorAtual.ataques?.rapido ?? "—"}</span>
        </button>

        <button onClick={() => handleAtacar("ATAQUE_ESPECIAL")}
          disabled={!combateAtivo || carregando || lutadorAtual.especiaisRestantes <= 0}
          style={estiloAcao("#7e22ce","#581c87", !combateAtivo || carregando || lutadorAtual.especiaisRestantes <= 0)}>
          <span style={{ fontSize:22 }}>🔥</span>
          <span style={{ fontSize:10, color: lutadorAtual.especiaisRestantes > 0 ? "#c4b5fd" : "#fca5a5", fontWeight:600 }}>
            {lutadorAtual.especiaisRestantes > 0 ? `Especial (${lutadorAtual.especiaisRestantes}x)` : "Esgotado"}
          </span>
          <span style={{ fontSize:12, fontWeight:900, textTransform:"uppercase", textAlign:"center", lineHeight:1.2 }}>{lutadorAtual.ataques?.especial ?? "—"}</span>
        </button>

        <button onClick={() => handleAtacar("ATAQUE_PASSIVA")}
          disabled={!combateAtivo || carregando}
          style={estiloAcao("#065f46","#064e3b", !combateAtivo || carregando)}>
          <span style={{ fontSize:22 }}>🌀</span>
          <span style={{ fontSize:10, color:"#6ee7b7", fontWeight:600 }}>Passiva</span>
          <span style={{ fontSize:12, fontWeight:900, textTransform:"uppercase", textAlign:"center", lineHeight:1.2 }}>{lutadorAtual.ataques?.passiva ?? "—"}</span>
        </button>
      </div>

      {/* ── BOTÃO SAIR ─────────────────────────────────────── */}
      <button onClick={onSair} style={{ position:"fixed", bottom:12, right:12, zIndex:50, background:"#7f1d1d", color:"white", fontSize:10, fontWeight:900, padding:"5px 10px", border:"2px solid #ef4444", textTransform:"uppercase", letterSpacing:1, cursor:"pointer", boxShadow:"3px 3px 0 #000", fontFamily:"monospace" }}>
        ✕ Sair
      </button>

      {/* Scanlines */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:50, opacity:0.07, background:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)" }} />
    </div>
  );
};

function estiloAcao(bg, border, disabled) {
  return { background: disabled ? "#1f2937" : bg, border:`2px solid ${disabled ? "#374151" : border}`, borderBottom:`4px solid ${disabled ? "#374151" : border}`, color: disabled ? "#6b7280" : "white", padding:"10px 6px", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, transition:"all 0.1s", fontFamily:"monospace" };
}

function estiloBtn(bg, border, color) {
  return { background:bg, color, fontWeight:900, fontSize:18, padding:"12px 48px", border:`4px solid ${border}`, borderBottom:`8px solid ${border}`, cursor:"pointer", textTransform:"uppercase", letterSpacing:2, fontFamily:"monospace" };
}

export default ArenaBase;
