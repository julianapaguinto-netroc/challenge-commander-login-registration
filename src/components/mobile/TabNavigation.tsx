import { useState } from "react";
import { Trophy, Target, BarChart3, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

export type TabType = 'challenges' | 'achievements' | 'leaderboard' | 'points';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'challenges' as TabType, label: 'Challenges', icon: Target },
  { id: 'achievements' as TabType, label: 'Achievements', icon: Trophy },
  { id: 'leaderboard' as TabType, label: 'Leaderboard', icon: BarChart3 },
  { id: 'points' as TabType, label: 'Points', icon: Coins },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-1 p-1 bg-muted/50 rounded-lg mb-4">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <Button
            key={tab.id}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            className={`flex-1 text-xs px-2 py-2 h-8 ${
              isActive 
                ? 'btn-primary-gradient text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <IconComponent className="w-3 h-3 mr-1" />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}