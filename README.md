# 🌱 Plastic Profit Marketplace - Backend API

A production-ready REST API built with FastAPI for connecting plastic waste suppliers with recyclers.

![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## 🚀 Features

- ✅ **JWT Authentication** - Secure token-based authentication with bcrypt password hashing
- ✅ **Role-Based Access Control** - Supplier and Buyer roles with different permissions
- ✅ **RESTful API** - Clean, intuitive REST endpoints
- ✅ **MySQL Database** - Reliable relational database with SQLAlchemy ORM
- ✅ **Pydantic Validation** - Request/response validation and serialization
- ✅ **Comprehensive Documentation** - Auto-generated Swagger UI and ReDoc
- ✅ **CORS Enabled** - Ready for frontend integration
- ✅ **Production Ready** - Modular architecture, error handling, and security best practices

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Database Setup](#-database-setup)
- [Configuration](#-configuration)
- [Running the Server](#-running-the-server)
- [API Documentation](#-api-documentation)
- [API Endpoints](#-api-endpoints)
- [Testing with cURL](#-testing-with-curl)
- [Database Models](#-database-models)
- [Security](#-security)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| FastAPI | Modern Python web framework |
| SQLAlchemy | SQL toolkit and ORM |
| MySQL | Relational database |
| PyMySQL | MySQL database connector |
| Pydantic | Data validation using Python type hints |
| python-jose | JWT token encoding/decoding |
| passlib | Password hashing with bcrypt |
| python-dotenv | Environment variable management |
| Uvicorn | ASGI server |

## 📁 Project Structure

```
plastic-profit-backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Application configuration
│   ├── database.py          # Database connection and session
│   │
│   ├── models/              # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py          # User model
│   │   ├── listing.py       # Listing model
│   │   └── offer.py         # Offer model
│   │
│   ├── schemas/             # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py          # User schemas
│   │   ├── listing.py       # Listing schemas
│   │   └── offer.py         # Offer schemas
│   │
│   ├── routes/              # API routes
│   │   ├── __init__.py
│   │   ├── auth.py          # Authentication routes
│   │   ├── listings.py      # Listing routes
│   │   └── offers.py        # Offer routes
│   │
│   ├── services/            # Business logic
│   │   ├── __init__.py
│   │   ├── user_service.py
│   │   ├── listing_service.py
│   │   └── offer_service.py
│   │
│   └── utils/               # Utility functions
│       ├── __init__.py
│       └── security.py      # Security utilities
│
├── .env.example             # Environment variables template
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## 📥 Installation

### Prerequisites

- Python 3.11 or higher
- MySQL 8.0 or higher
- pip (Python package manager)

### Step 1: Clone/Download the Project

```bash
cd plastic-profit-backend
```

### Step 2: Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

## 🗄️ Database Setup

### Step 1: Create MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE plastic_marketplace CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Create user (optional, recommended for production)
CREATE USER 'plastic_user'@'localhost' IDENTIFIED BY 'plastic@#001';
GRANT ALL PRIVILEGES ON plastic_marketplace.* TO 'plastic_user'@'localhost';
FLUSH PRIVILEGES;

# Exit MySQL
EXIT;
```

### Step 2: Verify Database Connection

```bash
mysql -u plastic_user -p plastic_marketplace
```

## ⚙️ Configuration

### Step 1: Create .env File

```bash
cp .env.example .env
```

### Step 2: Edit .env File

```bash
# Edit with your preferred editor
nano .env
# or
vim .env
```

### Step 3: Configure Environment Variables

```env
# Database Configuration
DATABASE_URL=mysql+pymysql://plastic_user:your_secure_password@localhost:3306/plastic_marketplace
DB_HOST=localhost
DB_PORT=3306
DB_USER=plastic_user
DB_PASSWORD=your_secure_password
DB_NAME=plastic_marketplace

# JWT Configuration - IMPORTANT: Generate a secure secret key!
# Generate with: openssl rand -hex 32
SECRET_KEY=your-secret-key-here-use-openssl-rand-hex-32-to-generate
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Application Configuration
APP_NAME=Plastic Profit Marketplace
DEBUG=True
API_VERSION=v1
```

### Generate Secure Secret Key

```bash
# On macOS/Linux:
openssl rand -hex 32

# Or using Python:
python -c "import secrets; print(secrets.token_hex(32))"
```

Copy the generated key and paste it as your `SECRET_KEY` in the .env file.

## 🏃 Running the Server

### Development Mode (with auto-reload)

```bash
# Make sure virtual environment is activated
# Then run:
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Using Python directly

```bash
python -m app.main
```

The server will start at: `http://localhost:8000`

## 📚 API Documentation

Once the server is running, access the interactive documentation:

- **Swagger UI**: http://localhost:8000/api/v1/docs
- **ReDoc**: http://localhost:8000/api/v1/redoc
- **OpenAPI JSON**: http://localhost:8000/api/v1/openapi.json

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login and get JWT token | No |
| GET | `/api/v1/auth/me` | Get current user info | Yes |

### Listing Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/api/v1/listings` | Create new listing | Yes | Supplier |
| GET | `/api/v1/listings` | Get all listings (with filters) | No | - |
| GET | `/api/v1/listings/{id}` | Get listing by ID | No | - |
| GET | `/api/v1/listings/my/listings` | Get my listings | Yes | Supplier |
| PUT | `/api/v1/listings/{id}` | Update listing | Yes | Supplier (owner) |
| DELETE | `/api/v1/listings/{id}` | Delete listing | Yes | Supplier (owner) |

### Offer Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/api/v1/offers` | Create new offer | Yes | Buyer |
| GET | `/api/v1/offers` | Get offers (filtered by role) | Yes | Any |
| GET | `/api/v1/offers/my/offers` | Get my offers | Yes | Buyer |
| GET | `/api/v1/offers/listing/{id}` | Get offers for listing | Yes | Supplier (owner) |
| GET | `/api/v1/offers/{id}` | Get offer by ID | Yes | Owner/Buyer |
| PATCH | `/api/v1/offers/{id}/accept` | Accept offer | Yes | Supplier (owner) |
| PATCH | `/api/v1/offers/{id}/reject` | Reject offer | Yes | Supplier (owner) |
| PATCH | `/api/v1/offers/{id}/cancel` | Cancel offer | Yes | Buyer (owner) |

## 🧪 Testing with cURL

### 1. Register a Supplier

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Supplier",
    "email": "supplier@example.com",
    "password": "password123",
    "role": "supplier"
  }'
```

### 2. Register a Buyer

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Buyer",
    "email": "buyer@example.com",
    "password": "password123",
    "role": "buyer"
  }'
```

### 3. Login (Supplier)

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "supplier@example.com",
    "password": "password123"
  }'
```

Save the `access_token` from the response!

### 4. Create a Listing (Supplier)

```bash
curl -X POST http://localhost:8000/api/v1/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "plastic_type": "PET",
    "quantity_kg": 500,
    "expected_price_per_kg": 20,
    "location": "Mumbai, Maharashtra"
  }'
```

### 5. Get All Listings (No auth required)

```bash
curl -X GET http://localhost:8000/api/v1/listings
```

### 6. Make an Offer (Buyer)

```bash
# First login as buyer to get token
curl -X POST http://localhost:8000/api/v1/offers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer BUYER_ACCESS_TOKEN" \
  -d '{
    "listing_id": 1,
    "offer_price_per_kg": 22
  }'
```

## 🗃️ Database Models

### User Model

```python
id: int (Primary Key)
name: str
email: str (Unique)
password_hash: str
role: enum ('supplier', 'buyer')
created_at: datetime
```

### Listing Model

```python
id: int (Primary Key)
seller_id: int (Foreign Key -> User)
plastic_type: enum ('PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'OTHER')
quantity_kg: float
expected_price_per_kg: float
location: str
status: enum ('active', 'pending', 'sold', 'cancelled')
created_at: datetime
```

### Offer Model

```python
id: int (Primary Key)
listing_id: int (Foreign Key -> Listing)
buyer_id: int (Foreign Key -> User)
offer_price_per_kg: float
status: enum ('pending', 'accepted', 'rejected', 'cancelled')
created_at: datetime
```

## 🔒 Security

### Implemented Security Features

- ✅ **Password Hashing**: Bcrypt with salt
- ✅ **JWT Tokens**: Secure token-based authentication
- ✅ **Role-Based Access**: Different permissions for suppliers and buyers
- ✅ **SQL Injection Protection**: SQLAlchemy parameterized queries
- ✅ **CORS Configuration**: Configurable cross-origin requests
- ✅ **Input Validation**: Pydantic schemas validate all inputs

### Security Best Practices

1. **Never commit `.env` file** - Keep credentials secret
2. **Use strong SECRET_KEY** - Generate with `openssl rand -hex 32`
3. **Use HTTPS in production** - Encrypt data in transit
4. **Set secure CORS origins** - Don't use `allow_origins=["*"]` in production
5. **Regular updates** - Keep dependencies updated
6. **Database user permissions** - Use dedicated user with minimal privileges

## 🚀 Production Deployment

### Using Gunicorn (Production Server)

```bash
pip install gunicorn

gunicorn app.main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```

### Using Docker (Recommended)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables for Production

```env
DEBUG=False
DATABASE_URL=mysql+pymysql://user:pass@prod-host:3306/plastic_marketplace
SECRET_KEY=<generate-new-secure-key>
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 🐛 Troubleshooting

### Database Connection Error

```
Error: Can't connect to MySQL server
```

**Solution:**
- Verify MySQL is running: `systemctl status mysql`
- Check credentials in `.env` file
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Import Error

```
ModuleNotFoundError: No module named 'app'
```

**Solution:**
- Ensure virtual environment is activated
- Install dependencies: `pip install -r requirements.txt`
- Run from project root directory

### JWT Token Error

```
Could not validate credentials
```

**Solution:**
- Check SECRET_KEY in `.env` matches
- Verify token hasn't expired
- Ensure Authorization header format: `Bearer <token>`

## 📄 License

MIT License - feel free to use for commercial or personal projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Built with ♻️ for a sustainable future**