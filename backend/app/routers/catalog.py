from fastapi import APIRouter

router = APIRouter(prefix="/catalog", tags=["Catalog"])


@router.get("/")
def get_catalog_status():
    return {"module": "Catalog", "status": "available"}