// import React, { useState } from "react";

// import {
//   ShieldCheck,
//   Mail,
//   Lock,
//   User,
//   ArrowRight,
//   AlertCircle,
//   CheckCircle2,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// import axios from "axios";

// const API_BASE_URL = "http://127.0.0.1:8000";

// export default function LoginPage({ onLoginSuccess }) {
//   const [isLogin, setIsLogin] = useState(true);

//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");

//   const [success, setSuccess] = useState("");

//   // ============================================================
//   // INPUT CHANGE
//   // ============================================================

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setError("");
//     setSuccess("");
//   };

//   // ============================================================
//   // LOGIN / SIGNUP TOGGLE
//   // ============================================================

//   const toggleMode = () => {
//     setIsLogin((prev) => !prev);

//     setError("");
//     setSuccess("");

//     setFormData({
//       fullName: "",
//       email: "",
//       password: "",
//     });

//     setShowPassword(false);
//   };

//   // ============================================================
//   // SUBMIT
//   // ============================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     // ==========================================================
//     // VALIDATION
//     // ==========================================================

//     if (!formData.email || !formData.password) {
//       setError("Please fill in all required fields.");

//       setLoading(false);

//       return;
//     }

//     if (!isLogin && !formData.fullName) {
//       setError("Please enter your full name.");

//       setLoading(false);

//       return;
//     }

//     try {
//       // ========================================================
//       // LOGIN
//       // ========================================================

//       if (isLogin) {
//         const response = await axios.post(`${API_BASE_URL}/login`, {
//           email: formData.email,

//           password: formData.password,
//         });

//         console.log("Login response:", response.data);

//         // ======================================================
//         // CHECK RESPONSE
//         // ======================================================

//         if (!response.data || !response.data.user) {
//           throw new Error("Invalid response received from server.");
//         }

//         // ======================================================
//         // SAVE TOKEN
//         // ======================================================

//         if (response.data.token) {
//           localStorage.setItem("fraudguard_token", response.data.token);
//         }

//         // ======================================================
//         // SUCCESS
//         // ======================================================

//         setSuccess("Login successful! Redirecting...");

//         setTimeout(() => {
//           setLoading(false);

//           if (onLoginSuccess) {
//             onLoginSuccess(response.data.user);
//           }
//         }, 500);
//       }

//       // ========================================================
//       // SIGNUP
//       // ========================================================
//       else {
//         const response = await axios.post(`${API_BASE_URL}/signup`, {
//           full_name: formData.fullName,

//           email: formData.email,

//           password: formData.password,
//         });

//         console.log("Signup response:", response.data);

//         setSuccess("Account created successfully! Please log in.");

//         setLoading(false);

//         setIsLogin(true);

//         setFormData({
//           fullName: "",
//           email: formData.email,
//           password: "",
//         });
//       }
//     } catch (err) {
//       // ==========================================================
//       // ERROR HANDLING
//       // ==========================================================

//       console.error("Authentication error:", err);

//       setLoading(false);

//       let errorMessage = "Authentication failed. Please try again.";

//       if (err.response) {
//         errorMessage =
//           err.response.data?.message ||
//           err.response.data?.detail ||
//           err.response.data?.error ||
//           errorMessage;
//       } else if (err.request) {
//         errorMessage =
//           "Cannot connect to FraudGuard backend. Make sure FastAPI is running on port 8000.";
//       } else if (err.message) {
//         errorMessage = err.message;
//       }

//       setError(errorMessage);
//     }
//   };

//   // ============================================================
//   // UI
//   // ============================================================

//   return (
//     <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
//       {/* ====================================================== */}
//       {/* BACKGROUND */}
//       {/* ====================================================== */}

//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
//       </div>

//       {/* ====================================================== */}
//       {/* BRAND */}
//       {/* ====================================================== */}

//       <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
//         <div className="flex justify-center items-center gap-3">
//           <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20 shadow-inner">
//             <ShieldCheck className="h-9 w-9 text-emerald-400" />
//           </div>

//           <span className="text-2xl font-bold tracking-tight text-white">
//             FraudGuard <span className="text-emerald-400">AI</span>
//           </span>
//         </div>

//         <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
//           {isLogin ? "Welcome back" : "Create an account"}
//         </h2>

//         <p className="mt-2 text-center text-sm text-slate-400">
//           {isLogin
//             ? "Access your real-time fraud monitoring portal"
//             : "Get started with AI-driven risk management"}
//         </p>
//       </div>

//       {/* ====================================================== */}
//       {/* CARD */}
//       {/* ====================================================== */}

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
//         <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-slate-800 sm:px-10">
//           {/* ================================================= */}
//           {/* ERROR */}
//           {/* ================================================= */}

//           {error && (
//             <div
//               aria-live="polite"
//               className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
//             >
//               <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />

