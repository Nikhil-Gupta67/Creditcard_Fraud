from pydantic import BaseModel, Field


class TransactionData(BaseModel):
    Time: float = Field(..., description="Seconds elapsed since the first transaction")
    V1: float = Field(..., description="PCA Feature V1")
    V2: float = Field(..., description="PCA Feature V2")
    V3: float = Field(..., description="PCA Feature V3")
    V4: float = Field(..., description="PCA Feature V4")
    V5: float = Field(..., description="PCA Feature V5")
    V6: float = Field(..., description="PCA Feature V6")
    V7: float = Field(..., description="PCA Feature V7")
    V8: float = Field(..., description="PCA Feature V8")
    V9: float = Field(..., description="PCA Feature V9")
    V10: float = Field(..., description="PCA Feature V10")
    V11: float = Field(..., description="PCA Feature V11")
    V12: float = Field(..., description="PCA Feature V12")
    V13: float = Field(..., description="PCA Feature V13")
    V14: float = Field(..., description="PCA Feature V14")
    V15: float = Field(..., description="PCA Feature V15")
    V16: float = Field(..., description="PCA Feature V16")
    V17: float = Field(..., description="PCA Feature V17")
    V18: float = Field(..., description="PCA Feature V18")
    V19: float = Field(..., description="PCA Feature V19")
    V20: float = Field(..., description="PCA Feature V20")
    V21: float = Field(..., description="PCA Feature V21")
    V22: float = Field(..., description="PCA Feature V22")
    V23: float = Field(..., description="PCA Feature V23")
    V24: float = Field(..., description="PCA Feature V24")
    V25: float = Field(..., description="PCA Feature V25")
    V26: float = Field(..., description="PCA Feature V26")
    V27: float = Field(..., description="PCA Feature V27")
    V28: float = Field(..., description="PCA Feature V28")
    Amount: float = Field(..., ge=0.0, description="Transaction monetary amount")

    model_config = {
        "json_schema_extra": {
            "example": {
                "Time": 406.0,
                "V1": -1.35,
                "V2": 0.27,
                "V3": 1.77,
                "V4": 0.38,
                "V5": -0.50,
                "V6": 0.21,
                "V7": -0.12,
                "V8": 0.08,
                "V9": 0.32,
                "V10": -0.44,
                "V11": 0.71,
                "V12": -0.62,
                "V13": 0.17,
                "V14": -0.31,
                "V15": 0.42,
                "V16": -0.19,
                "V17": 0.11,
                "V18": 0.05,
                "V19": -0.07,
                "V20": 0.02,
                "V21": -0.03,
                "V22": 0.01,
                "V23": -0.02,
                "V24": 0.03,
                "V25": -0.01,
                "V26": 0.04,
                "V27": -0.02,
                "V28": 0.01,
                "Amount": 149.62,
            }
        }
    }