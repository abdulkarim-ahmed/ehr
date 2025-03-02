/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { GlobalContext } from "@/context/GlobalContextWithType"
import { FloatingMicButton } from "./floating-mic-button"
import { PatientHeader } from "./patient-header"
import { VitalSignsForm } from "./vital-signs-form"
import { Button } from "./ui/button"
import { IframeSidebar } from "./minimizable-iframe"
import HealthSummary from "./health-summary"
import ORForm from "./ORForm"

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

  const { summaryData, icdData } = useContext(GlobalContext)

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
                value="or-form"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                OR Form
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
