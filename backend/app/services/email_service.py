
import logging
import os

logger = logging.getLogger(__name__)


def send_otp_email(email: str, otp: str) -> None:
    """Deliver an OTP through the configured development or email mode."""

    mode = os.getenv("OTP_DELIVERY_MODE", "console").lower()

    if mode == "console":
        logger.warning(
            "DEVELOPMENT OTP for %s: %s. Do not use console delivery in production.",
            email,
            otp,
        )
        return

    raise RuntimeError(
        "Email delivery is not configured yet. "
        "Use OTP_DELIVERY_MODE=console for local development."
    )
