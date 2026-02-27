"""
Authentication routes for user registration and login.
"""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user import UserCreate, UserLogin, UserResponse, Token
from app.services.user_service import UserService
from app.utils.security import get_current_user
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    description="Create a new user account with email, password, name, and role (supplier or buyer)"
)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user account.
    
    - **name**: User's full name (2-100 characters)
    - **email**: Valid email address (must be unique)
    - **password**: Password (minimum 6 characters)
    - **role**: User role - either 'supplier' or 'buyer'
    
    Returns the created user object (without password).
    """
    return UserService.create_user(db, user_data)


@router.post(
    "/login",
    response_model=Token,
    summary="Login user",
    description="Authenticate user with email and password, returns JWT token"
)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate user and receive JWT token.
    
    - **email**: User's email address
    - **password**: User's password
    
    Returns:
    - **access_token**: JWT token for authenticated requests
    - **token_type**: Token type (bearer)
    - **user**: User information
    
    Use the access_token in subsequent requests:
    ```
    Authorization: Bearer <access_token>
    ```
    """
    return UserService.authenticate_user(db, login_data)


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user",
    description="Get the current authenticated user's information"
)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """
    Get current authenticated user's information.
    
    Requires valid JWT token in Authorization header.
    
    Returns user information including id, name, email, role, and creation date.
    """
    return current_user