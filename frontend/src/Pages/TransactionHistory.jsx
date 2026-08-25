import React, { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  PlusCircle,
  ArrowUpDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getTransactions, clearTransactions } from "../utils/storage";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all saved transaction history?",
      )
    ) {
      clearTransactions();
      setTransactions([]);
    }
  };

  // Filter and Sort Logic
  const filteredTransactions = transactions
    .filter((tx) => {
      const isFraud = tx.prediction === 1 || tx.isFraud;
      const matchesSearch =
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(tx.amount || tx.Amount || "").includes(searchQuery);

      if (statusFilter === "LEGITIMATE") return matchesSearch && !isFraud;
      if (statusFilter === "FRAUD") return matchesSearch && isFraud;
      return matchesSearch;
    })
    .sort((a, b) => {
      const amtA = Number(a.amount || a.Amount || 0);
      const amtB = Number(b.amount || b.Amount || 0);
      return sortOrder === "asc" ? amtA - amtB : amtB - amtA;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Transaction History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review previously analyzed transactions stored locally.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {transactions.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors flex items-center space-x-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear History</span>
            </button>
          )}
          <Link
            to="/analyze"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Analyze New Transaction</span>
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID or amount..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="ALL">All Statuses</option>
            <option value="LEGITIMATE">Legitimate Only</option>
            <option value="FRAUD">Fraud Only</option>
          </select>

          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium hover:bg-slate-100 transition-colors flex items-center space-x-1.5"
          >
            <ArrowUpDown className="w-4 h-4 text-slate-500" />
            <span>
              Amount ({sortOrder === "asc" ? "Low-High" : "High-Low"})
            </span>
          </button>
        </div>
      </div>

      {/* Table / Empty State */}
      {filteredTransactions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              No transactions analyzed yet
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Submit transaction values on the Analyze page to view history.
            </p>
          </div>
          <Link
            to="/analyze"
            className="inline-flex px-4 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors"
          >
            Analyze New Transaction
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3.5 px-6">Transaction ID</th>
                  <th className="py-3.5 px-6">Date & Time</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Confidence Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredTransactions.map((tx) => {
                  const isFraud = tx.prediction === 1 || tx.isFraud;
                  return (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-4 px-6 font-mono font-medium text-slate-900">
                        {tx.id}
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">
                        {tx.timestamp
                          ? new Date(tx.timestamp).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">
                        ₹
                        {Number(tx.amount || tx.Amount || 0).toLocaleString(
                          "en-IN",
                          { minimumFractionDigits: 2 },
                        )}
                      </td>
                      <td className="py-4 px-6">
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
                      <td className="py-4 px-6 font-medium text-slate-700">
                        {(Number(tx.confidence) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
