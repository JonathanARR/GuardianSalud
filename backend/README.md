# 🏥 Guardián Salud Backend

Backend del sistema **Guardián Salud**, una API para la gestión de residentes, medicamentos, tratamientos y administración de dosis en instituciones de salud.

Desarrollado con **NestJS + TypeScript**, utilizando **Prisma ORM** y **PostgreSQL**.

---

## 🚀 Tecnologías

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger

---

## 📂 Estructura del proyecto

```text
src/
├── common/
│   ├── errors/              # Errores de dominio y base de datos
│   └── filters/             # Manejo global de excepciones
│
├── config/                  # Configuraciones de la aplicación
│
├── prisma/                  # Prisma ORM y conexión a DB
│
└── modules/
    ├── auth/                # Autenticación JWT
    ├── users/               # Usuarios del sistema
    ├── staff/               # Personal médico
    ├── residents/           # Residentes
    ├── medications/         # Medicamentos
    ├── treatments/          # Tratamientos
    ├── dose-logs/           # Registro de dosis
    └── shift-assignments/   # Asignación de turnos
```

---

## 🏗️ Arquitectura

El backend utiliza una arquitectura modular basada en dominios.

Flujo principal:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
PostgreSQL
```

---

## 🔐 Funcionalidades principales

- Autenticación mediante JWT.
- Gestión de usuarios y roles:
  - ADMIN
  - PHYSICIAN
  - NURSE
- Gestión de residentes.
- Gestión de medicamentos.
- Asignación de tratamientos.
- Registro de administración de dosis.

---

## ⚙️ Instalación

Instalar dependencias:

```bash
npm install
```

Configurar variables de entorno:

```env
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
PORT=3000
```

Generar Prisma Client:

```bash
npx prisma generate
```

Ejecutar migraciones:

```bash
npx prisma migrate dev
```

---

## ▶️ Ejecución

Modo desarrollo:

```bash
npm run start:dev
```

Modo producción:

```bash
npm run start:prod
```

---

## 📚 Documentación API

Swagger disponible en:

```text
http://localhost:3000/docs
```

---

## 📌 Estado

Proyecto en desarrollo.