"""
Offer service containing business logic for offer operations.
"""
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List, Optional

from app.models.offer import Offer, OfferStatus
from app.models.user import User, UserRole
from app.schemas.offer import OfferCreate, OfferUpdate
from app.services.listing_service import ListingService


class OfferService:
    """Service class for offer-related business logic."""
    
    @staticmethod
    def create_offer(db: Session, offer_data: OfferCreate, buyer: User) -> Offer:
        """
        Create a new offer on a listing.
        
        Args:
            db: Database session
            offer_data: Offer creation data
            buyer: User creating the offer (must be buyer)
            
        Returns:
            Created offer object
            
        Raises:
            HTTPException: If listing not found or not active
        """
        # Verify listing exists and is active
        listing = ListingService.get_listing_by_id(db, offer_data.listing_id)
        
        if listing.status != "active":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot make offer on inactive listing"
            )
        
        # Check if buyer is trying to make offer on their own listing
        if listing.seller_id == buyer.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot make offer on your own listing"
            )
        
        # Create offer
        db_offer = Offer(
            listing_id=offer_data.listing_id,
            buyer_id=buyer.id,
            offer_price_per_kg=offer_data.offer_price_per_kg,
            status=OfferStatus.PENDING
        )
        
        db.add(db_offer)
        db.commit()
        db.refresh(db_offer)
        
        return db_offer
    
    @staticmethod
    def get_offer_by_id(db: Session, offer_id: int) -> Offer:
        """
        Get offer by ID.
        
        Args:
            db: Database session
            offer_id: Offer ID
            
        Returns:
            Offer object
            
        Raises:
            HTTPException: If offer not found
        """
        offer = db.query(Offer).filter(Offer.id == offer_id).first()
        if not offer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Offer not found"
            )
        return offer
    
    @staticmethod
    def get_offers(
        db: Session,
        skip: int = 0,
        limit: int = 100,
        listing_id: Optional[int] = None,
        buyer_id: Optional[int] = None,
        status: Optional[OfferStatus] = None
    ) -> List[Offer]:
        """
        Get offers with optional filters.
        
        Args:
            db: Database session
            skip: Number of records to skip (pagination)
            limit: Maximum number of records to return
            listing_id: Filter by listing ID
            buyer_id: Filter by buyer ID
            status: Filter by offer status
            
        Returns:
            List of offers
        """
        query = db.query(Offer)
        
        if listing_id:
            query = query.filter(Offer.listing_id == listing_id)
        
        if buyer_id:
            query = query.filter(Offer.buyer_id == buyer_id)
        
        if status:
            query = query.filter(Offer.status == status)
        
        return query.offset(skip).limit(limit).all()
    
    @staticmethod
    def get_offers_for_seller(
        db: Session,
        seller_id: int,
        skip: int = 0,
        limit: int = 100,
        status: Optional[OfferStatus] = None
    ) -> List[Offer]:
        """
        Get all offers for a seller's listings.
        
        Args:
            db: Database session
            seller_id: Seller user ID
            skip: Number of records to skip (pagination)
            limit: Maximum number of records to return
            status: Filter by offer status
            
        Returns:
            List of offers
        """
        query = db.query(Offer).join(Offer.listing).filter(
            Offer.listing.has(seller_id=seller_id)
        )
        
        if status:
            query = query.filter(Offer.status == status)
        
        return query.offset(skip).limit(limit).all()
    
    @staticmethod
    def update_offer_status(
        db: Session,
        offer_id: int,
        new_status: OfferStatus,
        current_user: User
    ) -> Offer:
        """
        Update offer status (accept/reject by seller, cancel by buyer).
        
        Args:
            db: Database session
            offer_id: ID of offer to update
            new_status: New status for the offer
            current_user: Current authenticated user
            
        Returns:
            Updated offer object
            
        Raises:
            HTTPException: If offer not found or user not authorized
        """
        offer = OfferService.get_offer_by_id(db, offer_id)
        
        # Determine authorization based on action
        if new_status in [OfferStatus.ACCEPTED, OfferStatus.REJECTED]:
            # Only seller can accept/reject
            if offer.listing.seller_id != current_user.id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Only the seller can accept or reject offers"
                )
        elif new_status == OfferStatus.CANCELLED:
            # Only buyer can cancel
            if offer.buyer_id != current_user.id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Only the buyer can cancel their offer"
                )
        
        # Check if offer is still pending
        if offer.status != OfferStatus.PENDING:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Cannot update offer with status: {offer.status}"
            )
        
        offer.status = new_status
        db.commit()
        db.refresh(offer)
        
        return offer
    
    @staticmethod
    def get_offers_count(
        db: Session,
        listing_id: Optional[int] = None,
        buyer_id: Optional[int] = None,
        status: Optional[OfferStatus] = None
    ) -> int:
        """
        Get count of offers with optional filters.
        
        Args:
            db: Database session
            listing_id: Filter by listing ID
            buyer_id: Filter by buyer ID
            status: Filter by offer status
            
        Returns:
            Total count of offers
        """
        query = db.query(Offer)
        
        if listing_id:
            query = query.filter(Offer.listing_id == listing_id)
        
        if buyer_id:
            query = query.filter(Offer.buyer_id == buyer_id)
        
        if status:
            query = query.filter(Offer.status == status)
        
        return query.count()