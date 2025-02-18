/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ReactNode, useEffect } from "react"
import { GlobalContext } from "./GlobalContextWithType"
import { sanitizeString } from "@/lib/utils"

const handleSummary = (
  message: any
): {
  chiefComplaint: string
  significantSigns: string
} => {
  // Initialize variables
  let chiefComplaint = ""
  let significantSign = ""

  // Process each section
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  // biome-ignore lint/complexity/noForEach: <explanation>
  message?.summary?.forEach((section: any) => {
    const content = section.editedBody || section.body

    // Append content based on section titles
    switch (section.title) {
      case "Chief Complaint":
      case "Chief Complaints":
      case "Chief Complaint & History Of Present Illness":
      case "Past Medical History":
      case "Past Surgical History":
      case "Treatment Plan or Medical Advices":
      case "History of Presentation":
        // Append content to chiefComplaint with a new line
        chiefComplaint += `${sanitizeString(content.join(" "))}\n`
        break

      case "Significant Sign":
      case "Significant Signs":
      case "Significant Sign & Symptoms":
      case "Physical Examination (Significant Signs)":
        // Append content to significantSign with a new line
        significantSign += `${sanitizeString(content.join(" "))}\n`
        break
    }
  })

  return {
    chiefComplaint: chiefComplaint.trim(),
    significantSigns: significantSign.trim()
  }
}

export const GlobalContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [summaryData, setSummaryData] = useState({
    chiefComplaint: "",
    significantSigns: ""
  })
  const [icdData, setIcdData] = useState({
    diagnoses: {
      principal: {
        code: "",
        description: ""
      },
      additionalDiagnosis: []
    },
    medications: [],
    orders: []
  })

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // if no type this means data is of summary
      if (!event?.data?.type) {
        const { chiefComplaint, significantSigns } = handleSummary(event.data)

        // Set state
        setSummaryData({
          chiefComplaint,
          significantSigns
        })
        // FIX: Add enum for this
      } else if (event.data.type === "icd-automation") {
        setIcdData({
          diagnoses: event.data.data.diagnoses,
          medications: event.data.data.medications,
          orders: event.data.data.orders
        })
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        icdData,
        summaryData
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
