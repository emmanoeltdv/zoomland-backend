const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas principais
const authRoutes = require('./controllers/authController');
const userRoutes = require('./controllers/userController');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Rota teste (importante para Railway)
app.get('/', (req, res) => {
  res.send('✅ ZoomLand Backend ONLINE');
});

// Health check (Railway usa isso às vezes)
app.get('/health', (req, res) => {
  res.send('OK');
});

// Porta correta Railway / produção
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('🚀 ZoomLand Backend rodando na porta', PORT);
});
