// import React, { useState } from "react";
// import { Send, RefreshCw, AlertCircle } from "lucide-react";

// const DEFAULT_FORM_STATE = {
//   Time: "0",
//   Amount: "149.62",
//   V1: "-1.359807",
//   V2: "-0.072781",
//   V3: "2.536347",
//   V4: "1.378155",
//   V5: "-0.338321",
//   V6: "0.462388",
//   V7: "0.239599",
//   V8: "0.098698",
//   V9: "0.363787",
//   V10: "0.090794",
//   V11: "-0.551600",
//   V12: "-0.617801",
//   V13: "-0.991390",
//   V14: "-0.311169",
//   V15: "1.468177",
//   V16: "-0.470401",
//   V17: "0.207971",
//   V18: "0.025791",
//   V19: "0.403993",
//   V20: "0.251412",
//   V21: "-0.018307",
//   V22: "0.277838",
//   V23: "-0.110474",
//   V24: "0.066928",
//   V25: "0.128539",
//   V26: "-0.189115",
//   V27: "0.133558",
//   V28: "-0.021053",
// };

// const TransactionForm = ({ onSubmit, loading }) => {
//   const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
//   const [validationError, setValidationError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleClear = () => {
//     const cleared = {};
//     Object.keys(DEFAULT_FORM_STATE).forEach((key) => (cleared[key] = ""));
//     setFormData(cleared);
//     setValidationError("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setValidationError("");

//     // Validate fields are numerical
//     const numericData = {};
//     for (const key in formData) {
//       const val = formData[key];
//       if (val === "" || isNaN(Number(val))) {
//         setValidationError(
//           `Please enter a valid numeric value for field: ${key}`,
//         );
//         return;
//       }
//       numericData[key] = parseFloat(val);
//     }

//     onSubmit(numericData);
//   };

//   const renderInputs = (keys) => (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
//       {keys.map((key) => (
//         <div key={key}>
//           <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
//             {key}
//           </label>
//           <input
//             type="number"
//             step="any"
//             name={key}
//             value={formData[key]}
//             onChange={handleChange}
//             required
//             className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
//           />
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6"
//     >
//       {validationError && (
//         <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center space-x-2">
//           <AlertCircle className="w-5 h-5 shrink-0" />
//           <span>{validationError}</span>
//         </div>
//       )}

//       {/* Transaction Basic Information */}
//       <div>
//         <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
//           <span>1. Transaction Information</span>
//           <span className="text-xs text-slate-400 font-normal normal-case">
//             Core attributes
//           </span>
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-xs font-medium text-slate-700 mb-1">
//               Time (Seconds elapsed)
//             </label>
//             <input
//               type="number"
//               step="any"
//               name="Time"
//               value={formData.Time}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
//               placeholder="0"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-slate-700 mb-1">
//               Amount (Transaction Value)
//             </label>
//             <input
//               type="number"
//               step="any"
//               name="Amount"
//               value={formData.Amount}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
//               placeholder="0.00"
//             />
//           </div>
//         </div>
//       </div>

//       {/* PCA Features */}
//       <div className="space-y-4">
//         <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
//           2. Principal Components (PCA Features V1–V28)
//         </h3>

//         <div className="space-y-3">
//           <span className="text-xs font-medium text-slate-400 block">
//             Features V1 – V7
//           </span>
//           {renderInputs(["V1", "V2", "V3", "V4", "V5", "V6", "V7"])}
//         </div>

//         <div className="space-y-3">
//           <span className="text-xs font-medium text-slate-400 block">
//             Features V8 – V14
//           </span>
//           {renderInputs(["V8", "V9", "V10", "V11", "V12", "V13", "V14"])}
//         </div>

//         <div className="space-y-3">
//           <span className="text-xs font-medium text-slate-400 block">
//             Features V15 – V21
//           </span>
//           {renderInputs(["V15", "V16", "V17", "V18", "V19", "V20", "V21"])}
//         </div>

//         <div className="space-y-3">
//           <span className="text-xs font-medium text-slate-400 block">
//             Features V22 – V28
//           </span>
//           {renderInputs(["V22", "V23", "V24", "V25", "V26", "V27", "V28"])}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
//         <button
//           type="button"
//           onClick={handleClear}
//           disabled={loading}
//           className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors flex items-center space-x-2"
//         >
//           <RefreshCw className="w-4 h-4" />
//           <span>Clear</span>
//         </button>
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors flex items-center space-x-2 shadow-sm shadow-blue-500/20 disabled:opacity-50"
//         >
//           {loading ? (
//             <span>Analyzing...</span>
//           ) : (
//             <>
//               <Send className="w-4 h-4" />
//               <span>Analyze Transaction</span>
//             </>
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default TransactionForm;
import React, { useState } from "react";
import {
  Send,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ShieldAlert,
} from "lucide-react";

const DEFAULT_FORM_STATE = {
  Time: "0",
  Amount: "149.62",
  V1: "-1.359807",
  V2: "-0.072781",
  V3: "2.536347",
  V4: "1.378155",
  V5: "-0.338321",
  V6: "0.462388",
  V7: "0.239599",
  V8: "0.098698",
  V9: "0.363787",
  V10: "0.090794",
  V11: "-0.551600",
  V12: "-0.617801",
  V13: "-0.991390",
  V14: "-0.311169",
  V15: "1.468177",
  V16: "-0.470401",
  V17: "0.207971",
  V18: "0.025791",
  V19: "0.403993",
  V20: "0.251412",
  V21: "-0.018307",
  V22: "0.277838",
  V23: "-0.110474",
  V24: "0.066928",
  V25: "0.128539",
  V26: "-0.189115",
  V27: "0.133558",
  V28: "-0.021053",
};