//               <p className="text-sm text-red-300">{error}</p>
//             </div>
//           )}

//           {/* ================================================= */}
//           {/* SUCCESS */}
//           {/* ================================================= */}

//           {success && (
//             <div
//               aria-live="polite"
//               className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3"
//             >
//               <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />

//               <p className="text-sm text-emerald-300">{success}</p>
//             </div>
//           )}

//           {/* ================================================= */}
//           {/* FORM */}
//           {/* ================================================= */}

//           <form className="space-y-5" onSubmit={handleSubmit}>
//             {/* =============================================== */}
//             {/* FULL NAME */}
//             {/* =============================================== */}

//             {!isLogin && (
//               <div>
//                 <label
//                   htmlFor="fullName"
//                   className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
//                 >
//                   Full Name
//                 </label>

//                 <div className="relative rounded-xl shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
//                     <User className="h-5 w-5" />
//                   </div>

//                   <input
//                     id="fullName"
//                     type="text"
//                     name="fullName"
//                     autoComplete="name"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     placeholder="John Doe"
//                     required={!isLogin}
//                     className="block w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* =============================================== */}
//             {/* EMAIL */}
//             {/* =============================================== */}

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
//               >
//                 Email Address
//               </label>

//               <div className="relative rounded-xl shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
//                   <Mail className="h-5 w-5" />
//                 </div>

//                 <input
//                   id="email"
//                   type="email"
//                   name="email"
//                   autoComplete="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="analyst@fraudguard.ai"
//                   required
//                   className="block w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
//                 />
//               </div>
//             </div>

//             {/* =============================================== */}
//             {/* PASSWORD */}
//             {/* =============================================== */}

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
//               >
//                 Password
//               </label>

//               <div className="relative rounded-xl shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
//                   <Lock className="h-5 w-5" />
//                 </div>

//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   autoComplete={isLogin ? "current-password" : "new-password"}
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="••••••••"
//                   required
//                   className="block w-full pl-11 pr-11 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5" />
//                   ) : (
//                     <Eye className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* =============================================== */}
//             {/* SUBMIT BUTTON */}
//             {/* =============================================== */}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-2"
//             >
//               {loading ? (
//                 <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <>
//                   <span>{isLogin ? "Sign In" : "Create Account"}</span>

//                   <ArrowRight className="h-4 w-4" />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* ================================================= */}
//           {/* TOGGLE */}
//           {/* ================================================= */}

//           <div className="mt-6 border-t border-slate-800 pt-6 text-center">
//             <p className="text-xs text-slate-400">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}

//               <button
//                 type="button"
//                 onClick={toggleMode}
//                 className="ml-2 font-semibold text-emerald-400 hover:text-emerald-300 focus:outline-none transition-colors"
//               >
//                 {isLogin ? "Sign Up" : "Sign In"}
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.detail || "Invalid email or password.",
        );
      }

      // Save token if backend returns one
      if (data.token) {
        localStorage.setItem("fraudguard_token", data.token);
      }

      // Send user information to App.jsx
      if (onLoginSuccess) {
        onLoginSuccess(
          data.user || {
            email: email,
          },
        );
      }
    } catch (err) {
      console.error("Login error:", err);

      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      {/* ================================================== */}
      {/* MAIN LOGIN CONTAINER */}
      {/* ================================================== */}

      <div className="w-full max-w-md">
        {/* ================================================== */}
        {/* LOGO */}
        {/* ================================================== */}

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            {/* Logo */}

            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <ShieldCheck className="w-9 h-9 text-white" strokeWidth={2} />
            </div>

            {/* Brand */}

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                FraudGuard <span className="text-blue-600">AI</span>
              </h1>

              <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
                Detection Platform
              </p>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* WELCOME TEXT */}
        {/* ================================================== */}

        <div className="text-center mb-7">
          <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>

          <p className="mt-2 text-slate-500">
            Access your real-time fraud monitoring portal
          </p>
        </div>

        {/* ================================================== */}
        {/* LOGIN CARD */}
        {/* ================================================== */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 p-7 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ================================================= */}
            {/* EMAIL */}
            {/* ================================================= */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* ================================================= */}
            {/* PASSWORD */}
            {/* ================================================= */}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-12 pl-12 pr-12 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-600">{error}</p>
              </div>
            )}

            {/* ================================================= */}
            {/* LOGIN BUTTON */}
            {/* ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-200"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* ================================================== */}
          {/* DIVIDER */}
          {/* ================================================== */}

          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-slate-200" />

            <span className="px-4 text-xs text-slate-400">SECURE ACCESS</span>

            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* ================================================== */}
          {/* SIGN UP */}
          {/* ================================================== */}

          <div className="text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-semibold text-blue-600 hover:text-blue-700"
                onClick={() => {
                  console.log("Sign Up clicked");
                }}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 FraudGuard AI. Secure fraud detection platform.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;