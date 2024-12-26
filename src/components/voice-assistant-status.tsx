import { Mic } from "lucide-react";

interface VoiceAssistantStatusProps {
  onClick: () => void;
}

export function VoiceAssistantStatus({ onClick }: VoiceAssistantStatusProps) {
  console.log("🚀 ~ VoiceAssistantStatus ~ VoiceAssistantStatus:", VoiceAssistantStatus)
  return (
    <div
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-primary/10 hover:bg-primary/20 cursor-pointer backdrop-blur-sm text-primary flex items-center gap-2 px-3 py-2 rounded-full shadow transition-colors"
    >
      <Mic className="h-4 w-4" />
      <span className="text-sm font-medium">Voice Assistant Active</span>
    </div>
  );
}
