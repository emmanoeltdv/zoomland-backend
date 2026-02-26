
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./controllers/authController');
const userRoutes = require('./controllers/userController');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('ZoomLand Production Backend running on port', PORT);
});
