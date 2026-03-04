create database customerDB;

CREATE TABLE Customers (
    Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100),
    Email NVARCHAR(100),
    IsActive bit default 0
);

CREATE TABLE CustomerDetails (
    Id INT PRIMARY KEY IDENTITY,
    CustomerId INT FOREIGN KEY REFERENCES Customers(Id),
    Code NVARCHAR(50),
    Category NVARCHAR(200),
    IsActive bit default 0
);
