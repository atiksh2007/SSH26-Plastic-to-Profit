# 🧪 API Testing Guide

Complete guide for testing all API endpoints with examples.

## Table of Contents

1. [Setup for Testing](#setup-for-testing)
2. [Authentication Tests](#authentication-tests)
3. [Listing Tests](#listing-tests)
4. [Offer Tests](#offer-tests)
5. [Testing Tools](#testing-tools)

## Setup for Testing

### Prerequisites

- Backend server running at `http://localhost:8000`
- Database initialized with tables

### Testing Tools

Choose one:

1. **Swagger UI** (Easiest) - http://localhost:8000/api/v1/docs
2. **cURL** (Command line)
3. **Postman** (GUI)
4. **Thunder Client** (VS Code extension)

## Authentication Tests

### 1. Register Supplier

**Endpoint:** `POST /api/v1/auth/register`

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ABC Waste Co",
    "email": "supplier1@example.com",
    "password": "secure123",
    "role": "supplier"
  }'
```

**Expected Response (201):**
```json
{
  "id": 1,
  "name": "ABC Waste Co",
  "email": "supplier1@example.com",
  "role": "supplier",
  "created_at": "2024-02-26T10:00:00"
}
```

### 2. Register Buyer

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Green Recyclers",
    "email": "buyer1@example.com",
    "password": "secure123",
    "role": "buyer"
  }'
```

### 3. Login Supplier

**Endpoint:** `POST /api/v1/auth/login`

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "supplier1@example.com",
    "password": "secure123"
  }'
```

**Expected Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "ABC Waste Co",
    "email": "supplier1@example.com",
    "role": "supplier",
    "created_at": "2024-02-26T10:00:00"
  }
}
```

**Save the token:**
```bash
export SUPPLIER_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 4. Login Buyer

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "buyer1@example.com",
    "password": "secure123"
  }'
```

**Save the token:**
```bash
export BUYER_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 5. Get Current User

**Endpoint:** `GET /api/v1/auth/me`

```bash
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer $SUPPLIER_TOKEN"
```

### Error Cases to Test

**Invalid credentials:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "supplier1@example.com",
    "password": "wrongpassword"
  }'
```

**Expected Response (401):**
```json
{
  "detail": "Incorrect email or password"
}
```

**Duplicate email:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Another User",
    "email": "supplier1@example.com",
    "password": "secure123",
    "role": "supplier"
  }'
```

**Expected Response (400):**
```json
{
  "detail": "Email already registered"
}
```

## Listing Tests

### 1. Create Listing (Supplier)

**Endpoint:** `POST /api/v1/listings`

```bash
curl -X POST http://localhost:8000/api/v1/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPPLIER_TOKEN" \
  -d '{
    "plastic_type": "PET",
    "quantity_kg": 500,
    "expected_price_per_kg": 20,
    "location": "Mumbai, Maharashtra"
  }'
```

**Expected Response (201):**
```json
{
  "id": 1,
  "seller_id": 1,
  "plastic_type": "PET",
  "quantity_kg": 500.0,
  "expected_price_per_kg": 20.0,
  "location": "Mumbai, Maharashtra",
  "status": "active",
  "created_at": "2024-02-26T10:05:00"
}
```

### 2. Create Multiple Listings

```bash
# HDPE listing
curl -X POST http://localhost:8000/api/v1/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPPLIER_TOKEN" \
  -d '{
    "plastic_type": "HDPE",
    "quantity_kg": 750,
    "expected_price_per_kg": 25,
    "location": "Delhi NCR"
  }'

# PVC listing
curl -X POST http://localhost:8000/api/v1/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPPLIER_TOKEN" \
  -d '{
    "plastic_type": "PVC",
    "quantity_kg": 300,
    "expected_price_per_kg": 15,
    "location": "Bangalore, Karnataka"
  }'
