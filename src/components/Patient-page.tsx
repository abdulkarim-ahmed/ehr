// src/components/Patient-page.tsx
import { useState, useContext, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card" // Keep for other tabs if needed
import { GlobalContext } from "@/context/GlobalContextWithType"
import { FloatingMicButton } from "./floating-mic-button"
import { PatientHeader } from "./patient-header"
import { VitalSignsForm } from "./vital-signs-form"
import { Button } from "./ui/button"
import { IframeSidebar } from "./minimizable-iframe"
import HealthSummary from "./health-summary"
import ORForm from "./ORForm"
import { PatientHistory } from "./patient-history"

import {
  mockAllergiesData,
  mockAppointmentsData,
  mockPrescriptionsData
} from "@/lib/mock-data"
import { AllergiesSection } from "./AllergiesSection" // Full section for its own tab

// Import Widgets
// Add more widget imports: VitalsWidget, ActiveMedicationsWidget, ProblemListWidget etc.

import {
  ArrowLeft,
  RotateCcw,
  LayoutGrid,
  Stethoscope,
  Pill,
  CalendarDays,
  ClipboardList,
  Activity,
  FileText,
  Microscope,
  AlertTriangle,
  Info
} from "lucide-react" // Changed Users to LayoutGrid for Overview
import type { CurrentPatientContext } from "@/lib/types"
import { PrescriptionsSection } from "./PrescriptionSection"
import { AppointmentsSection } from "./AppointmentSection"
import { AllergiesWidget } from "./AllergiesWidget"
import { UpcomingAppointmentsWidget } from "./UpcomingAppointmentsWidget"

interface PatientPageProps {
  token: string
  iframeUrl: string
  theme: string
  CTA: string
  patient: CurrentPatientContext
  onReset: () => void
}

export default function PatientPage({
  token,
  iframeUrl: baseUrl,
  theme: iframeThemeName,
  CTA,
  patient,
  onReset
}: PatientPageProps) {
  const iframeUrl = useMemo(() => {
    return `${baseUrl}${token}&theme=${iframeThemeName}&patient_id=${
      patient.patient_id
    }&visit_id=${patient.visit_id}${CTA ? `&cta=${CTA}` : ""}`
  }, [
    baseUrl,
    token,
    iframeThemeName,
    patient.patient_id,
    patient.visit_id,
    CTA
  ])

  const { summaryData, icdData, resetSummaryData } = useContext(GlobalContext)
  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    isMinimized: false
  })

  const currentPatientAllergies = useMemo(
    () => mockAllergiesData,
    [patient.patient_id]
  )
  const currentPatientAppointments = useMemo(
    () => mockAppointmentsData,
    [patient.patient_id]
  )
  const currentPatientPrescriptions = useMemo(
    () => mockPrescriptionsData,
    [patient.patient_id]
  )

  const handleOpenSidebar = () =>
    setSidebarState({ isOpen: true, isMinimized: false })
  const handleCloseSidebar = () =>
    setSidebarState({ isOpen: false, isMinimized: false })
  const handleMinimizeSidebar = (minimized: boolean) =>
    setSidebarState((prev) => ({ ...prev, isMinimized: minimized }))
  const handleResetApp = () => {
    resetSummaryData?.()
    localStorage.removeItem("bearerToken")
    localStorage.removeItem("env")
    localStorage.removeItem("iframeTheme")
    window.location.reload()
  }
  const handleGoBackToDashboard = () => {
    resetSummaryData?.()
    onReset()
  }

  const [activeTab, setActiveTab] = useState("overview") // Default to overview

  // Define the Patient Overview Dashboard Content
  const PatientOverviewDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-md)] md:gap-[var(--spacing-lg)]">
      {/* Widget Column 1 */}
      <div className="space-y-[var(--spacing-md)] md:space-y-[var(--spacing-lg)]">
        <AllergiesWidget
          allergies={currentPatientAllergies}
          onViewAll={() => setActiveTab("allergies")}
        />
        {/* Placeholder for ProblemListWidget */}
        {/* <Card className="shadow-md border h-48"><CardHeader><CardTitle>Problem List</CardTitle></CardHeader><CardContent>...</CardContent></Card> */}
      </div>
      {/* Widget Column 2 */}
      <div className="space-y-[var(--spacing-md)] md:space-y-[var(--spacing-lg)]">
        <UpcomingAppointmentsWidget
          appointments={currentPatientAppointments}
          onViewAll={() => setActiveTab("appointments")}
        />
        {/* Placeholder for RecentVitalsWidget */}
        {/* <Card className="shadow-md border h-48"><CardHeader><CardTitle>Recent Vitals</CardTitle></CardHeader><CardContent>...</CardContent></Card> */}
      </div>
      {/* Widget Column 3 (optional, or for wider screens) */}
      <div className="space-y-[var(--spacing-md)] md:space-y-[var(--spacing-lg)] md:col-span-2 lg:col-span-1">
        {/* Placeholder for ActiveMedicationsWidget or NotesWidget */}
        {/* <Card className="shadow-md border h-48"><CardHeader><CardTitle>Active Meds</CardTitle></CardHeader><CardContent>...</CardContent></Card> */}
      </div>
    </div>
  )

  const TABS_CONFIG = [
    {
      value: "overview",
      label: "Overview",
      icon: <LayoutGrid className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
      content: <PatientOverviewDashboard />
    },
    {
      value: "assessment",
      label: "SOAP/Assessment",
      icon: <Stethoscope className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
      content: (
        <Card className="shadow-md border">
          <CardContent className="p-[var(--card-padding)]">
            <VitalSignsForm
              chiefComplaint={summaryData.chiefComplaint || ""}
              significantSigns={summaryData.significantSigns || ""}
            />
          </CardContent>
        </Card>
      )
    },
    {
      value: "medications",
      label: "eRx",
      icon: <Pill className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
      content: (
        <PrescriptionsSection prescriptions={currentPatientPrescriptions} />
      )
    }, // Assumes PrescriptionsSection is already a Card
    {
      value: "appointments",
      label: "Appointments",
      icon: <CalendarDays className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
      content: <AppointmentsSection appointments={currentPatientAppointments} />
    }, // Assumes AppointmentsSection is already a Card
    {
      value: "allergies",
      label: "Allergies (Full)",
      icon: <AlertTriangle className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
      content: <AllergiesSection allergies={currentPatientAllergies} />
    }, // New dedicated tab for full allergies
    {
      value: "consult-history",
      label: "Consult History",
      icon: <ClipboardList className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
      content: <PatientHistory />
    }, // Assumes PatientHistory is already a Card
    {
      value: "health-summary-icd",
      label: "ICD Summary",
      icon: <Activity className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
      content: (
        // No need to wrap HealthSummary in another Card, it's self-contained with SectionWrapper.
        // The padding is handled by HealthSummary's main div or the CardContent of its parent Tab.
        // For consistency with other tab contents, the outer Card with p-0 on CardContent is fine.
        <Card className="shadow-md border">
          <CardContent className="p-0">
            {" "}
            {/* Let HealthSummary control its internal padding */}
            {icdData.diagnoses || icdData.medications || icdData.orders ? (
              <HealthSummary
                diagnoses={icdData.diagnoses}
                medications={icdData.medications}
                orders={icdData.orders}
              />
            ) : (
              <div className="p-[var(--card-padding)] text-center text-muted-foreground flex flex-col items-center justify-center h-full min-h-[200px]">
                <Info size={32} className="mb-3 opacity-50" />
                <p className="text-lg">No ICD Summary Data Available</p>
              </div>
            )}
          </CardContent>
        </Card>
      )
    },
    {
      value: "or-form",
      label: "OR Form",
      icon: <FileText className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
      content: (
        <Card className="shadow-md border">
          <CardContent className="p-[var(--card-padding)]">
            <ORForm summaryData={summaryData} />
          </CardContent>
        </Card>
      )
    },
    {
      value: "lab-results",
      label: "Labs",
      icon: <Microscope className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
      content: (
        <Card className="shadow-md border">
          <CardContent className="p-[var(--card-padding)]">
            Lab Results (Coming Soon)
          </CardContent>
        </Card>
      )
    }
  ]

  return (
    <div className="flex-1 flex flex-col bg-muted/20 p-[var(--content-padding)]">
      <div className="container mx-auto flex-1 flex flex-col">
        <PatientHeader
          patientName={patient.patient_name}
          patientId={patient.patient_id}
          visitId={patient.visit_id}
        />
        <div className="flex flex-col sm:flex-row justify-between items-center mb-[var(--spacing-lg)] gap-[var(--spacing-sm)]">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGoBackToDashboard}
            className="transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetApp}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Full Reset (Dev)
          </Button>
        </div>

        <main className="flex-1">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="overflow-x-auto pb-px no-scrollbar">
              {" "}
              {/* Added no-scrollbar for cleaner look if desired */}
              <TabsList className="flex w-max sm:w-full border-b rounded-none h-auto p-0 bg-transparent mb-[var(--spacing-lg)] gap-0.5 sm:gap-1">
                {TABS_CONFIG.map((tabInfo) => (
                  <TabsTrigger
                    key={tabInfo.value}
                    value={tabInfo.value}
                    className="flex-shrink-0 md:flex-initial px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium rounded-t-md border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-card hover:bg-muted/50 data-[state=active]:shadow-sm transition-all whitespace-nowrap group"
                  >
                    <span className="transition-transform duration-200 ease-out group-hover:scale-110 group-data-[state=active]:scale-100">
                      {tabInfo.icon}
                    </span>
                    {tabInfo.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {TABS_CONFIG.map((tabInfo) => (
              <TabsContent
                key={tabInfo.value}
                value={tabInfo.value}
                className="mt-0 animate-fadeIn"
              >
                {" "}
                {/* Added fadeIn animation */}
                {tabInfo.content}
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
      <FloatingMicButton
        onClick={handleOpenSidebar}
        active={sidebarState.isOpen}
      />
      <IframeSidebar
        isOpen={sidebarState.isOpen}
        isMinimized={sidebarState.isMinimized}
        onMinimize={handleMinimizeSidebar}
        onClose={handleCloseSidebar}
        iframeUrl={iframeUrl}
      />
    </div>
  )
}
