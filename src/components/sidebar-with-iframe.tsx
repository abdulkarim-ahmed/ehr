import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { GlobalContext } from "@/context/GlobalContextWithType";
import { useEffect, useContext, useRef } from "react";

interface SidebarWithIframeProps {
  isOpen: boolean
  onClose: () => void
  token: string
}

export function SidebarWithIframe({ isOpen, onClose, token }: SidebarWithIframeProps) {
  const { setMessage } = useContext(GlobalContext);
  const IframeUrl = import.meta.env.VITE_IFRAME_URL + token
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("Message received from iframe:", event);
      // Handle the message
      setMessage(event.data);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setMessage]);

  return (
    <div className={`fixed inset-y-0 right-0 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
      <Sheet open={isOpen} onOpenChange={onClose} modal={false}>
        <SheetContent side="right" className="w-2/5">
          <SheetHeader>
            <SheetTitle>Consultation Assitant</SheetTitle>
          </SheetHeader>
          <div className="mt-6 h-[calc(100vh-100px)]">
            <iframe
              ref={iframeRef}
              src={IframeUrl}
              id="childFrame" sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              allow="microphone" style={{
              height:"100%"
              }}>
            </iframe>          
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

