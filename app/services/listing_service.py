"""
Listing service containing business logic for listing operations.
"""
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List, Optional

from app.models.listing import Listing, ListingStatus, PlasticType
from app.models.user import User
from app.schemas.listing import ListingCreate, ListingUpdate


class ListingService:
    """Service class for listing-related business logic."""
    
    @staticmethod
    def create_listing(db: Session, listing_data: ListingCreate, seller: User) -> Listing:
        """
        Create a new plastic waste listing.
        
        Args:
            db: Database session
            listing_data: Listing creation data
            seller: User creating the listing (must be supplier)
            
        Returns:
            Created listing object
        """
        db_listing = Listing(
            seller_id=seller.id,
            plastic_type=listing_data.plastic_type,
            quantity_kg=listing_data.quantity_kg,
            expected_price_per_kg=listing_data.expected_price_per_kg,
            location=listing_data.location,
            status=ListingStatus.ACTIVE
        )
        
        db.add(db_listing)
        db.commit()
        db.refresh(db_listing)
        
        return db_listing
    
    @staticmethod
    def get_listing_by_id(db: Session, listing_id: int) -> Listing:
        """
        Get listing by ID.
        
        Args:
            db: Database session
            listing_id: Listing ID
            
        Returns:
            Listing object
            
        Raises:
            HTTPException: If listing not found
        """
        listing = db.query(Listing).filter(Listing.id == listing_id).first()
        if not listing:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Listing not found"
            )
        return listing
    
    @staticmethod
    def get_listings(
        db: Session,
        skip: int = 0,
        limit: int = 100,
        plastic_type: Optional[PlasticType] = None,
        status: Optional[ListingStatus] = None,
        seller_id: Optional[int] = None
    ) -> List[Listing]:
        """
        Get listings with optional filters.
        
        Args:
            db: Database session
            skip: Number of records to skip (pagination)
            limit: Maximum number of records to return
            plastic_type: Filter by plastic type
            status: Filter by listing status
            seller_id: Filter by seller ID
            
        Returns:
            List of listings
        """
        query = db.query(Listing)
        
        if plastic_type:
            query = query.filter(Listing.plastic_type == plastic_type)
        
        if status:
            query = query.filter(Listing.status == status)
        
        if seller_id:
            query = query.filter(Listing.seller_id == seller_id)
        
        return query.offset(skip).limit(limit).all()
    
    @staticmethod
    def update_listing(
        db: Session,
        listing_id: int,
        listing_data: ListingUpdate,
        current_user: User
    ) -> Listing:
        """
        Update a listing.
        
        Args:
            db: Database session
            listing_id: ID of listing to update
            listing_data: Updated listing data
            current_user: Current authenticated user
            
        Returns:
            Updated listing object
            
        Raises:
            HTTPException: If listing not found or user not authorized
        """
        listing = ListingService.get_listing_by_id(db, listing_id)
        
        # Check if user owns the listing
        if listing.seller_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this listing"
            )
        
        # Update only provided fields
        update_data = listing_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(listing, field, value)
        
        db.commit()
        db.refresh(listing)
        
        return listing
    
    @staticmethod
    def delete_listing(db: Session, listing_id: int, current_user: User) -> dict:
        """
        Delete a listing.
        
        Args:
            db: Database session
            listing_id: ID of listing to delete
            current_user: Current authenticated user
            
        Returns:
            Success message
            
        Raises:
            HTTPException: If listing not found or user not authorized
        """
        listing = ListingService.get_listing_by_id(db, listing_id)
        
        # Check if user owns the listing
        if listing.seller_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete this listing"
            )
        
        db.delete(listing)
        db.commit()
        
        return {"message": "Listing deleted successfully"}
    
    @staticmethod
    def get_listings_count(
        db: Session,
        plastic_type: Optional[PlasticType] = None,
        status: Optional[ListingStatus] = None,
        seller_id: Optional[int] = None
    ) -> int:
        """
        Get count of listings with optional filters.
        
        Args:
            db: Database session
            plastic_type: Filter by plastic type
            status: Filter by listing status
            seller_id: Filter by seller ID
            
        Returns:
            Total count of listings
        """
        query = db.query(Listing)
        
        if plastic_type:
            query = query.filter(Listing.plastic_type == plastic_type)
        
        if status:
            query = query.filter(Listing.status == status)
        
        if seller_id:
            query = query.filter(Listing.seller_id == seller_id)
        
        return query.count()