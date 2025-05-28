// src/components/widgets/UpcomingAppointmentsWidget.tsx
import { PatientAppointment } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, parseISO, isFuture } from "date-fns"

interface UpcomingAppointmentsWidgetProps {
  appointments: PatientAppointment[]
  onViewAll?: () => void // To switch to the full Appointments tab
  maxItems?: number
}

export function UpcomingAppointmentsWidget({
  appointments,
  onViewAll,
  maxItems = 2
}: UpcomingAppointmentsWidgetProps) {
  const upcoming = appointments
    .filter(
      (a) =>
        isFuture(parseISO(a.dateTime)) &&
        (a.status === "Scheduled" || a.status === "Confirmed")
    )
    .sort(
      (a, b) => parseISO(a.dateTime).getTime() - parseISO(b.dateTime).getTime()
    )
    .slice(0, maxItems)

  return (
    <Card className="shadow-md border h-full flex flex-col transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center">
            <CalendarDays className="mr-2 h-5 w-5 text-primary" />
            Upcoming
          </CardTitle>
          {onViewAll &&
            appointments.filter((a) => isFuture(parseISO(a.dateTime))).length >
              maxItems && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onViewAll}
                className="text-xs"
              >
                <Eye className="mr-1 h-3 w-3" /> View All
              </Button>
            )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-0">
        {upcoming.length > 0 ? (
          <ul className="space-y-2.5">
            {upcoming.map((appt) => (
              <li
                key={appt.id}
                className="p-2.5 rounded-md bg-muted/50 border border-transparent hover:border-primary/20 transition-colors"
              >
                <div className="font-medium text-sm text-foreground/90">
                  {appt.type}
                </div>
                <div className="text-xs text-muted-foreground">
                  {format(parseISO(appt.dateTime), "EEE, MMM d, yyyy @ p")}
                </div>
                <div className="text-xs text-muted-foreground">
                  with {appt.provider}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No upcoming appointments.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
