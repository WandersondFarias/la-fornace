# 🍕 La Fornace — Sistema de Pizzaria

## Stack
- **Backend:** Node.js + Express
- **Banco de dados:** JSON file (db.json) — sem necessidade de instalar PostgreSQL ou MongoDB
- **Frontend:** HTML + CSS + JS puro (na pasta `/public`)

---

## Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor
```bash
node server.js
```

### 3. Acessar no navegador
```
http://localhost:3001
```

---

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/pedidos | Listar todos os pedidos |
| GET | /api/pedidos?status=preparando | Filtrar por status |
| GET | /api/pedidos?busca=joao | Buscar por nome/pizza |
| GET | /api/pedidos/:id | Detalhe de um pedido |
| POST | /api/pedidos | Criar novo pedido |
| PATCH | /api/pedidos/:id/status | Atualizar status |
| DELETE | /api/pedidos/:id | Remover pedido |
| GET | /api/stats | Estatísticas do dia |

---

## Status dos pedidos
- `preparando` — Pizza na cozinha
- `a_caminho`  — Saiu para entrega
- `entregue`   — Concluído
- `cancelado`  — Cancelado

---

## Estrutura do projeto
```
pizzaria/
├── server.js          ← Backend Node.js
├── db.json            ← Banco de dados (criado automaticamente)
├── package.json
└── public/
    └── index.html     ← Frontend completo
```

---

## Evoluindo para produção
Para um sistema real, substitua o `db.json` por:
- **PostgreSQL** com `pg` ou `prisma`
- **MongoDB** com `mongoose`
- **Supabase** (PostgreSQL na nuvem, gratuito)
