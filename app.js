const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/certificate', async (req, res) => {
    const { nome } = req.body;
    
    // Obter a data atual no formato desejado
    const data = new Date().toLocaleDateString('pt-BR'); // Formato dd/mm/aaaa
    
    const horas = 3; // Quantidade de horas fixas

    const templatePath = path.join(__dirname, 'templates', 'certificado.png');
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    const template = await loadImage(templatePath);
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

    // Adicionar o texto ao certificado
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(nome, 70, 100);
    ctx.fillText(data, 70, 150);
    ctx.fillText(horas + ' horas', 70, 200);

    const buffer = canvas.toBuffer('image/png');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
