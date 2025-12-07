import {
  Diagnoses,
  Medication,
  Order,
  SummaryData,
  Allergy,
  PhysicalExamination
} from "@/types/ICDAutomation"
import { createContext } from "react"

export interface GlobalContextProps {
  summaryData: SummaryData
  icdData: {
    diagnoses: Diagnoses
    medications: Medication[]
    orders: Order[]
    allergies?: Allergy[]
    physicalExaminations?: PhysicalExamination[]
  }
  resetSummaryData?: () => void
  sendMessageToIframe?: (message: object, targetOrigin: string) => void
}

export const GlobalContext = createContext<GlobalContextProps>({
  summaryData: {
    chiefComplaint: "",
    significantSigns: ""
  },
  icdData: {
    diagnoses: {
      principal: undefined,
      additionalDiagnosis: []
    },
    medications: [],
    orders: [],
    allergies: [],
    physicalExaminations: []
  }
})
