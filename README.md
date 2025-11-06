# 🏦 Teste Node.js – Digital Bank API  
**Node.js | TypeScript | GraphQL | Prisma | PostgreSQL | Jest | Docker**

---

### 📘 Overview
This project is a simple **Digital Bank API**, developed as part of a Node.js technical test.  
It simulates basic banking operations such as deposits, withdrawals, and balance queries — using **GraphQL** for the API layer.

---

## Quick Start (local)

1. Copie `.env.example` para `.env` e ajuste `DATABASE_URL` se necessário.
2. `npm install`
3. `npx prisma migrate dev --name init` (irá criar o schema)
4. `npx ts-node prisma/seed.ts` (popula conta 54321)
5. `npm run dev` (servidor em http://localhost:4000)

## Docker

`docker-compose up --build`

A aplicação executará migrações antes de iniciar.

---

### 🧠 Tech Stack
- **Node.js** + **TypeScript**
- **Apollo Server (GraphQL)**
- **Prisma ORM**
- **PostgreSQL**
- **Jest** (unit testing)
- **Docker & Docker Compose**
- **ESLint + Prettier**

---

### ⚙️ Setup

#### 1️⃣ Environment Variables
Create a `.env` file in the project root:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bankdb?schema=public"
PORT=4000
```

---

#### 2️⃣ Running with Docker (recommended)
Start containers:
```bash
docker compose up -d
```

Apply database migrations:
```bash
npx prisma migrate dev --name init
```

Run the API:
```bash
npm run dev
```

✅ API available at:  
**http://localhost:4000**

---

#### 3️⃣ Running Locally (without Docker)
If you prefer to run without Docker, make sure PostgreSQL is installed and running:

**macOS (Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Create the database:**
```bash
psql -U postgres
CREATE DATABASE "bankdb";
```

Then:
```bash
npx prisma migrate dev --name init
npm run dev
```

---

### 🧪 Running Tests
Run unit tests with:
```bash
npm run test
```

---

### 💡 Notes
- All business rules are implemented according to the test description.  
- No authentication layer is required.  
- Errors are handled with proper GraphQL error responses.

---

🧾 **End of README**

