import { getStore } from "@netlify/blobs";

const KEY = "dados";

export default async (req, context) => {
  const store = getStore({ name: "estudos-pcdf", consistency: "strong" });
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") return new Response("", { status: 204, headers });

  try {
    if (req.method === "GET") {
      const dados = await store.get(KEY, { type: "json" });
      return new Response(JSON.stringify(dados || null), { status: 200, headers });
    }
    if (req.method === "POST") {
      const body = await req.json();
      await store.setJSON(KEY, body);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    }
    return new Response(JSON.stringify({ erro: "método não suportado" }), { status: 405, headers });
  } catch (e) {
    return new Response(JSON.stringify({ erro: String(e) }), { status: 500, headers });
  }
};

export const config = { path: "/api/store" };
