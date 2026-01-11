import { HelpCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface QuestionableMetricProps {
  children: React.ReactNode
  question: string
  onQuestionClick: (question: string) => void
  tooltip?: string
}

export default function QuestionableMetric({ 
  children, 
  question, 
  onQuestionClick, 
  tooltip 
}: QuestionableMetricProps) {
  return (
    <div className="relative group">
      {children}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-background border shadow-sm"
              onClick={() => onQuestionClick(question)}
            >
              <HelpCircle className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip || "点击询问这个指标的含义"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}