
import hashlib
import secrets
from datetime import datetime, timedelta, timezone


def generate_otp() -> str:
    """Generate a cryptographically secure six-digit OTP."""
    return f"{secrets.randbelow(1_000_000):06d}"


def hash_otp(otp: str) -> str:
    """Hash the OTP before storing it in the database."""
    return hashlib.sha256(otp.encode("utf-8")).hexdigest()


def otp_expiry_time() -> datetime:
    """Set the OTP expiry to five minutes from now."""
    return datetime.now(timezone.utc) + timedelta(minutes=5)
