import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dumbbell,
  Leaf,
  ChefHat,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function AffiliatedCommandersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const commanders = [
    {
      id: 1,
      name: 'FitLife Studio',
      category: 'Active',
      icon: Dumbbell,
      description: 'Professional fitness training and workout programs',
      color: 'text-active-color bg-orange-50',
    },
    {
      id: 2,
      name: 'EcoWarriors',
      category: 'Go Green',
      icon: Leaf,
      description: 'Sustainable living and environmental conservation',
      color: 'text-green-color bg-green-50',
    },
    {
      id: 3,
      name: 'Culinary Institute',
      category: 'Culinary',
      icon: ChefHat,
      description: 'Professional cooking skills and nutrition education',
      color: 'text-culinary-color bg-red-50',
    },
  ];

  return (
    <section className="p-4 pb-8 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary font-poppins">
          Affiliated Challenge Commanders
        </h2>
        <Button variant="ghost" className="text-primary text-sm font-poppins">
          View All
        </Button>
      </div>

      {/* Scroll buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-[50%] -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full hidden md:flex"
      >
        <ChevronLeft className="w-5 h-5 text-primary" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-[50%] -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full hidden md:flex"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>

      {/* Scrollable area */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto smooth-scroll pb-2 scroll-snap-x"
      >
        {commanders.map((commander) => {
          const IconComponent = commander.icon;
          return (
            <Link
              key={commander.id}
              to="/challenge-commander"
              className="scroll-snap-align-start flex-shrink-0 w-64"
            >
              <Card className="category-card cursor-pointer hover:shadow-lg transition">
                <div className="p-4 text-center">
                  <div
                    className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${commander.color}`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-1">
                    {commander.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {commander.description}
                  </p>
                  <span className="text-xs text-primary font-medium">
                    {commander.category}
                  </span>
                  <Button
                    className="btn-outline-astronaut w-full mt-3 text-xs py-2"
                    size="sm"
                  >
                    Follow
                  </Button>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
