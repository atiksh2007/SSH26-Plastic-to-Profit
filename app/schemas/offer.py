"""
Pydantic schemas for Offer model.
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime
from app.models.offer import OfferStatus


class OfferBase(BaseModel):
    """Base offer schema with common fields."""
    offer_price_per_kg: float = Field(..., gt=0, description="Offered price per kilogram")


class OfferCreate(OfferBase):
    """Schema for creating a new offer."""
    listing_id: int = Field(..., description="ID of the listing")
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "listing_id": 1,
                "offer_price_per_kg": 22.5
            }
        }
    )


class OfferUpdate(BaseModel):
    """Schema for updating an offer."""
    offer_price_per_kg: Optional[float] = Field(None, gt=0)
    status: Optional[OfferStatus] = None


class OfferResponse(OfferBase):
    """Schema for offer response."""
    id: int
    listing_id: int
    buyer_id: int
    status: OfferStatus
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class OfferListResponse(BaseModel):
    """Schema for list of offers response."""
    total: int
    offers: List[OfferResponse]