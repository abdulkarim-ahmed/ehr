import { Button } from "@/components/ui/button"
import { ScrollText, AlertCircle, List, Clock, Stethoscope, LineChart, FileSpreadsheet, Activity } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="w-64 space-y-2">
      <div className="font-semibold text-lg mb-4">Subjective</div>
      <nav className="space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <AlertCircle className="h-4 w-4" />
          Chief Complaint
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <List className="h-4 w-4" />
          Allergies
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <ScrollText className="h-4 w-4" />
          Problem List
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Clock className="h-4 w-4" />
          History
        </Button>
      </nav>
      <div className="font-semibold text-lg mb-4 mt-6">Objective</div>
      <nav className="space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Activity className="h-4 w-4" />
          Vital Signs
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Stethoscope className="h-4 w-4" />
          Physical Examination
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LineChart className="h-4 w-4" />
          Growth Chart
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Assessment
        </Button>
      </nav>
    </aside>
  )
}

