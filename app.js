// ════════════ ESTADO E PERSISTÊNCIA ════════════
let S = { sessoes:[], rodadas:[], dias:[], config:{edital:"",prova:""}, discursivas:[] };
let sincOK = false, salvando = false, pendente = false;

const LS = "estudos-pcdf-v1";
const hoje = () => new Date().toISOString().slice(0,10);
const fmtH = s => { const h=Math.floor(s/3600), m=Math.floor(s%3600/60); return h>0?`${h}h ${m}min`:`${m}min`; };
const fmtHm = s => { const h=Math.floor(s/3600), m=Math.floor(s%3600/60), g=s%60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(g).padStart(2,"0")}`; };
const disc = id => DISCIPLINAS.find(d=>d.id===id);

async function carregar(){
  const local = localStorage.getItem(LS);
  if (local) { try { S = {...S, ...JSON.parse(local)}; } catch(e){} }
  try {
    const r = await fetch("/api/store");
    if (r.ok) {
      const d = await r.json();
      if (d && d.sessoes) S = {...S, ...d};
      sincOK = true;
    }
  } catch(e) { sincOK = false; }
  if (!S.dias.length) S.dias = [...DIAS_INICIAIS];
  statusSinc();
}
async function salvar(){
  localStorage.setItem(LS, JSON.stringify(S));
  if (salvando) { pendente = true; return; }
  salvando = true;
  try {
    const r = await fetch("/api/store", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(S)});
    sincOK = r.ok;
  } catch(e) { sincOK = false; }
  salvando = false;
  statusSinc();
  if (pendente) { pendente = false; salvar(); }
}
function statusSinc(){
  const el = document.getElementById("sinc");
  if (!el) return;
  el.textContent = sincOK ? "sincronizado" : "só neste aparelho";
  el.className = "sinc " + (sincOK ? "on" : "off");
}

// ════════════ NAVEGAÇÃO ════════════
const ABAS = [["painel","Painel"],["cal","Calendário"],["timer","Cronômetro"],["disc","Disciplinas"],["notas","Notas"],["edital","Edital"]];
let abaAtual = "painel";
function irPara(a){ abaAtual=a;
  document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("at", b.dataset.a===a));
  render();
  window.scrollTo({top:0,behavior:"smooth"});
}

// ════════════ MÉTRICAS ════════════
function metricas(){
  const dias = [...new Set(S.dias)].sort();
  const totalSeg = S.sessoes.reduce((a,s)=>a+s.seg,0);
  // streak
  let streak = 0; let d = new Date();
  if (!dias.includes(hoje())) d.setDate(d.getDate()-1);
  while (dias.includes(d.toISOString().slice(0,10))) { streak++; d.setDate(d.getDate()-1); }
  // por matéria
  const porMat = {};
  S.sessoes.forEach(s=>{ porMat[s.mat]=(porMat[s.mat]||0)+s.seg; });
  // média
  const primeiro = dias[0]||hoje();
  const corridos = Math.max(1, Math.round((Date.parse(hoje())-Date.parse(primeiro))/86400000)+1);
  // rodadas
  const rd = S.rodadas;
  const totQ = rd.reduce((a,r)=>a+r.total,0);
  const totReal = rd.reduce((a,r)=>a+r.reais,0);
  const totChute = rd.reduce((a,r)=>a+r.chutes,0);
  const dominio = totQ ? totReal/totQ*100 : 0;
  return {dias, totalSeg, streak, porMat, corridos, aderencia: dias.length/corridos*100,
    mediaDia: dias.length?totalSeg/dias.length:0, totQ, totReal, totChute, dominio};
}

// ════════════ RENDER ════════════
function render(){
  const el = document.getElementById("app");
  el.innerHTML = ({painel:vPainel, cal:vCal, timer:vTimer, disc:vDisc, notas:vNotas, edital:vEdital})[abaAtual]();
  if (abaAtual==="painel") desenhaGrafico();
  if (abaAtual==="notas") desenhaEvolucao();
  if (abaAtual==="timer") tickUI();
}

// ─── PAINEL ───
function vPainel(){
  const m = metricas();
  const cd = contagem();
  return `
  <div class="cards">
    ${card(m.streak, m.streak===1?"dia seguido":"dias seguidos","g")}
    ${card(m.dias.length,"dias estudados")}
    ${card(fmtH(m.totalSeg),"tempo total")}
    ${card(m.dominio.toFixed(0)+"%","domínio real", m.dominio>=50?"g":m.dominio>=35?"y":"r")}
  </div>
  ${cd?`<div class="box dest"><b>${cd.dias} dias</b> até ${cd.rot}${cd.data?" — "+cd.data:""}</div>`:
   `<div class="box aviso">Nenhuma data de edital ou prova registrada. <button class="lk" onclick="irPara('edital')">Definir agora</button></div>`}

  <h2>Rumo à aprovação</h2>
  <div class="box">
    <p class="mut">Meta: <b>50% de domínio real</b> em cada bloco. A barra mostra a distância.</p>
    <div class="prog"><i style="width:${Math.min(100,m.dominio/50*100)}%"></i></div>
    <p class="mut" style="margin-top:8px">Domínio real de <b>${m.dominio.toFixed(1)}%</b> — ${m.dominio>=50?"acima do corte":`faltam ${(50-m.dominio).toFixed(1)} pontos`}.</p>
  </div>

  <h2>Evolução do domínio</h2>
  <div class="box"><canvas id="graf" height="180"></canvas>
  ${S.rodadas.length<2?'<p class="mut" style="text-align:center;margin-top:8px">Responda mais rodadas para a curva aparecer.</p>':''}</div>

  <h2>Comportamento</h2>
  <table>
    <tr><td>Constância</td><td><b>${m.aderencia.toFixed(0)}%</b> dos dias desde 21/07/2026</td></tr>
    <tr><td>Média por dia estudado</td><td><b>${fmtH(m.mediaDia)}</b></td></tr>
    <tr><td>Média semanal</td><td><b>${fmtH(m.totalSeg/Math.max(1,m.corridos/7))}</b></td></tr>
    <tr><td>Questões respondidas</td><td><b>${m.totQ}</b> — ${m.totReal} reais, ${m.totChute} por chute</td></tr>
  </table>

  ${Object.keys(m.porMat).length?`<h2>Horas por matéria</h2><table>
  ${Object.entries(m.porMat).sort((a,b)=>b[1]-a[1]).map(([k,v])=>{
    const d=disc(k); const p=v/m.totalSeg*100;
    return `<tr><td>${d?d.n:k}</td><td style="width:45%"><div class="b"><i style="width:${p}%"></i></div></td><td style="text-align:right"><b>${fmtH(v)}</b></td></tr>`;
  }).join("")}</table>`:""}`;
}
function card(v,l,c=""){ return `<div class="card ${c}"><div class="v">${v}</div><div class="l">${l}</div></div>`; }
function contagem(){
  const {edital,prova} = S.config;
  const alvo = prova||edital; if(!alvo) return null;
  const dias = Math.ceil((Date.parse(alvo)-Date.parse(hoje()))/86400000);
  return {dias: dias<0?0:dias, rot: prova?"a prova":"o fim das inscrições", data: br(alvo)};
}
const br = d => d? d.split("-").reverse().join("/") : "";

// ─── CALENDÁRIO ───
let mesRef = new Date();
function vCal(){
  const m = metricas();
  const y=mesRef.getFullYear(), mo=mesRef.getMonth();
  const prim=new Date(y,mo,1).getDay(), ult=new Date(y,mo+1,0).getDate();
  let cel="";
  for(let i=0;i<prim;i++) cel+='<div class="d vazio"></div>';
  for(let d=1;d<=ult;d++){
    const iso=`${y}-${String(mo+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const on=m.dias.includes(iso), hj=iso===hoje();
    const seg=S.sessoes.filter(s=>s.data===iso).reduce((a,s)=>a+s.seg,0);
    cel+=`<div class="d ${on?"on":""} ${hj?"hoje":""}" onclick="toggleDia('${iso}')" title="${iso}">
      <span>${d}</span>${seg?`<em>${Math.round(seg/60)}m</em>`:""}</div>`;
  }
  const nomes=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
  return `<div class="box aviso">Toque num dia para marcar ou desmarcar. Os dias com tempo registrado aparecem com os minutos.</div>
  <div class="calhd"><button onclick="mudaMes(-1)">‹</button><b>${nomes[mo]} de ${y}</b><button onclick="mudaMes(1)">›</button></div>
  <div class="sem">${["D","S","T","Q","Q","S","S"].map(x=>`<div>${x}</div>`).join("")}</div>
  <div class="cal">${cel}</div>
  <div class="cards" style="margin-top:16px">
    ${card(m.dias.length,"dias no total")}${card(m.streak,"seguidos","g")}${card(m.aderencia.toFixed(0)+"%","constância")}
  </div>`;
}
function mudaMes(n){ mesRef.setMonth(mesRef.getMonth()+n); render(); }
function toggleDia(iso){
  const i=S.dias.indexOf(iso);
  if(i>=0){ if(S.sessoes.some(s=>s.data===iso)){alert("Este dia tem tempo registrado no cronômetro e não pode ser desmarcado.");return;} S.dias.splice(i,1); }
  else S.dias.push(iso);
  salvar(); render();
}