```

### 3. Get All Listings (No Auth)

**Endpoint:** `GET /api/v1/listings`

```bash
curl -X GET http://localhost:8000/api/v1/listings
```

### 4. Get Listings with Filters

**Filter by plastic type:**
```bash
curl -X GET "http://localhost:8000/api/v1/listings?plastic_type=PET"
```

**Filter by status:**
```bash
curl -X GET "http://localhost:8000/api/v1/listings?status=active"
```

**Pagination:**
```bash
curl -X GET "http://localhost:8000/api/v1/listings?skip=0&limit=10"
```

**Combined filters:**
```bash
curl -X GET "http://localhost:8000/api/v1/listings?plastic_type=PET&status=active&limit=5"
```

### 5. Get Listing by ID

**Endpoint:** `GET /api/v1/listings/{id}`

```bash
curl -X GET http://localhost:8000/api/v1/listings/1
```

### 6. Get My Listings (Supplier)

**Endpoint:** `GET /api/v1/listings/my/listings`

```bash
curl -X GET http://localhost:8000/api/v1/listings/my/listings \
  -H "Authorization: Bearer $SUPPLIER_TOKEN"
```

### 7. Update Listing

**Endpoint:** `PUT /api/v1/listings/{id}`

```bash
curl -X PUT http://localhost:8000/api/v1/listings/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPPLIER_TOKEN" \
  -d '{
    "expected_price_per_kg": 22,
    "quantity_kg": 450
  }'
```

### 8. Delete Listing

**Endpoint:** `DELETE /api/v1/listings/{id}`

```bash
curl -X DELETE http://localhost:8000/api/v1/listings/1 \
  -H "Authorization: Bearer $SUPPLIER_TOKEN"
```

### Error Cases

**Buyer trying to create listing (403):**
```bash
curl -X POST http://localhost:8000/api/v1/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BUYER_TOKEN" \
  -d '{
    "plastic_type": "PET",
    "quantity_kg": 500,
    "expected_price_per_kg": 20,
    "location": "Mumbai"
  }'
```

**No authentication (401):**
```bash
curl -X POST http://localhost:8000/api/v1/listings \
  -H "Content-Type: application/json" \
  -d '{
    "plastic_type": "PET",
    "quantity_kg": 500,
    "expected_price_per_kg": 20,
    "location": "Mumbai"
  }'
```

## Offer Tests

### 1. Create Offer (Buyer)

**Endpoint:** `POST /api/v1/offers`

```bash
curl -X POST http://localhost:8000/api/v1/offers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BUYER_TOKEN" \
  -d '{
    "listing_id": 1,
    "offer_price_per_kg": 22
  }'
```

**Expected Response (201):**
```json
{
  "id": 1,
  "listing_id": 1,
  "buyer_id": 2,
  "offer_price_per_kg": 22.0,
  "status": "pending",
  "created_at": "2024-02-26T10:10:00"
}
```

### 2. Create Multiple Offers

```bash
curl -X POST http://localhost:8000/api/v1/offers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BUYER_TOKEN" \
  -d '{
    "listing_id": 2,
    "offer_price_per_kg": 26
  }'

curl -X POST http://localhost:8000/api/v1/offers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BUYER_TOKEN" \
  -d '{
    "listing_id": 3,
    "offer_price_per_kg": 16
  }'
```

### 3. Get My Offers (Buyer)

**Endpoint:** `GET /api/v1/offers/my/offers`

```bash
curl -X GET http://localhost:8000/api/v1/offers/my/offers \
  -H "Authorization: Bearer $BUYER_TOKEN"
```

### 4. Get Offers for My Listings (Supplier)

**Endpoint:** `GET /api/v1/offers`

```bash
curl -X GET http://localhost:8000/api/v1/offers \
  -H "Authorization: Bearer $SUPPLIER_TOKEN"
```

### 5. Get Offers for Specific Listing (Supplier)

**Endpoint:** `GET /api/v1/offers/listing/{listing_id}`

```bash
curl -X GET http://localhost:8000/api/v1/offers/listing/1 \
  -H "Authorization: Bearer $SUPPLIER_TOKEN"
```

### 6. Accept Offer (Supplier)

**Endpoint:** `PATCH /api/v1/offers/{id}/accept`

```bash
curl -X PATCH http://localhost:8000/api/v1/offers/1/accept \
  -H "Authorization: Bearer $SUPPLIER_TOKEN"
