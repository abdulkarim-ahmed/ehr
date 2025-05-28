import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react" // Added MicOff

interface FloatingMicButtonProps {
  onClick: () => void // This function should toggle the sidebar/iframe
  active: boolean // This indicates if the sidebar/iframe is currently open
}

export function FloatingMicButton({ onClick, active }: FloatingMicButtonProps) {
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 80
  })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef({
    offset: { x: 0, y: 0 },
    start: { x: 0, y: 0 },
    isClick: true // To differentiate drag from click
  })

  useEffect(() => {
    // Initialize position or load from localStorage if you want persistence
    const savedX = localStorage.getItem("micButtonX")
    const savedY = localStorage.getItem("micButtonY")
    setPosition({
      x: savedX ? parseInt(savedX, 10) : window.innerWidth - 80,
      y: savedY ? parseInt(savedY, 10) : window.innerHeight - 80
    })
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      dragRef.current.isClick = false // It's a drag, not a click

      const newX = Math.min(
        Math.max(0, e.clientX - dragRef.current.offset.x),
        window.innerWidth - 64 // button width
      )
      const newY = Math.min(
        Math.max(0, e.clientY - dragRef.current.offset.y),
        window.innerHeight - 64 // button height
      )

      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      if (!isDragging) return
      setIsDragging(false)

      if (dragRef.current.isClick) {
        onClick() // Perform click action if no significant drag
      } else {
        // Save position after drag
        localStorage.setItem("micButtonX", position.x.toString())
        localStorage.setItem("micButtonY", position.y.toString())
      }
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, onClick, position.x, position.y]) // Added position to dependencies for saving

  const handleMouseDown = (e: React.MouseEvent) => {
    // e.preventDefault(); // Prevents text selection, but can interfere with focus

    dragRef.current = {
      offset: {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      },
      start: {
        x: e.clientX,
        y: e.clientY
      },
      isClick: true // Reset for new interaction
    }

    setIsDragging(true)
  }

  return (
    <Button
      variant={active ? "default" : "secondary"} // Use theme colors
      className={`fixed p-0 w-16 h-16 rounded-full cursor-pointer
        flex items-center justify-center
        text-lg
        ${isDragging ? "shadow-2xl scale-105 z-[100]" : "shadow-xl z-[60]"}
        ${
          active
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-accent text-accent-foreground hover:bg-accent/90"
        }
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging
          ? "none"
          : "all 0.2s ease-out, transform 0.1s ease-out, box-shadow 0.1s ease-out",
        touchAction: "none" // Important for mobile dragging
      }}
      onMouseDown={handleMouseDown}
      onClickCapture={(e) => {
        // Use onClickCapture to decide if it's a click or drag end
        if (!dragRef.current.isClick) {
          e.stopPropagation() // Prevent click if it was a drag
        }
      }}
      title={active ? "Close Scribe AI" : "Open Scribe AI"}
    >
      {active && (
        <div className="absolute animate-ping -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-400 opacity-75" />
      )}
      {active && (
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500" />
      )}
      <Mic className="h-7 w-7" />
    </Button>
  )
}
