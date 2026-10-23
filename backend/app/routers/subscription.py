from fastapi import APIRouter

router = APIRouter(prefix="/subscription", tags=["Subscription"])


@router.get("/")
def get_subscription_status():
    return {"module": "Subscription", "status": "available"}