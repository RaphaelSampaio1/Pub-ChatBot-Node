const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const client = new Client();

const lastMessageDates = {};

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    const sender = message.from;
    const currentDate = new Date().toISOString().slice(0, 10);

    if (!lastMessageDates[sender] || lastMessageDates[sender] !== currentDate) {
        client.sendMessage(sender, '_______________________________________________________________________________________________________________________________\nSeja bem-vindo(a) a Raphael Automações📌\n_______________________________________________________________________________________________________________________________\n Olá, sou RaphaBot e farei a triagem do seu desejo para o Raphael !  \nPara darmos continuidade, selecione a numero de opção desejado :\n\n1️⃣ - Automações\n2️⃣ - Pagamentos\n3️⃣ - Portifólios');
        
        lastMessageDates[sender] = currentDate;
    }
});

client.on('message', message => {
    const body = message.body.toLocaleLowerCase();
    const sender = message.from;

    const responseMap = {
        '1': '4️⃣ - Envio de mensagem para lista de clientes\n5️⃣ - Execução de tarefas automáticas\n6️⃣ - Chatbot de Whatsapp\n7️⃣ - Cadastros (Automatizado) Excel / Word / Sistemas\n8️⃣ - Outros',
        '4': '😃 Aguarde, você será atendido por Raphael!',
        '5': '😃 Aguarde, você será atendido por Raphael!',
        '6': '😃 Aguarde, você será atendido por Raphael!',
        '7': '😃 Aguarde, você será atendido por Raphael!',
        '8': '😃 Aguarde, você será atendido por Raphael!',
        '2': 'Aceitamos pagamentos via:\n💵 - Dinheiro\n💳 - Cartão crédito / débito\n💰 - Pix\n \n Para falar com o Raphael, digite o numeral 9️⃣ e aguarde.',
        '3': 'Nossa retenção de informações está contido no LinkedIn🖥️ :\n https://www.linkedin.com/in/raphael-sampaio-52475622b/'
    };

    if (responseMap.hasOwnProperty(body)) {
        client.sendMessage(sender, responseMap[body]);
    }
});

client.initialize();
