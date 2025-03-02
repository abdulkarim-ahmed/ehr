/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ReactNode, useEffect } from "react"
import { GlobalContext } from "./GlobalContextWithType"
import { sanitizeString } from "@/lib/utils"
import { SummaryData } from "@/types/ICDAutomation"
//

const handleSummary = (message: any): SummaryData => {
  // Initialize variables
  let chiefComplaint = ""
  let significantSign = ""
  let admissionCategory = ""
  let anesthesiaType = ""
  let surgicalSpecimens = ""
  let bloodLoss = ""
  let transfusion = ""
  let unitsUsed = ""
  let preOperativeDiagnosis = ""
  let postOperativeDiagnosis = ""
  let operativeTitle = ""
  let surgicalProcedureAndFindings = ""
  let complications = ""

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
      case "Surgical Specimens":
        surgicalSpecimens += `${sanitizeString(content.join(" "))}\n`
        break
      case "Blood Loss":
        bloodLoss += `${sanitizeString(content.join(" "))}\n`
        break
      case "Transfusion":
        transfusion += `${sanitizeString(content.join(" "))}\n`
        break
      case "Units Used":
        unitsUsed += `${sanitizeString(content.join(" "))}\n`
        break
      case "Pre-Operative Diagnosis":
        preOperativeDiagnosis += `${sanitizeString(content.join(" "))}\n`
        break
      case "Post-Operative Diagnosis":
        postOperativeDiagnosis += `${sanitizeString(content.join(" "))}\n`
        break
      case "Operative Title":
        operativeTitle += `${sanitizeString(content.join(" "))}\n`
        break
      case "Surgical Procedure & Findings":
        surgicalProcedureAndFindings += `${sanitizeString(content.join(" "))}\n`
        break
      case "Complications":
        complications += `${sanitizeString(content.join(" "))}\n`
        break
      case "Admission Category":
        admissionCategory += `${sanitizeString(content.join(" "))}\n`
        break
      case "Anesthesia Type":
        anesthesiaType += `${sanitizeString(content.join(" "))}\n`
        break
    }
  })

  return {
    chiefComplaint: chiefComplaint.trim(),
    significantSigns: significantSign.trim(),
    surgicalSpecimens: surgicalSpecimens.trim(),
    bloodLoss: bloodLoss.trim(),
    transfusion: transfusion.trim(),
    unitsUsed: unitsUsed.trim(),
    preOperativeDiagnosis: preOperativeDiagnosis.trim(),
    postOperativeDiagnosis: postOperativeDiagnosis.trim(),
    operativeTitle: operativeTitle.trim(),
    surgicalProcedureAndFindings: surgicalProcedureAndFindings.trim(),
    complications: complications.trim(),
    admissionCategory: admissionCategory.trim(),
    anesthesiaType: anesthesiaType.trim()
  }
}

export const GlobalContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    chiefComplaint: "",
    significantSigns: "",
    admissionCategory: "",
    anesthesiaType: "",
    surgicalSpecimens: "",
    bloodLoss: "",
    transfusion: "",
    unitsUsed: "",
    preOperativeDiagnosis: "",
    postOperativeDiagnosis: "",
    operativeTitle: "",
    surgicalProcedureAndFindings: "",
    complications: ""
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
        const summary = handleSummary(event.data)

        // Set state
        setSummaryData(summary)
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
