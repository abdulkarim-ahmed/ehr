// src/components/health-summary.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Diagnoses, Medication, Order } from "@/types/ICDAutomation" // Ensure correct path
import { Button } from "./ui/button" // Ensure this is your Shadcn Button
import { exportUcafForm } from "./generate-pdf" // Ensure correct path
import { Stethoscope, Pill, ClipboardCheck, FileDown, Info } from "lucide-react" // Icons

type HealthSummaryProps = {
  diagnoses?: Diagnoses
  medications?: Medication[]
  orders?: Order[]
}

const SectionWrapper: React.FC<{
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  isEmpty?: boolean
  emptyText?: string
}> = ({
  title,
  icon,
  children,
  isEmpty,
  emptyText = "No data available for this section."
}) => (
  <Card className="shadow-sm border transition-all hover:shadow-md">
    <CardHeader className="pb-3 pt-4 px-4 sm:px-5">
      <CardTitle className="flex items-center text-md sm:text-lg font-semibold text-primary">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="px-4 sm:px-5 pb-4">
      {isEmpty ? (
        <div className="flex items-center justify-center text-sm text-muted-foreground py-6">
          <Info size={18} className="mr-2 opacity-70" /> {emptyText}
        </div>
      ) : (
        children
      )}
    </CardContent>
  </Card>
)

const HealthSummary = ({
  diagnoses,
  medications,
  orders
}: HealthSummaryProps) => {
  const hasAnyData =
    diagnoses ||
    (medications && medications.length > 0) ||
    (orders && orders.length > 0)

  if (!hasAnyData) {
    return (
      <div className="p-[var(--card-padding)] text-center text-muted-foreground flex flex-col items-center justify-center h-full">
        <Info size={32} className="mb-3 opacity-50" />
        <p className="text-lg">No ICD Summary Data Available</p>
        <p className="text-sm">
          Information for diagnoses, medications, and orders from this context
          will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-[var(--spacing-md)] p-[var(--spacing-xs)] sm:p-[var(--spacing-sm)]">
      {/* Diagnoses Section */}
      <SectionWrapper
        title="Clinical Diagnoses "
        icon={<Stethoscope className="mr-2.5 h-5 w-5" />}
        isEmpty={
          !diagnoses ||
          (!diagnoses.principal &&
            (!diagnoses.additionalDiagnosis ||
              diagnoses.additionalDiagnosis.length === 0))
        }
      >
        {diagnoses?.principal && (
          <div className="mb-3 last:mb-0">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Principal Diagnosis:
            </p>
            <div className="flex items-center space-x-2 p-2.5 bg-muted/40 rounded-md border border-border/70">
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                {diagnoses.principal.code}
              </Badge>
              <span className="text-sm text-foreground/90">
                {diagnoses.principal.description}
              </span>
            </div>
          </div>
        )}
        {diagnoses?.additionalDiagnosis &&
          diagnoses.additionalDiagnosis.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Additional Diagnoses:
              </p>
              <ul className="space-y-1.5">
                {diagnoses.additionalDiagnosis.map((diagnosis) => (
                  <li
                    key={diagnosis.code}
                    className="flex items-center space-x-2 p-2.5 bg-muted/40 rounded-md border border-border/70"
                  >
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      {diagnosis.code}
                    </Badge>
                    <span className="text-sm text-foreground/90">
                      {diagnosis.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </SectionWrapper>

      <SectionWrapper
        title="Medications  "
        icon={<Pill className="mr-2.5 h-5 w-5" />}
        isEmpty={!medications || medications.length === 0}
      >
        <div className="space-y-3">
          {medications?.map((med) => (
            <div
              key={med.code}
              className="p-3 border border-border/70 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    {med.code}
                  </Badge>
                  <span className="font-semibold text-sm text-foreground/90">
                    {med.name}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {med.method && (
                  <div>
                    <span className="font-medium text-foreground/70">
                      Method:
                    </span>{" "}
                    {med.method}
                  </div>
                )}
                {med.quantity && (
                  <div>
                    <span className="font-medium text-foreground/70">Qty:</span>{" "}
                    {med.quantity}
                  </div>
                )}
                {med.dosage && (
                  <div>
                    <span className="font-medium text-foreground/70">
                      Dosage:
                    </span>{" "}
                    {med.dosage}
                  </div>
                )}
                {med.frequency && (
                  <div>
                    <span className="font-medium text-foreground/70">
                      Freq:
                    </span>{" "}
                    {med.frequency}
                  </div>
                )}
                {med.duration && (
                  <div>
                    <span className="font-medium text-foreground/70">
                      Duration:
                    </span>{" "}
                    {med.duration}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Orders Section */}
      <SectionWrapper
        title="Orders & Procedures "
        icon={<ClipboardCheck className="mr-2.5 h-5 w-5" />}
        isEmpty={!orders || orders.length === 0}
      >
        <ul className="space-y-1.5">
          {orders?.map((order) => (
            <li
              key={order.code}
              className="flex items-center justify-between p-2.5 bg-muted/40 rounded-md border border-border/70 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  {order.code}
                </Badge>
                <span className="text-sm text-foreground/90">{order.name}</span>
              </div>
              {/* Add more order details if available, e.g., status, date */}
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* Export Button - Only show if there's relevant data to export */}
      {(diagnoses ||
        (medications && medications.length > 0) ||
        (orders && orders.length > 0)) && (
        <div className="pt-[var(--spacing-sm)]">
          <Button
            type="button" // Not in a form
            size="lg"
            className="w-full animate-scaleUp"
            style={{ animationDelay: "300ms" }} // Subtle entry animation
            onClick={() => {
              const diagnosesCodes = {
                principalCode: diagnoses?.principal?.code,
                secondCode: diagnoses?.additionalDiagnosis?.[0]?.code || "",
                thirdCode: diagnoses?.additionalDiagnosis?.[1]?.code || "",
                fourthCode: diagnoses?.additionalDiagnosis?.[2]?.code || ""
              }
              // Ensure medications and orders are arrays before splicing
              // Use a non-mutating way to get first 3 items if needed
              const medsToExport = medications ? medications.slice(0, 3) : []
              const ordersToExport = orders ? orders.slice(0, 3) : []

              exportUcafForm({
                diagnosesCodes,
                orders: ordersToExport,
                medications: medsToExport
              })
            }}
          >
            <FileDown className="mr-2 h-5 w-5" />
            Export to UCAF 2.0
          </Button>
        </div>
      )}
    </div>
  )
}

export default HealthSummary
