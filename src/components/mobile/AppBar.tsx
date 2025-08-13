"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userAvatar from "@/assets/profile.jpg";

export default function Appbar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative flex flex-col min-h-screen bg-white text-foreground">
      {/* ✅ Top Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between text-primary bg-white p-4">
        <button onClick={toggleSidebar} aria-label="Toggle menu">
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* ✅ Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-background text-foreground shadow-card transition-transform duration-300 z-[10000]",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="bg-gradient-to-r from-primary to-primary/50 text-primary-foreground rounded-b-2xl shadow-md px-6 pt-8 pb-6">
          <Link
            to="/profile"
            onClick={toggleSidebar}
            aria-label="Open profile"
            className="flex items-center gap-4"
          >
            <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
              <AvatarImage
                src={userAvatar}
                alt="User profile picture"
                loading="lazy"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold leading-tight">
                Enid Sinclair
              </p>
              <p className="text-xs text-primary-foreground/80">Participant</p>
            </div>
          </Link>
        </div>

        {/* Sidebar menu links */}
        <nav className="mt-6 px-4">
          <Link
            to="/dashboard"
            className="block py-2 text-sm hover:text-primary"
            onClick={toggleSidebar}
          >
            Dashboard
          </Link>
          <Link
            to="/rewards"
            className="block py-2 text-sm hover:text-primary"
            onClick={toggleSidebar}
          >
            Rewards
          </Link>
          <Link
            to="/settings"
            className="block py-2 text-sm hover:text-primary"
            onClick={toggleSidebar}
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* ✅ Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* ✅ Page Content (child pages control their own padding) */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