```

### 7. Reject Offer (Supplier)

**Endpoint:** `PATCH /api/v1/offers/{id}/reject`

```bash
curl -X PATCH http://localhost:8000/api/v1/offers/2/reject \
  -H "Authorization: Bearer $SUPPLIER_TOKEN"
```

### 8. Cancel Offer (Buyer)

**Endpoint:** `PATCH /api/v1/offers/{id}/cancel`

```bash
curl -X PATCH http://localhost:8000/api/v1/offers/3/cancel \
  -H "Authorization: Bearer $BUYER_TOKEN"
```

### Error Cases

**Supplier trying to create offer (403):**
```bash
curl -X POST http://localhost:8000/api/v1/offers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPPLIER_TOKEN" \
  -d '{
    "listing_id": 1,
    "offer_price_per_kg": 22
  }'
```

**Offer on own listing (400):**
```bash
# If buyer is also supplier and owns listing
curl -X POST http://localhost:8000/api/v1/offers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BUYER_TOKEN" \
  -d '{
    "listing_id": 1,
    "offer_price_per_kg": 22
  }'
```

**Buyer trying to accept offer (403):**
```bash
curl -X PATCH http://localhost:8000/api/v1/offers/1/accept \
  -H "Authorization: Bearer $BUYER_TOKEN"
```

## Testing Tools

### Using Postman

1. **Import Collection:**
   - Create new collection "Plastic Profit API"
   - Add environment with `base_url = http://localhost:8000`

2. **Add requests for each endpoint**

3. **Set up environment variables:**
   - `supplier_token`
   - `buyer_token`
   - `listing_id`
   - `offer_id`

### Using Swagger UI

1. Open http://localhost:8000/api/v1/docs

2. **Authorize:**
   - Click "Authorize" button
   - Enter token: `Bearer your_token_here`
   - Click "Authorize"

3. **Test endpoints:**
   - Expand any endpoint
   - Click "Try it out"
   - Fill in parameters
   - Click "Execute"

### Python Testing Script

```python
import requests

BASE_URL = "http://localhost:8000/api/v1"

# Register supplier
response = requests.post(f"{BASE_URL}/auth/register", json={
    "name": "Test Supplier",
    "email": "test@supplier.com",
    "password": "password123",
    "role": "supplier"
})
print("Register:", response.status_code)

# Login
response = requests.post(f"{BASE_URL}/auth/login", json={
    "email": "test@supplier.com",
    "password": "password123"
})
token = response.json()["access_token"]
print("Token:", token[:20] + "...")

# Create listing
headers = {"Authorization": f"Bearer {token}"}
response = requests.post(f"{BASE_URL}/listings", 
    json={
        "plastic_type": "PET",
        "quantity_kg": 500,
        "expected_price_per_kg": 20,
        "location": "Mumbai"
    },
    headers=headers
)
print("Create listing:", response.status_code)
listing_id = response.json()["id"]

# Get listings
response = requests.get(f"{BASE_URL}/listings")
print("Get listings:", response.status_code, len(response.json()["listings"]))
```

## Testing Checklist

### Authentication ✓
- [ ] Register supplier
- [ ] Register buyer
- [ ] Login supplier
- [ ] Login buyer
- [ ] Get current user
- [ ] Invalid credentials error
- [ ] Duplicate email error

### Listings ✓
- [ ] Create listing (supplier)
- [ ] Get all listings
- [ ] Get listing by ID
- [ ] Get my listings
- [ ] Update listing
- [ ] Delete listing
- [ ] Filter by type
- [ ] Filter by status
- [ ] Pagination
- [ ] Buyer cannot create listing

### Offers ✓
- [ ] Create offer (buyer)
- [ ] Get my offers
- [ ] Get offers for listing
- [ ] Accept offer (supplier)
- [ ] Reject offer (supplier)
- [ ] Cancel offer (buyer)
- [ ] Supplier cannot create offer
- [ ] Buyer cannot accept/reject

---

Happy Testing! 🧪