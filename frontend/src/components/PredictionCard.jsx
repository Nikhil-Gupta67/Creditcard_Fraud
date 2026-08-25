import React from "react";
import { ShieldCheck, ShieldAlert, RotateCcw, History } from "lucide-react";
import ConfidenceMeter from "./ConfidenceMeter";

const PredictionCard = ({ predictionResult, onReset, onViewHistory }) => {
  if (!predictionResult) return null;

  const { isFraud, confidence, result, amount } = predictionResult;
  const isLegitimate = !isFraud;

  return (
    <div
      className={`rounded-2xl p-6 lg:p-8 border transition-all shadow-sm ${
        isFraud
          ? "bg-red-50/40 border-red-200"
          : "bg-emerald-50/40 border-emerald-200"
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200/60">
        <div className="flex items-center space-x-4">
          <div
            className={`p-3.5 rounded-2xl text-white shadow-md ${
              isFraud
                ? "bg-red-600 shadow-red-500/20"
                : "bg-emerald-600 shadow-emerald-500/20"
            }`}
          >
            {isFraud ? (
              <ShieldAlert className="w-8 h-8" />
            ) : (
              <ShieldCheck className="w-8 h-8" />
            )}
          </div>
          <div>
            <div
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1 ${
                isFraud
                  ? "bg-red-100 text-red-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {isFraud ? "Fraud Alert" : "Legitimate Transaction"}
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {isFraud
                ? "Potential Fraud Detected"
                : "Transaction Appears Legitimate"}
            </h3>
          </div>
        </div>

        {amount && (
          <div className="bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-xs text-right">
            <span className="text-xs text-slate-500 font-medium block">
              Analyzed Amount
            </span>
            <span className="text-xl font-bold text-slate-900">
              ₹
              {Number(amount).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">
            Status Result
          </span>
          <span className="text-base font-semibold text-slate-800">
            {result}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">
            Risk Assessment Level
          </span>
          <span
            className={`text-base font-semibold ${isFraud ? "text-red-600" : "text-emerald-600"}`}
          >
            {isFraud ? "High Risk" : "Low Risk"}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">
            Model Confidence
          </span>
          <span className="text-base font-semibold text-slate-800">
            {(confidence * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs mb-6">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
          AI Prediction Score
        </span>
        <ConfidenceMeter confidence={confidence} isFraud={isFraud} />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 bg-white font-medium hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Analyze Another</span>
        </button>
        <button
          onClick={onViewHistory}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-sm"
        >
          <History className="w-4 h-4" />
          <span>View Transaction History</span>
        </button>
      </div>
    </div>
  );
};

export default PredictionCard;