// ─── CRONÔMETRO ───
let T = {rodando:false, ini:0, acum:0, mat:"redes1", iv:null};
function vTimer(){
  return `<div class="box">
    <label class="lb">Matéria</label>
    <select id="tmat" onchange="T.mat=this.value">
      ${DISCIPLINAS.map(d=>`<option value="${d.id}" ${d.id===T.mat?"selected":""}>${d.ord}. ${d.n}</option>`).join("")}
    </select>
  </div>
  <div class="crono"><div id="disp">00:00:00</div>
    <div class="cbt">
      <button id="bp" class="pri" onclick="playPause()">${T.rodando?"Pausar":"Iniciar"}</button>
      <button class="sec" onclick="encerrar()">Encerrar e salvar</button>
      <button class="ter" onclick="zerar()">Zerar</button>
    </div>
  </div>
  <h2>Sessões de hoje</h2>
  ${(()=>{ const h=S.sessoes.filter(s=>s.data===hoje());
    return h.length?`<table>${h.map((s,i)=>`<tr><td>${disc(s.mat)?disc(s.mat).n:s.mat}</td><td style="text-align:right"><b>${fmtH(s.seg)}</b></td><td style="width:34px"><button class="x" onclick="delSessao(${S.sessoes.indexOf(s)})">×</button></td></tr>`).join("")}
    <tr><td><b>Total</b></td><td style="text-align:right"><b>${fmtH(h.reduce((a,s)=>a+s.seg,0))}</b></td><td></td></tr></table>`
    :'<div class="box mut">Nenhuma sessão registrada hoje.</div>'; })()}`;
}
function tickUI(){ const d=document.getElementById("disp"); if(d) d.textContent=fmtHm(segAtual()); }
function segAtual(){ return Math.floor(T.acum + (T.rodando?(Date.now()-T.ini)/1000:0)); }
function playPause(){
  if(T.rodando){ T.acum=segAtual(); T.rodando=false; clearInterval(T.iv); }
  else { T.ini=Date.now(); T.rodando=true; T.iv=setInterval(tickUI,500); }
  render();
}
function encerrar(){
  const s=segAtual();
  if(s<60){ alert("Menos de um minuto — nada foi salvo."); return; }
  S.sessoes.push({data:hoje(), mat:T.mat, seg:s});
  if(!S.dias.includes(hoje())) S.dias.push(hoje());
  T={rodando:false,ini:0,acum:0,mat:T.mat,iv:null}; clearInterval(T.iv);
  salvar(); render();
}
function zerar(){ clearInterval(T.iv); T={rodando:false,ini:0,acum:0,mat:T.mat,iv:null}; render(); }
function delSessao(i){ if(confirm("Apagar esta sessão?")){ S.sessoes.splice(i,1); salvar(); render(); } }

