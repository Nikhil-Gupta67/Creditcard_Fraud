import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  SearchCheck,
  History,
  Info,
  ShieldCheck,
  X,
  Cpu,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Analyze Transaction", icon: SearchCheck, path: "/analyze" },
    { label: "Transaction History", icon: History, path: "/history" },
    { label: "About", icon: Info, path: "/about" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 
        flex flex-col justify-between transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-tr from-blue-700 to-blue-500 p-2 rounded-xl text-white shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-lg tracking-tight leading-none">
                  FraudGuard <span className="text-blue-600">AI</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">
                  Detection Platform
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    }
                  `}
                >
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Info */}
        <div className="p-4 m-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full w-max border border-emerald-200/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AI Model Online</span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Cpu className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">Logistic Regression Engine</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
