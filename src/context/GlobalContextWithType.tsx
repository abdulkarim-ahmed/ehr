import {
  Diagnoses,
  Medication,
  Order,
  SummaryData
} from "@/types/ICDAutomation"
import { createContext } from "react"

interface GlobalContextProps {
  summaryData: SummaryData
  icdData: {
    diagnoses: Diagnoses
    medications: Medication[]
    orders: Order[]
  }
}

export const GlobalContext = createContext<GlobalContextProps>({
  summaryData: {
    chiefComplaint: "",
    significantSigns: ""
  },
  icdData: {
    diagnoses: {
      principal: {
        code: "",
        description: ""
      },
      additionalDiagnosis: []
    },
    medications: [],
    orders: []
  }
})
