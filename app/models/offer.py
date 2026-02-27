"""
Offer model for buyer offers on listings.
"""
from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base


class OfferStatus(str, enum.Enum):
    """Status of an offer."""
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    CANCELLED = "cancelled"


class Offer(Base):
    """
    Offer model representing a buyer's offer on a listing.
    
    Attributes:
        id: Primary key
        listing_id: Foreign key to Listing
        buyer_id: Foreign key to User (buyer)
        offer_price_per_kg: Offered price per kilogram
        status: Current status of the offer
        created_at: Timestamp of offer creation
        listing: Relationship to Listing model
        buyer: Relationship to User model
    """
    __tablename__ = "offers"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    listing_id = Column(Integer, ForeignKey("listings.id", ondelete="CASCADE"), nullable=False)
    buyer_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    offer_price_per_kg = Column(Float, nullable=False)
    status = Column(Enum(OfferStatus), default=OfferStatus.PENDING, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    listing = relationship("Listing", back_populates="offers")
    buyer = relationship("User", back_populates="offers")
    
    def __repr__(self):
        return f"<Offer(id={self.id}, listing_id={self.listing_id}, price={self.offer_price_per_kg})>"