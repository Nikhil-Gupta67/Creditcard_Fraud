import logging
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any, Dict

import joblib

from fastapi import (
    FastAPI,
    HTTPException,
    Request,
    status,
)

from fastapi.exceptions import RequestValidationError

from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import JSONResponse

from pydantic import BaseModel, EmailStr

from schemas.transaction import TransactionData

from services.prediction_service import predict_transaction


# ============================================================
# LOGGING CONFIGURATION
# ============================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger("fraudguard.api")


# ============================================================
# ML MODEL STORAGE
# ============================================================

ml_artifacts: Dict[str, Any] = {}

MODEL_PATH = Path("model/fraud_model.pkl")


# ============================================================
# APPLICATION LIFESPAN
# ============================================================

@asynccontextmanager
async def lifespan(app: FastAPI):

    logger.info("Initializing FraudGuard AI Backend...")

    # --------------------------------------------------------
    # Check whether ML model exists
    # --------------------------------------------------------

    if not MODEL_PATH.exists():

        logger.critical(
            f"Model weight file absent at expected path: "
            f"'{MODEL_PATH.resolve()}'"
        )

        ml_artifacts["model"] = None

    else:

        try:

            loaded_model = joblib.load(MODEL_PATH)

            ml_artifacts["model"] = loaded_model

            logger.info(
                "Model weight binary loaded successfully "
                "into memory."
            )

        except Exception as exc:

            logger.critical(
                f"Failed to deserialize ML model weights: {exc}"
            )

            ml_artifacts["model"] = None

    # --------------------------------------------------------
    # Application running
    # --------------------------------------------------------

    yield

    # --------------------------------------------------------
    # Shutdown
    # --------------------------------------------------------

    logger.info(
        "Shutting down FraudGuard AI Backend..."
    )

    ml_artifacts.clear()


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="FraudGuard AI API",
    description="AI-powered credit card fraud detection API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)


# ============================================================
# CORS CONFIGURATION
# ============================================================

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "OPTIONS",
    ],
    allow_headers=["*"],
)


# ============================================================
# AUTHENTICATION REQUEST SCHEMAS
# ============================================================

class LoginRequest(BaseModel):

    email: EmailStr
    password: str


class SignupRequest(BaseModel):

    full_name: str
    email: EmailStr
    password: str


# ============================================================
# VALIDATION ERROR HANDLER
# ============================================================

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
):

    logger.warning(
        f"Validation error handling request to "
        f"{request.url}: {exc.errors()}"
    )

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": "Invalid Input Data",
            "message": (
                "One or more payload values "
                "failed validation specifications."
            ),
            "details": exc.errors(),
        },
    )


# ============================================================
# HTTP EXCEPTION HANDLER
# ============================================================

@app.exception_handler(HTTPException)
async def http_exception_handler(
    request: Request,
    exc: HTTPException,
):

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": "Request Error",
            "message": exc.detail,
        },
    )


# ============================================================
# GENERAL EXCEPTION HANDLER
# ============================================================

@app.exception_handler(Exception)
async def unhandled_exception_handler(
    request: Request,
    exc: Exception,
):

    logger.error(
        f"Unhandled application crash on path "
        f"{request.url}: {str(exc)}"
    )

    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal Server Error",
            "message": "An unhandled server error occurred.",
        },
    )


# ============================================================
# ROOT ENDPOINT
# ============================================================

@app.get(
    "/",
    status_code=status.HTTP_200_OK,
)
async def root():

    return {
        "message": "FraudGuard AI API is running",
        "status": "online",
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get(
    "/health",
    status_code=status.HTTP_200_OK,
)
async def health_check():

    is_loaded = (
        ml_artifacts.get("model") is not None
    )

    if not is_loaded:

        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={
                "status": "unhealthy",
                "model_loaded": False,
            },
        )

    return {
        "status": "healthy",
        "model_loaded": True,
    }


# ============================================================
# SIGNUP ENDPOINT
# ============================================================

@app.post(
    "/signup",
    status_code=status.HTTP_201_CREATED,
)
async def signup(
    user_data: SignupRequest,
):

    logger.info(
        f"New user signup attempt: "
        f"{user_data.email}"
    )

    # --------------------------------------------------------
    # TEMPORARY SIGNUP
    #
    # This currently does NOT save users to a database.
    # Database + password hashing will be added later.
    # --------------------------------------------------------

    return {
        "message": "User registered successfully",
        "user": {
            "email": str(user_data.email),
            "full_name": user_data.full_name,
        },
    }


# ============================================================
# LOGIN ENDPOINT
# ============================================================

@app.post(
    "/login",
    status_code=status.HTTP_200_OK,
)
async def login(
    credentials: LoginRequest,
):

    logger.info(
        f"User login attempt: "
        f"{credentials.email}"
    )

    # --------------------------------------------------------
    # TEMPORARY LOGIN
    #
    # Currently accepts any valid email and non-empty password.
    # Later this will be replaced with database authentication.
    # --------------------------------------------------------

    if (
        credentials.email
        and credentials.password
    ):

        return {
            "message": "Login successful",

            "token": "fake-jwt-token-sample",

            "user": {
                "email": str(credentials.email),
            },
        }

    # --------------------------------------------------------
    # INVALID LOGIN
    # --------------------------------------------------------

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid email or password",
    )


# ============================================================
# FRAUD PREDICTION ENDPOINT
# ============================================================

@app.post(
    "/predict",
    status_code=status.HTTP_200_OK,
)
async def predict(
    transaction: TransactionData,
):

    # --------------------------------------------------------
    # Get model from memory
    # --------------------------------------------------------

    model = ml_artifacts.get("model")

    # --------------------------------------------------------
    # Model unavailable
    # --------------------------------------------------------

    if model is None:

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "ML model is uninitialized or missing. "
                "Please verify model/fraud_model.pkl exists."
            ),
        )

    # --------------------------------------------------------
    # Make prediction
    # --------------------------------------------------------

    result = predict_transaction(
        transaction,
        model,
    )

    return result