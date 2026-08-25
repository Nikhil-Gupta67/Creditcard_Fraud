import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ShieldAlert,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ScanSearch,
  Clock3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample chart data
const transactionData = [
  { name: "Mon", legitimate: 420, fraud: 18 },
  { name: "Tue", legitimate: 510, fraud: 24 },
  { name: "Wed", legitimate: 470, fraud: 16 },
  { name: "Thu", legitimate: 620, fraud: 29 },
  { name: "Fri", legitimate: 580, fraud: 21 },
  { name: "Sat", legitimate: 710, fraud: 34 },
  { name: "Sun", legitimate: 650, fraud: 27 },
];

const distributionData = [
  {
    name: "Legitimate",
    value: 96,
  },
  {
    name: "Fraud",
    value: 4,
  },
];

const recentTransactions = [
  {
    id: "TXN-1024",
    amount: "₹1,249.00",
    status: "Legitimate",
    confidence: "98.2%",
    time: "2 min ago",
  },
  {
    id: "TXN-1023",
    amount: "₹8,450.00",
    status: "Fraud",
    confidence: "94.7%",
    time: "8 min ago",
  },
  {
    id: "TXN-1022",
    amount: "₹560.00",
    status: "Legitimate",
    confidence: "99.1%",
    time: "15 min ago",
  },
  {
    id: "TXN-1021",
    amount: "₹3,200.00",
    status: "Legitimate",
    confidence: "97.8%",
    time: "22 min ago",
  },
];

const COLORS = ["#10b981", "#ef4444"];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <ShieldCheck size={20} />
            </div>

            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              FraudGuard AI
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Fraud Detection Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Monitor and analyze credit card transactions using AI.
          </p>
        </div>

        <button
          onClick={() => navigate("/analyze")}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
        >
          <ScanSearch size={18} />
          Analyze Transaction
        </button>
      </div>

      {/* AI Status */}
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
        <div className="relative">
          <span className="block h-3 w-3 rounded-full bg-green-500" />
          <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-50" />
        </div>

        <div>
          <p className="text-sm font-semibold text-green-800">
            AI Model Online
          </p>

          <p className="text-xs text-green-700">
            Logistic Regression model is ready for prediction
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Transactions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Transactions
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">984</h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CreditCard size={22} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1 text-sm">
            <ArrowUpRight size={16} className="text-green-500" />
            <span className="font-medium text-green-600">12.5%</span>
            <span className="text-slate-400">this week</span>
          </div>
        </div>

        {/* Fraud Detected */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Fraud Detected
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">42</h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <ShieldAlert size={22} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1 text-sm">
            <ArrowDownRight size={16} className="text-red-500" />
            <span className="font-medium text-red-600">4.2%</span>
            <span className="text-slate-400">of transactions</span>
          </div>
        </div>

        {/* Legitimate */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Legitimate</p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">942</h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <ShieldCheck size={22} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1 text-sm">
            <ArrowUpRight size={16} className="text-green-500" />
            <span className="font-medium text-green-600">95.8%</span>
            <span className="text-slate-400">safe</span>
          </div>
        </div>

        {/* Detection Rate */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Detection Rate
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">96.4%</h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Activity size={22} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1 text-sm">
            <ArrowUpRight size={16} className="text-green-500" />
            <span className="font-medium text-green-600">2.8%</span>
            <span className="text-slate-400">improvement</span>
          </div>
        </div>
      </div>

      {/* Hero / CTA */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-md sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              <Activity size={14} />
              AI-Powered Detection
            </div>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Protect Every Transaction with AI
            </h2>

            <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
              Analyze suspicious credit card transactions using a machine
              learning model and identify potential fraud in seconds.
            </p>
          </div>

          <button
            onClick={() => navigate("/analyze")}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Start Analysis
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Area Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Transaction Analysis
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Weekly transaction monitoring
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
              Last 7 days
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={transactionData}>
                <defs>
                  <linearGradient
                    id="legitimateGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient
                    id="fraudGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="legitimate"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#legitimateGradient)"
                  name="Legitimate"
                />

                <Area
                  type="monotone"
                  dataKey="fraud"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#fraudGradient)"
                  name="Fraud"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3">
            <h3 className="text-lg font-bold text-slate-900">
              Transaction Distribution
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Legitimate vs fraudulent
            </p>
          </div>

          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm text-slate-600">Legitimate</span>
              </div>

              <span className="text-sm font-semibold text-slate-900">96%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-sm text-slate-600">Fraud</span>
              </div>

              <span className="text-sm font-semibold text-slate-900">4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Model Performance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-slate-900">
              Model Performance
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Current Logistic Regression metrics
            </p>
          </div>

          <div className="space-y-5">
            {[
              ["Accuracy", 96],
              ["Precision", 95],
              ["Recall", 94],
              ["F1 Score", 94],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    {label}
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    {value}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Recent Transactions
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Latest analyzed transactions
              </p>
            </div>

            <button
              onClick={() => navigate("/history")}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Transaction
                  </th>

                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Amount
                  </th>

                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Confidence
                  </th>

                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Time
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                            transaction.status === "Fraud"
                              ? "bg-red-50 text-red-500"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          {transaction.status === "Fraud" ? (
                            <AlertTriangle size={17} />
                          ) : (
                            <CheckCircle2 size={17} />
                          )}
                        </div>

                        <span className="text-sm font-semibold text-slate-800">
                          {transaction.id}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 text-sm font-medium text-slate-700">
                      {transaction.amount}
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          transaction.status === "Fraud"
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>

                    <td className="py-4 text-sm font-semibold text-slate-700">
                      {transaction.confidence}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Clock3 size={14} />
                        {transaction.time}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
