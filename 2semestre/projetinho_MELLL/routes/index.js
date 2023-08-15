// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Rota para a página principal
  res.render('index');
});

router.get('/pedido', (req, res) => {
  // Rota para a página de criação de pedidos
  res.render('pedido');
});

router.get('/cancelar', (req, res) => {
  // Rota para a página de cancelamento de pedidos
  res.render('cancelar');
});

// Defina outras rotas conforme necessário

module.exports = router;
