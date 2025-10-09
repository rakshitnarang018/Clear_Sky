import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ChevronDown, ChevronUp, Check } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PayloadViewerProps {
  title: string;
  data: any;
}

export function PayloadViewer({ title, data }: PayloadViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="glass-card p-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="gap-2 flex-1 justify-start">
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span className="font-medium">{title}</span>
            </Button>
          </CollapsibleTrigger>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            {copied ? (
              <Check className="w-4 h-4 text-status-clear" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        <CollapsibleContent>
          <pre className="mt-4 p-4 bg-muted/20 rounded-lg text-xs overflow-x-auto max-h-96 overflow-y-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
