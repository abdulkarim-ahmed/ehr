export type SummarySection = {
  title: string
  content: string
}

export type SummaryData = {
  chiefComplaint?: string
  significantSigns?: string
  admissionCategory?: string
  anesthesiaType?: string
  surgicalSpecimens?: string
  bloodLoss?: string
  transfusion?: string
  unitsUsed?: string
  preOperativeDiagnosis?: string
  postOperativeDiagnosis?: string
  operativeTitle?: string
  surgicalProcedureAndFindings?: string
  complications?: string
  sections?: SummarySection[]
}

export type Diagnosis = {
  code: string
  description: string
}

export type Diagnoses = {
  principal: Diagnosis | undefined
  additionalDiagnosis: Diagnosis[]
}

export type Medication = {
  name: string
  code: string
  method: string
  quantity: string
  dosage: string
  frequency: string
  duration: string
}

export type Order = {
  code: string
  name: string
}

export type Allergy = {
  allergen?: string
  code: string
  description?: string
  name: string
}

export type PhysicalExamination = {
  code: string
  name: string
  mentionedLinkedExaminations?: any[]
  type?: string
}
