import { useContext, useEffect, useRef } from "react"
import { ChevronRight } from "lucide-react"
import { useClickOutside } from "@/hooks/use-click-outside"
import { GlobalContext } from "@/context/GlobalContextWithType"

// Sidebar Component
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

  // Only handle click outside when sidebar is open and not minimized
  useClickOutside(sidebarRef, () => onMinimize(true), isOpen && !isMinimized)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("Message received from iframe:", event)
      // Handle the message
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
      <div className={`h-full ${isMinimized ? "invisible" : "visible"} `}>
        <div className="my-6  flex items-center justify-between px-4">
          <img src="/sahl-logo.png" alt="Sahl.ai" className="h-6" />
          <button
            onClick={() => onMinimize(true)}
            className=" hover:bg-gray-100 rounded-full text-red-500 justify-end items-end"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* IFrame Container */}
        <div className="h-[calc(100%-4rem)]">
          <iframe
            src={iframeUrl}
            className="w-full h-full border-0"
            title="Sahl.ai"
            id="childFrame"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            allow="microphone"
            style={{
              height: "100%"
            }}
          ></iframe>
        </div>
      </div>
    </div>
  )
}
