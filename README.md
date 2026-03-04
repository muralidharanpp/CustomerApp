🚀 CustomerApp – Clean Architecture (Angular + .NET Core)
📌 Project Overview

CustomerApp is a full-stack enterprise-ready application built using:

🎯 Frontend: Angular (Clean Architecture)

⚙ Backend: ASP.NET Core Web API

🧠 Patterns Used:

Clean Architecture

CQRS Pattern

Repository Pattern

Soft Delete

SOLID Principles

The application allows users to:

Create Customers

Add multiple Customer Details (Hardware / Software)

Delete Detail rows

Soft delete Customers

Filter by Category

Print Customer Details

🏗 Architecture Overview
Backend Architecture

Built using Clean Architecture with the following layers:

Domain

Application (CQRS)

Infrastructure

API

Implements:

Command & Query Separation

Repository Pattern

Soft Delete Strategy

Swagger for API documentation

Frontend Architecture

Angular application structured with Clean Architecture approach:

Core

Domain

Infrastructure

Presentation

Facade Pattern for State Handling

Uses:

Signals / Reactive forms

AG Grid for dynamic grid

Service layer abstraction

Proper separation of concerns

🖥 Application Features
1️⃣ Customer Entry Screen

Users can:

Enter Customer Name

Enter Email

Click Add Row to add detail lines

📷 Add Screenshot Here

![Customer Entry](images/customer-entry.png)
2️⃣ Add Multiple Detail Lines

Each customer can have multiple details.

Details contain:

Code

Category (Hardware / Software)

Description

When clicking Add Row, a new row is dynamically added to AG Grid.

📷 Add Screenshot Here

![Add Row](images/add-row.png)
3️⃣ Category-Based Code Logic

If category = Hardware, code must start with HW-

If category = Software, code must start with SW-

User enters only numbers after prefix.

Prefix is automatically handled.

Example:

HW-1001
SW-2001
4️⃣ Category Filtering

When clicking:

Hardware → Grid loads only Hardware records

Software → Grid loads only Software records

Data loads dynamically from API.

📷 Add Screenshot Here

![Category Filter](images/category-filter.png)
5️⃣ Soft Delete

Customers are NOT permanently deleted.

A IsDeleted flag is used.

Records are excluded from normal queries.

Can be restored if needed.

6️⃣ Delete Detail Line

Individual detail rows can be deleted.

Entire customer can also be deleted.

7️⃣ Print Feature

Clicking Print opens a formatted print window.

Customer details are rendered in printable format.

📷 Add Screenshot Here

![Print](images/print.png)
🔧 Installation Guide (For Git Repository)
📥 Clone Repository
git clone https://github.com/your-username/customerapp.git
cd customerapp
🟢 Frontend Setup (Angular)
Navigate to Frontend Folder
cd customer-app/frontend/angular-customer-app
Install Dependencies
npm install
Build Application
npm run build
Serve Application
npm start
⚠ Configure API URL

Navigate to:

domain/infrastructure/

Update baseURL with your API address.

⚠ In production, this should be moved to environment.ts.

🔵 Backend Setup (.NET Core)
Navigate to Backend Folder
backend/CustomerApp.Api/CustomerApp.Api
Step 1: Setup Database

Open Script folder

Execute SQL scripts in:

🛠 SQL Server Management Studio (SSMS)

Step 2: Update Connection String

Open:

appsettings.json

Update:

"ConnectionStrings": {
  "DefaultConnection": "your_connection_string_here"
}
Step 3: Configure CORS

Open:

Program.cs

Add Angular URL in CORS policy:

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
Step 4: Build & Run
dotnet build
dotnet run

You will see:

https://localhost:xxxx/swagger

Open Swagger to verify API.

✅ If Everything Is Configured Correctly

Backend runs successfully

Swagger is visible

Angular app loads

Customer entry screen is displayed

Add Row works

Category filter works

Print works

📂 Suggested Git Structure
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
└── README.md
📸 How To Add Images In Git

Create folder inside root:

images/

Add screenshots:

images/customer-entry.png
images/add-row.png
images/category-filter.png
images/print.png

Reference inside README:

![Customer Entry](images/customer-entry.png)
🧠 Technical Highlights

Clean Architecture Implementation

CQRS Pattern

Repository Pattern

Soft Delete

AG Grid Integration

Dynamic Row Management

Category-based Code Generation

Print Preview Feature

Proper CORS Configuration

Swagger API Documentation

👨‍💻 Author

Murali P
