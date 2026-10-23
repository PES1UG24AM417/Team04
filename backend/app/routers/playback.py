from fastapi import APIRouter

router = APIRouter(prefix="/playback", tags=["Playback"])


@router.get("/")
def get_playback_status():
    return {"module": "Playback", "status": "available"}