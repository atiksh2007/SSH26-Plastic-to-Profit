# 🚀 Quick Start Guide - Plastic Profit Backend

Get the backend API running in 5 minutes!

## Prerequisites

- Python 3.11+ installed
- MySQL 8.0+ installed and running
- Terminal/Command Prompt access

## Step-by-Step Setup

### 1️⃣ Install Dependencies (2 minutes)

```bash
# Navigate to project directory
cd plastic-profit-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install packages
pip install -r requirements.txt
```

### 2️⃣ Setup Database (2 minutes)

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE plastic_marketplace;
EXIT;
```

### 3️⃣ Configure Environment (1 minute)

```bash
# Copy example environment file
cp .env.example .env

# Generate secret key
python -c "import secrets; print(secrets.token_hex(32))"

# Edit .env file with your editor and:
# 1. Update DATABASE_URL with your MySQL credentials
# 2. Replace SECRET_KEY with generated key
```

**Example `.env` file:**
```env
DATABASE_URL=mysql+pymysql://root:your_password@localhost:3306/plastic_marketplace
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=plastic_marketplace

SECRET_KEY=paste_your_generated_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

APP_NAME=Plastic Profit Marketplace
DEBUG=True
API_VERSION=v1
```

### 4️⃣ Run the Server

```bash
# Start the development server
uvicorn app.main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### 5️⃣ Test the API

Open your browser and go to:
- **API Docs**: http://localhost:8000/api/v1/docs
- **Health Check**: http://localhost:8000/health

## 🎯 Test the Complete Flow

### Step 1: Register a Supplier

**Using Swagger UI:** Go to http://localhost:8000/api/v1/docs
- Find `POST /api/v1/auth/register`
- Click "Try it out"
- Use this JSON:

```json
{
  "name": "Test Supplier",
  "email": "supplier@test.com",
  "password": "password123",
  "role": "supplier"
}
```

**Using cURL:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Supplier",
    "email": "supplier@test.com",
    "password": "password123",
    "role": "supplier"
  }'
```

### Step 2: Login

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "supplier@test.com",
    "password": "password123"
  }'
```

**Copy the `access_token` from the response!**

### Step 3: Create a Listing

Replace `YOUR_TOKEN` with your actual token:

```bash
curl -X POST http://localhost:8000/api/v1/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "plastic_type": "PET",
    "quantity_kg": 500,
    "expected_price_per_kg": 20,
    "location": "Mumbai, Maharashtra"
  }'
```

### Step 4: View Listings

```bash
curl http://localhost:8000/api/v1/listings
```

### Step 5: Register a Buyer

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Buyer",
    "email": "buyer@test.com",
    "password": "password123",
    "role": "buyer"
  }'
```

### Step 6: Login as Buyer and Make an Offer

```bash
# Login as buyer
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "buyer@test.com",
    "password": "password123"
  }'

# Make an offer (use buyer's token)
curl -X POST http://localhost:8000/api/v1/offers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer BUYER_TOKEN" \
  -d '{
    "listing_id": 1,
    "offer_price_per_kg": 22
  }'
```

## ✅ Success!

Your API is now running! You can:
- ✅ Register users (suppliers and buyers)
- ✅ Create plastic waste listings
- ✅ Make offers on listings
- ✅ View all listings and offers

## 🎓 Next Steps

1. **Explore the API Docs**: http://localhost:8000/api/v1/docs
2. **Read the README**: Full documentation in `README.md`
3. **Connect Frontend**: Use the API with your React frontend
4. **Test All Endpoints**: Try accepting/rejecting offers

## 🐛 Common Issues

### Issue: "Can't connect to MySQL"
**Solution:** 
- Check MySQL is running: `mysql.server start` (macOS) or `systemctl start mysql` (Linux)
- Verify credentials in `.env` file

### Issue: "Module not found"
**Solution:**
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt` again

### Issue: "Port 8000 already in use"
**Solution:**
```bash
# Use different port
uvicorn app.main:app --reload --port 8001
```

### Issue: "401 Unauthorized"
**Solution:**
- Check your token is valid and not expired
- Format: `Authorization: Bearer <your_token>`

## 📱 Using with Frontend

Update your React frontend's API URL:

```javascript
const API_URL = "http://localhost:8000/api/v1";

// Example: Login request
const response = await fetch(`${API_URL}/auth/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123"
  })
});

const data = await response.json();
const token = data.access_token;

// Use token in subsequent requests
const listingsResponse = await fetch(`${API_URL}/listings`, {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});
```

## 🎉 You're All Set!

Your backend API is ready for development. Happy coding! 🚀