'use client';

import React, { useState } from 'react';
import { Activity, Play, AlertTriangle, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function MLPlayground() {
  const [amount, setAmount] = useState(185);
  const [deviceTrust, setDeviceTrust] = useState(88);
  const [ipVelocity, setIpVelocity] = useState(2);
  const [geoDistance, setGeoDistance] = useState(12);
  const [accountAgeDays, setAccountAgeDays] = useState(420);
  const [threshold, setThreshold] = useState(0.42);

  const [prediction, setPrediction] = useState<{
    riskScore: number;
    decision: 'APPROVE' | 'REVIEW' | 'REJECT';
    latencyMs: number;
    shapValues: { feature: string; impact: number; label: string }[];
  } | null>({
    riskScore: 0.08,
    decision: 'APPROVE',
    latencyMs: 12,
    shapValues: [
      { feature: 'Device Trust', impact: -0.32, label: 'High device trust reduced risk' },
      { feature: 'IP Velocity', impact: -0.15, label: 'Normal transaction cadence' },
      { feature: 'Geo Distance', impact: -0.10, label: 'Near domestic home base' },
      { feature: 'Amount', impact: 0.04, label: 'Moderate checkout amount' },
    ],
  });

  const runPrediction = () => {
    trackEvent('lab_run', { lab: 'ml_fraud_inference', amount, deviceTrust, ipVelocity });

    // Mathematical logistic function approximating XGBoost tree score
    let logit = -2.8; // base bias for imbalanced 0.17% dataset

    // Amount impact
    if (amount > 1000) logit += (amount / 1000) * 0.9;
    else if (amount > 400) logit += 0.4;

    // Device trust impact (0-100)
    logit -= (deviceTrust / 100) * 1.8;

    // IP Velocity impact (1-50 tx/hour)
    if (ipVelocity > 10) logit += (ipVelocity / 10) * 1.4;
    else if (ipVelocity > 4) logit += 0.5;

    // Geo anomaly (0-5000 km)
    if (geoDistance > 1500) logit += 1.6;
    else if (geoDistance > 300) logit += 0.7;

    // Account age (1-1000 days)
    if (accountAgeDays < 14) logit += 1.2;

    // Sigmoid probability
    const prob = 1 / (1 + Math.exp(-logit));
    const riskScore = Math.max(0.01, Math.min(0.99, Number(prob.toFixed(3))));

    let decision: 'APPROVE' | 'REVIEW' | 'REJECT' = 'APPROVE';
    if (riskScore >= 0.75) {
      decision = 'REJECT';
    } else if (riskScore >= threshold) {
      decision = 'REVIEW';
    }

    // Feature impacts for SHAP display
    const shap = [
      {
        feature: 'Device Trust Score',
        impact: Number((-((deviceTrust - 50) / 50) * 0.4).toFixed(2)),
        label: deviceTrust > 70 ? 'Known verified device' : 'Unrecognized hardware fingerprint',
      },
      {
        feature: 'IP Velocity (burst)',
        impact: Number(((ipVelocity / 10) * 0.35).toFixed(2)),
        label: `${ipVelocity} tx/hr rate`,
      },
      {
        feature: 'Geo Distance Anomaly',
        impact: Number(((geoDistance / 1000) * 0.3).toFixed(2)),
        label: `${geoDistance} km from billing origin`,
      },
      {
        feature: 'Transaction Amount',
        impact: Number(((amount / 1500) * 0.25).toFixed(2)),
        label: `$${amount.toLocaleString()} purchase size`,
      },
    ];

    setPrediction({
      riskScore,
      decision,
      latencyMs: Math.floor(10 + Math.random() * 5),
      shapValues: shap,
    });
  };

  const applyPreset = (preset: 'normal' | 'surge' | 'takeover') => {
    if (preset === 'normal') {
      setAmount(45);
      setDeviceTrust(95);
      setIpVelocity(1);
      setGeoDistance(5);
      setAccountAgeDays(600);
    } else if (preset === 'surge') {
      setAmount(850);
      setDeviceTrust(60);
      setIpVelocity(14);
      setGeoDistance(420);
      setAccountAgeDays(120);
    } else {
      setAmount(3400);
      setDeviceTrust(12);
      setIpVelocity(28);
      setGeoDistance(3800);
      setAccountAgeDays(6);
    }
  };

  return (
    <div className="bg-[#0b0e17] border border-surface-border rounded-xl p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-primary">
            <Activity className="w-3.5 h-3.5" />
            <span>LAB 03 // COST-SENSITIVE XGBOOST INFERENCE</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Real-Time Fraud Risk Classifier
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Interactively simulate financial transaction risk scores with SHAP interpretability vectors.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="text-zinc-500 text-[11px] mr-1">PRESETS:</span>
          <button
            onClick={() => applyPreset('normal')}
            className="px-2 py-1 bg-surface-100 hover:bg-surface-50 border border-surface-border text-zinc-300 rounded"
          >
            Normal
          </button>
          <button
            onClick={() => applyPreset('surge')}
            className="px-2 py-1 bg-surface-100 hover:bg-surface-50 border border-surface-border text-yellow-400 rounded"
          >
            Surge
          </button>
          <button
            onClick={() => applyPreset('takeover')}
            className="px-2 py-1 bg-surface-100 hover:bg-surface-50 border border-surface-border text-red-400 rounded"
          >
            Takeover
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Amount */}
        <div className="p-3 bg-[#07090e] border border-surface-border rounded-lg space-y-1.5">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-zinc-400">Transaction Amount ($):</span>
            <span className="text-primary font-bold">${amount}</span>
          </div>
          <input
            type="range"
            min={5}
            max={5000}
            step={25}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-primary bg-surface-100"
          />
        </div>

        {/* Device Trust */}
        <div className="p-3 bg-[#07090e] border border-surface-border rounded-lg space-y-1.5">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-zinc-400">Device Trust Score:</span>
            <span className="text-cyan-400 font-bold">{deviceTrust} / 100</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={deviceTrust}
            onChange={(e) => setDeviceTrust(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-surface-100"
          />
        </div>

        {/* IP Velocity */}
        <div className="p-3 bg-[#07090e] border border-surface-border rounded-lg space-y-1.5">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-zinc-400">IP Velocity (Transactions / Hr):</span>
            <span className="text-emerald-400 font-bold">{ipVelocity} tx/hr</span>
          </div>
          <input
            type="range"
            min={1}
            max={40}
            value={ipVelocity}
            onChange={(e) => setIpVelocity(Number(e.target.value))}
            className="w-full accent-primary bg-surface-100"
          />
        </div>

        {/* Geo Distance */}
        <div className="p-3 bg-[#07090e] border border-surface-border rounded-lg space-y-1.5">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-zinc-400">Geo Distance Anomaly:</span>
            <span className="text-yellow-400 font-bold">{geoDistance} km</span>
          </div>
          <input
            type="range"
            min={0}
            max={5000}
            step={50}
            value={geoDistance}
            onChange={(e) => setGeoDistance(Number(e.target.value))}
            className="w-full accent-yellow-400 bg-surface-100"
          />
        </div>
      </div>

      {/* Decision threshold & execute action */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
          <span>Calibrated Decision Threshold:</span>
          <span className="text-primary font-bold">{threshold}</span>
          <input
            type="range"
            min={0.2}
            max={0.8}
            step={0.02}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-28 accent-primary"
          />
        </div>

        <button
          onClick={runPrediction}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-emerald-400 text-black font-mono font-semibold text-xs rounded-lg transition-colors shadow-lg shadow-primary/10"
        >
          <Play className="w-3.5 h-3.5 fill-black" />
          <span>RUN MODEL INFERENCE</span>
        </button>
      </div>

      {/* Prediction Output & SHAP Values */}
      {prediction && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-surface-border animate-in fade-in">
          {/* Decision Card */}
          <div className="p-4 bg-[#0e1320] border border-surface-border rounded-lg flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-zinc-500">CLASSIFIER DECISION</span>
              <div className="flex items-center gap-2 mt-2">
                {prediction.decision === 'APPROVE' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
                {prediction.decision === 'REVIEW' && (
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                )}
                {prediction.decision === 'REJECT' && (
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                )}
                <span
                  className={`text-lg font-bold font-mono ${
                    prediction.decision === 'APPROVE'
                      ? 'text-emerald-400'
                      : prediction.decision === 'REVIEW'
                      ? 'text-yellow-400'
                      : 'text-red-400'
                  }`}
                >
                  {prediction.decision}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Fraud Probability:</span>
                <span className="text-white font-bold">
                  {(prediction.riskScore * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Inference Latency:</span>
                <span className="text-emerald-400">{prediction.latencyMs}ms</span>
              </div>
            </div>
          </div>

          {/* SHAP Feature Attributions */}
          <div className="md:col-span-2 p-4 bg-[#0e1320] border border-surface-border rounded-lg space-y-2.5">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
              <span>FEATURE IMPORTANCE &amp; ATTRIBUTION (SHAP)</span>
              <span className="text-[10px] text-zinc-500">TreeExplainer vector</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {prediction.shapValues.map((s, idx) => {
                const isRisk = s.impact > 0;
                return (
                  <div key={idx} className="flex items-center justify-between gap-3">
                    <span className="text-zinc-300 w-36 truncate">{s.feature}</span>
                    <span className="text-[11px] text-zinc-500 flex-1 truncate">{s.label}</span>
                    <span
                      className={`text-[11px] font-bold ${
                        isRisk ? 'text-red-400' : 'text-emerald-400'
                      }`}
                    >
                      {isRisk ? `+${s.impact}` : s.impact}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Controlled demo disclaimer */}
      <p className="text-[11px] font-mono text-zinc-500 italic">
        * Demonstration runs against an in-browser model simulator calibrated on credit transaction distributions. Not for production financial settlement.
      </p>
    </div>
  );
}
