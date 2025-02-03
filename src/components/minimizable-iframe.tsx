import { useContext, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useClickOutside } from "@/hooks/use-click-outside"
import { GlobalContext } from "@/context/GlobalContextWithType"

export const IframeSidebar = ({
  isOpen,
  isMinimized,
  onMinimize,
  iframeUrl
}: {
  isOpen: boolean
  isMinimized: boolean
  onMinimize: (state: boolean) => void
  onClose: () => void
  iframeUrl: string
}) => {
  const sidebarRef = useRef(null)
  const { setMessage } = useContext(GlobalContext)

  useClickOutside(sidebarRef, () => onMinimize(true), isOpen && !isMinimized)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("Message received from iframe:", event)
      setMessage(event.data)
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [setMessage])

  if (!isOpen) return null

  return (
    <div
      ref={sidebarRef}
      className={`
      fixed top-0 right-0 h-full 
      transform transition-transform duration-300
      bg-white border-l border-gray-200
      shadow-lg z-50 
      ${isMinimized ? "w-0" : `w-96`}
    `}
    >
      <button 
        className={`
          absolute -left-6 top-3 
          p-1 rounded-full
          transition-colors duration-200
          ${isMinimized 
            ? "hover:bg-gray-100" 
            : "bg-white hover:bg-gray-100 shadow-sm border border-gray-200 -left-10"
          }
        `}
      >
        {isMinimized ? (
          <ChevronLeft className="w-5 h-5" onClick={() => onMinimize(false)} />
        ) : (
          <ChevronRight className="w-5 h-5" onClick={() => onMinimize(true)} />
        )}
      </button>

      <div className={`h-full ${isMinimized ? "invisible" : "visible"}`}>
        <iframe
          src={iframeUrl}
          className="w-full h-full border-0"
          title="Sahl.ai"
          id="childFrame"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          allow="microphone"
        ></iframe>
      </div>
    </div>
  )
}