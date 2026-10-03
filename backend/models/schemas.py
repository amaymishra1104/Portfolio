from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ChatRequest(BaseModel):
    query: str = Field(..., max_length=500)
    history: Optional[List[Dict[str, str]]] = []

class Citation(BaseModel):
    label: str
    url: str

class ChatResponse(BaseModel):
    answer: str
    citations: List[Citation] = []

class FraudPredictionRequest(BaseModel):
    amount: float
    device_trust: float
    ip_velocity: float
    geo_distance: float
    account_age_days: float
    threshold: float = 0.42

class FraudPredictionResponse(BaseModel):
    risk_score: float
    decision: str
    latency_ms: float
    feature_attributions: List[Dict[str, Any]]
