import { useState, useContext, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { GlobalContext } from "@/context/GlobalContextWithType"
import { Sidebar } from "lucide-react"
import { FloatingMicButton } from "./floating-mic-button"
import { PatientHeader } from "./patient-header"
import { SidebarWithIframe } from "./sidebar-with-iframe"
import { VitalSignsForm } from "./vital-signs-form"
import { Button } from "./ui/button"


export default function PatientPage({
    token
}: {
    token: string
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [chiefComplaint, setChiefComplaint] = useState("")
  const [significantSign, setSignificantSign] = useState("")
  
  const { message } = useContext(GlobalContext);




  useEffect(()=>{
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
            chiefComplaint = sanitizeString(content.join(" "))
            break
          case "Significant Sign":
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
      <Button
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          className="text-gray-400 hover:text-gray-600"
        >
          Reset
        </Button>
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
                <VitalSignsForm chiefComplaint={chiefComplaint || ""} significantSigns={significantSign || ""}  />
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <FloatingMicButton onClick={handleMicClick} />
      <SidebarWithIframe isOpen={isSidebarOpen} onClose={handleSidebarClose} token={token}/>
    </div>
  )
}

