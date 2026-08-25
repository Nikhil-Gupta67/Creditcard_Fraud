// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import LoginPage from "./components/LoginPage";

// import Dashboard from "./pages/Dashboard";
// import AnalyzeTransaction from "./pages/AnalyzeTransaction";
// import TransactionHistory from "./pages/TransactionHistory";
// import About from "./pages/About";

// function App() {
//   // ============================================================
//   // MOBILE MENU
//   // ============================================================

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // ============================================================
//   // USER AUTHENTICATION
//   // ============================================================

//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("fraudguard_user");

//     if (!savedUser) {
//       return null;
//     }

//     try {
//       return JSON.parse(savedUser);
//     } catch (error) {
//       console.error("Invalid saved user data:", error);

//       localStorage.removeItem("fraudguard_user");

//       localStorage.removeItem("fraudguard_token");

//       return null;
//     }
//   });

//   // ============================================================
//   // LOGIN SUCCESS
//   // ============================================================

//   const handleLoginSuccess = (userData) => {
//     console.log("Login successful:", userData);

//     setUser(userData);

//     localStorage.setItem("fraudguard_user", JSON.stringify(userData));
//   };

//   // ============================================================
//   // LOGOUT
//   // ============================================================

//   const handleLogout = () => {
//     console.log("Logging out...");

//     setUser(null);

//     localStorage.removeItem("fraudguard_user");

//     localStorage.removeItem("fraudguard_token");
//   };

//   // ============================================================
//   // PROTECTED LAYOUT
//   // ============================================================

//   const ProtectedLayout = () => {
//     // User is not logged in
//     if (!user) {
//       return <Navigate to="/login" replace />;
//     }

//     return (
//       <div className="min-h-screen flex bg-slate-50 text-slate-800">
//         {/* ================================================== */}
//         {/* SIDEBAR */}
//         {/* ================================================== */}

//         <Sidebar
//           isOpen={isMobileMenuOpen}
//           onClose={() => setIsMobileMenuOpen(false)}
//         />

//         {/* ================================================== */}
//         {/* MAIN CONTENT */}
//         {/* ================================================== */}

//         <div className="flex-1 flex flex-col min-w-0">
//           {/* ================================================= */}
//           {/* NAVBAR */}
//           {/* ================================================= */}

//           <Navbar
//             onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             user={user}
//             onLogout={handleLogout}
//           />

//           {/* ================================================= */}
//           {/* PAGE AREA */}
//           {/* ================================================= */}

//           <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
//             <Routes>
//               {/* ============================================ */}
//               {/* DASHBOARD */}
//               {/* ============================================ */}

//               <Route path="/dashboard" element={<Dashboard />} />

//               {/* ============================================ */}
//               {/* ANALYZE TRANSACTION */}
//               {/* ============================================ */}

//               <Route path="/analyze" element={<AnalyzeTransaction />} />

//               {/* ============================================ */}
//               {/* TRANSACTION HISTORY */}
//               {/* ============================================ */}

//               <Route path="/history" element={<TransactionHistory />} />

//               {/* ============================================ */}
//               {/* ABOUT */}
//               {/* ============================================ */}

//               <Route path="/about" element={<About />} />

//               {/* ============================================ */}
//               {/* UNKNOWN PAGE */}
//               {/* ============================================ */}

//               <Route path="*" element={<Navigate to="/dashboard" replace />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     );
//   };

//   // ============================================================
//   // APPLICATION ROUTER
//   // ============================================================

//   return (
//     <Router>
//       <Routes>
//         {/* ================================================== */}
//         {/* LOGIN - PUBLIC */}
//         {/* ================================================== */}

//         <Route
//           path="/login"
//           element={
//             user ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <LoginPage onLoginSuccess={handleLoginSuccess} />
//             )
//           }
//         />

//         {/* ================================================== */}
//         {/* PROTECTED APPLICATION */}
//         {/* ================================================== */}

//         <Route path="/*" element={<ProtectedLayout />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/LoginPage";

import Dashboard from "./pages/Dashboard";
import AnalyzeTransaction from "./pages/AnalyzeTransaction";
import TransactionHistory from "./pages/TransactionHistory";
import About from "./pages/About";

function App() {
  // ============================================================
  // MOBILE MENU
  // ============================================================

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ============================================================
  // USER SESSION
  // ============================================================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("fraudguard_user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Invalid saved user:", error);

      localStorage.removeItem("fraudguard_user");

      localStorage.removeItem("fraudguard_token");

      return null;
    }
  });

  // ============================================================
  // LOGIN SUCCESS
  // ============================================================

  const handleLoginSuccess = (userData) => {
    console.log("User logged in:", userData);

    setUser(userData);

    localStorage.setItem("fraudguard_user", JSON.stringify(userData));
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    console.log("Logging out user...");

    // Remove React user state
    setUser(null);

    // Remove saved login information
    localStorage.removeItem("fraudguard_user");

    localStorage.removeItem("fraudguard_token");

    // Close mobile menu
    setIsMobileMenuOpen(false);

    // Make sure browser goes to login
    window.location.href = "/login";
  };

  // ============================================================
  // PROTECTED APPLICATION
  // ============================================================

  const ProtectedLayout = () => {
    // ----------------------------------------------------------
    // User is NOT logged in
    // ----------------------------------------------------------

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    // ----------------------------------------------------------
    // User IS logged in
    // ----------------------------------------------------------

    return (
      <div className="min-h-screen flex bg-slate-50 text-slate-800">
        {/* ================================================== */}
        {/* SIDEBAR */}
        {/* ================================================== */}

        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* ================================================== */}
        {/* MAIN CONTENT */}
        {/* ================================================== */}

        <div className="flex-1 flex flex-col min-w-0">
          {/* ================================================= */}
          {/* NAVBAR */}
          {/* ================================================= */}

          <Navbar
            onMobileMenuToggle={() =>
              setIsMobileMenuOpen((previous) => !previous)
            }
            user={user}
            onLogout={handleLogout}
          />

          {/* ================================================= */}
          {/* PAGE CONTENT */}
          {/* ================================================= */}

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Routes>
              {/* ============================================ */}
              {/* DASHBOARD */}
              {/* ============================================ */}

              <Route path="/dashboard" element={<Dashboard />} />

              {/* ============================================ */}
              {/* ANALYZE */}
              {/* ============================================ */}

              <Route path="/analyze" element={<AnalyzeTransaction />} />

              {/* ============================================ */}
              {/* HISTORY */}
              {/* ============================================ */}

              <Route path="/history" element={<TransactionHistory />} />

              {/* ============================================ */}
              {/* ABOUT */}
              {/* ============================================ */}

              <Route path="/about" element={<About />} />

              {/* ============================================ */}
              {/* UNKNOWN PROTECTED ROUTE */}
              {/* ============================================ */}

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  };

  // ============================================================
  // APPLICATION ROUTER
  // ============================================================

  return (
    <Router>
      <Routes>
        {/* ================================================== */}
        {/* LOGIN PAGE */}
        {/* ================================================== */}

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* ================================================== */}
        {/* PROTECTED ROUTES */}
        {/* ================================================== */}

        <Route path="/*" element={<ProtectedLayout />} />
      </Routes>
    </Router>
  );
}

export default App;