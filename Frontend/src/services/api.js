export async function iniciarJogo(p1, p2) {
  const res = await fetch("http://localhost:3001/iniciar", {
    method: "POST",
    body: `${p1},${p2}`,
  });
  return res.json();
}

export async function atacar() {
  const res = await fetch("http://localhost:3001/atacar");
  return res.json();
}
export async function especial() {
  const res = await fetch("http://localhost:3001/especial");
  return res.json();
}
