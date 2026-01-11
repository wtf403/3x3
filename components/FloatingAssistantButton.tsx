import { useState } from "react"
import { Button } from "./ui/button"
import { MessageCircle } from "lucide-react"
import { Badge } from "./ui/badge"

interface FloatingAssistantButtonProps {
  onClick: () => void
  hasUnreadMessages?: boolean
}

export default function FloatingAssistantButton({ 
  onClick, 
  hasUnreadMessages = false 
}: FloatingAssistantButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={onClick}
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle className="h-6 w-6" />
        {hasUnreadMessages && (
          <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
            !
          </Badge>
        )}
      </Button>
      
      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-popover text-popover-foreground p-2 rounded-lg shadow-md whitespace-nowrap">
          有疑问？问我任何指标！
        </div>
      )}
    </div>
  )
}