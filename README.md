# Kefir Backend

API REST backend para la plataforma Kefir, construida con Express.js y MongoDB.

## 📋 Características

- ✅ Autenticación JWT
- ✅ Gestión de usuarios con roles (Admin/Usuario)
- ✅ CRUD de productos
- ✅ Sistema de contactos
- ✅ Middleware de protección de rutas
- ✅ Manejo centralizado de errores

## 🛠️ Requisitos previos

- Node.js (v14 o superior)
- MongoDB (local o Atlas)
- npm o yarn

## 📦 Instalación

1. **Clonar el repositorio:**
```bash
git clone <tu-repo>
cd Proyecto\ kefir\ backend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Crear archivo `.env`:**
```bash
cp .env.example .env
```

4. **Configurar variables de entorno:**
```
MONGO_URI=mongodb://usuario:contraseña@host:puerto/kefirDB
JWT_SECRET=tu_clave_secreta_aqui
NODE_ENV=development
PORT=3000
```

## 🚀 Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Rutas de API

### Usuarios

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| POST | `/api/users/register` | No | Registrar nuevo usuario |
| POST | `/api/users/login` | No | Iniciar sesión |
| GET | `/api/users/profile` | JWT | Obtener perfil del usuario |

### Productos

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| GET | `/api/productos` | No | Obtener todos los productos |
| POST | `/api/productos` | JWT + Admin | Crear producto |
| PUT | `/api/productos/:id` | JWT + Admin | Actualizar producto |
| DELETE | `/api/productos/:id` | JWT + Admin | Eliminar producto |

### Contactos

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| POST | `/api/contactos` | No | Crear contacto |
| GET | `/api/contactos` | No | Obtener contactos |

## 🔐 Autenticación

### Login

**Request:**
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Response:**
```json
{
  "_id": "123456789",
  "nombre": "Usuario",
  "email": "usuario@ejemplo.com",
  "isAdmin": false,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usar el token

Incluir en el header de las rutas protegidas:
```
Authorization: Bearer <token>
```

## 📁 Estructura del proyecto

```
.
├── config/
│   └── db.js                 # Conexión a MongoDB
├── controllers/
│   ├── usersController.js    # Lógica de usuarios
│   ├── productosController.js # Lógica de productos
│   └── contactosController.js # Lógica de contactos
├── middlewares/
│   ├── authMiddleware.js     # Protección JWT y admin
│   └── errorMiddleware.js    # Manejo de errores
├── models/
│   ├── userModel.js          # Schema de usuarios
│   ├── productoModel.js      # Schema de productos
│   └── contactoModel.js      # Schema de contactos
├── routes/
│   ├── usersRoutes.js        # Rutas de usuarios
│   ├── productosRoutes.js    # Rutas de productos
│   └── contactosRoutes.js    # Rutas de contactos
├── .env                      # Variables de entorno (no commitear)
├── .env.example              # Plantilla de variables
├── server.js                 # Punto de entrada
└── package.json
```

## 🔧 Variables de entorno

```env
# Base de datos
MONGO_URI=mongodb://usuario:contraseña@host:puerto/kefirDB

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura

# Entorno
NODE_ENV=development

# Puerto
PORT=3000
```

## 📦 Dependencias principales

- **express** - Framework web
- **mongoose** - ODM para MongoDB
- **jsonwebtoken** - Autenticación JWT
- **bcryptjs** - Hash de contraseñas
- **cors** - Control de CORS
- **dotenv** - Variables de entorno

## 🚢 Despliegue (Render)

1. Conectar el repositorio de GitHub a Render
2. Configurar variables de entorno en Render Dashboard
3. Deploy automático en cada push

**Variables en Render:**
```
MONGO_URI=<tu-mongodb-uri>
JWT_SECRET=<tu-clave-secreta>
NODE_ENV=production
PORT=3000
```

**URL de la API:** https://kefir-backend.onrender.com

## 💡 Ejemplos de uso

### Registrar usuario
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "email": "juan@ejemplo.com",
    "password": "123456"
  }'
```

### Crear producto (solo admin)
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "nombre": "Producto",
    "precio": 100,
    "descripcion": "Descripción"
  }'
```

### Crear contacto
```bash
curl -X POST http://localhost:3000/api/contactos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Cliente",
    "email": "cliente@ejemplo.com",
    "mensaje": "Consulta"
  }'
```

## 🐛 Troubleshooting

**Error: "Cannot POST /api/users/register"**
- Verifica que la ruta está correcta en `server.js`
- Asegúrate que `usersRoutes` está importado

**Error: "token inválido"**
- Genera un token nuevo con login
- Verifica que `JWT_SECRET` es igual en cliente y servidor

**Error: "No autorizado, solo admins"**
- Usa una cuenta con `isAdmin: true` en la BD
- Incluye el JWT válido en el header

## 📧 Contacto

Cualquier pregunta o issue, contacta al equipo de desarrollo.

---

**Happy coding! 🚀**
