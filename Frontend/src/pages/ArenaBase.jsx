import React, { useState, useEffect } from "react";
import { atacar } from "../services/api";

import arkanisBack from "../assets/sprites/arkanis_back.png";
import arkanisFront from "../assets/sprites/arkanis_front.png";
import artemisBack from "../assets/sprites/artemis_back.png";
import artemisFront from "../assets/sprites/artemis_front.png";
import cassianBack from "../assets/sprites/cassian_back.png";
import cassianFront from "../assets/sprites/cassian_front.png";
import dravenBack from "../assets/sprites/draven_back.png";
import dravenFront from "../assets/sprites/draven_front.png";
import korvusBack from "../assets/sprites/korvus_back.png";
import korvusFront from "../assets/sprites/korvus_front.png";
import nyxraBack from "../assets/sprites/nyxra_back.png";
import nyxraFront from "../assets/sprites/nyxra_front.png";

const SPRITE = {
  arkanis: { back: arkanisBack, front: arkanisFront },
  artemis: { back: artemisBack, front: artemisFront },
  cassian: { back: cassianBack, front: cassianFront },
  draven: { back: dravenBack, front: dravenFront },
  korvus: { back: korvusBack, front: korvusFront },
  nyxra: { back: nyxraBack, front: nyxraFront },
};

const AVATAR = {
  arkanis: "/arkanis.jpeg",
  artemis: "/artemis.jpeg",
  cassian: "/cassian.jpeg",
  draven: "/draven.jpeg",
  korvus: "/korvus.jpeg",
  nyxra: "/nyxra.jpeg",
};

const getSprite = (nome, view) => SPRITE[nome?.toLowerCase()]?.[view] ?? null;
const getAvatar = (nome) => AVATAR[nome?.toLowerCase()] ?? null;

// ── BANNER DE ROUND ────────────────────────────────────────────────────────
const RoundBanner = ({ roundNum, isFinal, onDone }) => {
  const [fase, setFase] = useState("round");

  useEffect(() => {
    const t1 = setTimeout(() => setFase("fight"), 1000);
    const t2 = setTimeout(() => setFase("saindo"), 1800);
    const t3 = setTimeout(() => onDone(), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const visible = fase !== "saindo";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.75)",
        transition: "opacity 0.4s",
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "60%",
          height: 3,
          background:
            "linear-gradient(90deg, transparent, #eab308, transparent)",
          marginBottom: 18,
        }}
      />
      <div
        style={{
          fontSize: fase === "round" ? 72 : 88,
          fontWeight: 900,
          fontStyle: "italic",
          textTransform: "uppercase",
          letterSpacing: fase === "round" ? 8 : 4,
          fontFamily: "monospace",
          transition: "all 0.2s",
          color: fase === "fight" ? "#ef4444" : isFinal ? "#facc15" : "white",
          textShadow:
            fase === "fight"
              ? "0 0 40px #dc2626, 4px 4px 0 #000"
              : isFinal
                ? "0 0 40px #ca8a04, 4px 4px 0 #000"
                : "4px 4px 0 #000, 0 0 30px rgba(255,255,255,0.2)",
          transform: fase === "fight" ? "scale(1.1)" : "scale(1)",
        }}
      >
        {fase === "fight"
          ? "LUTE!"
          : isFinal
            ? "FINAL ROUND"
            : `ROUND ${roundNum}`}
      </div>
      <div
        style={{
          width: "60%",
          height: 3,
          background:
            "linear-gradient(90deg, transparent, #eab308, transparent)",
          marginTop: 18,
        }}
      />
    </div>
  );
};

// ── Sub-componentes dos botões retrô ───────────────────────────────────────
const Scanlines = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background:
        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
    }}
  />
);

