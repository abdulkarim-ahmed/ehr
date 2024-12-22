import { Card, CardContent } from "@/components/ui/card"
import { User2 } from 'lucide-react'

export function PatientHeader() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <User2 className="h-8 w-8 text-muted-foreground" />
          <div>
            <h1 className="text-xl font-semibold">Patient Page</h1>
          </div>
        </div>
        <div className="text-right">
          <h2 className="font-semibold">File Number: 3848261</h2>
          <p className="text-sm text-muted-foreground">Age: 38</p>
        </div>
      </CardContent>
    </Card>
  )
}

