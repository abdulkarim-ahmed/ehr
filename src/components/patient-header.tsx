import { Card, CardContent } from "@/components/ui/card"
import { User2 } from "lucide-react"

export function PatientHeader({
  patientName,
  patientId,
  visitId
}: {
  patientName: string
  patientId: string
  visitId: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <User2 className="h-8 w-8 text-muted-foreground" />
          <div>
            <h1 className="text-xl font-semibold">
              Patient Name: {patientName}
            </h1>
          </div>
        </div>
        <div className="text-right">
          <h2 className="font-semibold">Patient Id: {patientId}</h2>
          <p className="text-sm text-muted-foreground">Visit Id: {visitId}</p>
        </div>
      </CardContent>
    </Card>
  )
}
