import React, { useEffect, useState } from "react"
import { SummaryData } from "@/types/ICDAutomation"
// Import Shadcn UI components
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  FileText,
  Save,
  Printer,
  User,
  Hospital,
  CalendarClockIcon
} from "lucide-react" // Icons

type ORFormProps = {
  summaryData: SummaryData
}

interface FormData {
  patientName: string
  mrNumber: string
  gender: string
  age: string
  nationality: string
  department: string
  ward: string
  room: string
  date: string
  procedureTime: string
  consultantName: string
  surgeonName: string
  asstSurgeon: string
  admissionCategory: string
  anesthetist: string
  anesthesiaType: string
  specimens: string
  specimensDetails: string
  bloodLoss: string
  transfusion: string
  unitsUsed: string
  mlUsed: string
  preOperativeDiagnosis: string
  postOperativeDiagnosis: string
  operationTitle: string
  surgicalProcedure: string
  complications: string
  complicationsDetails: string
  surgeonNameSign: string
  surgeonID: string
  signDate: string
  signTime: string
}

const hardcodedSampleData: Partial<FormData> = {
  patientName: "Mohammed Ali",
  mrNumber: "SA-000123",
  gender: "Male",
  age: "45",
  nationality: "Saudi",
  department: "General Surgery",
  ward: "Ward B",
  room: "202",
  date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  procedureTime: "14:30", // 24-hour format
  consultantName: "Dr. Ahmed Al-Farsi",
  surgeonName: "Dr. Khalid Al-Mutairi",
  asstSurgeon: "Dr. Youssef Al-Qahtani",
  anesthetist: "Dr. Faisal Al-Dossary",
  specimens: "None",
  mlUsed: "0",
  complicationsDetails: "None",
  surgeonNameSign: "Dr. Khalid Al-Mutairi",
  surgeonID: "KM-56789",
  signDate: new Date().toISOString().split("T")[0], // Current date
  signTime: new Date().toLocaleTimeString("en-SA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
}

const FormSection: React.FC<{
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
  description?: string
}> = ({ title, children, icon, description }) => (
  <div className="mb-[var(--spacing-lg)] rounded-lg border border-border p-[var(--spacing-md)] bg-card shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center mb-[var(--spacing-sm)] border-b border-border pb-[var(--spacing-sm)]">
      {icon && <span className="mr-2 text-primary">{icon}</span>}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    </div>
    {description && (
      <p className="text-sm text-muted-foreground mb-[var(--spacing-md)]">
        {description}
      </p>
    )}
    <div className="space-y-[var(--spacing-md)]">{children}</div>
  </div>
)

// Helper for input groups
const FormGroup: React.FC<{
  label: string
  htmlFor: string
  children: React.ReactNode
  className?: string
  description?: string
}> = ({ label, htmlFor, children, className, description }) => (
  <div className={className}>
    <Label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-foreground/90 mb-1.5"
    >
      {label}
    </Label>
    {children}
    {description && (
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    )}
  </div>
)

const ORForm = ({ summaryData }: ORFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    mrNumber: "",
    gender: "",
    age: "",
    nationality: "",
    department: "",
    ward: "",
    room: "",
    date: "",
    procedureTime: "",
    consultantName: "",
    surgeonName: "",
    asstSurgeon: "",
    admissionCategory: "",
    anesthetist: "",
    anesthesiaType: "",
    specimens: "",
    specimensDetails: "",
    bloodLoss: "",
    transfusion: "",
    unitsUsed: "",
    mlUsed: "",
    preOperativeDiagnosis: "",
    postOperativeDiagnosis: "",
    operationTitle: "",
    surgicalProcedure: "",
    complications: "",
    complicationsDetails: "",
    surgeonNameSign: "",
    surgeonID: "",
    signDate: "",
    signTime: ""
  })

  useEffect(() => {
    if (
      summaryData.surgicalSpecimens ||
      summaryData.bloodLoss ||
      summaryData.transfusion ||
      summaryData.preOperativeDiagnosis ||
      summaryData.postOperativeDiagnosis ||
      summaryData.operativeTitle ||
      summaryData.surgicalProcedureAndFindings ||
      summaryData.complications
    ) {
      setFormData((prevState) => ({
        ...prevState,
        ...hardcodedSampleData,
        admissionCategory: summaryData.admissionCategory || "",
        anesthesiaType: summaryData.anesthesiaType || "",
        specimens: summaryData.surgicalSpecimens || "",
        specimensDetails: summaryData.surgicalSpecimens || "",
        bloodLoss: summaryData.bloodLoss || "",
        transfusion: summaryData.transfusion || "",
        unitsUsed: summaryData.unitsUsed || "",
        mlUsed: summaryData.unitsUsed || "",
        preOperativeDiagnosis: summaryData.preOperativeDiagnosis || "",
        postOperativeDiagnosis: summaryData.postOperativeDiagnosis || "",
        operationTitle: summaryData.operativeTitle || "",
        surgicalProcedure: summaryData.surgicalProcedureAndFindings || "",
        complications: summaryData.complications || ""
      }))
    }
  }, [summaryData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleRadioChange = (name: keyof FormData) => (value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("OR Form Submitted:", formData)
    // Add actual submission logic here
    alert("Operation Report saved (see console for data).")
  }

  return (
    <Card className="shadow-lg border animate-fadeIn">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center text-xl">
              <FileText className="mr-3 h-6 w-6 text-primary" /> Operation
              Report
            </CardTitle>
            <CardDescription>
              Official surgical operation documentation.
            </CardDescription>
          </div>
          <div className="text-sm font-mono text-muted-foreground">
            DH MD 099
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-[var(--card-padding)]">
        <form onSubmit={handleSubmit} className="space-y-[var(--spacing-xl)]">
          <FormSection title="Patient Information" icon={<User size={20} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-md)]">
              <FormGroup label="Patient's Name:" htmlFor="patientName">
                <Input
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup label="MR#:" htmlFor="mrNumber">
                <Input
                  id="mrNumber"
                  name="mrNumber"
                  value={formData.mrNumber}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup label="Gender:" htmlFor="gender">
                <Select
                  name="gender"
                  value={formData.gender}
                  onValueChange={handleSelectChange("gender")}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormGroup>
              <FormGroup label="Age:" htmlFor="age">
                <Input
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <FormGroup label="Nationality:" htmlFor="nationality">
              <Input
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </FormGroup>
          </FormSection>

          <FormSection title="Location & Timing" icon={<Hospital size={20} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-md)]">
              <FormGroup label="Department:" htmlFor="department">
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup label="Ward:" htmlFor="ward">
                <Input
                  id="ward"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup label="Room:" htmlFor="room">
                <Input
                  id="room"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)]">
              <FormGroup label="Date of Procedure:" htmlFor="date">
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup label="Procedure Time (24h):" htmlFor="procedureTime">
                <Input
                  id="procedureTime"
                  name="procedureTime"
                  type="time"
                  value={formData.procedureTime}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
          </FormSection>

          <FormSection
            title="Medical Personnel"
            icon={
              <i className="fas fa-user-md"></i> /* Example FontAwesome, replace with Lucide if preferred */
            }
          >
            {/* ... Consultant, Surgeon, Asst. Surgeon ... similar FormGroup structure ... */}
            <FormGroup label="Consultant Name:" htmlFor="consultantName">
              <Input
                id="consultantName"
                name="consultantName"
                value={formData.consultantName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup label="Surgeon Name:" htmlFor="surgeonName">
              <Input
                id="surgeonName"
                name="surgeonName"
                value={formData.surgeonName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup label="Asst. Surgeon:" htmlFor="asstSurgeon">
              <Input
                id="asstSurgeon"
                name="asstSurgeon"
                value={formData.asstSurgeon}
                onChange={handleChange}
              />
            </FormGroup>
          </FormSection>

          <FormSection title="Admission & Anesthesia">
            <FormGroup label="Admission Category:" htmlFor="admissionCategory">
              <RadioGroup
                name="admissionCategory"
                value={formData.admissionCategory}
                onValueChange={handleRadioChange("admissionCategory")}
                className="flex gap-4 items-center"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Elective" id="elective" />
                  <Label htmlFor="elective">Elective</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Emergency" id="emergency" />
                  <Label htmlFor="emergency">Emergency</Label>
                </div>
              </RadioGroup>
            </FormGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)]">
              <FormGroup label="Anesthetist(s):" htmlFor="anesthetist">
                <Input
                  id="anesthetist"
                  name="anesthetist"
                  value={formData.anesthetist}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup label="Anesthesia Type:" htmlFor="anesthesiaType">
                <Input
                  id="anesthesiaType"
                  name="anesthesiaType"
                  value={formData.anesthesiaType}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
          </FormSection>

          <FormSection title="Operative Details">
            <FormGroup label="Surgical Specimens:" htmlFor="specimens">
              <Select
                name="specimens"
                value={formData.specimens}
                onValueChange={handleSelectChange("specimens")}
              >
                <SelectTrigger id="specimens">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </FormGroup>
            {formData.specimens === "Yes" && (
              <FormGroup
                label="If Yes, please mention:"
                htmlFor="specimensDetails"
              >
                <Input
                  id="specimensDetails"
                  name="specimensDetails"
                  value={formData.specimensDetails}
                  onChange={handleChange}
                />
              </FormGroup>
            )}

            <FormGroup label="Estimated Blood Loss (ml):" htmlFor="bloodLoss">
              <Input
                id="bloodLoss"
                name="bloodLoss"
                type="number"
                value={formData.bloodLoss}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup label="Transfusion:" htmlFor="transfusion">
              <Select
                name="transfusion"
                value={formData.transfusion}
                onValueChange={handleSelectChange("transfusion")}
              >
                <SelectTrigger id="transfusion">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </FormGroup>
            {formData.transfusion === "Yes" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)]">
                <FormGroup label="Units Used:" htmlFor="unitsUsed">
                  <Input
                    id="unitsUsed"
                    name="unitsUsed"
                    value={formData.unitsUsed}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup label="Amount (ml):" htmlFor="mlUsed">
                  <Input
                    id="mlUsed"
                    name="mlUsed"
                    type="number"
                    value={formData.mlUsed}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            )}
          </FormSection>

          <FormSection title="Diagnoses & Procedure">
            <FormGroup
              label="Pre-operative Diagnosis:"
              htmlFor="preOperativeDiagnosis"
            >
              <Textarea
                id="preOperativeDiagnosis"
                name="preOperativeDiagnosis"
                value={formData.preOperativeDiagnosis}
                onChange={handleChange}
                rows={4}
              />
            </FormGroup>
            <FormGroup
              label="Post-operative Diagnosis:"
              htmlFor="postOperativeDiagnosis"
            >
              <Textarea
                id="postOperativeDiagnosis"
                name="postOperativeDiagnosis"
                value={formData.postOperativeDiagnosis}
                onChange={handleChange}
                rows={4}
              />
            </FormGroup>
            <FormGroup
              label="Operation Title / Procedure(s):"
              htmlFor="operationTitle"
            >
              <Textarea
                id="operationTitle"
                name="operationTitle"
                value={formData.operationTitle}
                onChange={handleChange}
                rows={4}
              />
            </FormGroup>
            <FormGroup
              label="Surgical Procedure & Findings:"
              htmlFor="surgicalProcedure"
            >
              <Textarea
                id="surgicalProcedure"
                name="surgicalProcedure"
                value={formData.surgicalProcedure}
                onChange={handleChange}
                rows={6}
              />
            </FormGroup>
          </FormSection>

          <FormSection title="Complications">
            <FormGroup label="Complications Occurred:" htmlFor="complications">
              <Select
                name="complications"
                value={formData.complications}
                onValueChange={handleSelectChange("complications")}
              >
                <SelectTrigger id="complications">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </FormGroup>
            {formData.complications === "Yes" && (
              <FormGroup
                label="If Yes, please detail:"
                htmlFor="complicationsDetails"
              >
                <Textarea
                  id="complicationsDetails"
                  name="complicationsDetails"
                  value={formData.complicationsDetails}
                  onChange={handleChange}
                  rows={3}
                />
              </FormGroup>
            )}
          </FormSection>

          <FormSection
            title="Surgeon's Attestation"
            icon={<CalendarClockIcon size={20} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-md)]">
              <FormGroup
                label="Surgeon Name (for signature):"
                htmlFor="surgeonNameSign"
              >
                <Input
                  id="surgeonNameSign"
                  name="surgeonNameSign"
                  value={formData.surgeonNameSign}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup label="Surgeon ID No.:" htmlFor="surgeonID">
                <Input
                  id="surgeonID"
                  name="surgeonID"
                  value={formData.surgeonID}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)]">
              <FormGroup label="Date Signed:" htmlFor="signDate">
                <Input
                  id="signDate"
                  name="signDate"
                  type="date"
                  value={formData.signDate}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup label="Time Signed:" htmlFor="signTime">
                <Input
                  id="signTime"
                  name="signTime"
                  type="time"
                  value={formData.signTime}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="mt-[var(--spacing-md)] border-t border-dashed border-border pt-[var(--spacing-sm)] text-center text-sm text-muted-foreground">
              Electronic Signature & Stamp Placeholder
            </div>
          </FormSection>

          <div className="flex justify-end gap-[var(--spacing-sm)] pt-[var(--spacing-md)] border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.print()}
            >
              {" "}
              {/* Example Print */}
              <Printer className="mr-2 h-4 w-4" /> Print Report
            </Button>
            <Button type="submit" size="lg">
              <Save className="mr-2 h-4 w-4" /> Save Operation Report
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ORForm
