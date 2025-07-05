Her er full oversikt for README:

---

# Momona Klubb – Dokumentasjon og Deployment

## 📌 Innhold

* [API-dokumentasjon](#api-dokumentasjon)
* [Deployment-guide](#deployment-guide)

---

## API-dokumentasjon

### **Autentisering**

| Metode | Endpoint               | Beskrivelse                                  | Krever Admin |
| ------ | ---------------------- | -------------------------------------------- | ------------ |
| POST   | `/api/admins/login`    | Logger inn en admin og returnerer JWT-token. | Nei          |
| POST   | `/api/admins/register` | Registrerer ny admin.                        | Nei          |

---

### **Meny (MenuItems)**

| Metode | Endpoint               | Beskrivelse                                 | Krever Admin |
| ------ | ---------------------- | ------------------------------------------- | ------------ |
| GET    | `/api/menuitems`       | Henter kun synlige produkter.               | Nei          |
| GET    | `/api/menuitems/admin` | Henter alle produkter (inkludert skjulte).  | Ja           |
| POST   | `/api/menuitems`       | Legger til nytt produkt.                    | Ja           |
| PUT    | `/api/menuitems/{id}`  | Oppdaterer et produkt (inkl. skjule/endre). | Ja           |
| DELETE | `/api/menuitems/{id}`  | Sletter et produkt.                         | Ja           |

---

### **Spill (GameStatus)**

| Metode | Endpoint                 | Beskrivelse                                | Krever Admin |
| ------ | ------------------------ | ------------------------------------------ | ------------ |
| GET    | `/api/games`             | Henter status for alle spill (bord og kø). | Nei          |
| POST   | `/api/games/queue/{id}`  | Legger til bruker i kø for et spill.       | Nei          |
| PUT    | `/api/games/next/{id}`   | Admin setter neste person til bordet.      | Ja           |
| PUT    | `/api/games/remove/{id}` | Fjerner en person fra køen manuelt.        | Ja           |

---

### **Events**

| Metode | Endpoint               | Beskrivelse                                    | Krever Admin |
| ------ | ---------------------- | ---------------------------------------------- | ------------ |
| GET    | `/api/events`          | Henter kun synlige events.                     | Nei          |
| GET    | `/api/events?all=true` | Henter alle events (inkl. skjulte).            | Ja           |
| POST   | `/api/events`          | Oppretter ny event.                            | Ja           |
| PUT    | `/api/events/{id}`     | Oppdaterer tittel, tidspunkt, beskrivelse etc. | Ja           |
| DELETE | `/api/events/{id}`     | Sletter en event.                              | Ja           |

---

## Deployment-guide

### Frontend (React + Vite)

1. Gå til `frontend/`-mappen.
2. Installer avhengigheter:

   ```
   npm install
   ```
3. Bygg for produksjon:

   ```
   npm run build
   ```
4. Lokal utvikling:

   ```
   npm run dev
   ```
5. For produksjon:

   * Bruk f.eks. Vercel, Netlify, eller host `dist/` med Nginx.

---

### Backend (.NET 7 API)

1. Gå til `backend/MomonaApi/`.
2. Installer avhengigheter:

   ```
   dotnet restore
   ```
3. Bygg prosjektet:

   ```
   dotnet build
   ```
4. Sett korrekt `ConnectionStrings` i `appsettings.json`.
5. Initialiser database:

   ```
   dotnet ef database update
   ```
6. Start API:

   ```
   dotnet run
   ```

---

### Tips

* Sørg for at frontend og backend kjører på riktig porter med CORS satt riktig.
* Last opp bilder brukt i `imageUrl`-feltene til `/public/images/` eller eksternt.
* Legg inn JWT-secret i `appsettings.json` i backend for autentisering.
* Token må legges i `localStorage` for at adminfunksjoner skal fungere i frontend.





--------------------



@startuml
!define primaryKey(x) <b>x</b>

'---------------- ENTITETER ----------------

entity "Admin" {
  primaryKey Id : int
  Username : string
  PasswordHash : string
}

entity "User" {
  primaryKey Id : int
  Name : string
}

entity "MenuItem" {
  primaryKey Id : int
  Name : string
  Description : string
  Image : string
  Category : string
  Price : decimal
  IsHidden : bool
  CreatedBy : int
}

entity "GameStatus" {
  primaryKey Id : int
  GameType : string
  AvailableCount : int
  CurrentPlayer : string
  CurrentSince : DateTime
}

entity "QueueEntry" {
  primaryKey Id : int
  GameStatusId : int
  UserName : string
  QueuedAt : DateTime
}

entity "Event" {
  primaryKey Id : int
  Title : string
  StartsAt : DateTime
  Description : string
  ImageUrl : string
  IsHidden : bool
  CreatedBy : int
}

'---------------- RELASJONER ----------------

' Meny lagt inn av admin
MenuItem::CreatedBy --> Admin::Id

' Event opprettet av admin
Event::CreatedBy --> Admin::Id

' Spillkø er koblet til spilltype
QueueEntry::GameStatusId --> GameStatus::Id

@enduml
