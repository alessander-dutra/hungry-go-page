import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import SupportChat from "./SupportChat";

interface ChatButtonProps {
  variant?: "floating" | "inline";
  className?: string;
}

const ChatButton = ({ variant = "inline", className }: ChatButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "floating") {
    return (
      <>
        <Button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-40 rounded-full w-14 h-14 shadow-lg gradient-hero hover:opacity-90 ${className}`}
          size="icon"
        >
          <MessageCircle size={24} className="text-white" />
        </Button>
        <SupportChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }

  return (
    <>
      <Button
        variant="premium"
        size="sm"
        onClick={() => setIsOpen(true)}
        className={`group bg-background text-foreground hover:bg-background/90 ${className}`}
      >
        Abrir Chat
      </Button>
      <SupportChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatButton;
