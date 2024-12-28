import { useState, useContext, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { GlobalContext } from "@/context/GlobalContextWithType"
import { FloatingMicButton } from "./floating-mic-button"
import { PatientHeader } from "./patient-header"
import { VitalSignsForm } from "./vital-signs-form"
import { Button } from "./ui/button"
import { IframeSidebar } from "./minimizable-iframe"

export default function PatientPage({
  token,
  env
}: {
  token: string
  env: string
}) {
  const iframeUrl = `${
    env === "prod"
      ? import.meta.env.VITE_IFRAME_URL
      : import.meta.env.VITE_IFRAME_DEV_URL
  }${token}`

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

  const { message } = useContext(GlobalContext)

  useEffect(() => {
    // Initialize variables
    let chiefComplaint = ""
    let significantSign = ""

    // Helper function to clean and sanitize string
    const sanitizeString = (str: string) => {
      return str
        .replace(/^-\s*/gm, "") // Remove leading dashes and spaces
        .replace(/\n/g, " ") // Replace newlines with spaces
        .trim() // Remove leading/trailing whitespace
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
    }

    // Process each section
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message?.summary?.forEach((section: any) => {
      const content = section.editedBody || section.body

      switch (section.title) {
        case "Chief Complaint":
        case "Chief Complaints":
        case "Chief Complaint & History Of Present Illness":
          chiefComplaint = sanitizeString(content.join(" "))
          break
        case "Significant Sign":
        case "Significant Signs":
        case "Significant Sign & Symptoms":
        case "Physical Examination (Significant Signs)":
          significantSign = sanitizeString(content.join(" "))
          break
      }
    })

    // Set state
    setChiefComplaint(chiefComplaint)
    setSignificantSign(significantSign)
  }, [message])

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