const Corners = () => (
  <>
    <div
      style={{
        position: "absolute",
        top: -2,
        left: -2,
        width: 6,
        height: 6,
        borderTop: "2px solid #4b5563",
        borderLeft: "2px solid #4b5563",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: -2,
        right: -2,
        width: 6,
        height: 6,
        borderTop: "2px solid #4b5563",
        borderRight: "2px solid #4b5563",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: -2,
        left: -2,
        width: 6,
        height: 6,
        borderBottom: "2px solid #4b5563",
        borderLeft: "2px solid #4b5563",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: -2,
        right: -2,
        width: 6,
        height: 6,
        borderBottom: "2px solid #4b5563",
        borderRight: "2px solid #4b5563",
      }}
    />
  </>
);

// ──────────────────────────────────────────────────────────────────────────

const ArenaBase = ({
  background,
  player,
  playerDois,
  estadoJogo: estadoInicial,
  onSair,
  modo,
  torreInfo,
}) => {
  const [estado, setEstado] = useState(estadoInicial);
  const [log, setLog] = useState("Combate iniciado! Escolha sua ação.");
  const [carregando, setCarregando] = useState(false);
  const [fasePvp, setFasePvp] = useState("p1");
  const [acaoP1, setAcaoP1] = useState(null);
  const [mostrarBanner, setMostrarBanner] = useState(false);
  const [bannerKey, setBannerKey] = useState(0);

  const isPvp = modo === "pvp";
  const isTorre = modo === "torre";

  useEffect(() => {
    if (estadoInicial) {
      setEstado(estadoInicial);
      setFasePvp("p1");
      setAcaoP1(null);
    }
    if (isTorre) {
      setMostrarBanner(true);
      setBannerKey((k) => k + 1);
    }
  }, [estadoInicial]);

  if (!estado) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#000",
          color: "#fff",
          fontSize: 24,
          fontWeight: 900,
        }}
      >
        Conectando ao servidor...
      </div>
    );
  }

  const { p1, p2, combateAtivo, vencedor } = estado;

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
        } catch {
          setLog("Erro ao conectar com o servidor.");
        } finally {
          setCarregando(false);
          setFasePvp("p1");
          setAcaoP1(null);
        }
      }
    } else {
      setCarregando(true);
      try {
        const novoEstado = await atacar(acao);
        setEstado(novoEstado);
        setLog(novoEstado.log || "");
      } catch {
        setLog("Erro ao conectar com o servidor. O backend está rodando?");
      } finally {
        setCarregando(false);
      }
    }
  };

  const hpPct = (cur, max) => Math.max(0, Math.round((cur / max) * 100));
  const hpColor = (pct) =>
    pct > 50 ? "#22c55e" : pct > 25 ? "#eab308" : "#ef4444";

  const lutadorAtual = isPvp && fasePvp === "p2" ? p2 : p1;
  const avatarP1 = player?.image || getAvatar(p1.nome);
  const avatarP2 = playerDois?.image || getAvatar(p2.nome);
  const spriteBack = getSprite(p1.nome, "back");
  const spriteFront = getSprite(p2.nome, "front");

  const playerVenceu = vencedor === p1.nome;
  const torreAcabou =
    isTorre && torreInfo && torreInfo.index >= torreInfo.sequencia.length - 1;
  const roundNum = isTorre ? torreInfo.index + 1 : 1;
  const isFinalRound =
    isTorre && torreInfo && torreInfo.index === torreInfo.sequencia.length - 1;

  const bannerColor = fasePvp === "p1" ? "#eab308" : "#ef4444";
  const bannerBg =
    fasePvp === "p1" ? "rgba(120,80,0,0.35)" : "rgba(120,0,0,0.35)";

  const atkDisabled = (extra = false) => !combateAtivo || carregando || extra;
  const atkStyle = (disabled) => ({
    position: "relative",
    background: disabled ? "#06060a" : "#0a0a12",
    border: `2px solid ${disabled ? "#111120" : "#1f1f3a"}`,
    borderBottom: `5px solid ${disabled ? "#08080e" : "#111120"}`,
    padding: "14px 10px 18px",
    cursor: disabled ? "not-allowed" : "pointer",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    opacity: disabled ? 0.35 : 1,
    fontFamily: "'Press Start 2P', monospace",
    overflow: "hidden",
    transition: "transform 0.08s, border-bottom-width 0.08s",
  });

  const typeLabel = {
    fontSize: 8,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#374151",
    borderBottom: "1px solid #1f1f3a",
    paddingBottom: 6,
    width: "100%",
  };

  const nameLabel = {
    fontSize: 13,
    color: "#e5e7eb",
    lineHeight: 1.7,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const keyStyle = {
    fontSize: 8,
    color: "#1f1f3a",
    background: "#111120",
    border: "1px solid #1f1f3a",
    padding: "3px 6px",
    letterSpacing: 1,
    fontFamily: "'Press Start 2P', monospace",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        fontFamily: "monospace",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── BANNER DE ROUND (Torre) ─────────────────────────── */}
      {isTorre && mostrarBanner && (
        <RoundBanner
          key={bannerKey}
          roundNum={roundNum}
          isFinal={isFinalRound}
          onDone={() => setMostrarBanner(false)}
        />
      )}

      {/* ── FUNDO ──────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "rgba(0,0,0,0.42)",
        }}
      />

      {/* ── BARRAS DE HP ───────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "10px 12px 6px",
          gap: 12,
        }}
      >
        {/* P1 */}
        <div
          style={{
            flex: 1,
            maxWidth: 290,
            background: "rgba(0,0,0,0.85)",
            border: "2px solid #eab308",
            padding: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {avatarP1 && (
              <img
                src={avatarP1}
                alt={p1.nome}
                style={{
                  width: 52,
                  height: 52,
                  objectFit: "cover",
                  objectPosition: "top",
                  border: "2px solid #eab308",
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  flexWrap: "wrap",
                  marginBottom: 2,
                }}
              >
                <span
                  style={{
                    color: "#fde047",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    fontSize: 13,
                  }}
                >
                  {p1.nome}
                </span>
                {isPvp && (
                  <span
                    style={{
                      fontSize: 9,
                      background: "#92400e",
                      color: "#fde047",
                      padding: "1px 5px",
                      border: "1px solid #eab308",
                      fontWeight: 700,
                    }}
                  >
                    P1
                  </span>
                )}
                {p1.status !== "NORMAL" && (
                  <span
                    style={{
                      fontSize: 9,
                      background: "#6b21a8",
                      color: "#e9d5ff",
                      padding: "1px 4px",
                      border: "1px solid #a855f7",
                    }}
                  >
                    {p1.status}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 3 }}>
                {p1.hpAtual} / {p1.hp} HP • ✦ {p1.especiaisRestantes}
              </div>
              <div
                style={{
                  width: "100%",
                  height: 10,
                  background: "#1f2937",
                  border: "1px solid #4b5563",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${hpPct(p1.hpAtual, p1.hp)}%`,
                    backgroundColor: hpColor(hpPct(p1.hpAtual, p1.hp)),
                    transition: "width 0.5s",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* VS / Round indicator */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "center",
            flexShrink: 0,
            gap: 2,
          }}
        >
          <span
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: 20,
              fontStyle: "italic",
              textShadow: "2px 2px 0 #000",
            }}
          >
            VS
          </span>
          {isTorre && (
            <span
              style={{
                fontSize: 9,
                color: isFinalRound ? "#facc15" : "#9ca3af",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                textShadow: isFinalRound ? "0 0 8px #ca8a04" : "none",
              }}
            >
              {isFinalRound ? "FINAL" : `R${roundNum}`}
            </span>
          )}
        </div>

        {/* P2 */}
        <div
          style={{
            flex: 1,
            maxWidth: 290,
            background: "rgba(0,0,0,0.85)",
            border: "2px solid #ef4444",
            padding: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                  marginBottom: 2,
                }}
              >
                {p2.status !== "NORMAL" && (
                  <span
                    style={{
                      fontSize: 9,
                      background: "#6b21a8",
                      color: "#e9d5ff",
                      padding: "1px 4px",
                      border: "1px solid #a855f7",
                    }}
                  >
                    {p2.status}
                  </span>
                )}
                {isPvp && (
                  <span
                    style={{
                      fontSize: 9,
                      background: "#7f1d1d",
                      color: "#fca5a5",
                      padding: "1px 5px",
                      border: "1px solid #ef4444",
                      fontWeight: 700,
                    }}
                  >
                    P2
                  </span>
                )}
                <span
                  style={{
                    color: "#fca5a5",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    fontSize: 13,
                  }}
                >
                  {p2.nome}
                </span>
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#9ca3af",
                  textAlign: "right",
                  marginBottom: 3,
                }}
              >
                {p2.hpAtual} / {p2.hp} HP
              </div>
              <div
                style={{
                  width: "100%",
                  height: 10,
                  background: "#1f2937",
                  border: "1px solid #4b5563",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${hpPct(p2.hpAtual, p2.hp)}%`,
                    backgroundColor: hpColor(hpPct(p2.hpAtual, p2.hp)),
                    transition: "width 0.5s",
                    float: "right",
                  }}
                />
              </div>
            </div>
            {avatarP2 && (
              <img
                src={avatarP2}
                alt={p2.nome}
                style={{
                  width: 52,
                  height: 52,
                  objectFit: "cover",
                  objectPosition: "top",
                  border: "2px solid #ef4444",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── BANNER PVP ─────────────────────────────────────── */}
      {isPvp && combateAtivo && !carregando && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "4px 0",
            background: bannerBg,
            border: `1px solid ${bannerColor}`,
            margin: "0 12px",
          }}
        >
          <span
            style={{
              color: bannerColor,
              fontWeight: 900,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {fasePvp === "p1"
              ? `⚔️ ${p1.nome} — escolha seu ataque`
              : `⚔️ ${p2.nome} — escolha seu ataque`}
          </span>
        </div>
      )}

      {/* ── ARENA (área elástica com sprites absolutos) ─────── */}
      <div style={{ position: "relative", zIndex: 10, flex: 1 }}>
        {spriteBack && (
          <img
            src={spriteBack}
            alt={p1.nome}
            style={{
              position: "absolute",
              bottom: "-8%",
              left: "12%",
              height: "120%",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom",
              imageRendering: "pixelated",
              opacity: p1.hpAtual <= 0 ? 0.2 : 1,
              filter:
                p1.hpAtual <= 0
                  ? "grayscale(1)"
                  : "drop-shadow(4px 8px 6px rgba(0,0,0,0.9))",
              transition: "opacity 0.5s, filter 0.5s",
            }}
          />
        )}
        {spriteFront && (
          <img
            src={spriteFront}
            alt={p2.nome}
            style={{
              position: "absolute",
              bottom: "40%",
              right: "16%",
              height: "73%",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom",
              imageRendering: "pixelated",
              opacity: p2.hpAtual <= 0 ? 0.2 : 1,
              filter:
                p2.hpAtual <= 0
                  ? "grayscale(1)"
                  : "drop-shadow(-4px 8px 6px rgba(0,0,0,0.9))",
              transition: "opacity 0.5s, filter 0.5s",
              transform: "scaleX(-1)",
            }}
          />
        )}
      </div>

      {/* ── FIM DE JOGO ────────────────────────────────────── */}
      {!combateAtivo && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.90)",
          }}
        >
          {isTorre && playerVenceu && torreAcabou && (
            <>
              <div
                style={{
                  fontSize: 13,
                  color: "#fde047",
                  fontWeight: 900,
                  letterSpacing: 4,
                  marginBottom: 8,
                  textTransform: "uppercase",
                }}
              >
                🏆 MODO TORRE 🏆
              </div>
              <h2
                style={{
                  fontSize: 60,
                  fontWeight: 900,
                  fontStyle: "italic",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  color: "#fde047",
                  textShadow: "0 0 30px gold",
                }}
              >
                Campeão!
              </h2>
              <p style={{ color: "white", fontSize: 18, marginBottom: 28 }}>
                Você conquistou a Torre!
              </p>
              <button
                onClick={onSair}
                style={estiloBtn("#eab308", "#78350f", "black")}
              >
                Menu Principal
              </button>
            </>
          )}
          {isTorre && playerVenceu && !torreAcabou && (
            <>
              <div
                style={{
                  fontSize: 13,
                  color: "#86efac",
                  fontWeight: 700,
                  letterSpacing: 3,
                  marginBottom: 8,
                  textTransform: "uppercase",
                }}
              >
                Luta {torreInfo.index + 1} / {torreInfo.sequencia.length}{" "}
                concluída
              </div>
              <h2
                style={{
                  fontSize: 60,
                  fontWeight: 900,
                  fontStyle: "italic",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  color: "#4ade80",
                  textShadow: "0 0 30px #16a34a",
                }}
              >
                Vitória!
              </h2>
              <p style={{ color: "white", fontSize: 18, marginBottom: 28 }}>
                Próximo:{" "}
                <strong style={{ color: "#fde047" }}>
                  {torreInfo.sequencia[torreInfo.index + 1]}
                </strong>
              </p>
              <button
                onClick={() => torreInfo.onProximaLuta(torreInfo.index + 1)}
                style={estiloBtn("#16a34a", "#14532d", "white")}
              >
                ⚔️ Próxima Luta
              </button>
            </>
          )}
          {isTorre && !playerVenceu && (
            <>
              <div
                style={{
                  fontSize: 13,
                  color: "#f87171",
                  fontWeight: 700,
                  letterSpacing: 3,
                  marginBottom: 8,
                  textTransform: "uppercase",
                }}
              >
                Torre — Luta {torreInfo.index + 1}
              </div>
              <h2
                style={{
                  fontSize: 60,
                  fontWeight: 900,
                  fontStyle: "italic",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  color: "#ef4444",
                  textShadow: "0 0 30px #dc2626",
                }}
              >
                Derrota!
              </h2>
              <p style={{ color: "white", fontSize: 18, marginBottom: 28 }}>
                {vencedor} te eliminou da Torre.
              </p>
              <button
                onClick={onSair}
                style={estiloBtn("#dc2626", "#7f1d1d", "white")}
              >
                Menu Principal
              </button>
            </>
          )}
          {!isTorre && (
            <>
              <h2
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  fontStyle: "italic",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  color: playerVenceu ? "#fde047" : "#ef4444",
                  textShadow: `0 0 30px ${playerVenceu ? "gold" : "#dc2626"}`,
                }}
              >
                {playerVenceu ? "Vitória!" : "Derrota!"}
              </h2>
              <p style={{ color: "white", fontSize: 18, marginBottom: 32 }}>
                {vencedor} venceu o combate!
              </p>
              <button
                onClick={onSair}
                style={estiloBtn("#eab308", "#78350f", "black")}
              >
                Menu Principal
              </button>
            </>
          )}
        </div>
      )}

      {/* ── LOG ────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 10, margin: "0 12px 6px" }}>
        <div
          style={{
            background: "rgba(6,6,10,0.95)",
            borderLeft: "4px solid #eab308",
            border: "2px solid #1f1f3a",
            padding: "8px 14px",
            minHeight: 44,
          }}
        >
          <p
            style={{
              color: carregando ? "#6b7280" : "#d1d5db",
              fontSize: 10,
              lineHeight: 1.8,
              margin: 0,
              letterSpacing: 1,
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            {carregando ? "EXECUTANDO..." : log}
          </p>
        </div>
      </div>

      {/* ── BOTÕES DE AÇÃO ─────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          padding: "0 12px 12px",
        }}
      >
        {/* ATAQUE RAPIDO */}
        <button
          onClick={() => handleAtacar("ATAQUE_RAPIDO")}
          disabled={atkDisabled()}
          style={atkStyle(atkDisabled())}
        >
          <Scanlines />
          <Corners />
          <div style={typeLabel}>Rapido</div>
          <div style={nameLabel}>{lutadorAtual.ataques?.rapido ?? "---"}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              marginTop: 4,
            }}
          >
            <span style={{ fontSize: 8, color: "#6b7280", letterSpacing: 1 }}>
              --
            </span>
            <span style={keyStyle}>Q</span>
          </div>
        </button>

        {/* ATAQUE ESPECIAL */}
        <button
          onClick={() => handleAtacar("ATAQUE_ESPECIAL")}
          disabled={atkDisabled(lutadorAtual.especiaisRestantes <= 0)}
          style={atkStyle(atkDisabled(lutadorAtual.especiaisRestantes <= 0))}
        >
          <Scanlines />
          <Corners />
          <div style={typeLabel}>Especial</div>
          <div style={nameLabel}>{lutadorAtual.ataques?.especial ?? "---"}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              marginTop: 4,
            }}
          >
            <span
              style={{
                fontSize: 8,
                color:
                  lutadorAtual.especiaisRestantes > 0 ? "#6b7280" : "#374151",
                letterSpacing: 1,
              }}
            >
              {lutadorAtual.especiaisRestantes > 0
                ? `${lutadorAtual.especiaisRestantes}x`
                : "ESGOTADO"}
            </span>
            <span style={keyStyle}>W</span>
          </div>
        </button>

        {/* PASSIVA */}
        <button
          onClick={() => handleAtacar("ATAQUE_PASSIVA")}
          disabled={atkDisabled()}
          style={atkStyle(atkDisabled())}
        >
          <Scanlines />
          <Corners />
          <div style={typeLabel}>Passiva</div>
          <div style={nameLabel}>{lutadorAtual.ataques?.passiva ?? "---"}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              marginTop: 4,
            }}
          >
            <span style={{ fontSize: 8, color: "#6b7280", letterSpacing: 1 }}>
              --
            </span>
            <span style={keyStyle}>E</span>
          </div>
        </button>
      </div>

      {/* ── BOTÃO SAIR ─────────────────────────────────────── */}
      <button
        onClick={onSair}
        style={{
          position: "fixed",
          bottom: 12,
          right: 12,
          zIndex: 50,
          background: "#7f1d1d",
          color: "white",
          fontSize: 10,
          fontWeight: 900,
          padding: "5px 10px",
          border: "2px solid #ef4444",
          textTransform: "uppercase",
          letterSpacing: 1,
          cursor: "pointer",
          boxShadow: "3px 3px 0 #000",
          fontFamily: "monospace",
        }}
      >
        ✕ Sair
      </button>

      {/* Scanlines globais */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 50,
          opacity: 0.07,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />
    </div>
  );
};

function estiloAcao(bg, border, disabled) {
  return {
    background: disabled ? "#1f2937" : bg,
    border: `2px solid ${disabled ? "#374151" : border}`,
    borderBottom: `4px solid ${disabled ? "#374151" : border}`,
    color: disabled ? "#6b7280" : "white",
    padding: "10px 6px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    transition: "all 0.1s",
    fontFamily: "monospace",
  };
}

function estiloBtn(bg, border, color) {
  return {
    background: bg,
    color,
    fontWeight: 900,
    fontSize: 18,
    padding: "12px 48px",
    border: `4px solid ${border}`,
    borderBottom: `8px solid ${border}`,
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontFamily: "monospace",
  };
}

export default ArenaBase;
