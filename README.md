# Dev_Club_Platform
📊 Backend Technology Decision
📌 Compared Options

Node.js + Express

Python + FastAPI

Python + Django

🔎 Evaluation Criteria

Мы оценивали:

Простоту

Скорость разработки

Поддержку PostgreSQL

Удобство Docker

🟢 Final Decision: Node.js + Express
🎯 Почему выбран Node.js + Express
1️⃣ Простота

Минималистичный и гибкий фреймворк

Легко понимать структуру проекта

Большое количество обучающих материалов

2️⃣ Скорость разработки

Быстрая настройка сервера

Огромная экосистема npm

Подходит для REST API и real-time приложений

3️⃣ Поддержка PostgreSQL

Отличная поддержка через:

Prisma

Sequelize

TypeORM

Большое количество готовых решений

4️⃣ Docker

Легкий runtime

Быстро собирается контейнер

Хорошо работает в microservices-архитектуре

📈 Почему не FastAPI / Django?
FastAPI

Отличный вариант для чистого API

Но требует Python-экосистему

Команда лучше знакома с JavaScript

Django

Слишком “тяжёлый” для нашего проекта

Много встроенных функций, которые нам не нужны

Лучше подходит для монолитных приложений

🚀 Итог

Backend проекта будет реализован на:

---

## 📡 API Endpoints (MVP)

All endpoints accept and return JSON. Errors are returned with an `error` or `message` field and appropriate HTTP status codes.

### Users

| Method | Path         | Description                         | Body                                    | Response                        |
|--------|--------------|-------------------------------------|-----------------------------------------|----------------------------------|
| GET    | `/users`     | List all users (id and email only)  | —                                       | `[{id, email}, ...]`            |
| GET    | `/users/:id` | Get specific user                  | —                                       | `{id, email}` or 404            |
| POST   | `/users`     | Create a new user                  | `{ "email": "...", "password": "..." }` | 201 `{id, email}` or 400/500    |
| PUT    | `/users/:id` | Update user fields (email/password)| `{ "email"?: "...", "password"?: "..." }` | Updated user or 404/400/500     |
| DELETE | `/users/:id` | Remove user                        | —                                       | 204 (no body) or 404/500        |

> **Note:** passwords are hashed before storage; the API never returns them.

### Authentication

| Method | Path            | Description            | Body                              | Response                  |
|--------|-----------------|------------------------|-----------------------------------|---------------------------|
| POST   | `/auth/register`| Register new account   | `{ email, password }`             | 201 message or error      |
| POST   | `/auth/login`   | Login with credentials | `{ email, password }`             | success message or 401    |


---

Continue working with the backend using Postman or similar clients to hit these endpoints.

---

## 🎨 Frontend Setup (React + Vite)

The frontend is a modern React application using Vite for fast development and building.

### Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── Navigation.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # User management (CRUD demo)
│   │   └── About.jsx    # About page
│   ├── services/        # API integration
│   │   └── api.js       # Axios client and endpoint definitions
│   ├── App.jsx          # Root component with routing
│   ├── main.jsx         # App entry point
│   └── ...
├── .env                 # Environment variables
└── package.json
```

### Features

- ✅ **React Router** – Navigation between pages (/home, /about)
- ✅ **Axios** – HTTP client for backend API calls
- ✅ **User CRUD** – Create, read, update, delete users from frontend
- ✅ **Hot Module Replacement (HMR)** – Instant dev feedback

### Running the Frontend

```bash
cd frontend

# Install dependencies (already done)
npm install

# Start dev server (port 5173)
npm run dev

# Build for production
npm run build
```

### API Integration

The frontend connects to the backend via the API service configured in [src/services/api.js](frontend/src/services/api.js):

```javascript
// Example: fetch all users
import { usersAPI } from './services/api';

const response = await usersAPI.getAll();
console.log(response.data); // [{ id, email }, ...]
```

### Testing the Full Stack

1. **Start the database** (Docker):
   ```bash
   docker-compose up -d
   ```

2. **Start the backend** (Node.js, port 3000):
   ```bash
   cd backend
   npm start
   ```

3. **Start the frontend** (React, port 5173):
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open browser** → http://localhost:5173
   - Navigate to "Home" to see the user management interface
   - Create, update, delete users directly from the UI
   - All changes sync with the backend API

---

## 📝 Task Completion Status

### ✅ MVP: Basic API (Backend)
- [x] CRUD endpoints for users entity
- [x] GET, POST, PUT, DELETE working
- [x] Error handling with try/catch
- [x] Basic validation (email, password types)
- [x] API documented

### ✅ Frontend Initialization
- [x] React + Vite project created
- [x] Routing set up (React Router v7)
- [x] Folder structure (/components, /pages, /services)
- [x] Axios API service created
- [x] Test API request working (Home page creates/fetches users)
- [x] Frontend runs on port 5173


