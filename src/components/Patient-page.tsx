/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { GlobalContext } from "@/context/GlobalContextWithType"
import { FloatingMicButton } from "./floating-mic-button"
import { PatientHeader } from "./patient-header"
import { VitalSignsForm } from "./vital-signs-form"
import { Button } from "./ui/button"
import { IframeSidebar } from "./minimizable-iframe"
import HealthSummary from "./health-summary"
import { sanitizeString } from "@/lib/utils"

export default function PatientPage({
  token,
  env,
  theme
}: {
  token: string
  env: string
  theme: string
}) {
  const iframeUrl = `${
    env === "prod"
      ? import.meta.env.VITE_IFRAME_URL
      : import.meta.env.VITE_IFRAME_DEV_URL
  }${token}&theme=${theme}`

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

  const [chiefComplaint, setChiefComplaint] = useState("")
  const [significantSign, setSignificantSign] = useState("")

  const [diagnoses, setDiagnoses] = useState(null)
  const [medications, setMedications] = useState([])
  const [orders, setOrders] = useState([])

  const { message } = useContext(GlobalContext)

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleSummary = useCallback((message: any) => {
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
      significantSign: significantSign.trim()
    }
  }, [])

  useEffect(() => {
    if (!message?.type) {
      const { chiefComplaint, significantSign } = handleSummary(message)

      // Set state
      setChiefComplaint(chiefComplaint.trim())
      setSignificantSign(significantSign.trim())
    } else if (message.type === "icd-automation") {
      setDiagnoses(message.data.diagnoses)
      setMedications(message.data.medications)
      setOrders(message.data.orders)
    }
  }, [message, handleSummary])

  const handleReset = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="container mx-auto p-4">
      <PatientHeader />
      <Button
        variant="ghost"
        size="sm"
        onClick={handleReset}
        className="text-gray-400 hover:text-gray-600"
      >
        Reset
      </Button>
      <div className="flex gap-6 mt-6">
        <main className="flex-1">
          <Tabs defaultValue="assessment" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="health-summary"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Health Summary
              </TabsTrigger>
              <TabsTrigger
                value="assessment"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Assessment
              </TabsTrigger>
              <TabsTrigger
                value="medical-file"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Medical File
              </TabsTrigger>
              <TabsTrigger
                value="vitals"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Vitals
              </TabsTrigger>
              <TabsTrigger
                value="laboratory"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Laboratory
              </TabsTrigger>
              <TabsTrigger
                value="diagnostic"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Diagnostic Result
              </TabsTrigger>
            </TabsList>
            <TabsContent value="assessment" className="mt-6">
              <Card className="p-6">
                <VitalSignsForm
                  chiefComplaint={chiefComplaint || ""}
                  significantSigns={significantSign || ""}
                />
              </Card>
            </TabsContent>

            <TabsContent value="health-summary" className="mt-6">
              <Card className="p-6">
                {diagnoses && medications && orders && (
                  <HealthSummary
                    diagnoses={diagnoses}
                    medications={medications}
                    orders={orders}
                  />
                )}
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
