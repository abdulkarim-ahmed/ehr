import { useState, useContext } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { GlobalContext } from "./context/GlobalContextWithType"

import { PatientHeader } from "./components/patient-header"
import { Sidebar } from "./components/sidebar"
import { VitalSignsForm } from "./components/vital-signs-form"
import { FloatingMicButton } from "./components/floating-mic-button"
import { SidebarWithIframe } from "./components/sidebar-with-iframe"

export default function PatientPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { message } = useContext(GlobalContext);

  const handleMicClick = () => {
    setIsSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  console.log(message)

  return (
    <div className="container mx-auto p-4">
      <PatientHeader />
      <div className="flex gap-6 mt-6">
        <Sidebar />
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
                <VitalSignsForm chiefComplaint={message?.chiefComplaints || ""} significantSigns={message?.significantSigns || ""}  />
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <FloatingMicButton onClick={handleMicClick} />
      <SidebarWithIframe isOpen={isSidebarOpen} onClose={handleSidebarClose} />
    </div>
  )
}

