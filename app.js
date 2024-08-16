// netlify/functions/certificate.js

const { createCanvas, loadImage } = require('canvas');
const path = require('path');

exports.handler = async function(event, context) {
    const { nome } = JSON.parse(event.body);
    
    const data = new Date().toLocaleDateString('pt-BR');
    const horas = 3;

    const templatePath = path.join(__dirname, '..', 'templates', 'certificado.png');
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    const template = await loadImage(templatePath);
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(nome, 70, 100);
    ctx.fillText(data, 70, 150);
    ctx.fillText(horas + ' horas', 70, 200);

    const buffer = canvas.toBuffer('image/png');
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/png',
        },
        body: buffer.toString('base64'),
        isBase64Encoded: true,
    };
};
