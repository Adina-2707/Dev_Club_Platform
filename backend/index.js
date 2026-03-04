import express from 'express';
import dotenv from 'dotenv';
import { register, login } from './src/controllers/auth.controller.js';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/register', register);
app.post('/login', login);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal server error'
  });
});