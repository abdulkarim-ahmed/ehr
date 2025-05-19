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
import { PlusCircle } from "lucide-react"
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
import { initialConsultationsData, Consultation } from "@/lib/constants"

export function PatientHistory() {
  const [consultations, setConsultations] = useState<Consultation[]>(
    initialConsultationsData
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newConsultTitle, setNewConsultTitle] = useState("")
  const [newConsultDate, setNewConsultDate] = useState("")

  const [newConsultSummary, setNewConsultSummary] = useState("")

  const handleSaveConsultation = () => {
    if (!newConsultTitle || !newConsultDate || !newConsultSummary) {
      alert("Please fill in all fields.")
      return
    }

    const newConsult: Consultation = {
      id: `consult-${Date.now()}`,

      title: newConsultTitle,
      date: newConsultDate,
      summary: newConsultSummary
    }

    const updatedConsultations = [newConsult, ...consultations].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    setConsultations(updatedConsultations)

    setNewConsultTitle("")
    setNewConsultDate("")
    setNewConsultSummary("")
    setIsDialogOpen(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">
            Consultation History
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Past visits and encounters
          </CardDescription>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Consultation</DialogTitle>
              <DialogDescription>
                Enter the details for the new consultation record. Click save
                when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="consult-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="consult-title"
                  value={newConsultTitle}
                  onChange={(e) => setNewConsultTitle(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., Follow-up Visit"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="consult-date" className="text-right">
                  Date
                </Label>

                <Input
                  id="consult-date"
                  type="date"
                  value={newConsultDate}
                  onChange={(e) => setNewConsultDate(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="consult-summary"
                  className="text-right pt-2 self-start"
                >
                  Summary
                </Label>
                <Textarea
                  id="consult-summary"
                  value={newConsultSummary}
                  onChange={(e) => setNewConsultSummary(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter consultation summary details..."
                  rows={6}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="button" onClick={handleSaveConsultation}>
                Save Consultation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {consultations.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {consultations.map((consult) => (
              <AccordionItem value={consult.id} key={consult.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex w-full items-center justify-between pr-4">
                    <span className="font-medium text-left">
                      {consult.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {consult.date}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <pre className="whitespace-pre-wrap font-mono text-sm p-4 bg-muted rounded-md">
                    {consult.summary.trim()}
                  </pre>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-muted-foreground py-4">
            No consultation history found.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
