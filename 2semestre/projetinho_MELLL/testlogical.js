const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client({
    puppeteer: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  });

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    // Exibir o QR Code no terminal
    console.log('QR Code gerado! Escaneie com o seu telefone.');
});

client.on('ready', () => {
    console.log('Bot está pronto!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
