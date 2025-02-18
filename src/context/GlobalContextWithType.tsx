/* eslint-disable @typescript-eslint/no-explicit-any */
import { Diagnoses, Medication, Order } from "@/types/ICDAutomation"
import { createContext } from "react"

interface GlobalContextProps {
  summaryData: {
    chiefComplaint?: string
    significantSigns?: string
  }
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
