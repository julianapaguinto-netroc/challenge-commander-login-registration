"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Trophy, Gift } from "lucide-react";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userAvatar from "@/assets/astronaut-character.png";

export default function Appbar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* ✅ Top Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background p-4">
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium">Dashboard</h1>
        <div className="w-6" />
      </header>

      {/* ✅ Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-[9999] w-64 bg-background text-foreground shadow-card transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={toggleSidebar}>
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Profile section */}
        <div className="p-4">
          <Link to="/profile" onClick={toggleSidebar} className="block" aria-label="Open profile">
            <div className="flex flex-col items-center">
              <Avatar className="h-16 w-16 ring-2 ring-primary/20 shadow-card">
                <AvatarImage src={userAvatar} alt="User profile picture" loading="lazy" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="mt-3 w-full rounded-xl bg-card text-card-foreground p-3 shadow-card">
                <p className="text-sm font-semibold text-center">Enid Sinclair</p>
                <p className="text-xs text-muted-foreground text-center">Participant</p>
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex flex-col p-4 pt-0 space-y-2">
          <Link
            to="/gamification"
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            <Trophy className="w-4 h-4 text-accent" />
            Gamification
          </Link>
          <Link
            to="/rewards"
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            <Gift className="w-4 h-4 text-warning" />
            Rewards
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

      {/* ✅ Main Content */}
      <main className="p-4">{children}</main>
    </div>
  );
}