/*
 * Known fraud example from the Credit Card Fraud Detection dataset.
 *
 * IMPORTANT:
 * The Class value is NOT sent to the backend.
 * It is only used here to select a known fraud transaction.
 */
const FRAUD_SAMPLE = {
  Time: "406",
  Amount: "0.69",
  V1: "-2.3122265423263",
  V2: "1.9519920106412",
  V3: "-1.60985073229769",
  V4: "3.9979055875468",
  V5: "-0.522187864667764",
  V6: "-1.42654531946325",
  V7: "-2.53738730624579",
  V8: "1.39165724829804",
  V9: "-2.77008927719433",
  V10: "-2.77227214465915",
  V11: "3.20203320709635",
  V12: "-2.8999073884946",
  V13: "-0.595221881324605",
  V14: "-4.28925378244217",
  V15: "0.389724120274487",
  V16: "-1.14074717980657",
  V17: "-2.83005567450437",
  V18: "-0.0168224681808257",
  V19: "0.416955705037907",
  V20: "0.126910559061474",
  V21: "0.517232370861764",
  V22: "-0.0350493686052974",
  V23: "-0.465211076182027",
  V24: "0.320198198514526",
  V25: "0.0445191674731724",
  V26: "0.177839798284401",
  V27: "0.261145002567677",
  V28: "-0.143275874698919",
};

const TransactionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const [validationError, setValidationError] = useState("");
  const [selectedSample, setSelectedSample] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSelectedSample("");
  };

  // Load legitimate transaction
  const handleLegitimateSample = () => {
    setFormData({ ...DEFAULT_FORM_STATE });
    setValidationError("");
    setSelectedSample("legitimate");
  };

  // Load fraud transaction
  const handleFraudSample = () => {
    setFormData({ ...FRAUD_SAMPLE });
    setValidationError("");
    setSelectedSample("fraud");
  };

  const handleClear = () => {
    const cleared = {};

    Object.keys(DEFAULT_FORM_STATE).forEach((key) => {
      cleared[key] = "";
    });

    setFormData(cleared);
    setValidationError("");
    setSelectedSample("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // Validate fields are numerical
    const numericData = {};

    for (const key in formData) {
      const val = formData[key];

      if (val === "" || isNaN(Number(val))) {
        setValidationError(
          `Please enter a valid numeric value for field: ${key}`,
        );
        return;
      }

      numericData[key] = parseFloat(val);
    }

    onSubmit(numericData);
  };

  const renderInputs = (keys) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
      {keys.map((key) => (
        <div key={key}>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
            {key}
          </label>

          <input
            type="number"
            step="any"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
          />
        </div>
      ))}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6"
    >
      {validationError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* QUICK DEMO SAMPLES */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Quick Demo Samples
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Automatically fill the form with a sample transaction.
            </p>
          </div>

          {selectedSample === "legitimate" && (
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <CheckCircle className="w-4 h-4" />
              Legitimate sample loaded
            </span>
          )}

          {selectedSample === "fraud" && (
            <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
              <ShieldAlert className="w-4 h-4" />
              Fraud sample loaded
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* LEGITIMATE BUTTON */}
          <button
            type="button"
            onClick={handleLegitimateSample}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" />
            Legitimate Sample
          </button>

          {/* FRAUD BUTTON */}
          <button
            type="button"
            onClick={handleFraudSample}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShieldAlert className="w-4 h-4" />
            Fraud Sample
          </button>
        </div>
      </div>

      {/* Transaction Basic Information */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>1. Transaction Information</span>

          <span className="text-xs text-slate-400 font-normal normal-case">
            Core attributes
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Time (Seconds elapsed)
            </label>

            <input
              type="number"
              step="any"
              name="Time"
              value={formData.Time}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Amount (Transaction Value)
            </label>

            <input
              type="number"
              step="any"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* PCA Features */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          2. Principal Components (PCA Features V1–V28)
        </h3>

        <div className="space-y-3">
          <span className="text-xs font-medium text-slate-400 block">
            Features V1 – V7
          </span>

          {renderInputs(["V1", "V2", "V3", "V4", "V5", "V6", "V7"])}
        </div>

        <div className="space-y-3">
          <span className="text-xs font-medium text-slate-400 block">
            Features V8 – V14
          </span>

          {renderInputs(["V8", "V9", "V10", "V11", "V12", "V13", "V14"])}
        </div>

        <div className="space-y-3">
          <span className="text-xs font-medium text-slate-400 block">
            Features V15 – V21
          </span>

          {renderInputs(["V15", "V16", "V17", "V18", "V19", "V20", "V21"])}
        </div>

        <div className="space-y-3">
          <span className="text-xs font-medium text-slate-400 block">
            Features V22 – V28
          </span>

          {renderInputs(["V22", "V23", "V24", "V25", "V26", "V27", "V28"])}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={handleClear}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Clear</span>
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors flex items-center space-x-2 shadow-sm shadow-blue-500/20 disabled:opacity-50"
        >
          {loading ? (
            <span>Analyzing...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Analyze Transaction</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;