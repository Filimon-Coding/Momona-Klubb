```markdown
# Momona-Klubb – Fullstack Project (React + ASP.NET Core + SQLite)

A practical IT project where the frontend and backend are connected via a local SQLite database. The application supports menu display, user registration, admin login, and interactive game queue management.

## Technologies Used

* **Frontend:** React (TypeScript)
* **Backend:** ASP.NET Core Web API
* **Database:** SQLite
* **Auth:** JWT (JSON Web Tokens) + password hashing
* **Tools:** Visual Studio Code, SQLite CLI, Git

---

## Project Structure

```

Momona-Klubb/
├── backend/
│   ├── Controllers/
│   ├── Model/
│   ├── Services/ (JWT, Auth logic)
│   ├── DAL/AppDbContext.cs
│   ├── Program.cs
│   └── menu.db (SQLite database)
└── frontend/
├── src/pages/
│   ├── Menu.tsx
│   ├── User.tsx
│   ├── Admin.tsx
│   └── Games.tsx
├── src/components/ (forms, cards, etc.)
└── App.tsx (Routing)

````

---

## Functionality

### ✅ Menu Management

* `GET /api/menuitems` – Returns list of menu items
* `POST /api/menuitems` – Add new item (admin only)
* `PUT /api/menuitems/{id}` – Update item (admin only)
* `DELETE /api/menuitems/{id}` – Delete item (admin only)
* Frontend `/menu` page displays menu dynamically

### ✅ User Registration (Simple Demo)

* `POST /api/user` – Register user data from form
* `GET /api/user` – Returns all users
* `/user` page contains a basic form

### ✅ Admin Authentication

* Admin login with email + password (JWT-based)
* Password is hashed and stored securely
* Protected routes require JWT token
* Admin token stored in browser (localStorage)

### ✅ Game Queue System

* `/api/games` endpoint for all games (pool, foosball, cards)
* Users can:
  - View current players per game
  - Join a queue with name and timestamp
* Admins can:
  - View and manage all queues
  - Remove users from any queue
* Frontend `/games` page handles full interaction

---

## Frontend–Backend Connection

* Backend runs at: `http://localhost:5272`
* Frontend runs at: `http://localhost:3000`
* CORS is configured to allow secure communication

---

## SQLite Database

* The database (`menu.db`) is created using `EnsureCreated()` on startup
* Tables: `MenuItems`, `Users`, `GameQueues`, `Admins`
* Data is persisted locally

To open the DB manually:

```bash
sqlite3 menu.db
.mode column
.headers on
SELECT * FROM MenuItems;
````

---

## What Works

* [x] Dynamic menu loading from backend
* [x] Admin-only menu editing (CRUD)
* [x] JWT-based login and token storage
* [x] User registration form
* [x] Real-time queue tracking and updates
* [x] Admin management of game queues
* [x] SQLite database persistence
* [x] CORS and secure API interaction
* [x] Input validation + error handling

---

## How to Run the Application

### Prerequisites

* .NET SDK installed
* Node.js installed
* SQLite CLI (optional for DB viewing)

### Step 1: Start the Backend

```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

### Step 2: Start the Frontend

```bash
cd frontend
npm install
npm start
```

The app runs at: [http://localhost:3000](http://localhost:3000)

---

## Next Steps / Improvements

* [ ] Add timer or limit per game session
* [ ] Add notifications or alerts (e.g., “You’re next!”)
* [ ] Improve mobile responsiveness
* [ ] Add analytics/dashboard for admin
* [ ] Implement logout and token expiration
* [ ] Multi-language support (e.g., EN/NO)

---

## Key Learnings

* Fullstack integration using ASP.NET Core + React
* Secure authentication using JWT and password hashing
* RESTful API design and consumption in frontend
* Database schema design in SQLite
* State management and conditional UI rendering
* Game logic and queue management across users/admins

```
