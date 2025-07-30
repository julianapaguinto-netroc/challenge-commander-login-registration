import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, ChevronLeft, ChevronRight } from "lucide-react";
import categoryActiveImage from "@/assets/category-active.jpg";
import categoryGreenImage from "@/assets/category-green.jpg";
import categoryCulinaryImage from "@/assets/category-culinary.jpg";
import categoryWellnessImage from "@/assets/category-wellness.jpg";

export default function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  const categories = [
    {
      id: 1,
      name: "Active",
      image: categoryActiveImage,
      participant: "John Doe",
      points: 400,
    },
    {
      id: 2,
      name: "Go Green",
      image: categoryGreenImage,
      participant: "Jane Doe",
      points: 400,
    },
    {
      id: 3,
      name: "Culinary",
      image: categoryCulinaryImage,
      participant: "Jane Smith",
      points: 350,
    },
  ];

  return (
    <section className="p-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary font-poppins">
          Categories
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

      {/* Scrollable categories */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto smooth-scroll pb-2 scroll-snap-x"
      >
        {categories.map((category) => (
          <Card
            key={category.id}
            className="flex-shrink-0 w-40 p-0 overflow-hidden scroll-snap-align-start"
          >
            <div className="aspect-square w-full">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-2 py-2">
              <h3 className="text-sm font-semibold text-primary mb-2">
                {category.name}
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Crown className="h-3 w-3 text-cosmic-gold" />
                  <span className="text-xs font-medium truncate max-w-[70px]">
                    {category.participant}
                  </span>
                </div>
                <span className="text-xs font-bold text-primary">
                  {category.points} pts
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
