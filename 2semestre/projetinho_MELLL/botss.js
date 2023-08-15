const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const mysql = require('mysql');
const fs = require('fs');

const SESSION_FILE_PATH = './session.json'; // Caminho para o arquivo de sessão

let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  session: sessionData,
  authStrategy: new LocalAuth({ session: sessionData })
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

// Defina os preços unitários para cada tipo e tamanho de mel
const precosUnitarios = {
  'lar': {
    270: 11.00,
    450: 18.00,
    500: 19.00,
    800: 30.00
  },
  'sil': {
    270: 10.00,
    450: 16.00,
    500: 17.00,
    800: 26.00
  },
  'euc': {
    270: 10.00,
    450: 16.00,
    500: 17.00,
    800: 26.00
  }
};

// Função para mapear tipos de mel para opções abreviadas
function mapTipoMel(tipo) {
  const tipoMelMap = {
    'lar': 'lar',
    'laranjeira': 'lar',
    'sil': 'sil',
    'silvestre': 'sil',
    'euc': 'euc',
    'eucalipto': 'euc'
  };
  return tipoMelMap[tipo.toLowerCase()] || null;
}

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

// Função para inserir um novo pedido
async function inserirPedido(pessoa, quantidade, tipoMel, tamanho) {
  // Verifica se o pedido já existe
  const pedidoExistente = await checkPedidoExistente(pessoa, quantidade, tipoMel, tamanho);
  if (pedidoExistente) {
    console.log('Pedido já existe.');
    return false;
  }
  // Calcula o preço total do pedido
  const precoUnitario = calcularPrecoUnitario(tipoMel, tamanho);
  const precoTotal = quantidade * precoUnitario;

  // Insere o pedido no banco de dados
  const insertQuery = `INSERT INTO pedidos (pessoa, quantidade, tipo, tamanho) VALUES (?, ?, ?, ?)`;
  db.query(insertQuery, [pessoa, quantidade, tipoMel, tamanho], (err, result) => {
    if (err) {
      console.error('Erro ao registrar pedido:', err);
      return;
    }
    console.log('Pedido registrado com sucesso!');
    console.log(`Preço Total: R$ ${precoTotal.toFixed(2)}`);
  });
}

// Função para calcular o preço unitário do mel com base no tipo e tamanho
function calcularPrecoUnitario(tipoMel, tamanho) {
  const tipo = mapTipoMel(tipoMel);
  if (tipo && precosUnitarios[tipo] && precosUnitarios[tipo][tamanho]) {
    return precosUnitarios[tipo][tamanho];
  } else {
    return 0; // Caso os valores não sejam encontrados
  }
}

// Função para calcular o total dos pedidos de uma pessoa
function calcularTotalPedidos(pedidos) {
  let total = 0;
  for (const pedido of pedidos) {
    const precoUnitario = calcularPrecoUnitario(pedido.tipo, pedido.tamanho);
    total += pedido.quantidade * precoUnitario;
  }
  return total;
}

// Conexão ao banco de dados
db.connect((err) => {
  if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
  console.log('Conexão bem-sucedida ao banco de dados!');
});

// Exibir código QR
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

// Cliente pronto
client.on('ready', () => {
  console.log('Bot está pronto!');
});

// Autenticação bem-sucedida
client.on('authenticated', (session) => {
  console.log('Cliente autenticado');
  // Salva a sessão em um arquivo para restauração futura
  fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session));
});

// Falha na autenticação
client.on('auth_failure', (error) => {
  console.error('Falha na autenticação:', error);
  // Lida com a falha na autenticação, se necessário
});

client.initialize();


