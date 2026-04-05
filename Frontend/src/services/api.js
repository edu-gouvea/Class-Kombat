const BASE = "http://localhost:3001";

// POST /iniciar  —  body: "p1nome,p2nome"
export async function iniciarJogo(p1, p2) {
  const res = await fetch(`${BASE}/iniciar`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: `${p1},${p2}`,
  });
  return res.json();
}

// POST /atacar  —  body: "ATAQUE_RAPIDO" | "ATAQUE_ESPECIAL" | "ATAQUE_PASSIVA"
export async function atacar(acao) {
  const res = await fetch(`${BASE}/atacar`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: acao,
  });
  return res.json();
}
