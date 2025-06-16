import { useState, useContext } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { GlobalContext } from "@/context/GlobalContextWithType"
import { FloatingMicButton } from "./floating-mic-button"
import { PatientHeader } from "./patient-header"
import { VitalSignsForm } from "./vital-signs-form"
import { Button } from "./ui/button"
import { IframeSidebar } from "./minimizable-iframe"
// import { EnvMap } from "@/lib/utils"
import HealthSummary from "./health-summary"
import ORForm from "./ORForm"
import { PatientHistory } from "./patient-history"

export default function PatientPage({
  token,
  env,
  theme,
  CTA,
  patient,
  onReset
}: {
  token: string
  env: string
  theme: string
  CTA: string
  onReset: () => void
  patient: {
    patient_id: string
    patient_name: string
    visit_id: string
  }
}) {
  const baseUrl =
    env === "prod"
      ? import.meta.env.VITE_IFRAME_URL
      : import.meta.env.VITE_IFRAME_DEV_URL

  let iframeUrl = `${baseUrl}${token}&theme=${theme}`

  if (patient.patient_id) iframeUrl += `&px_id=${patient.patient_id}`
  if (patient.visit_id) iframeUrl += `&ex_id=${patient.visit_id}`
  if (CTA) iframeUrl += `&cta=${CTA}`

  const { summaryData, icdData, resetSummaryData } = useContext(GlobalContext)

  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    isMinimized: false
  })

  const handleOpen = () => {
    setSidebarState({ isOpen: true, isMinimized: false })
  }

  const handleClose = () => {
    setSidebarState({ isOpen: false, isMinimized: false })
  }

  const handleMinimize = (minimized: boolean) => {
    setSidebarState((prev) => ({ ...prev, isMinimized: minimized }))
  }

  // const [chiefComplaint, setChiefComplaint] = useState("")
  // const [significantSign, setSignificantSign] = useState("")

  // const { message, setMessage } = useContext(GlobalContext)

  // useEffect(() => {
  //   // Helper function to clean and sanitize string
  //   const sanitizeString = (str: string) => {
  //     return str
  //       .replace(/^-\s*/gm, "") // Remove leading dashes and spaces
  //       .replace(/\n/g, " ") // Replace newlines with spaces
  //       .trim() // Remove leading/trailing whitespace
  //       .replace(/\s+/g, " ") // Replace multiple spaces with single space
  //   }

  //   // Initialize variables
  //   let chiefComplaint = ""
  //   let significantSign = ""

  //   // Process each section
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   message?.summary?.forEach((section: any) => {
  //     const content = section.editedBody || section.body

  //     // Append content based on section titles
  //     switch (section.title) {
  //       case "Chief Complaint":
  //       case "Chief Complaints":
  //       case "Chief Complaint & History Of Present Illness":
  //       case "Past Medical History":
  //       case "Past Surgical History":
  //       case "Treatment Plan or Medical Advices":
  //       case "History of Presentation":
  //         // Append content to chiefComplaint with a new line
  //         chiefComplaint += `${sanitizeString(content.join(" "))}\n`
  //         break

  //       case "Significant Sign":
  //       case "Significant Signs":
  //       case "Significant Sign & Symptoms":
  //       case "Physical Examination (Significant Signs)":
  //         // Append content to significantSign with a new line
  //         significantSign += `${sanitizeString(content.join(" "))}\n`
  //         break
  //     }
  //   })

  //   // Set state
  //   setChiefComplaint(chiefComplaint.trim())
  //   setSignificantSign(significantSign.trim())
  // }, [message])

  const handleReset = () => {
    resetSummaryData?.()
    localStorage.clear()
    window.location.reload()
  }

  const handleGoBack = () => {
    resetSummaryData?.()
    onReset()
  }
  const tabs = [
    { value: "health-summary", label: "Health Summary" },
    { value: "assessment", label: "Assessment" },
    { value: "or-form", label: "OR Form" },
    { value: "history", label: "Medical History" },
    { value: "vitals", label: "Vitals" },
    { value: "laboratory", label: "Laboratory" },
    { value: "diagnostic", label: "Diagnostic Result" }
  ]

  return (
    <div className="container mx-auto p-4">
      <PatientHeader
        patientName={patient.patient_name}
        patientId={patient.patient_id}
        visitId={patient.visit_id}
      />
      <div className="flex justify-between items-center ">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            handleGoBack()
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          Go Back
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-gray-400 hover:text-gray-600"
        >
          Reset
        </Button>
      </div>
      <div className="flex gap-6 mt-6">
        <main className="flex-1">
          <Tabs defaultValue="assessment" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="assessment" className="mt-6">
              <Card className="p-6">
                <VitalSignsForm
                  chiefComplaint={summaryData.chiefComplaint || ""}
                  significantSigns={summaryData.significantSigns || ""}
                />
              </Card>
            </TabsContent>

            <TabsContent value="health-summary" className="mt-6">
              <Card className="p-6">
                {icdData.diagnoses && icdData.medications && icdData.orders && (
                  <HealthSummary
                    diagnoses={icdData.diagnoses}
                    medications={icdData.medications}
                    orders={icdData.orders}
                  />
                )}
              </Card>
            </TabsContent>
            <TabsContent value="or-form" className="mt-6">
              <Card className="p-6">
                <ORForm summaryData={summaryData} />
              </Card>
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <Card className="p-6">
                <PatientHistory />
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <FloatingMicButton onClick={handleOpen} active={sidebarState.isOpen} />
      <IframeSidebar
        isOpen={sidebarState.isOpen}
        isMinimized={sidebarState.isMinimized}
        onMinimize={handleMinimize}
        onClose={handleClose}
        iframeUrl={iframeUrl}
      />
    </div>
  )
}
