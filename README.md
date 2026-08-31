# Plataforma de Estudos — Perito Criminal PC-DF (Área 5 · TI)

Acompanhamento de estudos com sincronia entre dispositivos via Netlify Blobs.

## Como publicar

1. Crie um repositório no GitHub e envie estes arquivos:

```
index.html
netlify.toml
package.json
netlify/functions/store.js
```

2. No Netlify: **Add new site → Import an existing project** e selecione o repositório.
3. Deixe o build command vazio. Publish directory: `.`
4. Deploy.

Não é preciso configurar variável de ambiente: o Netlify Blobs funciona automaticamente
em sites com Functions no mesmo projeto.

## Como funciona a sincronia

Todos os dados (sessões de estudo, rodadas de questões, revisões, datas do edital)
ficam num único registro no Blobs, gravado pela função `/api/store`.

- Ao abrir, a plataforma lê os dados do servidor.
- A cada alteração, grava de volta.
- Se o servidor estiver indisponível, ela usa o armazenamento local do navegador
  e sincroniza assim que voltar.

## Backup

Na aba **Saldo** há botões para exportar e importar os dados em JSON.
