"""
User model for authentication and user management.
"""
from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base


class UserRole(str, enum.Enum):
    """User role enumeration."""
    SUPPLIER = "supplier"
    BUYER = "buyer"


class User(Base):
    """
    User model representing both suppliers and buyers.
    
    Attributes:
        id: Primary key
        name: User's full name
        email: Unique email address
        password_hash: Hashed password (never store plain text)
        role: User role (supplier or buyer)
        created_at: Timestamp of account creation
        listings: Relationship to listings (for suppliers)
        offers: Relationship to offers (for buyers)
    """
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    listings = relationship("Listing", back_populates="seller", cascade="all, delete-orphan")
    offers = relationship("Offer", back_populates="buyer", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"