// ─── DISCIPLINAS ───
let discAberta=null, modo="conteudo", dif="media", prova=null;
function vDisc(){
  if(discAberta) return vModulo();
  const blocos=["TI","Português","Direito","RLM","DF","Outros"];
  return `<div class="box aviso">Ordem definida no Cronograma v6. Metade das horas em TI — é o bloco que reprova.</div>
  ${blocos.map(b=>{
    const ds=DISCIPLINAS.filter(d=>d.bloco===b);
    if(!ds.length) return "";
    return `<h2>${b}</h2>${ds.map(d=>{
      const rs=S.rodadas.filter(r=>r.mat===d.id);
      const ult=rs.length?rs[rs.length-1]:null;
      const pc=ult?Math.round(ult.reais/ult.total*100):null;
      return `<div class="item ${d.pronto?"":"off"}" onclick="${d.pronto?`abrir('${d.id}')`:`alert('Este módulo ainda não foi produzido.')`}">
        <span class="ord">${d.ord}</span>
        <span class="nm">${d.n}${d.pronto?"":' <em>em produção</em>'}</span>
        ${pc!==null?`<span class="pill ${pc>=60?"g":pc>=35?"y":"r"}">${pc}%</span>`:d.pronto?'<span class="pill n">novo</span>':""}
      </div>`;}).join("")}`;
  }).join("")}`;
}
function abrir(id){ discAberta=id; modo="conteudo"; prova=null; render(); }
function fechar(){ discAberta=null; prova=null; render(); }

