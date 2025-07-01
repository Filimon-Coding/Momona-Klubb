# Momona-Klubb – Fullstack Project (React + ASP.NET Core + SQLite)

A practical IT project where the frontend and backend are connected via a local SQLite database. The application supports menu display and user registration.

## Technologies Used

* **Frontend:** React (TypeScript)
* **Backend:** ASP.NET Core Web API
* **Database:** SQLite
* **Tools:** Visual Studio Code, SQLite CLI, Git

---

## Project Structure

```
Momona-Klubb/
├── backend/
│   ├── Controllers/
│   ├── Model/
│   ├── DAL/AppDbContext.cs
│   ├── Program.cs
│   └── menu.db (SQLite database)
└── frontend/
    ├── src/pages/
    │   ├── Menu.tsx
    │   └── User.tsx
    └── App.tsx (Routing)
```

---

## Functionality

### Menu Display (API and frontend)

* `GET /api/menuitems` – Returns a list of menu items
* The frontend `/menu` page fetches and displays the data

### User Registration

* `POST /api/user` – Sends user data from form to backend
* `GET /api/user` – Returns all registered users
* The frontend `/user` page includes a basic form for registration

---

## Frontend–Backend Connection

* Backend runs at: `http://localhost:5272`
* Frontend runs at: `http://localhost:3000`
* CORS is enabled to allow communication between both servers

---

## SQLite Database

* The database (`menu.db`) is created automatically via `EnsureCreated()` in `Program.cs`
* Data is persisted locally in `menu.db`

To open and inspect the database via CLI:

```bash
sqlite3 menu.db
.mode column
.headers on
SELECT * FROM Users;
```

---

## What Works

* [x] Menu data displayed from backend
* [x] User registration from frontend
* [x] Data is stored and retrieved using SQLite
* [x] API fetch and display for users
* [x] Basic input validation and error handling

---

## How to Run the Application

### Prerequisites

* .NET SDK installed
* Node.js installed
* SQLite CLI (optional for viewing database manually)

### Step 1: Start the Backend

1. Navigate to the `backend` folder and MomonaAPi folder 
2. Run the following commands:

```bash
dotnet restore
dotnet build
dotnet run
```

### Step 2: Start the Frontend

1. Navigate to the `frontend` folder
2. Install dependencies and start React app:

```bash
npm install
npm start
```

The app should now be available at `http://localhost:3000`

---

## Next Steps (Suggestions)

* [ ] Add backend validation
* [ ] Implement delete/edit functionality
* [ ] Create admin view for user data
* [ ] Improve UI styling

---

## Key Learnings

* Setting up a fullstack project using ASP.NET Core and React
* Using REST API endpoints in React
* Integrating a lightweight SQLite database
* Debugging through terminal and database inspection tools
