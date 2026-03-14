// ============================================
//  LA FORNACE — Backend Node.js
//  Stack: Express + lowdb (JSON file database)
//  Porta: 3001
// ============================================

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT;

// ---------- MIDDLEWARES ----------
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---------- BANCO DE DADOS (JSON simples) ----------
const DB_FILE = path.join(__dirname, 'db.json');

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    const inicial = { pedidos: [], contador: 1000 };
    fs.writeFileSync(DB_FILE, JSON.stringify(inicial, null, 2));
    return inicial;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ---------- UTILITÁRIO ----------
function gerarId(db) {
  db.contador += 1;
  writeDB(db);
  return `#${db.contador}`;
}

// ============================================================
//  ROTAS
// ============================================================

// GET /api/pedidos — listar todos os pedidos (mais recente primeiro)
app.get('/api/pedidos', (req, res) => {
  const db = readDB();
  const { status, busca } = req.query;

  let lista = [...db.pedidos].reverse(); // mais recente primeiro

  if (status && status !== 'todos') {
    lista = lista.filter(p => p.status === status);
  }

  if (busca) {
    const q = busca.toLowerCase();
    lista = lista.filter(p =>
      p.id.toLowerCase().includes(q) ||
      p.cliente.nome.toLowerCase().includes(q) ||
      p.itens.some(i => i.nome.toLowerCase().includes(q))
    );
  }

  res.json({ total: lista.length, pedidos: lista });
});

// GET /api/pedidos/:id — detalhe de um pedido
app.get('/api/pedidos/:id', (req, res) => {
  const db = readDB();
  const pedido = db.pedidos.find(p => p.id === req.params.id);
  if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });
  res.json(pedido);
});

// POST /api/pedidos — criar novo pedido
app.post('/api/pedidos', (req, res) => {
  const { cliente, itens, pagamento, tipo, observacoes } = req.body;

  if (!cliente?.nome) return res.status(400).json({ erro: 'Nome do cliente obrigatório' });
  if (!itens?.length) return res.status(400).json({ erro: 'Pedido sem itens' });

  const db = readDB();

  const subtotal = itens.reduce((s, i) => s + i.preco * i.qty, 0);
  const frete    = tipo === 'retirada' ? 0 : 6;
  const desconto = tipo === 'retirada' ? Math.round(subtotal * 0.1) : 0;
  const total    = subtotal + frete - desconto;

  const novoPedido = {
    id:          gerarId(db),
    criadoEm:   new Date().toISOString(),
    status:     'preparando',
    cliente:    {
      nome:      cliente.nome,
      telefone:  cliente.telefone || '',
      endereco:  cliente.endereco || '',
      complemento: cliente.complemento || '',
    },
    itens,
    pagamento:  pagamento || 'Não informado',
    tipo:       tipo || 'entrega',
    observacoes: observacoes || '',
    subtotal,
    frete,
    desconto,
    total,
    historico: [
      { status: 'preparando', hora: new Date().toISOString() }
    ]
  };

  db.pedidos.push(novoPedido);
  writeDB(db);

  console.log(`[NOVO PEDIDO] ${novoPedido.id} — ${cliente.nome} — R$ ${total}`);
  res.status(201).json(novoPedido);
});

// PATCH /api/pedidos/:id/status — atualizar status
app.patch('/api/pedidos/:id/status', (req, res) => {
  const { status } = req.body;
  const statusValidos = ['preparando', 'a_caminho', 'entregue', 'cancelado'];

  if (!statusValidos.includes(status)) {
    return res.status(400).json({ erro: 'Status inválido' });
  }

  const db = readDB();
  const pedido = db.pedidos.find(p => p.id === req.params.id);
  if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });

  pedido.status = status;
  pedido.historico.push({ status, hora: new Date().toISOString() });
  writeDB(db);

  res.json(pedido);
});

// DELETE /api/pedidos/:id — cancelar/remover pedido
app.delete('/api/pedidos/:id', (req, res) => {
  const db = readDB();
  const idx = db.pedidos.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erro: 'Pedido não encontrado' });

  db.pedidos.splice(idx, 1);
  writeDB(db);
  res.json({ mensagem: 'Pedido removido' });
});

// GET /api/stats — estatísticas rápidas para o dashboard
app.get('/api/stats', (req, res) => {
  const db    = readDB();
  const hoje  = new Date().toDateString();
  const diario = db.pedidos.filter(p => new Date(p.criadoEm).toDateString() === hoje);

  const receita  = diario.reduce((s, p) => s + p.total, 0);
  const qtd      = diario.length;
  const ticket   = qtd ? Math.round(receita / qtd) : 0;

  const porStatus = db.pedidos.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  res.json({ receita, pedidos: qtd, ticket, porStatus, total: db.pedidos.length });
});

// Fallback: serve o frontend
app.get('*path', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---------- START ----------
app.listen(PORT, () => {
  console.log(`\n🍕  La Fornace — Backend rodando!`);
  console.log(`    http://localhost:${PORT}\n`);
  console.log(`    Rotas disponíveis:`);
  console.log(`    GET    /api/pedidos`);
  console.log(`    GET    /api/pedidos/:id`);
  console.log(`    POST   /api/pedidos`);
  console.log(`    PATCH  /api/pedidos/:id/status`);
  console.log(`    DELETE /api/pedidos/:id`);
  console.log(`    GET    /api/stats\n`);
});
