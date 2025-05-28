export interface Patient {
  // For dashboard
  id: string
  name: string
  dob: string // Or Date object, format for display
  gender: "Male" | "Female" | "Other" | "Prefer not to say"
  lastVisitDate?: string // Or Date
  // Add more dashboard-relevant fields: MRN, primary care physician, etc.
  visits: { id: string; date: string }[] // Keep this for compatibility with existing code if needed
}

export interface PatientDetails extends Patient {
  // For patient page header
  mrn?: string
  contact?: string
  address?: string
  // ... other detailed demographics
}

export interface PatientAllergy {
  id: string
  allergen: string
  reaction: string
  severity: "Mild" | "Moderate" | "Severe" | "Life-threatening"
  type?: "Drug" | "Food" | "Environmental" | "Other" // Optional
  onsetDate?: string
  notes?: string
  recordedDate?: string
}

export interface PatientAppointment {
  id: string
  dateTime: string // ISO string for easier sorting/comparison
  type: string
  provider: string
  location?: string
  status:
    | "Scheduled"
    | "Confirmed"
    | "Completed"
    | "Cancelled"
    | "No Show"
    | "Rescheduled"
  reason?: string
  notes?: string
}

export interface Prescription {
  id: string
  medicationName: string
  strength: string // e.g., "10mg", "500mg/5mL"
  dosageForm: string // e.g., "Tablet", "Capsule", "Oral Solution"
  route: string // e.g., "Oral", "Topical", "Intravenous"
  instructions: string // e.g., "Take one tablet by mouth once daily"
  quantity: string // e.g., "30 tablets"
  refills: number
  prescribingDoctor: string
  pharmacy?: string
  datePrescribed: string // ISO string
  dateFilled?: string // ISO string
  status:
    | "Active"
    | "Inactive"
    | "Discontinued"
    | "Pending Pharmacy"
    | "Filled"
    | "Expired"
  notes?: string
}

// From existing code (ensure they are in this types file if not already)
export interface Diagnoses {
  principal?: { code: string; description: string }
  additionalDiagnosis: Array<{ code: string; description: string }>
}
export interface Medication {
  // This might be different from Prescription, e.g., from a formulary
  code: string
  name: string
  method?: string
  quantity?: string
  dosage?: string
  frequency?: string
  duration?: string
}
export interface Order {
  code: string
  name: string
}

export interface Consultation {
  // From PatientHistory
  id: string
  title: string
  date: string // ISO String
  summary: string
}

// This type is for the `patient` state in App.tsx and PatientPage props
export interface CurrentPatientContext {
  patient_id: string
  patient_name: string
  visit_id: string // Could be optional or managed differently
}
