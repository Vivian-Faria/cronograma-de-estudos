import { getStore } from "@netlify/blobs";

const KEY = "dados";
const H = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

export default async (req) => {
  if (req.method === "OPTIONS") return new Response("", { status: 204, headers: H });

  let store;
  try {
    store = getStore({ name: "estudos-pcdf", consistency: "strong" });
  } catch (e) {
    return new Response(JSON.stringify({
      erro: "blobs_indisponivel",
      detalhe: String(e && e.message || e),
      dica: "O Netlify Blobs não inicializou. Confirme que o deploy incluiu netlify/functions/store.js e que @netlify/blobs está em package.json."
    }), { status: 500, headers: H });
  }

  try {
    if (req.method === "GET") {
      const d = await store.get(KEY, { type: "json" });
      return new Response(JSON.stringify({ ok: true, dados: d || null }), { status: 200, headers: H });
    }
    if (req.method === "POST") {
      const body = await req.json();
      body.atualizadoEm = Date.now();
      await store.setJSON(KEY, body);
      return new Response(JSON.stringify({ ok: true, atualizadoEm: body.atualizadoEm }), { status: 200, headers: H });
    }
    return new Response(JSON.stringify({ erro: "metodo_nao_suportado" }), { status: 405, headers: H });
  } catch (e) {
    return new Response(JSON.stringify({ erro: "falha_operacao", detalhe: String(e && e.message || e) }), { status: 500, headers: H });
  }
};

export const config = { path: "/api/store" };
