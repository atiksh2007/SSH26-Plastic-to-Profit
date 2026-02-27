"""
Listing model for plastic waste listings.
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base


class PlasticType(str, enum.Enum):
    """Types of plastic materials."""
    PET = "PET"
    HDPE = "HDPE"
    PVC = "PVC"
    LDPE = "LDPE"
    PP = "PP"
    PS = "PS"
    OTHER = "OTHER"


class ListingStatus(str, enum.Enum):
    """Status of a listing."""
    ACTIVE = "active"
    PENDING = "pending"
    SOLD = "sold"
    CANCELLED = "cancelled"


class Listing(Base):
    """
    Listing model representing plastic waste available for sale.
    
    Attributes:
        id: Primary key
        seller_id: Foreign key to User (supplier)
        plastic_type: Type of plastic (PET, HDPE, etc.)
        quantity_kg: Quantity in kilograms
        expected_price_per_kg: Expected price per kilogram
        location: Location of the plastic waste
        status: Current status of the listing
        created_at: Timestamp of listing creation
        seller: Relationship to User model
        offers: Relationship to Offer model
    """
    __tablename__ = "listings"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    seller_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    plastic_type = Column(Enum(PlasticType), nullable=False)
    quantity_kg = Column(Float, nullable=False)
    expected_price_per_kg = Column(Float, nullable=False)
    location = Column(String(255), nullable=False)
    status = Column(Enum(ListingStatus), default=ListingStatus.ACTIVE, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    seller = relationship("User", back_populates="listings")
    offers = relationship("Offer", back_populates="listing", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Listing(id={self.id}, type={self.plastic_type}, quantity={self.quantity_kg}kg)>"