"""
Main FastAPI application for Plastic Profit Marketplace.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import settings
from app.database import init_db
from app.routes import auth, listings, offers


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup: Initialize database
    print("🚀 Starting up Plastic Profit Marketplace API...")
    print(f"📊 Initializing database: {settings.DB_NAME}")
    init_db()
    print("✅ Database initialized successfully")
    
    yield
    
    # Shutdown
    print("👋 Shutting down Plastic Profit Marketplace API...")


# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    description="""
    ## Plastic Profit Marketplace API
    
    A comprehensive REST API for connecting plastic waste suppliers with recyclers.
    
    ### Features
    
    * 🔐 **JWT Authentication** - Secure token-based authentication
    * 👥 **User Management** - Register and login as supplier or buyer
    * 📦 **Listings Management** - Create and manage plastic waste listings
    * 💰 **Offers System** - Make and manage offers on listings
    * 🔍 **Advanced Filtering** - Filter by type, status, location, and more
    * 📊 **Role-Based Access** - Different permissions for suppliers and buyers
    
    ### User Roles
    
    * **Supplier**: Can create listings, view offers on their listings, accept/reject offers
    * **Buyer**: Can view listings, create offers, cancel their own offers
    
    ### Authentication
    
    1. Register a new account at `/api/v1/auth/register`
    2. Login at `/api/v1/auth/login` to receive a JWT token
    3. Include the token in subsequent requests: `Authorization: Bearer <token>`
    
    ### Getting Started
    
    1. **Register** as a supplier or buyer
    2. **Login** to get your access token
    3. **Suppliers**: Create plastic waste listings
    4. **Buyers**: Browse listings and make offers
    5. **Suppliers**: Review and accept/reject offers
    """,
    version=settings.API_VERSION,
    docs_url=f"/api/{settings.API_VERSION}/docs",
    redoc_url=f"/api/{settings.API_VERSION}/redoc",
    openapi_url=f"/api/{settings.API_VERSION}/openapi.json",
    lifespan=lifespan
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root endpoint
@app.get("/", tags=["Root"])
def read_root():
    """
    Root endpoint - API health check and information.
    """
    return {
        "message": "Welcome to Plastic Profit Marketplace API",
        "version": settings.API_VERSION,
        "docs": f"/api/{settings.API_VERSION}/docs",
        "status": "healthy"
    }


# Health check endpoint
@app.get("/health", tags=["Root"])
def health_check():
    """
    Health check endpoint for monitoring.
    """
    return {
        "status": "healthy",
        "app_name": settings.APP_NAME,
        "version": settings.API_VERSION
    }


# Include routers with API version prefix
app.include_router(auth.router, prefix=f"/api/{settings.API_VERSION}")
app.include_router(listings.router, prefix=f"/api/{settings.API_VERSION}")
app.include_router(offers.router, prefix=f"/api/{settings.API_VERSION}")


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )