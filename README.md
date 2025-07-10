# Backend - Sistema de Autenticación de Usuarios 🔐

Este repositorio contiene la API backend del sistema de autenticación desarrollado como parte del programa Full Stack de FUNVAL.

## 🛠 Tecnologías Utilizadas

- **Node.js**
- **Express**
- **MySQL**
- **JWT** para autenticación de sesiones
- **bcrypt** para cifrado de contraseñas
- **Dotenv** para gestión de variables de entorno
- **MySQL2** como cliente de conexión

## 📁 Estructura del Proyecto

```
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── app.js
├── .env
├── package.json
```

## 🚀 Instalación y Ejecución

### 1. Clona el repositorio:
```bash
git clone https://github.com/Sebastian-Luciano/proyecto-autenticacion-backend.git
cd proyecto-autenticacion-backend
```

### 2. Instala las dependencias:
```bash
npm install
```

### 3. Crea un archivo `.env` con las siguientes variables:
```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=autenticacion_db
JWT_SECRET=clave_secreta
```

### 4. Ejecuta el servidor:
```bash
npm run dev
```

## 🔐 Características Principales

- Registro de usuarios con validación y cifrado de contraseñas
- Inicio de sesión con generación de token JWT
- Middleware de autenticación para rutas protegidas

## 🧠 Autor

**Sebastián Javier Luciano Marceliano**  
🔗 [GitHub](https://github.com/Sebastian-Luciano)  
✉️ [sebastianperu7@gmail.com](mailto:sebastianperu7@gmail.com)

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte del curso Full Stack Developer en FUNVAL.