function vModulo(){
  const d=disc(discAberta);
  const qs=QUESTOES.filter(q=>q.m===discAberta);
  const cont=CONTEUDO[discAberta]||[];
  const rs=S.rodadas.filter(r=>r.mat===discAberta);
  let corpo="";
  if(modo==="conteudo"){
    corpo=cont.map(s=>`<div class="sec"><h3>${s.t}</h3><p>${s.c}</p></div>`).join("")
      || '<div class="box mut">Conteúdo ainda não carregado.</div>';
  } else if(modo==="questoes"){
    corpo=prova?vProva():vEscolha(qs);
  } else if(modo==="disc"){
    const ds=DISCURSIVAS.filter(x=>x.m===discAberta);
    corpo = ds.length? ds.map((x,i)=>`<div class="box"><div class="dtag">Discursiva ${i+1}</div><p>${x.t}</p>
      <p class="mut">10 a 15 linhas, à mão, cronometrada. Menos de 10 linhas ou fuga do tema zera.</p></div>`).join("")
      : '<div class="box mut">Sem discursivas — reservadas às matérias de TI.</div>';
  } else {
    corpo = rs.length? `<table><tr><th>Data</th><th>Nível</th><th>Reais</th><th>Chute</th><th>Erro</th><th>%</th></tr>
      ${rs.map(r=>`<tr><td>${br(r.data)}</td><td>${r.dif}</td><td>${r.reais}</td><td>${r.chutes}</td><td>${r.total-r.reais-r.chutes}</td>
      <td><b class="${r.reais/r.total>=0.6?"vg":r.reais/r.total>=0.35?"vy":"vr"}">${Math.round(r.reais/r.total*100)}%</b></td></tr>`).join("")}</table>
      <p class="mut">Cada rodada fica registrada. Revisar não apaga o histórico.</p>`
      : '<div class="box mut">Nenhuma rodada ainda.</div>';
  }
  return `<button class="volta" onclick="fechar()">‹ Disciplinas</button>
  <h1 class="tit">${d.n}</h1>
  <div class="tabs">
    ${[["conteudo","Conteúdo"],["questoes","Questões"],["disc","Discursivas"],["hist","Histórico"]].map(([k,l])=>
      `<button class="${modo===k?"at":""}" onclick="modo='${k}';prova=null;render()">${l}</button>`).join("")}
  </div>${corpo}`;
}
function vEscolha(qs){
  const cont={facil:qs.filter(q=>q.d==="facil").length, media:qs.filter(q=>q.d==="media").length, dificil:qs.filter(q=>q.d==="dificil").length};
  return `<div class="box"><label class="lb">Nível de dificuldade</label>
    <div class="nivs">${[["facil","Fácil"],["media","Média"],["dificil","Difícil"]].map(([k,l])=>
      `<button class="niv ${dif===k?"at":""} ${cont[k]?"":"vazio"}" onclick="${cont[k]?`dif='${k}';render()`:""}">${l}<em>${cont[k]} questões</em></button>`).join("")}</div>
    <button class="pri full" onclick="iniciaProva()" ${cont[dif]?"":"disabled"}>Iniciar rodada</button>
    <p class="mut" style="margin-top:10px">Marque <b>Chutei</b> sempre que a resposta não vier de domínio. Sem isso o diagnóstico mente.</p>
  </div>`;
}
function iniciaProva(){
  const qs=QUESTOES.filter(q=>q.m===discAberta&&q.d===dif);
  prova={qs, resp:{}, chute:{}, fim:false}; render();
}
function vProva(){
  const L="ABCDE";
  return prova.qs.map((q,i)=>{
    const r=prova.resp[i], fb=prova.fim;
    let cls="", txt="";
    if(fb){ if(r===undefined){cls="ch";txt=`<b>Em branco.</b> Gabarito ${L[q.g]}. ${q.j}`;}
      else if(r===q.g){ if(prova.chute[i]){cls="ch";txt=`<b>Acertou por chute.</b> ${q.j}`;} else {cls="ok";txt=`<b>Correta.</b> ${q.j}`;} }
      else {cls="no";txt=`<b>Errou.</b> Marcou ${L[r]}; o gabarito é <b>${L[q.g]}</b>. ${q.j}`;} }
    return `<div class="q"><div class="qh"><span class="qn">${i+1}</span><span>${q.e}</span></div>
    ${q.a.map((a,j)=>`<label class="alt ${fb&&j===q.g?"cert":""}"><input type="radio" name="q${i}" ${r===j?"checked":""} ${fb?"disabled":""} onchange="prova.resp[${i}]=${j}"><b>${L[j]}</b><span>${a}</span></label>`).join("")}
    <label class="cht"><input type="checkbox" ${prova.chute[i]?"checked":""} ${fb?"disabled":""} onchange="prova.chute[${i}]=this.checked"> Chutei esta questão</label>
    ${fb?`<div class="fb ${cls}">${txt}</div>`:""}</div>`;
  }).join("") + (prova.fim? vResultado() : `<button class="pri full" onclick="corrige()">Corrigir rodada</button>`);
}
function corrige(){ prova.fim=true;
  let reais=0,chutes=0;
  prova.qs.forEach((q,i)=>{ if(prova.resp[i]===q.g){ prova.chute[i]?chutes++:reais++; } });
  S.rodadas.push({data:hoje(), mat:discAberta, dif, total:prova.qs.length, reais, chutes});
  if(!S.dias.includes(hoje())) S.dias.push(hoje());
  salvar(); render();
}
function vResultado(){
  const r=S.rodadas[S.rodadas.length-1];
  const pc=Math.round(r.reais/r.total*100);
  const ant=S.rodadas.filter(x=>x.mat===r.mat&&x!==r);
  const cmp=ant.length? (()=>{ const a=ant[ant.length-1]; const pa=Math.round(a.reais/a.total*100);
    const dl=pc-pa; return `<p class="mut">Rodada anterior nesta matéria: <b>${pa}%</b> — ${dl>0?`<b class="vg">+${dl} pontos</b>`:dl<0?`<b class="vr">${dl} pontos</b>`:"sem variação"}.</p>`;})():"";
  return `<div class="box res"><h3>Resultado</h3>
    <div class="cards">${card(r.reais,"reais","g")}${card(r.chutes,"chute","y")}${card(r.total-r.reais-r.chutes,"erros","r")}${card(pc+"%","domínio")}</div>
    ${cmp}<p class="mut">Registrado no histórico da matéria.</p>
    <button class="sec full" onclick="prova=null;render()">Nova rodada</button></div>`;
}

