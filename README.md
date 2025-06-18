

Momona-Klubb – Fullstack-prosjekt (React + ASP.NET Core + SQLite)

Et praktisk IT-prosjekt hvor frontend og backend er koblet sammen med en lokal SQLite-database for å håndtere meny og brukerregistrering.

🏗️ Teknologier brukt

Frontend: React (TypeScript)

Backend: ASP.NET Core Web API

Database: SQLite

Tooling: Visual Studio Code, SQLite CLI, Git



---

📁 Prosjektstruktur

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


---

🌐 Funksjonalitet

🧾 Menyvisning (API og visning)

GET /api/menuitems – Returnerer en liste med menyobjekter

Frontend-side /menu viser menyen


🧍‍♂️ Brukerregistrering

POST /api/user – Sender inn brukerdata fra skjema

GET /api/user – Henter ut alle registrerte brukere

Frontend-side /user inneholder et enkelt skjema



---

🔗 Forbindelse mellom frontend og backend

Backend kjører på http://localhost:5272

Frontend kjører på http://localhost:3000

CORS er aktivert for å tillate kommunikasjon mellom disse



---

🗃️ SQLite-database

Automatisk opprettet med EnsureCreated() i Program.cs

Data blir lagret i menu.db

Du kan åpne databasen med:

sqlite3 menu.db

Se data i Users-tabellen:

.mode column
.headers on
SELECT * FROM Users;



---

✅ Hva fungerer

[x] Vise meny fra backend

[x] Registrere bruker fra frontend

[x] Lagre og vise data fra SQLite

[x] Hente ut og vise brukerdata

[x] Feilhåndtering og inputvalidering



---

📌 Neste steg (forslag)

[ ] Legge til validering i backend

[ ] Legge til slett/rediger-funksjon

[ ] Lage adminvisning for brukere

[ ] Bedre styling



---

🧠 Lært så langt

Oppsett av fullstack-prosjekt

Bruk av API-endepunkter med React

Integrasjon med SQLite

Feilsøking med terminal og databaser
