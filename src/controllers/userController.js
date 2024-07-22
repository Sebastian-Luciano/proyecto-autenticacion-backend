
import { getUserDetails, updateUserDetails, updateUserPassword } from '../models/userModel.js';

export const getProfile = async (req, res) => {
  try {
    const userDetails = await getUserDetails(req.userId);
    if (!userDetails) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Si el usuario existe pero no tiene detalles, devolveremos al menos su información básica
    res.json(userDetails);
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log('Cuerpo de la solicitud:', req.body);
    console.log('Archivo:', req.file);

    const { name, bio, phone, email, password } = req.body;
    const photoFile = req.file;
    
    let photoFileName = photoFile ? photoFile.filename : undefined;
    
    const updatedUser = await updateUserDetails(req.userId, name, bio, phone, email, photoFileName);
    
    if (password) {
      await updateUserPassword(req.userId, password);
      console.log('Contraseña actualizada');
    }
    
    console.log('Usuario actualizado:', updatedUser);
    
    if (updatedUser) {
      res.json({ message: 'Perfil actualizado con éxito', user: updatedUser });
    } else {
      res.status(400).json({ message: 'Error al actualizar el perfil' });
    }
  } catch (error) {
    console.error('Error detallado al actualizar el perfil:', error);
    res.status(500).json({ 
      message: 'Error al actualizar el perfil', 
      error: error.message, 
      stack: error.stack 
    });
  }
};





