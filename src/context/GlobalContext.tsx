/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ReactNode, useEffect } from "react"
import { GlobalContext } from "./GlobalContextWithType"
import { sanitizeString } from "@/lib/utils"
import { SummaryData } from "@/types/ICDAutomation"
import { initialConsultationsData } from "@/lib/mock-data"
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

  const allSections: Array<{ title: string; content: string }> = []

    // Process each section
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  // biome-ignore lint/complexity/noForEach: <explanation>
  message?.summary?.forEach((section: any) => {
    const content = section.editedBody || section.body
    const contentString = Array.isArray(content) 
      ? content.join("\n") 
      : (typeof content === 'string' ? content : String(content))
    const sanitizedContent = sanitizeString(contentString)

    allSections.push({
      title: section.title || "Untitled",
      content: sanitizedContent
    })

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
        chiefComplaint += `${sanitizedContent}\n`
        break

      case "Significant Sign":
      case "Significant Signs":
      case "Significant Sign & Symptoms":
      case "Physical Examination (Significant Signs)":
        // Append content to significantSign with a new line
        significantSign += `${sanitizedContent}\n`
        break
      case "Surgical Specimens":
        surgicalSpecimens += `${sanitizedContent}\n`
        break
      case "Blood Loss":
        bloodLoss += `${sanitizedContent}\n`
        break
      case "Transfusion":
        transfusion += `${sanitizedContent}\n`
        break
      case "Units Used":
        unitsUsed += `${sanitizedContent}\n`
        break
      case "Pre-Operative Diagnosis":
        preOperativeDiagnosis += `${sanitizedContent}\n`
        break
      case "Post-Operative Diagnosis":
        postOperativeDiagnosis += `${sanitizedContent}\n`
        break
      case "Operative Title":
        operativeTitle += `${sanitizedContent}\n`
        break
      case "Surgical Procedure & Findings":
        surgicalProcedureAndFindings += `${sanitizedContent}\n`
        break
      case "Complications":
        complications += `${sanitizedContent}\n`
        break
      case "Admission Category":
        admissionCategory += `${sanitizedContent}\n`
        break
      case "Anesthesia Type":
        anesthesiaType += `${sanitizedContent}\n`
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
    anesthesiaType: anesthesiaType.trim(),
    sections: allSections
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
    complications: "",
    sections: []
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
    orders: [],
    allergies: [],
    physicalExaminations: []
  })

  const sendMessageToIframe = (message: any, targetOrigin: string = "*") => {
    const IFRAME_ID = "childFrame"
    try {
      const iframe = document.getElementById(
        IFRAME_ID
      ) as HTMLIFrameElement | null
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(message, targetOrigin)
      } else {
        console.error("Iframe not found or contentWindow is null")
      }
    } catch (error) {
      console.error("Error sending message to iframe:", error)
    }
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // if no type this means data is of summary
      if (!event?.data?.type) {
        console.log("Message received from parent:", event.data)
        const summary = handleSummary(event.data)

        // Set state
        setSummaryData(summary)
        // FIX: Add enum for this
      } else if (event.data.type === "icd-automation") {
        console.log("Message received from parent:", event.data)
        setIcdData({
          diagnoses: event.data.data.diagnoses,
          medications: event.data.data.medications,
          orders: event.data.data.orders,
          allergies: event.data.data.allergies || [],
          physicalExaminations: event.data.data.physicalExaminations || []
        })
      } else if (event.data.type === "get-patient-history") {
        console.log("Message received from parent:", event.data)
        sendMessageToIframe(initialConsultationsData)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const resetSummaryData = () => {
    setSummaryData({
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
      complications: "",
      sections: []
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        icdData,
        summaryData,
        sendMessageToIframe,
        resetSummaryData
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
