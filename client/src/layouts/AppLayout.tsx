import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Bell,
  Search,
  UserCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

interface Props {
  children: ReactNode;
}

function AppLayout({ children }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">

        {/* Logo */}
        <div className="flex h-[72px] items-center border-b border-gray-200 px-6">

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-600">
              Forge-OS
            </h1>

            <p className="mt-0.5 text-xs text-gray-500">
              Workflow Management
            </p>
          </div>

        </div>


        {/* Navigation */}
        <nav className="space-y-1.5 p-4">

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive("/dashboard")
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={18} />

            <span>
              Dashboard
            </span>
          </Link>


          {/* Projects */}
          <Link
            to="/projects"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive("/projects")
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FolderKanban size={18} />

            <span>
              Projects
            </span>
          </Link>


          {/* Settings */}
          <Link
            to="/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive("/settings")
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings size={18} />

            <span>
              Settings
            </span>
          </Link>

        </nav>

      </aside>


      {/* ================= MAIN AREA ================= */}
      <main className="min-w-0 flex-1">

        {/* Navbar */}
        <header className="flex h-[72px] items-center justify-between border-b border-gray-200 bg-white px-8">

          {/* Search */}
          <div className="relative w-full max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search projects, tasks..."
              className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>


          {/* Right Side */}
          <div className="ml-6 flex items-center gap-6">

            {/* Notifications */}
            <button
              type="button"
              className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <Bell size={21} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>


            {/* User */}
            <div className="flex items-center gap-3">

              <UserCircle
                size={32}
                className="text-blue-600"
              />

              <div className="leading-tight">

                <p className="text-sm font-semibold text-gray-800">
                  {user?.name}
                </p>

                <p className="mt-1 text-xs capitalize text-gray-500">
                  {user?.role}
                </p>

              </div>

            </div>

          </div>

        </header>


        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>

      </main>

    </div>
  );
}

export default AppLayout;