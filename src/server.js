const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Healthcheck
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// IMPORTANTE: usar SOMENTE process.env.PORT
const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
