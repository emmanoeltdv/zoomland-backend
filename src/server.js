const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas principais
const authRoutes = require('./controllers/authController');
const userRoutes = require('./controllers/userController');

// ✅ Rotas com /api (o que seu front e o Railway provavelmente estão chamando)
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// ✅ (Opcional) manter compatibilidade com rotas antigas sem /api
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// ✅ Rotas de teste/health pro Railway
app.get('/', (req, res) => res.status(200).send('✅ Zoomland Backend ONLINE'));
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/api', (req, res) => res.status(200).send('OK'));
app.get('/api/health', (req, res) => res.status(200).send('OK'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('🚀 Zoomland Backend rodando na porta', PORT);
});
