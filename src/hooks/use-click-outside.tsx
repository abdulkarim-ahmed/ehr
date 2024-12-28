/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";


export const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void, enabled = true) => {
    useEffect(() => {
      if (!enabled) return;
  
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, handler, enabled]);
  };
  