from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/")
def get_admin_status():
    return {"module": "Admin", "status": "available"}