// ─── NOTAS ───
function vNotas(){
  const m=metricas();
  const mats=[...new Set(S.rodadas.map(r=>r.mat))];
  return `<div class="cards">${card(m.totQ,"questões")}${card(m.totReal,"acertos reais","g")}${card(m.totChute,"por chute","y")}${card(m.dominio.toFixed(0)+"%","domínio")}</div>
  <h2>Evolução geral</h2><div class="box"><canvas id="evo" height="180"></canvas></div>
  <h2>Por matéria</h2>
  ${mats.length? mats.map(mt=>{
    const rs=S.rodadas.filter(r=>r.mat===mt);
    const tot=rs.reduce((a,r)=>a+r.total,0), re=rs.reduce((a,r)=>a+r.reais,0);
    const pc=Math.round(re/tot*100);
    return `<div class="box"><div class="mh"><b>${disc(mt)?disc(mt).n:mt}</b><span class="pill ${pc>=60?"g":pc>=35?"y":"r"}">${pc}%</span></div>
    <table>${rs.map((r,i)=>`<tr><td>${i+1}ª rodada · ${br(r.data)}</td><td>${r.dif}</td><td style="text-align:right"><b>${Math.round(r.reais/r.total*100)}%</b></td></tr>`).join("")}</table></div>`;
  }).join("") : '<div class="box mut">Nenhuma rodada respondida ainda.</div>'}
  <h2>Backup</h2>
  <div class="box"><p class="mut">Guarde uma cópia dos dados ou restaure em outro aparelho.</p>
  <button class="sec" onclick="exportar()">Exportar</button>
  <button class="sec" onclick="document.getElementById('imp').click()">Importar</button>
  <input type="file" id="imp" accept=".json" style="display:none" onchange="importar(this)"></div>`;
}
function exportar(){
  const b=new Blob([JSON.stringify(S,null,2)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(b);
  a.download=`estudos-pcdf-${hoje()}.json`; a.click();
}
function importar(inp){
  const f=inp.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=e=>{ try{ S={...S,...JSON.parse(e.target.result)}; salvar(); render(); alert("Dados importados."); }
    catch(x){ alert("Arquivo inválido."); } };
  r.readAsText(f);
}

// ─── EDITAL ───
function vEdital(){
  const cd=contagem();
  return `${cd?`<div class="cont"><div class="cn">${cd.dias}</div><div class="cl">dias até ${cd.rot}</div></div>`:""}
  <div class="box"><label class="lb">Data de publicação do edital</label>
    <input type="date" value="${S.config.edital||""}" onchange="S.config.edital=this.value;salvar();render()">
    <label class="lb" style="margin-top:14px">Data prevista da prova</label>
    <input type="date" value="${S.config.prova||""}" onchange="S.config.prova=this.value;salvar();render()">
    <p class="mut">Se as duas estiverem preenchidas, a contagem usa a data da prova.</p></div>
  <h2>O que já se sabe</h2>
  <table>
    <tr><td>Cargo</td><td><b>Perito Criminal — Área 5, TI</b></td></tr>
    <tr><td>Vagas na área</td><td><b>55</b> de 150</td></tr>
    <tr><td>Banca</td><td>Em definição: Access, Verbena, FGV, IDCAP</td></tr>
    <tr><td>Estrutura de referência</td><td>40 gerais + 40 específicos</td></tr>
    <tr><td>Corte</td><td><b>20 em cada bloco</b>, sem compensação</td></tr>
    <tr><td>Discursiva</td><td>4 questões · <b>abaixo de 60 elimina</b></td></tr>
    <tr><td>Eliminatórios extras</td><td>CNH · teste físico</td></tr>
  </table>
  <div class="box aviso">Zerar Língua Portuguesa elimina do certame, qualquer que seja o restante da nota.</div>`;
}

// ─── GRÁFICOS ───
function linha(id, pts, rot){
  const c=document.getElementById(id); if(!c) return;
  const x=c.getContext("2d"), W=c.width=c.offsetWidth, H=c.height;
  x.clearRect(0,0,W,H);
  const P=34, w=W-P*2, h=H-P;
  x.strokeStyle="#dbe2e8"; x.lineWidth=1;
  for(let i=0;i<=4;i++){ const y=P/2+h*(i/4);
    x.beginPath(); x.moveTo(P,y); x.lineTo(W-P/2,y); x.stroke();
    x.fillStyle="#8b98a5"; x.font="10px Helvetica"; x.textAlign="right";
    x.fillText(100-i*25+"%", P-6, y+3); }
  // linha da meta
  const ym=P/2+h*0.5; x.strokeStyle="#c0392b"; x.setLineDash([4,3]);
  x.beginPath(); x.moveTo(P,ym); x.lineTo(W-P/2,ym); x.stroke(); x.setLineDash([]);
  if(pts.length<1) return;
  const px=i=>P+(pts.length===1?w/2:w*(i/(pts.length-1)));
  const py=v=>P/2+h*(1-v/100);
  x.strokeStyle="#0f2b46"; x.lineWidth=2.5; x.beginPath();
  pts.forEach((p,i)=>{ i?x.lineTo(px(i),py(p)):x.moveTo(px(i),py(p)); }); x.stroke();
  pts.forEach((p,i)=>{ x.fillStyle=p>=50?"#2e7d32":p>=35?"#9a7b30":"#c0392b";
    x.beginPath(); x.arc(px(i),py(p),4.5,0,7); x.fill(); });
  x.fillStyle="#8b98a5"; x.font="10px Helvetica"; x.textAlign="center";
  x.fillText(rot, W/2, H-4);
}
function serie(){
  let ac={r:0,t:0}; return S.rodadas.map(x=>{ac.r+=x.reais;ac.t+=x.total;return ac.r/ac.t*100;});
}
function desenhaGrafico(){ linha("graf", serie(), "linha vermelha = corte de 50%"); }
function desenhaEvolucao(){ linha("evo", serie(), "domínio real acumulado por rodada"); }

// ─── BOOT ───
(async function(){
  document.getElementById("nav").innerHTML = ABAS.map(([k,l])=>
    `<button data-a="${k}" class="${k==='painel'?'at':''}" onclick="irPara('${k}')">${l}</button>`).join("");
  await carregar();
  render();
  window.addEventListener("resize",()=>{ if(abaAtual==="painel")desenhaGrafico(); if(abaAtual==="notas")desenhaEvolucao(); });
})();
