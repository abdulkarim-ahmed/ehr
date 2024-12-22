/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

interface GlobalContextProps {
  message: any;
  setMessage: (message: any) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  message: null,
  setMessage: () => {},
});