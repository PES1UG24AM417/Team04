from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.rating import Rating
from app.models.title import Title
from app.routers.profile import get_current_user

router = APIRouter(prefix="/ratings", tags=["Ratings"])


class RatingRequest(BaseModel):
    title_id: int = Field(gt=0)
    rating: int = Field(ge=1, le=5)


@router.post("/")
def submit_rating(
    request: RatingRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    title = db.query(Title).filter(Title.id == request.title_id).first()

    if title is None:
        raise HTTPException(
            status_code=404,
            detail="Title not found.",
        )

    existing_rating = (
        db.query(Rating)
        .filter(
            Rating.user_id == current_user.id,
            Rating.title_id == request.title_id,
        )
        .first()
    )

    if existing_rating is not None:
        existing_rating.rating = request.rating
    else:
        existing_rating = Rating(
            user_id=current_user.id,
            title_id=request.title_id,
            rating=request.rating,
        )
        db.add(existing_rating)

    try:
        db.commit()
        db.refresh(existing_rating)
    except Exception:
        db.rollback()
        raise

    return {
        "message": "Rating saved successfully.",
        "title_id": existing_rating.title_id,
        "rating": existing_rating.rating,
    }


@router.get("/{title_id}")
def get_rating(
    title_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if title_id <= 0:
        raise HTTPException(
            status_code=422,
            detail="Title ID must be greater than zero.",
        )

    rating = (
        db.query(Rating)
        .filter(
            Rating.user_id == current_user.id,
            Rating.title_id == title_id,
        )
        .first()
    )

    return {
        "title_id": title_id,
        "rating": rating.rating if rating is not None else None,
    }