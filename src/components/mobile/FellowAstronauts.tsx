import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const astronauts = [
  { id: 1, name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { id: 2, name: "Maria Santos", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b510?w=150&h=150&fit=crop&crop=face" },
  { id: 3, name: "James Wilson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { id: 4, name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face" },
  { id: 5, name: "David Brown", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face" },
  { id: 6, name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { id: 7, name: "Michael Lee", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { id: 8, name: "Jessica Liu", avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face" }
];

export const FellowAstronauts = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-poppins font-normal text-foreground flex items-center gap-2">
        <span>👨‍🚀</span>
        My Fellow Astronauts
      </h2>
      
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-2">
          {astronauts.map((astronaut) => (
            <div key={astronaut.id} className="flex-shrink-0 text-center space-y-2">
              <Avatar className="w-16 h-16 border-2 border-primary/20">
                <AvatarImage src={astronaut.avatar} alt={astronaut.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-poppins font-medium">
                  {astronaut.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <p className="text-xs font-poppins font-light text-muted-foreground max-w-[4rem] truncate">
                {astronaut.name}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};