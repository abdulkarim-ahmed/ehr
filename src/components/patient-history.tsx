// src/components/patient-history.tsx
import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { PlusCircle, History, FileEdit, CalendarClock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { initialConsultationsData } from "@/lib/mock-data" // Using new mock data
import type { Consultation } from "@/lib/types"
import { format, parseISO } from "date-fns"

export function PatientHistory() {
  const [consultations, setConsultations] = useState<Consultation[]>(
    initialConsultationsData
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [newConsultTitle, setNewConsultTitle] = useState("")
  const [newConsultDate, setNewConsultDate] = useState("") // Will store as YYYY-MM-DD for input
  const [newConsultSummary, setNewConsultSummary] = useState("")

  const handleSaveConsultation = () => {
    if (
      !newConsultTitle.trim() ||
      !newConsultDate ||
      !newConsultSummary.trim()
    ) {
      alert("Please fill in all fields: Title, Date, and Summary.")
      return
    }

    const newConsult: Consultation = {
      id: `consult-${Date.now()}`,
      title: newConsultTitle,
      date: new Date(newConsultDate + "T00:00:00").toISOString(), // Store as ISO string, assume start of day
      summary: newConsultSummary
    }

    setConsultations((prevConsultations) =>
      [newConsult, ...prevConsultations].sort(
        (a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()
      )
    )

    setNewConsultTitle("")
    setNewConsultDate("")
    setNewConsultSummary("")
    setIsDialogOpen(false)
  }

  return (
    <Card className="shadow-md border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold flex items-center">
            <History className="mr-2 h-5 w-5 text-primary" />
            Consultation History
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            Review past medical encounters and patient visits.
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[620px]">
            <DialogHeader>
              <DialogTitle className="flex items-center text-xl">
                <FileEdit className="mr-2 h-5 w-5 text-primary" />
                Add New Consultation Record
              </DialogTitle>
              <DialogDescription className="mt-1">
                Enter the details for the new consultation. Click 'Save Record'
                when done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="consult-title"
                  className="text-right font-medium"
                >
                  Title
                </Label>
                <Input
                  id="consult-title"
                  value={newConsultTitle}
                  onChange={(e) => setNewConsultTitle(e.target.value)}
                  className="col-span-3 h-10"
                  placeholder="e.g., Follow-up, Annual Checkup"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="consult-date"
                  className="text-right font-medium"
                >
                  Date
                </Label>
                <Input
                  id="consult-date"
                  type="date"
                  value={newConsultDate}
                  onChange={(e) => setNewConsultDate(e.target.value)}
                  className="col-span-3 h-10"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label
                  htmlFor="consult-summary"
                  className="text-right pt-2 font-medium"
                >
                  Summary
                </Label>
                <Textarea
                  id="consult-summary"
                  value={newConsultSummary}
                  onChange={(e) => setNewConsultSummary(e.target.value)}
                  className="col-span-3 min-h-[150px]"
                  placeholder="Detailed notes, findings, plan..."
                />
              </div>
            </div>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleSaveConsultation}>
                Save Record
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {consultations.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-2">
            {consultations.map((consult) => (
              <AccordionItem
                value={consult.id}
                key={consult.id}
                className="border border-border rounded-lg bg-background/70 hover:bg-muted/40 transition-colors"
              >
                <AccordionTrigger className="p-4 hover:no-underline text-left text-base">
                  <div className="flex w-full items-center justify-between">
                    <span className="font-medium text-primary/90 flex items-center">
                      <CalendarClock
                        size={18}
                        className="mr-2.5 text-muted-foreground"
                      />
                      {consult.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(parseISO(consult.date), "PPp")}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0">
                  <pre className="whitespace-pre-wrap font-sans text-sm p-4 bg-muted/50 rounded-md border border-border/50 text-foreground/90 leading-relaxed">
                    {consult.summary.trim()}
                  </pre>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <History size={48} className="mx-auto mb-3 opacity-40" />
            <p>No consultation history recorded yet.</p>
            <Button
              variant="link"
              size="sm"
              className="mt-2"
              onClick={() => setIsDialogOpen(true)}
            >
              Add first record
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
