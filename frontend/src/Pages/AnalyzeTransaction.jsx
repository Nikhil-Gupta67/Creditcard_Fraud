import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import PredictionCard from "../components/PredictionCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { predictTransaction } from "../services/api";
import { saveTransaction } from "../utils/storage";
import { AlertTriangle } from "lucide-react";

const AnalyzeTransaction = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setPredictionResult(null);

    try {
      const response = await predictTransaction(formData);

      const isFraud = response.prediction === 1;
      const resultObj = {
        prediction: response.prediction,
        result: response.result,
        confidence: response.confidence,
        isFraud: isFraud,
        amount: formData.Amount,
      };

      setPredictionResult(resultObj);
      saveTransaction(resultObj);
    } catch (err) {
      setError(err.message || "An error occurred during prediction.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPredictionResult(null);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Analyze Transaction
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter transaction information to determine whether it is legitimate or
          fraudulent.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 space-y-2">
          <div className="flex items-center space-x-2 font-bold">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>Connection Error</span>
          </div>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {loading && <LoadingSpinner message="Executing AI Fraud Analysis..." />}

      {!loading && predictionResult && (
        <PredictionCard
          predictionResult={predictionResult}
          onReset={handleReset}
          onViewHistory={() => navigate("/history")}
        />
      )}

      {!loading && !predictionResult && (
        <TransactionForm onSubmit={handleFormSubmit} loading={loading} />
      )}
    </div>
  );
};

export default AnalyzeTransaction;
