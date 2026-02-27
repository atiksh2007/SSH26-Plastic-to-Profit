"""
Pydantic schemas for Listing model.
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime
from app.models.listing import PlasticType, ListingStatus


class ListingBase(BaseModel):
    """Base listing schema with common fields."""
    plastic_type: PlasticType = Field(..., description="Type of plastic")
    quantity_kg: float = Field(..., gt=0, description="Quantity in kilograms")
    expected_price_per_kg: float = Field(..., gt=0, description="Expected price per kg")
    location: str = Field(..., min_length=3, max_length=255, description="Location of plastic waste")


class ListingCreate(ListingBase):
    """Schema for creating a new listing."""
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "plastic_type": "PET",
                "quantity_kg": 500.0,
                "expected_price_per_kg": 20.0,
                "location": "Mumbai, Maharashtra"
            }
        }
    )


class ListingUpdate(BaseModel):
    """Schema for updating a listing."""
    plastic_type: Optional[PlasticType] = None
    quantity_kg: Optional[float] = Field(None, gt=0)
    expected_price_per_kg: Optional[float] = Field(None, gt=0)
    location: Optional[str] = Field(None, min_length=3, max_length=255)
    status: Optional[ListingStatus] = None


class ListingResponse(ListingBase):
    """Schema for listing response."""
    id: int
    seller_id: int
    status: ListingStatus
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class ListingListResponse(BaseModel):
    """Schema for list of listings response."""
    total: int
    listings: List[ListingResponse]