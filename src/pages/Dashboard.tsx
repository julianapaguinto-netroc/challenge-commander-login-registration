import { useState } from "react"
import { Menu, Plus, Award, Gift } from "lucide-react"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="mobile-container welcome-bg relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b border-border">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-secondary transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="font-medium">Dashboard</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-72 bg-background border-r border-border z-50 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-2">Menu</h2>
            <p className="text-sm text-muted-foreground font-light">Welcome back!</p>
          </div>
          
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-left">
              <Award className="w-5 h-5 text-primary" />
              <span className="font-light">Gamification</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-left">
              <Gift className="w-5 h-5 text-primary" />
              <span className="font-light">Rewards</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mobile-card text-center min-h-[400px] flex items-center justify-center">
          <div>
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-medium mb-2">Welcome to Dashboard</h2>
            <p className="text-muted-foreground font-light">
              Your personalized dashboard is ready. Start by creating your first challenge!
            </p>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="mobile-fab group">
        <Plus className="w-6 h-6 transition-transform group-hover:rotate-90" />
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-foreground text-background rounded-lg text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Create Challenge
        </div>
      </button>
    </div>
  )
}