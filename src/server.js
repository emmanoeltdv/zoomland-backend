
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./controllers/authController');
const userRoutes = require('./controllers/userController');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(3001, () => {
  console.log('ZoomLand Production Backend running on 3001');
});
