# 🚀 CustomerApp

Enterprise-level Customer Management Application built using:

- 🟢 Angular (Clean Architecture – Frontend)
- 🔵 ASP.NET Core Web API (.NET Core)
- 🧠 Clean Architecture
- ⚡ CQRS Pattern
- 🗂 Repository Pattern
- 🧾 Soft Delete Implementation

---

# 📌 Project Overview

CustomerApp is a full-stack application that allows users to:

- Create Customers
- Add multiple detail lines (Hardware / Software)
- Auto-generate category-based codes (HW / SW)
- Delete detail rows
- Soft delete customers
- Filter customers by category
- Print customer details

This project follows enterprise architectural standards and best practices.

---

# 🏗 Architecture

## 🔵 Backend (ASP.NET Core)

Clean Architecture Layers:

- Domain
- Application (CQRS – Commands & Queries)
- Infrastructure
- API

Patterns Used:

- CQRS Pattern
- Repository Pattern
- Dependency Injection
- Soft Delete Strategy
- Swagger Documentation

---

## 🟢 Frontend (Angular)

Structured using Clean Architecture principles:

- Core
- Domain
- Infrastructure
- Presentation
- Facade Pattern

Technologies Used:

- Angular Reactive Forms
- AG Grid (Dynamic Grid)
- Service Layer Abstraction
- Signal-based State Handling

---

# 🖥 Application Features

---

## 1️⃣ Customer Entry Screen

- Enter Customer Name
- Enter Email
- Click **Add Row** to insert detail lines dynamically

```
📷 Add screenshot here:
![Customer Entry](https://github.com/muralidharanpp/CustomerApp/blob/main/Videos%20%26%20Screenshots/angular-1.png)
```

---

## 2️⃣ Add Multiple Detail Lines

Each customer can have multiple details.

Detail fields:

- Code
- Category (Hardware / Software)
- Description

Rows are dynamically added using AG Grid.

```
📷 Add screenshot here:
![Add Row](images/add-row.png)
```

---

## 3️⃣ Category-Based Code Logic

Automatic prefix generation based on category:

| Category  | Code Format |
|-----------|------------|
| Hardware  | HW-1001    |
| Software  | SW-2001    |

Rules:

- Hardware → Code must start with `HW-`
- Software → Code must start with `SW-`
- User can enter numbers only after prefix
- Prefix is auto-maintained

---

## 4️⃣ Category Filtering

- Clicking **Hardware** loads only hardware records
- Clicking **Software** loads only software records
- Grid refreshes dynamically from API

```
📷 Add screenshot here:
![Category Filter](images/category-filter.png)
```

---

## 5️⃣ Soft Delete Implementation

- Customers are not permanently deleted
- Uses `IsDeleted` flag in database
- Excluded from normal queries
- Maintains data integrity and audit capability

---

## 6️⃣ Delete Detail Line

- Individual detail rows can be removed
- Entire customer can be deleted (Soft Delete)

---

## 7️⃣ Print Feature

- Click **Print**
- Opens formatted print preview
- Customer details are printable

```
📷 Add screenshot here:
![Print](images/print.png)
```

---

# 🔧 Installation Guide

---

# 📥 Clone the Repository

```bash
git clone https://github.com/your-username/customerapp.git
cd customerapp
```

---

# 🟢 Frontend Setup (Angular)

### Step 1: Navigate to Frontend Folder

```bash
cd customer-app/frontend/angular-customer-app
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Build Application

```bash
npm run build
```

### Step 4: Run Application

```bash
npm start
```

---

### ⚠ Configure API URL

Navigate to:

```
domain/infrastructure/
```

Update:

```ts
baseURL = "https://localhost:xxxx/api"
```

⚠ Note: In production, move API URL to `environment.ts`.

---

# 🔵 Backend Setup (.NET Core)

### Step 1: Navigate to Backend

```
backend/CustomerApp.Api/CustomerApp.Api
```

---

### Step 2: Setup Database

1. Open **Script** folder
2. Execute SQL scripts using:
   - SQL Server Management Studio (SSMS)

---

### Step 3: Update Connection String

Open:

```
appsettings.json
```

Update:

```json
"ConnectionStrings": {
  "DefaultConnection": "your_connection_string_here"
}
```

---

### Step 4: Configure CORS

Open:

```
Program.cs
```

Add Angular URL:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
```

---

### Step 5: Build & Run Backend

```bash
dotnet build
dotnet run
```

You should see Swagger:

```
https://localhost:xxxx/swagger
```

---

# ✅ Expected Result

If configuration is correct:

- Backend runs successfully
- Swagger UI loads
- Angular app loads
- Customer entry screen appears
- Add Row works
- Category filter works
- Print works

---

# 📂 Recommended Project Structure

```
customerapp/
│
├── backend/
│   ├── CustomerApp.Api/
│   ├── CustomerApp.Application/
│   ├── CustomerApp.Domain/
│   └── CustomerApp.Infrastructure/
│
├── frontend/
│   └── angular-customer-app/
│
├── images/
│   ├── customer-entry.png
│   ├── add-row.png
│   ├── category-filter.png
│   └── print.png
│
└── README.md
```

---

# 📸 Adding Screenshots

1. Create an `images` folder in project root.
2. Add your screenshots inside it.
3. Reference them in README:

```markdown
![Customer Entry](images/customer-entry.png)
```

---

# 🧠 Technical Highlights

- Clean Architecture (Frontend & Backend)
- CQRS Implementation
- Repository Pattern
- Soft Delete Strategy
- Dynamic Grid Management
- Category-Based Business Logic
- Print Preview Feature
- Swagger Integration
- CORS Configuration

---

# 👨‍💻 Author

Murali P

---

# 📄 License

This project is for learning and demonstration purposes.
