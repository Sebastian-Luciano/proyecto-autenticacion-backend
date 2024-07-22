import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';


export const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword]
  );
  return result.insertId;
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

export const getUserDetails = async (userId) => {
  const [rows] = await pool.query(
    `SELECT u.id, u.email, u.created_at, ud.name, ud.bio, ud.phone, ud.photo 
     FROM users u 
     LEFT JOIN user_details ud ON u.id = ud.user_id 
     WHERE u.id = ?`,
    [userId]
  );
  return rows[0];
};










export const updateUserDetails = async (userId, name, bio, phone, email, photoFileName) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Actualizar la tabla users
    await connection.query(
      'UPDATE users SET email = ? WHERE id = ?',
      [email, userId]
    );

    // Verificar si existe un registro en user_details
    const [existingDetails] = await connection.query(
      'SELECT * FROM user_details WHERE user_id = ?',
      [userId]
    );

    if (existingDetails.length > 0) {
      // Si existe, actualizar
      let query = 'UPDATE user_details SET name = ?, bio = ?, phone = ?';
      let params = [name, bio, phone];

      if (photoFileName !== undefined) {
        query += ', photo = ?';
        params.push(photoFileName);
      }

      query += ' WHERE user_id = ?';
      params.push(userId);

      await connection.query(query, params);
    } else {
      // Si no existe, insertar
      await connection.query(
        'INSERT INTO user_details (user_id, name, bio, phone, photo) VALUES (?, ?, ?, ?, ?)',
        [userId, name, bio, phone, photoFileName]
      );
    }

    await connection.commit();

    // Obtener los detalles actualizados
    const [updatedUser] = await connection.query(
      'SELECT u.id, u.email, ud.name, ud.bio, ud.phone, ud.photo FROM users u LEFT JOIN user_details ud ON u.id = ud.user_id WHERE u.id = ?',
      [userId]
    );

    return updatedUser[0];
  } catch (error) {
    await connection.rollback();
    console.error('Error en updateUserDetails:', error);
    throw error;
  } finally {
    connection.release();
  }
};

export const updateUserPassword = async (userId, newPassword) => {
  const connection = await pool.getConnection();
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await connection.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, userId]
    );
    return true;
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// Asegúrate de que getUserDetails también esté definida aquí


/* export const updateUserPassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const [result] = await pool.query(
    'UPDATE users SET password = ? WHERE id = ?',
    [hashedPassword, userId]
  );
  return result.affectedRows > 0;
}; */


/* export const updateUserDetails = async (userId, name, bio, phone, email, photoFileName) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Actualizar la tabla users
    await connection.query(
      'UPDATE users SET email = ? WHERE id = ?',
      [email, userId]
    );

    // Actualizar o insertar en la tabla user_details
    const [rows] = await connection.query(
      'SELECT * FROM user_details WHERE user_id = ?',
      [userId]
    );

    if (rows.length > 0) {
      await connection.query(
        'UPDATE user_details SET name = ?, bio = ?, phone = ?, photo = ? WHERE user_id = ?',
        [name, bio, phone, photoFileName, userId]
      );
    } else {
      await connection.query(
        'INSERT INTO user_details (user_id, name, bio, phone, photo) VALUES (?, ?, ?, ?, ?)',
        [userId, name, bio, phone, photoFileName]
      );
    }

    await connection.commit();

    // Obtener los detalles actualizados
    const [updatedUser] = await connection.query(
      'SELECT u.id, u.email, ud.name, ud.bio, ud.phone, ud.photo FROM users u LEFT JOIN user_details ud ON u.id = ud.user_id WHERE u.id = ?',
      [userId]
    );

    return updatedUser[0];
  } catch (error) {
    await connection.rollback();
    console.error('Error en updateUserDetails:', error);
    throw error;
  } finally {
    connection.release();
  }
}; */


/* export const updateUserDetails = async (userId, name, bio, phone, email, photo) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Actualizamos el email en la tabla users
    await connection.query(
      'UPDATE users SET email = ? WHERE id = ?',
      [email, userId]
    );

    // Verificamos si ya existe un registro en user_details para este usuario
    const [existingDetails] = await connection.query(
      'SELECT * FROM user_details WHERE user_id = ?',
      [userId]
    );

    if (existingDetails.length > 0) {
      // Si existe, actualizamos
      let query = 'UPDATE user_details SET name = ?, bio = ?, phone = ?';
      let params = [name, bio, phone];

      if (photo) {
        query += ', photo = ?';
        params.push(photo);
      }

      query += ' WHERE user_id = ?';
      params.push(userId);

      await connection.query(query, params);
    } else {
      // Si no existe, insertamos
      let query = 'INSERT INTO user_details (user_id, name, bio, phone';
      let placeholders = '?, ?, ?, ?';
      let params = [userId, name, bio, phone];

      if (photo) {
        query += ', photo';
        placeholders += ', ?';
        params.push(photo);
      }

      query += ') VALUES (' + placeholders + ')';

      await connection.query(query, params);
    }

    await connection.commit();
    return true;
  } catch (err) {
    await connection.rollback();
    console.error('Error en updateUserDetails:', err);
    throw err;
  } finally {
    connection.release();
  }
};
 */
/* export const updateUserPassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const [result] = await pool.query(
    'UPDATE users SET password = ? WHERE id = ?',
    [hashedPassword, userId]
  );
  return result.affectedRows > 0;
}; */