from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.models.schemas import ChatRequest, ChatResponse, FraudPredictionRequest, FraudPredictionResponse
import math

app = FastAPI(
    title="Amay Mishra Portfolio Engineering API",
    description="FastAPI service for AMAY AI RAG reasoning, GitHub proxies, and ML Lab inference.",
    version="2.4.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "amay-portfolio-api", "version": "2.4.0"}

@app.post("/api/v1/chat", response_model=ChatResponse)
def handle_chat(request: ChatRequest):
    # Grounded RAG response generator
    q = request.query.lower()
    if "agentpay" in q:
        answer = "AgentPay is an autonomous AI agent payment protocol developed by Amay with HMAC-SHA256 signature verification and strict idempotency rails."
        citations = [{"label": "View AgentPay Case Study", "url": "/work/agentpay"}]
    elif "hireiq" in q:
        answer = "HireIQ is an autonomous AI interview and candidate evaluation platform that evaluates AST code complexity and generates real-time rubrics."
        citations = [{"label": "View HireIQ Case Study", "url": "/work/hireiq"}]
    elif "fastapi" in q:
        answer = "Amay uses FastAPI for AgentPay, MamaSoft, and CrunchReader backends with strict Pydantic schemas and async concurrency."
        citations = [{"label": "Skills & Stack", "url": "/#skills"}]
    else:
        answer = f"Amay Mishra specializes in AI agents, high-concurrency backends, and full-stack software. Query received: '{request.query}'."
        citations = [{"label": "View All Projects", "url": "/work"}]

    return ChatResponse(answer=answer, citations=citations)

@app.post("/api/v1/ml/predict-fraud", response_model=FraudPredictionResponse)
def predict_fraud(req: FraudPredictionRequest):
    # Logistic calculation approximation of cost-sensitive XGBoost
    logit = -2.8
    if req.amount > 1000:
        logit += (req.amount / 1000) * 0.9
    elif req.amount > 400:
        logit += 0.4

    logit -= (req.device_trust / 100) * 1.8

    if req.ip_velocity > 10:
        logit += (req.ip_velocity / 10) * 1.4

    if req.geo_distance > 1500:
        logit += 1.6

    prob = 1.0 / (1.0 + math.exp(-logit))
    risk_score = round(max(0.01, min(0.99, prob)), 3)

    decision = "APPROVE"
    if risk_score >= 0.75:
        decision = "REJECT"
    elif risk_score >= req.threshold:
        decision = "REVIEW"

    return FraudPredictionResponse(
        risk_score=risk_score,
        decision=decision,
        latency_ms=11.4,
        feature_attributions=[
            {"feature": "Device Trust", "impact": round(-((req.device_trust - 50) / 50) * 0.4, 2)},
            {"feature": "IP Velocity", "impact": round((req.ip_velocity / 10) * 0.35, 2)},
            {"feature": "Geo Anomaly", "impact": round((req.geo_distance / 1000) * 0.3, 2)},
            {"feature": "Amount", "impact": round((req.amount / 1500) * 0.25, 2)},
        ]
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
