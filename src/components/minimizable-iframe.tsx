import React, { useRef, useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useClickOutside } from "@/hooks/use-click-outside"

export const IframeSidebar = ({
  isOpen,
  isMinimized,
  onMinimize,
  iframeUrl
}: {
  isOpen: boolean
  isMinimized: boolean
  onMinimize: (state: boolean) => void
  iframeUrl: string
}) => {
  const sidebarRef = useRef(null)
  const [width, setWidth] = useState(520) // Default 520px
  const [isResizing, setIsResizing] = useState(false)
  const resizeRef = useRef<{ startX: number; startWidth: number } | null>(null)

  useClickOutside(sidebarRef, () => onMinimize(true), isOpen && !isMinimized)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return
      e.preventDefault()
      e.stopPropagation()

      setIsResizing(true)
      resizeRef.current = {
        startX: e.clientX,
        startWidth: width
      }
    },
    [width]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !resizeRef.current) return

      e.preventDefault()
      const deltaX = resizeRef.current.startX - e.clientX
      const newWidth = Math.max(
        320,
        Math.min(600, resizeRef.current.startWidth + deltaX)
      )
      setWidth(newWidth)
    },
    [isResizing]
  )

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
    resizeRef.current = null
  }, [])

  // Add global mouse event listeners when resizing
  useEffect(() => {
    if (!isResizing) return

    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  if (!isOpen) return null

  return (
    <>
      {/* Resize handle - positioned outside the sidebar */}
      {!isMinimized && (
        <div
          className={`fixed top-0 h-full w-4 cursor-col-resize z-[60] bg-transparent hover:bg-blue-500/20 transition-colors`}
          style={{
            right: `${width}px`,
            touchAction: "none"
          }}
          onMouseDown={handleMouseDown}
        />
      )}

      {/* Width indicator during resize */}
      {isResizing && (
        <div
          className="fixed z-[70] bg-gray-900 text-white px-2 py-1 rounded text-sm font-mono pointer-events-none"
          style={{
            right: `${width + 20}px`,
            top: "50%",
            transform: "translateY(-50%)"
          }}
        >
          {width}px
        </div>
      )}

      <div
        ref={sidebarRef}
        className={`
        fixed top-0 right-0 h-full 
        transform transition-transform duration-300
        bg-white border-l border-gray-200
        shadow-lg z-50 
        ${isMinimized ? "w-0" : ""}
      `}
        style={{
          width: isMinimized ? 0 : `${width}px`
        }}
      >
        <div className="absolute -left-11 top-3 z-[60]">
          <button
            type="button"
            className="p-1 rounded-full bg-white hover:bg-gray-100 shadow-sm border border-gray-200 transition-colors duration-200"
            onClick={() => onMinimize(!isMinimized)}
          >
            {isMinimized ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className={`h-full ${isMinimized ? "invisible" : "visible"}`}>
          <iframe
            src={iframeUrl}
            className="w-full h-full border-0"
            title="Sahl.ai"
            id="childFrame"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            allow="microphone"
            style={{ pointerEvents: isResizing ? "none" : "auto" }}
          />
        </div>
      </div>
    </>
  )
}
