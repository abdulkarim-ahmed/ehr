import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Diagnoses, Medication, Order } from "@/types/ICDAutomation"

type HealthSummaryProps = {
  diagnoses: Diagnoses
  medications: Medication[]
  orders: Order[]
}
const HealthSummary = ({
  diagnoses,
  medications,
  orders
}: HealthSummaryProps) => {
  return (
    <div className="space-y-6 p-4 ">
      <Card>
        <CardHeader>
          <CardTitle>Diagnosis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">Principal Diagnosis:</div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{diagnoses.principal.code}</Badge>
              <span>{diagnoses.principal.description}</span>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Additional Diagnosis:</div>
            <div className="space-y-2">
              {diagnoses.additionalDiagnosis.map((diagnosis) => (
                <div
                  key={diagnosis.code}
                  className="flex items-center space-x-2"
                >
                  <Badge variant="outline">{diagnosis.code}</Badge>
                  <span>{diagnosis.description}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medication</CardTitle>
        </CardHeader>
        <CardContent>
          {medications.map((med) => (
            <div key={med.code} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{med.code}</Badge>
                  <span>{med.name}</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 text-sm">
                <div>{med.method}</div>
                <div>{med.quantity}</div>
                <div>{med.dosage}</div>
                <div>{med.frequency}</div>
                <div>{med.duration}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {orders.map((order) => (
            <div key={order.code} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{order.code}</Badge>
                <span>{order.name}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default HealthSummary
