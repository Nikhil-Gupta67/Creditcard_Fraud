import logging
from typing import Any, Dict, List
import pandas as pd
from fastapi import HTTPException
from schemas.transaction import TransactionData

logger = logging.getLogger("fraudguard.service")

FEATURE_ORDER: List[str] = [
    "Time",
    "V1",
    "V2",
    "V3",
    "V4",
    "V5",
    "V6",
    "V7",
    "V8",
    "V9",
    "V10",
    "V11",
    "V12",
    "V13",
    "V14",
    "V15",
    "V16",
    "V17",
    "V18",
    "V19",
    "V20",
    "V21",
    "V22",
    "V23",
    "V24",
    "V25",
    "V26",
    "V27",
    "V28",
    "Amount",
]


def predict_transaction(transaction: TransactionData, model: Any) -> Dict[str, Any]:
    """Extracts features from transaction object, formats as DataFrame,

    runs inference via model, and returns risk details.
    """
    if model is None:
        logger.error("Inference attempted while ML model is uninitialized.")
        raise HTTPException(
            status_code=503,
            detail="Machine learning prediction service is currently unavailable.",
        )

    try:
        data_dict = transaction.model_dump()
        input_df = pd.DataFrame([data_dict])[FEATURE_ORDER]

        raw_pred = model.predict(input_df)[0]
        prediction_int = int(raw_pred)

        if hasattr(model, "predict_proba"):
            probabilities = model.predict_proba(input_df)[0]
            confidence_val = float(probabilities[prediction_int])
        else:
            confidence_val = 1.0

        label = (
            "Fraudulent Transaction"
            if prediction_int == 1
            else "Legitimate Transaction"
        )

        return {
            "prediction": prediction_int,
            "result": label,
            "confidence": round(confidence_val, 4),
        }

    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Inference pipeline execution error: {str(exc)}")
        raise HTTPException(
            status_code=500, detail="An error occurred while evaluating the transaction."
        )