import { Gem, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface GemsSectionProps {
  totalGems: number;
  onUseGems: () => void;
}

export function GemsSection({ totalGems, onUseGems }: GemsSectionProps) {
  return (
    <div className="bg-gradient-to-br from-green-100 via-green-200 to-green-100 rounded-xl p-4 my-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
            <Gem className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-medium text-green-800">Gems</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      Use Gems to unlock special rewards, <br />
                      boost challenges, or gift to friends!
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-xl font-semibold text-green-700">
              {totalGems.toLocaleString()}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={onUseGems}
        >
          Use Gems
        </Button>
      </div>
    </div>
  );
}
