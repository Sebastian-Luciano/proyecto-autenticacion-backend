import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../models/userModel.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = await createUser(email, password);
    const token = jwt.sign({ userId }, process.env.DB_SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.DB_SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

