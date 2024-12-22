

import { Button } from "@/components/ui/button"
import { Mic } from 'lucide-react'

interface FloatingMicButtonProps {
  onClick: () => void
}

export function FloatingMicButton({ onClick }: FloatingMicButtonProps) {
  return (
    <Button
      className="fixed bottom-4 right-4 rounded-full p-0 w-16 h-16 shadow-lg"
      onClick={onClick}
    >
      <Mic className="h-6 w-6" />
    </Button>
  )
}