client.on('message', async (message) => {
  const parts = message.body.split(' ');

  if (parts[0].startsWith('!help')) {
    const helpMessage = `
      Bem-vindo ao Bot de Pedidos de Mel! Aqui estão os comandos disponíveis:

      !pedido {pessoa} {quantidade} {tipo de mel} {tamanho} - Fazer um novo pedido de mel.
      !cancelar {nome pessoa} {quantidade} {tipo} {tamanho} - Cancelar um pedido específico de uma pessoa.
      !baixa * - Marcar todos os pedidos como concluídos.
      !baixa * {tipo de mel} - Marcar pedidos de um tipo de mel como concluídos.
      !baixa {tamanho} {tipo de mel} - Marcar pedidos de um tamanho e tipo de mel específicos como concluídos.
      !status {nome pessoa} - Mostrar pedidos e calcular total de uma pessoa.
      !status [lar|sil|euc] - Mostrar o status de todos os pedidos ou filtrar por tipo de mel.
      !help - Mostrar esta mensagem de ajuda.
    `;

    await message.reply(helpMessage);
  }

  if (parts[0].startsWith('!pedido') && parts.length === 6) {
    const pessoa = parts[1];
    const quantidade = parseInt(parts[2]);
    const tipoMel = mapTipoMel(parts[3]);
    const tamanho = parseInt(parts[4]);

    if (!tipoMel || isNaN(quantidade) || isNaN(tamanho)) {
      await message.reply('Pedido inválido. Verifique os valores informados.');
      return;
    }

    const insertQuery = `INSERT INTO pedidos (pessoa, quantidade, tipo, tamanho) VALUES (?, ?, ?, ?)`;
    db.query(insertQuery, [pessoa, quantidade, tipoMel, tamanho], (err, result) => {
      if (err) {
        console.error('Erro ao registrar pedido:', err);
        return;
      }
      console.log('Pedido registrado com sucesso!');
      message.reply('Pedido registrado com sucesso!');
    });
  }

  if (parts[0].startsWith('!cancelar') && parts.length === 4) {
    const pessoaPedido = parts[1];
    const quantidade = parseInt(parts[2]);
    const tipoMel = mapTipoMel(parts[3]);
    const tamanho = parseInt(parts[4]);

    if (!tipoMel || isNaN(quantidade) || isNaN(tamanho)) {
      await message.reply('Dados inválidos. Verifique os valores informados.');
      return;
    }

    const pedidoExistente = await checkPedidoExistente(pessoaPedido, quantidade, tipoMel, tamanho);

    if (!pedidoExistente) {
      await message.reply('Pedido não encontrado para os valores especificados.');
      return;
    }

    const deleteQuery = `DELETE FROM pedidos WHERE pessoa = ? AND quantidade = ? AND tipo = ? AND tamanho = ?`;
    db.query(deleteQuery, [pessoaPedido, quantidade, tipoMel, tamanho], (err, result) => {
      if (err) {
        console.error('Erro ao cancelar pedido:', err);
        return;
      }
      console.log('Pedido cancelado com sucesso!');
      message.reply('Pedido cancelado com sucesso!');
    });
  }

  if (parts[0].startsWith('!baixa') && parts.length >= 2) {
    if (parts[1] === '*') {
      // Marcar todos os pedidos como concluídos
      const updateQuery = `UPDATE pedidos SET concluido = 1`;
      db.query(updateQuery, (err, result) => {
        if (err) {
          console.error('Erro ao marcar todos os pedidos como concluídos:', err);
          return;
        }
        console.log('Todos os pedidos marcados como concluídos com sucesso!');
        message.reply('Todos os pedidos marcados como concluídos com sucesso!');
      });
    } else if (parts.length === 3 && ['lar', 'sil', 'euc'].includes(parts[2])) {
      const tipoMel = mapTipoMel(parts[2]);
      if (tipoMel) {
        // Marcar pedidos de um tipo de mel como concluídos
        const updateQuery = `UPDATE pedidos SET concluido = 1 WHERE tipo = ?`;
        db.query(updateQuery, [tipoMel], (err, result) => {
          if (err) {
            console.error('Erro ao marcar pedidos como concluídos:', err);
            return;
          }
          console.log(`Pedidos de tipo ${tipoMel} marcados como concluídos com sucesso!`);
          message.reply(`Pedidos de tipo ${tipoMel} marcados como concluídos com sucesso!`);
        });
      } else {
        message.reply('Tipo de mel inválido.');
      }
    } else if (parts.length === 4 && !isNaN(parts[1]) && ['lar', 'sil', 'euc'].includes(parts[3])) {
      const tamanho = parseInt(parts[1]);
      const tipoMel = mapTipoMel(parts[3]);
      if (tipoMel) {
        // Marcar pedidos de um tamanho e tipo de mel específicos como concluídos
        const updateQuery = `UPDATE pedidos SET concluido = 1 WHERE tamanho = ? AND tipo = ?`;
        db.query(updateQuery, [tamanho, tipoMel], (err, result) => {a
          if (err) {
            console.error('Erro ao marcar pedidos como concluídos:', err);
            return;
          }
          console.log(`Pedidos de tamanho ${tamanho} e tipo ${tipoMel} marcados como concluídos com sucesso!`);
          message.reply(`Pedidos de tamanho ${tamanho} e tipo ${tipoMel} marcados como concluídos com sucesso!`);
        });
      } else {
        message.reply('Tipo de mel inválido.');
      }
    } else {
      message.reply('Comando !baixa inválido. Use !baixa * para marcar todos os pedidos como concluídos, !baixa * [lar|sil|euc] para marcar pedidos de um tipo de mel como concluídos, ou !baixa [tamanho] [lar|sil|euc] para marcar pedidos de um tamanho e tipo de mel específicos como concluídos.');
    }
  }
  
  if (parts[0].startsWith('!status') && parts.length >= 2) {
    if (parts.length === 2) {
      const pessoaPedido = parts[1];
      const selectQuery = `SELECT * FROM pedidos WHERE pessoa = ?`;
      db.query(selectQuery, [pessoaPedido], (err, results) => {
        if (err) {
          console.error('Erro ao buscar pedidos:', err);
          return;
        }

        if (results.length === 0) {
          message.reply('Nenhum pedido encontrado para a pessoa especificada.');
          return;
        }

        let statusMessage = `Status dos Pedidos de ${pessoaPedido}:\n`;
        let total = 0;
        for (const pedido of results) {
          const precoUnitario = calcularPrecoUnitario(pedido.tipo, pedido.tamanho);
          const precoTotal = pedido.quantidade * precoUnitario;
          total += precoTotal;
          statusMessage += `ID: ${pedido.id}, Quantidade: ${pedido.quantidade}, Tipo: ${pedido.tipo}, Tamanho: ${pedido.tamanho}, Preço Unitário: R$ ${precoUnitario.toFixed(2)}, Preço Total: R$ ${precoTotal.toFixed(2)}\n`;
        }
        statusMessage += `Total: R$ ${total.toFixed(2)}`;
        message.reply(statusMessage);
      });
    } else if (parts.length === 3 && ['lar', 'sil', 'euc'].includes(parts[2])) {
      const tipoMel = mapTipoMel(parts[2]);
      if (tipoMel) {
        const query = `SELECT * FROM pedidos WHERE tipo = ?`;
        db.query(query, [tipoMel], (err, results) => {
          if (err) {
            console.error('Erro ao buscar pedidos:', err);
            return;
          }
          if (results.length === 0) {
            message.reply(`Nenhum pedido encontrado para o tipo de mel ${tipoMel}.`);
            return;
          }
          let statusMessage = `Status dos Pedidos do Tipo ${tipoMel}:\n`;
          for (const pedido of results) {
            const precoUnitario = calcularPrecoUnitario(pedido.tipo, pedido.tamanho);
            const precoTotal = pedido.quantidade * precoUnitario;
            statusMessage += `ID: ${pedido.id}, Pessoa: ${pedido.pessoa}, Quantidade: ${pedido.quantidade}, Tamanho: ${pedido.tamanho}, Preço Unitário: R$ ${precoUnitario.toFixed(2)}, Preço Total: R$ ${precoTotal.toFixed(2)}\n`;
          }
          message.reply(statusMessage);
        });
      } else {
        message.reply('Tipo de mel inválido.');
      }
    } else {
      message.reply('Comando !status inválido. Use !status {nome pessoa} para mostrar pedidos e calcular total de uma pessoa ou !status [lar|sil|euc] para filtrar por tipo de mel.');
    }
  }
  
  if (parts[0].startsWith('!receba') && parts.length >= 1) {
    message.reply(`
      VALE FOTOTETA
   
  ╭╴╴╴╴╴✁ ╴╴╴╴╴╴╮ 
  ┆      P E I T I N H O       ┆ 
  ╰╴╴╴╴✃ ╴╴╴╴╴╴╴╯
    `);
  }
});

