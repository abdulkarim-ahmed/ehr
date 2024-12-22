import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { GlobalContext } from "@/context/GlobalContextWithType";
import { useEffect, useContext } from "react";

interface SidebarWithIframeProps {
  isOpen: boolean
  onClose: () => void
}

export function SidebarWithIframe({ isOpen, onClose }: SidebarWithIframeProps) {
  const { setMessage } = useContext(GlobalContext);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:5173") return;
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-2/5">
        <SheetHeader>
          <SheetTitle>Consultation Assistant</SheetTitle>
        </SheetHeader>
        <div className="mt-6 h-[calc(100vh-100px)]">
        <iframe
            src="http://localhost:5173/iframe?access_token={token_here}"
            id="childFrame" sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            allow="microphone" style={{
              height:"100%"
            }}>
        </iframe>
        </div>
      </SheetContent>
    </Sheet>
  )
}

