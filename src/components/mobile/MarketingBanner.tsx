import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import marketingBanner1 from "@/assets/marketing-banner-1.png";
import marketingBanner2 from "@/assets/marketing-banner-2.jpg";

const banners = [
  {
    id: 1,
    image: marketingBanner1,
    title: "Team Collaboration Challenges",
    description: "Join our innovative workspace challenges"
  },
  {
    id: 2,
    image: marketingBanner2,
    title: "Innovation & Growth",
    description: "Discover new opportunities for your team"
  }
];

export const MarketingBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative">
      <Card className="overflow-hidden shadow-card">
        <div className="relative">
          <img 
            src={banners[currentBanner].image}
            alt={banners[currentBanner].title}
            className="w-full h-48 object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-poppins font-medium">
                {banners[currentBanner].title}
              </h3>
              <p className="text-sm font-poppins font-light opacity-90">
                {banners[currentBanner].description}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevBanner}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <button 
            onClick={nextBanner}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </Card>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentBanner ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};