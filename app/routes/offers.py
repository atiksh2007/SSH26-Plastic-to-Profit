"""
Offer routes for managing offers on listings.
"""
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.schemas.offer import (
    OfferCreate,
    OfferResponse,
    OfferListResponse
)
from app.services.offer_service import OfferService
from app.utils.security import get_current_user, get_current_active_buyer
from app.models.user import User
from app.models.offer import OfferStatus

router = APIRouter(prefix="/offers", tags=["Offers"])


@router.post(
    "",
    response_model=OfferResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new offer",
    description="Create an offer on a listing (buyers only)"
)
def create_offer(
    offer_data: OfferCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_buyer)
):
    """
    Create a new offer on a listing.
    
    **Requires:** Buyer role
    
    - **listing_id**: ID of the listing to make an offer on
    - **offer_price_per_kg**: Your offered price per kilogram (must be positive)
    
    Restrictions:
    - Listing must be active
    - Cannot make offer on your own listing
    
    Returns the created offer with status set to 'pending'.
    """
    return OfferService.create_offer(db, offer_data, current_user)


@router.get(
    "",
    response_model=OfferListResponse,
    summary="Get offers",
    description="Get offers with optional filters (authentication required)"
)
def get_offers(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=500, description="Maximum number of records"),
    listing_id: Optional[int] = Query(None, description="Filter by listing ID"),
    status: Optional[OfferStatus] = Query(None, description="Filter by offer status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get offers with filters.
    
    **Requires:** Valid authentication
    
    - Buyers see only their own offers
    - Suppliers see offers on their listings
    
    Query parameters:
    - **skip**: Offset for pagination (default: 0)
    - **limit**: Number of results to return (default: 100, max: 500)
    - **listing_id**: Filter by listing ID (optional)
    - **status**: Filter by offer status (optional)
    """
    if current_user.role.value == "buyer":
        # Buyers see only their offers
        offers = OfferService.get_offers(
            db, skip=skip, limit=limit, buyer_id=current_user.id,
            listing_id=listing_id, status=status
        )
        total = OfferService.get_offers_count(
            db, buyer_id=current_user.id, listing_id=listing_id, status=status
        )
    else:
        # Suppliers see offers on their listings
        offers = OfferService.get_offers_for_seller(
            db, seller_id=current_user.id, skip=skip, limit=limit, status=status
        )
        total = len(offers)  # Simplified count for demo
    
    return OfferListResponse(total=total, offers=offers)


@router.get(
    "/my/offers",
    response_model=OfferListResponse,
    summary="Get my offers",
    description="Get all offers created by current user (buyers only)"
)
def get_my_offers(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    status: Optional[OfferStatus] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_buyer)
):
    """
    Get all offers created by the current authenticated buyer.
    
    **Requires:** Buyer role and valid authentication
    
    Query parameters:
    - **skip**: Offset for pagination (default: 0)
    - **limit**: Number of results to return (default: 100, max: 500)
    - **status**: Filter by offer status (optional)
    
    Returns buyer's own offers only.
    """
    offers = OfferService.get_offers(
        db, skip=skip, limit=limit, buyer_id=current_user.id, status=status
    )
    total = OfferService.get_offers_count(
        db, buyer_id=current_user.id, status=status
    )
    
    return OfferListResponse(total=total, offers=offers)


@router.get(
    "/listing/{listing_id}",
    response_model=OfferListResponse,
    summary="Get offers for a listing",
    description="Get all offers for a specific listing (listing owner only)"
)
def get_offers_for_listing(
    listing_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    status: Optional[OfferStatus] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all offers for a specific listing.
    
    **Requires:** Must be the listing owner (supplier)
    
    Returns all offers made on the specified listing.
    """
    from app.services.listing_service import ListingService
    
    # Verify user owns the listing
    listing = ListingService.get_listing_by_id(db, listing_id)
    if listing.seller_id != current_user.id:
        from fastapi import HTTPException
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view offers for this listing"
        )
    
    offers = OfferService.get_offers(
        db, skip=skip, limit=limit, listing_id=listing_id, status=status
    )
    total = OfferService.get_offers_count(db, listing_id=listing_id, status=status)
    
    return OfferListResponse(total=total, offers=offers)


@router.get(
    "/{offer_id}",
    response_model=OfferResponse,
    summary="Get offer by ID",
    description="Get a specific offer by its ID"
)
def get_offer(
    offer_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific offer by ID.
    
    **Requires:** Valid authentication
    
    - Buyers can view their own offers
    - Suppliers can view offers on their listings
    """
    offer = OfferService.get_offer_by_id(db, offer_id)
    
    # Check authorization
    if current_user.role.value == "buyer":
        if offer.buyer_id != current_user.id:
            from fastapi import HTTPException
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to view this offer"
            )
    else:  # supplier
        if offer.listing.seller_id != current_user.id:
            from fastapi import HTTPException
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to view this offer"
            )
    
    return offer


@router.patch(
    "/{offer_id}/accept",
    response_model=OfferResponse,
    summary="Accept an offer",
    description="Accept an offer on your listing (sellers only)"
)
def accept_offer(
    offer_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Accept an offer on your listing.
    
    **Requires:** Must be the listing owner (supplier)
    
    Changes offer status to 'accepted'.
    """
    return OfferService.update_offer_status(db, offer_id, OfferStatus.ACCEPTED, current_user)


@router.patch(
    "/{offer_id}/reject",
    response_model=OfferResponse,
    summary="Reject an offer",
    description="Reject an offer on your listing (sellers only)"
)
def reject_offer(
    offer_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Reject an offer on your listing.
    
    **Requires:** Must be the listing owner (supplier)
    
    Changes offer status to 'rejected'.
    """
    return OfferService.update_offer_status(db, offer_id, OfferStatus.REJECTED, current_user)


@router.patch(
    "/{offer_id}/cancel",
    response_model=OfferResponse,
    summary="Cancel your offer",
    description="Cancel your own offer (buyers only)"
)
def cancel_offer(
    offer_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_buyer)
):
    """
    Cancel your own offer.
    
    **Requires:** Must be the offer creator (buyer)
    
    Changes offer status to 'cancelled'.
    """
    return OfferService.update_offer_status(db, offer_id, OfferStatus.CANCELLED, current_user)