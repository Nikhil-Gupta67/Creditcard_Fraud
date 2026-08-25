import React from "react";
import { ShieldCheck, ShieldAlert, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RecentTransactions = ({ transactions = [] }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center">
        <p className="text-slate-500 text-sm">No transactions analyzed yet.</p>
        <Link
          to="/analyze"
          className="mt-3 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <span>Analyze a transaction now</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-base">Recent Analyses</h3>
        <Link
          to="/history"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="py-3 px-6">Transaction ID</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Prediction</th>
              <th className="py-3 px-6">Confidence</th>
              <th className="py-3 px-6 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {transactions.slice(0, 5).map((tx) => {
              const isFraud = tx.prediction === 1 || tx.isFraud;
              return (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-3.5 px-6 font-mono font-medium text-slate-800">
                    {tx.id}
                  </td>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    ₹
                    {Number(tx.amount || tx.Amount || 0).toLocaleString(
                      "en-IN",
                      { minimumFractionDigits: 2 },
                    )}
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        isFraud
                          ? "bg-red-50 text-red-700 border border-red-200/60"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                      }`}
                    >
                      {isFraud ? (
                        <ShieldAlert className="w-3.5 h-3.5" />
                      ) : (
                        <ShieldCheck className="w-3.5 h-3.5" />
                      )}
                      <span>{isFraud ? "Fraudulent" : "Legitimate"}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-medium text-slate-600">
                    {(Number(tx.confidence) * 100).toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-6 text-right text-xs text-slate-400">
                    {tx.timestamp
                      ? new Date(tx.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Just now"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
