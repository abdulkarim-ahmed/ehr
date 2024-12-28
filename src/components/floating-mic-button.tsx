import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';

interface FloatingMicButtonProps {
  onClick: () => void;
  active: boolean;
}

export function FloatingMicButton({ onClick, active }: FloatingMicButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ 
    offset: { x: 0, y: 0 },
    start: { x: 0, y: 0 }
  });

  useEffect(() => {
    setPosition({
      x: window.innerWidth - 80,
      y: window.innerHeight - 80
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = Math.min(
        Math.max(0, e.clientX - dragRef.current.offset.x),
        window.innerWidth - 64
      );
      const newY = Math.min(
        Math.max(0, e.clientY - dragRef.current.offset.y),
        window.innerHeight - 64
      );
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = Math.abs(e.clientX - dragRef.current.start.x);
      const deltaY = Math.abs(e.clientY - dragRef.current.start.y);
      
      if (deltaX < 5 && deltaY < 5) {
        onClick();
      }
      
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onClick]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    dragRef.current = {
      offset: {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      },
      start: {
        x: e.clientX,
        y: e.clientY
      }
    };
    
    setIsDragging(true);
  };

  return (
    <Button
      className={`fixed p-0 w-16 h-16 shadow-lg rounded-full cursor-move
        ${isDragging ? 'shadow-xl scale-105' : 'shadow-lg'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging ? 'none' : 'all 0.2s ease',
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      {active && <div className="absolute animate-pulse -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 opacity-90" />}
      <Mic className="h-6 w-6" />
    </Button>
  );
}