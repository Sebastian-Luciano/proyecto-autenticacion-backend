import express from 'express';
import cors from 'cors';
import { PORT } from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});