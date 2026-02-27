"""
Listing routes for plastic waste listings management.
"""
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.schemas.listing import (
    ListingCreate,
    ListingUpdate,
    ListingResponse,
    ListingListResponse
)
from app.services.listing_service import ListingService
from app.utils.security import get_current_user, get_current_active_supplier
from app.models.user import User
from app.models.listing import PlasticType, ListingStatus

router = APIRouter(prefix="/listings", tags=["Listings"])


@router.post(
    "",
    response_model=ListingResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new listing",
    description="Create a new plastic waste listing (suppliers only)"
)
def create_listing(
    listing_data: ListingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_supplier)
):
    """
    Create a new plastic waste listing.
    
    **Requires:** Supplier role
    
    - **plastic_type**: Type of plastic (PET, HDPE, PVC, LDPE, PP, PS, OTHER)
    - **quantity_kg**: Quantity in kilograms (must be positive)
    - **expected_price_per_kg**: Expected price per kilogram (must be positive)
    - **location**: Location of the plastic waste
    
    Returns the created listing with status set to 'active'.
    """
    return ListingService.create_listing(db, listing_data, current_user)


@router.get(
    "",
    response_model=ListingListResponse,
    summary="Get all listings",
    description="Get list of plastic waste listings with optional filters"
)
def get_listings(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=500, description="Maximum number of records"),
    plastic_type: Optional[PlasticType] = Query(None, description="Filter by plastic type"),
    status: Optional[ListingStatus] = Query(None, description="Filter by listing status"),
    seller_id: Optional[int] = Query(None, description="Filter by seller ID"),
    db: Session = Depends(get_db)
):
    """
    Get listings with optional filters and pagination.
    
    **No authentication required** - Public endpoint
    
    Query parameters:
    - **skip**: Offset for pagination (default: 0)
    - **limit**: Number of results to return (default: 100, max: 500)
    - **plastic_type**: Filter by plastic type (optional)
    - **status**: Filter by listing status (optional)
    - **seller_id**: Filter by seller user ID (optional)
    
    Returns:
    - **total**: Total count of matching listings
    - **listings**: Array of listing objects
    """
    listings = ListingService.get_listings(
        db, skip=skip, limit=limit, plastic_type=plastic_type,
        status=status, seller_id=seller_id
    )
    total = ListingService.get_listings_count(
        db, plastic_type=plastic_type, status=status, seller_id=seller_id
    )
    
    return ListingListResponse(total=total, listings=listings)


@router.get(
    "/{listing_id}",
    response_model=ListingResponse,
    summary="Get listing by ID",
    description="Get a specific listing by its ID"
)
def get_listing(
    listing_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a specific listing by ID.
    
    **No authentication required** - Public endpoint
    
    Returns listing details including seller information.
    """
    return ListingService.get_listing_by_id(db, listing_id)


@router.get(
    "/my/listings",
    response_model=ListingListResponse,
    summary="Get my listings",
    description="Get all listings created by the current user (suppliers only)"
)
def get_my_listings(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    status: Optional[ListingStatus] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_supplier)
):
    """
    Get all listings created by the current authenticated user.
    
    **Requires:** Supplier role and valid authentication
    
    Query parameters:
    - **skip**: Offset for pagination (default: 0)
    - **limit**: Number of results to return (default: 100, max: 500)
    - **status**: Filter by listing status (optional)
    
    Returns user's own listings only.
    """
    listings = ListingService.get_listings(
        db, skip=skip, limit=limit, status=status, seller_id=current_user.id
    )
    total = ListingService.get_listings_count(
        db, status=status, seller_id=current_user.id
    )
    
    return ListingListResponse(total=total, listings=listings)


@router.put(
    "/{listing_id}",
    response_model=ListingResponse,
    summary="Update listing",
    description="Update an existing listing (owner only)"
)
def update_listing(
    listing_id: int,
    listing_data: ListingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_supplier)
):
    """
    Update an existing listing.
    
    **Requires:** Supplier role and must be the listing owner
    
    Only provided fields will be updated. All fields are optional:
    - **plastic_type**: Update plastic type
    - **quantity_kg**: Update quantity
    - **expected_price_per_kg**: Update price
    - **location**: Update location
    - **status**: Update listing status
    """
    return ListingService.update_listing(db, listing_id, listing_data, current_user)


@router.delete(
    "/{listing_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete listing",
    description="Delete a listing (owner only)"
)
def delete_listing(
    listing_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_supplier)
):
    """
    Delete a listing.
    
    **Requires:** Supplier role and must be the listing owner
    
    This will also delete all associated offers.
    """
    return ListingService.delete_listing(db, listing_id, current_user)