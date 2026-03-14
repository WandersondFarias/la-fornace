# 🍕 La Fornace — Sistema de Pizzaria Full Stack

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-Deploy-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)

**Sistema completo de pedidos para pizzaria — do zero ao deploy em produção**

[🌐 Demo ao vivo](https://la-fornace-production.up.railway.app) • [📋 Funcionalidades](#-funcionalidades) • [🚀 Como rodar](#-como-rodar) • [📡 API](#-api-rest)

</div>

---

## 📌 Sobre o Projeto

**La Fornace** é um sistema de pedidos online completo para pizzaria, desenvolvido com foco em design profissional, experiência do usuário e arquitetura escalável. O projeto contempla desde o frontend responsivo até o backend com API REST, banco de dados e deploy em produção na nuvem.

> Desenvolvido como projeto prático demonstrando domínio de desenvolvimento Full Stack — frontend, backend, API REST, banco de dados e infraestrutura cloud.

---

## ✨ Funcionalidades

### 🖥️ Frontend
- **Landing page** premium com design luxuoso (tema escuro, tipografia Playfair Display + DM Sans)
- **Cardápio interativo** com filtros por categoria (Clássicas, Especiais, Doces)
- **Sistema de carrinho** completo com cálculo automático de subtotal, desconto e frete
- **Formulário de pedido** com seleção de tipo de entrega (com 10% de desconto para retirada)
- **Tela de pedidos cadastrados** com busca, filtros por status e atualização em tempo real
- **Dashboard operacional** com KPIs, gráfico de vendas por hora e donut chart
- **Indicador de status da API** em tempo real (online/offline)
- Design **totalmente responsivo** — mobile, tablet e desktop

### ⚙️ Backend
- **API REST** completa com 7 endpoints
- **Banco de dados JSON** persistente (lowdb pattern)
- **CORS** configurado para produção
- **Arquivos estáticos** servidos pelo próprio Express
- **Logs** de pedidos no console do servidor

### 🚀 Infraestrutura
- Deploy automatizado via **Railway**
- Integração contínua com **GitHub** (push → deploy automático)
- Variáveis de ambiente configuradas em produção
- Porta dinâmica via `process.env.PORT`

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML5, CSS3, JavaScript ES6+ |
| Backend | Node.js + Express 4.x |
| Banco de Dados | JSON File Database (fs nativo) |
| Hospedagem | Railway (Cloud PaaS) |
| Versionamento | Git + GitHub |
| Fontes | Google Fonts (Playfair Display + DM Sans) |

---

## 📁 Estrutura do Projeto

```
la-fornace/
├── 📄 server.js          # Backend — API REST com Express
├── 📄 index.js           # Entry point (Railway)
├── 📄 package.json       # Dependências e scripts
├── 📄 .gitignore         # Arquivos ignorados pelo Git
├── 📄 db.json            # Banco de dados (gerado automaticamente)
└── 📁 public/
    └── 📄 index.html     # Frontend completo (SPA)
```

---

## 📡 API REST

Base URL: `https://la-fornace-production.up.railway.app/api`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/pedidos` | Lista todos os pedidos |
| `GET` | `/pedidos?status=preparando` | Filtra por status |
| `GET` | `/pedidos?busca=joao` | Busca por nome ou pizza |
| `GET` | `/pedidos/:id` | Detalhe de um pedido |
| `POST` | `/pedidos` | Cria novo pedido |
| `PATCH` | `/pedidos/:id/status` | Atualiza status do pedido |
| `DELETE` | `/pedidos/:id` | Remove um pedido |
| `GET` | `/stats` | Estatísticas do dia |

### Exemplo — Criar pedido (`POST /api/pedidos`)

```json
{
  "cliente": {
    "nome": "João Silva",
    "telefone": "(34) 9 9999-9999",
    "endereco": "Rua das Palmeiras, 123",
    "complemento": "Casa"
  },
  "itens": [
    { "id": 1, "nome": "Margherita D.O.P.", "preco": 72, "qty": 2, "emoji": "🍕" }
  ],
  "pagamento": "PIX",
  "tipo": "entrega",
  "observacoes": "Sem cebola"
}
```

### Status disponíveis

| Status | Descrição |
|--------|-----------|
| `preparando` | Pizza sendo preparada na cozinha |
| `a_caminho` | Saiu para entrega |
| `entregue` | Pedido concluído |
| `cancelado` | Pedido cancelado |

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação local

```bash
# Clone o repositório
git clone https://github.com/WandersondFarias/la-fornace.git

# Entre na pasta
cd la-fornace

# Instale as dependências
npm install

# Inicie o servidor
node server.js

# Acesse no navegador
# http://localhost:3001
```

### Deploy no Railway

```bash
# 1. Faça login no Railway
# https://railway.app

# 2. Conecte o repositório GitHub

# 3. Railway detecta Node.js automaticamente
#    e executa: npm start

# 4. Gere o domínio em Settings → Networking → Generate Domain
```

---

## 🎨 Design System

| Elemento | Valor |
|----------|-------|
| Cor primária | `#C8311A` (Vermelho) |
| Cor secundária | `#C9922A` (Dourado) |
| Background | `#1A1209` (Carvão escuro) |
| Fonte display | Playfair Display (títulos) |
| Fonte corpo | DM Sans (textos) |
| Border radius | 4px — 8px |

---

## 📸 Screenshots

### Home
> Landing page com hero, cards de destaque e métricas

### Cardápio
> Grid de pizzas com filtros por categoria e sistema de carrinho

### Meus Pedidos
> Lista completa com busca, filtros de status e atualização em tempo real

### Dashboard
> KPIs, gráfico de vendas por hora e ranking de pizzas mais vendidas

---

## 🔮 Próximas Funcionalidades

- [ ] Integração com Mercado Pago (PIX e cartão)
- [ ] Notificações via WhatsApp (Twilio/Z-API)
- [ ] Autenticação JWT para área administrativa
- [ ] Migração para PostgreSQL (Supabase)
- [ ] PWA — instalável no celular
- [ ] Painel admin com relatórios avançados
- [ ] Sistema de avaliação de pedidos

---

## 👨‍💻 Autor

**Wanderson Farias**

[![GitHub](https://img.shields.io/badge/GitHub-WandersondFarias-181717?style=for-the-badge&logo=github)](https://github.com/WandersondFarias)

> Desenvolvedor Full Stack Sênior | Análise e Desenvolvimento de Sistemas | Pós-graduação em Engenharia de Software | Redes de Computadores

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

Feito com ☕ e 🍕 por **Wanderson Farias**

⭐ Se este projeto te ajudou, deixa uma estrela no repositório!

</div>
