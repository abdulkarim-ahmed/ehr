/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ReactNode } from "react"
import { GlobalContext } from "./GlobalContextWithType"

export const GlobalContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [message, setMessage] = useState(null)

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleSetMessage = (message: any) => {
    // console.log("Message received from iframe:", message);
    setMessage(message)
  }

  return (
    <GlobalContext.Provider value={{ message, setMessage: handleSetMessage }}>
      {children}
    </GlobalContext.Provider>
  )
}
