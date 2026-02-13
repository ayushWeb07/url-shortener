# 🔗 URL Shortener API

A modern and secure **URL Shortener backend** built using **Node.js, Express, TypeScript, PostgreSQL, and Drizzle ORM**.  
It supports **JWT Authentication**, **URL shortening using nanoid**, and **Zod validation** for clean and safe API requests.

<img width="1611" height="1198" alt="one" src="https://github.com/user-attachments/assets/9738bcb5-edd4-406c-b3c6-2aa71de399a0" />
<img width="1610" height="1192" alt="two" src="https://github.com/user-attachments/assets/474fbc10-1e42-4ea6-92b6-f56ef7980cb3" />

---

## 🚀 Features

✅ User Authentication (Signup/Login) using JWT  
✅ Protected Routes with Middleware  
✅ Short URL Generation using `nanoid`  
✅ URL Redirection Support  
✅ Fetch All User URLs  
✅ Delete Shortened URLs  
✅ PostgreSQL Database + Drizzle ORM  
✅ Input Validation using Zod  
✅ Clean MVC-like Folder Structure  
✅ Docker Support (`docker-compose.yml`)  

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL**
- **Drizzle ORM**
- **JWT Authentication**
- **Zod Validation**
- **NanoID (Shortcode Generator)**
- **Docker + Docker Compose**

---

## 📂 Project Structure

```bash
.
├── controllers/
│   ├── urls.controller.ts
│   └── users.controller.ts
│
├── db/
│   └── index.ts
│
├── drizzle/
│   └── (migrations)
│
├── middlewares/
│   └── auth_middleware.ts
│
├── models/
│   ├── index.ts
│   ├── url.model.ts
│   └── user.model.ts
│
├── routes/
│   ├── urls.route.ts
│   └── users.route.ts
│
├── validations/
│   ├── url.validation.ts
│   └── user.validation.ts
│
├── drizzle.config.ts
├── docker-compose.yml
├── index.ts
├── package.json
├── pnpm-lock.yaml
└── .gitignore
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ayushWeb07/url-shortener.git
cd url-shortener
```

---

### 2️⃣ Install dependencies

```bash
pnpm install
```

(or)

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://admin:admin@localhost:5432/url-shortener-db
PORT=8080
CRYPTO_SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_secret_key
```


---

### 4️⃣ Run PostgreSQL (Docker Recommended)

If you have Docker installed:

```bash
docker compose up -d
```

---

### 5️⃣ Run Drizzle migrations

```bash
pnpm drizzle-kit push
pnpm drizzle-kit studio
```

(or whichever migration command you use)

---

### 6️⃣ Start the server

```bash
pnpm dev
```

Server will start on:

```
http://localhost:8080
```

---

## 🔥 API Routes

### Base Routes Setup

```ts
app.use("/users", userRoutes);
app.use("/urls", urlRoutes);
```

---

## 👤 User Routes

### ✅ Signup
**POST** `/users/signup`

📌 Request Body:

```json
{
  "name": "Ayush",
  "email": "ayush@gmail.com",
  "password": "123456"
}
```

---

### ✅ Login
**POST** `/users/login`

📌 Request Body:

```json
{
  "email": "ayush@gmail.com",
  "password": "123456"
}
```

---

## 🔗 URL Routes

> 🔒 Protected routes require JWT Token in headers:

```http
authorization: Bearer <token>
```

---

### ✅ Shorten a URL
**POST** `/urls/shorten` 🔒

📌 Request Body:

```json
{
  "targetURL": "https://google.com"
}
```

---

### ✅ Get All URLs of Logged-in User
**GET** `/urls/` 🔒

📌 Response:

```json
[
  {
    "shortCode": "abc123",
    "targetUrl": "https://google.com",
    "createdAt": "2026-02-13T10:00:00Z"
  }
]
```

---

### ✅ Redirect to Original URL
**GET** `/urls/:shortCode`

Example:

```http
GET /urls/abc123
```

➡️ Redirects user to the original URL.

---

### ✅ Delete a Short URL
**DELETE** `/urls/:shortCode` 🔒

Example:

```http
DELETE /urls/abc123
```

---

## 🔐 Authentication

This project uses **JWT Authentication**.

Protected routes are secured using middleware:

- `authGuard`
- `ensureUserAuthenticated`

JWT must be passed in request headers:

```http
authorization: Bearer <your_token>
```

---

## ✅ Validation

All incoming request data is validated using **Zod** to ensure clean and secure inputs.

Validation files are located inside:

```bash
/validations
```

---

## 🐳 Docker Support

This project includes a `docker-compose.yml` file for running PostgreSQL easily.

To start services:

```bash
docker compose up -d
```

To stop:

```bash
docker compose down
```

---

## 🌟 Future Improvements (Optional Ideas)

- Click Analytics (Track number of visits per short URL)
- Custom shortcodes
- Expiry time for short URLs
- Rate limiting for abuse prevention
- Deploy using Render / Railway / AWS

---

## 🧑‍💻 Author

Built with ☕, code, and sleepless nights by **Ayush**  
(Feel free to connect and contribute!)

---

## 📜 License

This project is open-source and available under the **MIT License**.
