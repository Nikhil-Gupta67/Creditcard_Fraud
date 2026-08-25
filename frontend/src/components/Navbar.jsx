// import React from "react";
// import { Bell, Menu, Shield, User } from "lucide-react";

// const Navbar = ({ onMobileMenuToggle }) => {
//   return (
//     <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-all">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={onMobileMenuToggle}
//             className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
//             aria-label="Toggle Menu"
//           >
//             <Menu className="w-5 h-5" />
//           </button>

//           <div className="flex items-center space-x-2.5 lg:hidden">
//             <div className="bg-blue-600 p-1.5 rounded-lg text-white">
//               <Shield className="w-5 h-5" />
//             </div>
//             <span className="font-bold text-slate-900 tracking-tight text-lg">
//               FraudGuard <span className="text-blue-600">AI</span>
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center space-x-3 sm:space-x-4">
//           <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
//             <Bell className="w-5 h-5" />
//             <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
//           </button>

//           <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

//           <div className="flex items-center space-x-3 pl-1">
//             <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-medium text-sm shadow-sm">
//               <User className="w-5 h-5" />
//             </div>
//             <div className="hidden sm:block text-left">
//               <div className="text-sm font-semibold text-slate-800">
//                 Security Analyst
//               </div>
//               <div className="text-xs text-slate-500">Admin Account</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
import React, { useState } from "react";

import { Bell, User, Menu, LogOut } from "lucide-react";

function Navbar({ onMobileMenuToggle, user, onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    console.log("Logout clicked");

    setShowProfileMenu(false);

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="h-[66px] bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* ====================================================== */}
      {/* MOBILE MENU */}
      {/* ====================================================== */}

      <button
        type="button"
        onClick={onMobileMenuToggle}
        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
      >
        <Menu className="w-6 h-6 text-slate-700" />
      </button>

      {/* ====================================================== */}
      {/* RIGHT SIDE */}
      {/* ====================================================== */}

      <div className="ml-auto flex items-center gap-4">
        {/* ==================================================== */}
        {/* NOTIFICATION */}
        {/* ==================================================== */}

        <button
          type="button"
          className="relative p-2 rounded-lg hover:bg-slate-100 transition"
        >
          <Bell className="w-5 h-5 text-slate-600" />

          {/* Notification dot */}

          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Divider */}

        <div className="h-8 w-px bg-slate-200" />

        {/* ==================================================== */}
        {/* USER PROFILE */}
        {/* ==================================================== */}

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu((previous) => !previous)}
            className="flex items-center gap-3 hover:bg-slate-50 rounded-lg px-2 py-1.5 transition"
          >
            {/* Avatar */}

            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>

            {/* User information */}

            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-800">
                {user?.full_name || user?.name || "Security Analyst"}
              </p>

              <p className="text-xs text-slate-500">
                {user?.email || "Admin Account"}
              </p>
            </div>
          </button>

          {/* ================================================== */}
          {/* PROFILE DROPDOWN */}
          {/* ================================================== */}

          {showProfileMenu && (
            <div className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
              {/* User information */}

              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800">
                  {user?.full_name || user?.name || "Security Analyst"}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {user?.email || "Admin Account"}
                </p>
              </div>

              {/* ================================================= */}
              {/* LOGOUT */}
              {/* ================================================= */}

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5" />

                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
