import React, { useState } from "react";
import {
  Menu,
  Trophy,
  Heart,
  ChefHat,
  Leaf,
  CheckCircle,
  Award,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import MyChallengesPage from "./MyChallengesPage";
import RecommendedPage from "./RecommendedPage";
import AstronautsPage from "./AstronautsPage";
import astronautImage from "@/assets/astronaut-character.png";
import profilePicture from "@/assets/profile.jpg";
import MyActivitiesPage from "./MyActivities";
import Appbar from "@/components/mobile/AppBar";

type TabType = "my-challenges" | "recommended" | "astronauts" | "my-activities";

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState<TabType>("my-challenges");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative mobile-container bg-background min-h-screen overflow-hidden">
      <Appbar>
        <div className="bg-white shadow-md z-10 relative">
          {/* Tab Navigation */}
          <div className="flex justify-between px-3">
            <button
              onClick={() => handleTabChange("my-challenges")}
              className={`pb-3 px-1 text-xs font-poppins transition-colors ${
                activeTab === "my-challenges" ? "tab-active" : "tab-inactive"
              }`}
            >
              My Challenges
            </button>

            <button
              onClick={() => handleTabChange("recommended")}
              className={`pb-3 px-1 text-xs font-poppins transition-colors ${
                activeTab === "recommended" ? "tab-active" : "tab-inactive"
              }`}
            >
              Recommended For You
            </button>

            <button
              onClick={() => handleTabChange("astronauts")}
              className={`pb-3 px-1 text-xs font-poppins transition-colors ${
                activeTab === "astronauts" ? "tab-active" : "tab-inactive"
              }`}
            >
              Astronauts
            </button>

            <button
              onClick={() => handleTabChange("my-activities")}
              className={`pb-3 px-1 text-xs font-poppins transition-colors ${
                activeTab === "my-activities" ? "tab-active" : "tab-inactive"
              }`}
            >
              My Activities
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="px-4 pb-0">
          {activeTab === "my-challenges" && (
            <>
              <Card className="p-4 mt-4 flex flex-col gap-3 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-20 h-20 overflow-hidden shrink-0">
                    <img
                      src={astronautImage}
                      alt="Astronaut"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-primary leading-none">
                        500
                      </span>
                      <span className="text-xs text-muted-foreground font-light leading-none">
                        pts
                      </span>
                    </div>
                    <div className="mt-1 inline-flex items-center text-xs text-primary bg-primary/10 rounded-full px-2 py-0.5">
                      Tier 1 › Trainee
                    </div>
                  </div>

                  <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    <Trophy className="w-10 h-10 text-cosmic-gold" />
                  </div>
                </div>

                <div className="mt-1">
                  <div className="text-xs text-primary mb-1 font-medium">
                    Next: Tier 2 - System Engineer
                  </div>
                  <div className="relative w-full">
                    <Progress
                      value={66}
                      className="h-2 rounded-full bg-muted"
                    />
                    <div className="absolute right-0 top-0 text-[10px] mt-2 text-muted-foreground">
                      250pts to go
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white mt-6 px-4 py-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <Heart className="h-6 w-6 text-success-color" />
                      <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-success-color bg-white rounded-full" />
                    </div>
                    <span className="text-sm font-bold">175</span>
                    <span className="text-xs text-muted-foreground">
                      Active
                    </span>
                  </div>

                  <div className="flex-1 h-px bg-border mx-4" />

                  <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <ChefHat className="h-6 w-6 text-success-color" />
                      <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-success-color bg-white rounded-full" />
                    </div>
                    <span className="text-sm font-bold">125</span>
                    <span className="text-xs text-muted-foreground">
                      Culinary
                    </span>
                  </div>

                  <div className="flex-1 h-px bg-border mx-4" />

                  <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <Leaf className="h-6 w-6 text-success-color" />
                      <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-success-color bg-white rounded-full" />
                    </div>
                    <span className="text-sm font-bold">200</span>
                    <span className="text-xs text-muted-foreground">
                      Go Green
                    </span>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        {/* Page Content */}
        <div className="relative overflow-hidden">
          <div
            className={`page-container ${
              activeTab === "my-challenges"
                ? "page-slide-center"
                : "page-slide-left"
            }`}
          >
            <MyChallengesPage />
          </div>

          <div
            className={`page-container absolute top-0 left-0 w-full ${
              activeTab === "recommended"
                ? "page-slide-center"
                : activeTab === "my-challenges"
                ? "page-slide-right"
                : "page-slide-left"
            }`}
          >
            <RecommendedPage />
          </div>

          <div
            className={`page-container absolute top-0 left-0 w-full ${
              activeTab === "astronauts"
                ? "page-slide-center"
                : "page-slide-right"
            }`}
          >
            <AstronautsPage />
          </div>

          <div
            className={`page-container absolute top-0 left-0 w-full ${
              activeTab === "my-activities"
                ? "page-slide-center"
                : activeTab === "astronauts"
                ? "page-slide-left"
                : "page-slide-right"
            }`}
          >
            <MyActivitiesPage />
          </div>
        </div>
      </Appbar>
    </div>
  );
}
