import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { formatRelative, formatISTFull } from "@/lib/time";

interface LastUpdatedPillProps {
  timestamp: Date;
}

export function LastUpdatedPill({ timestamp }: LastUpdatedPillProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="outline" className="gap-2 cursor-help">
          <Clock className="w-3 h-3" />
          <span className="text-xs">Updated {formatRelative(timestamp)}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{formatISTFull(timestamp)}</p>
      </TooltipContent>
    </Tooltip>
  );
}
