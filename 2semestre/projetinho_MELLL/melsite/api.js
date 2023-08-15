const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

// Função para verificar se um pedido existe
function checkPedidoExistente(pessoa, quantidade, tipoMel, tamanho) {
  return new Promise((resolve, reject) => {
    const selectQuery = `SELECT * FROM pedidos WHERE pessoa = ? AND quantidade = ? AND tipo = ? AND tamanho = ?`;
    db.query(selectQuery, [pessoa, quantidade, tipoMel, tamanho], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results.length > 0);
    });
  });
}

// Função para fazer um novo pedido
async function fazerPedido(pessoa, quantidade, tipoMel, tamanho) {
  const pedidoExistente = await checkPedidoExistente(pessoa, quantidade, tipoMel, tamanho);
  if (pedidoExistente) {
    return { success: false };
  }

  const insertQuery = `INSERT INTO pedidos (pessoa, quantidade, tipo, tamanho) VALUES (?, ?, ?, ?)`;
  db.query(insertQuery, [pessoa, quantidade, tipoMel, tamanho], (err, result) => {
    if (err) {
      console.error("Erro ao registrar pedido:", err);
      return { success: false };
    }
  });

  return { success: true };
}

module.exports = {
  fazerPedido,
};
