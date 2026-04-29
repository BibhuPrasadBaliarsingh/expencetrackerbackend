# Expense Tracker Backend

## Folder structure

- `config/` MongoDB connection (`config/db.js`)
- `models/` Mongoose models (`models/User.js`, `models/Transaction.js`)
- `controllers/` Route handlers (`controllers/authController.js`, `controllers/transactionController.js`)
- `routes/` API routes (`routes/authRoutes.js`, `routes/transactionRoutes.js`)
- `middleware/` Auth + error middleware
- `server.js` Express entry point

## Setup

1. Install dependencies:
   - `npm install`
2. Create `.env` (copy from `.env.example`) and set:
   - `MONGO_URI`
     - (or `MONGODB_URI`)
   - `JWT_SECRET`
3. Run:
   - Dev: `npm run dev`
   - Prod: `npm start`

## API endpoints

### Auth

- `POST /api/auth/register` `{ name, email, password }`
- `POST /api/auth/login` `{ email, password }`

### Transactions (Protected)

Send header: `Authorization: Bearer <token>`

- `GET /api/transactions`
- `POST /api/transactions` `{ amount, type, category, date? }`
- `PUT /api/transactions/:id` (any updatable fields)
- `DELETE /api/transactions/:id`

## Connect frontend

Point your frontend API base URL to your backend URL (example):

- Local: `http://localhost:8000`

Requests to protected endpoints must include the `Authorization` header using the JWT returned by login/register.
