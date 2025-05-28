// src/components/AppointmentsSection.tsx
import { PatientAppointment } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CalendarDays,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Edit3,
  MoreHorizontal
} from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { format, parseISO, isFuture, isPast } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface AppointmentsSectionProps {
  appointments: PatientAppointment[]
  onScheduleAppointment?: () => void
  onEditAppointment?: (appointmentId: string) => void
  onCancelAppointment?: (appointmentId: string) => void
}

const getStatusBadgeVariant = (
  status: PatientAppointment["status"]
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Scheduled":
    case "Confirmed":
      return "default" // Consider a blue variant for themes
    case "Completed":
      return "secondary" // Consider a green variant for themes
    case "Cancelled":
      return "destructive"
    case "No Show":
      return "destructive" // Consider an orange variant
    case "Rescheduled":
      return "outline"
    default:
      return "outline"
  }
}

const getStatusIcon = (status: PatientAppointment["status"]) => {
  switch (status) {
    case "Completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "Cancelled":
    case "No Show":
      return <XCircle className="h-4 w-4 text-destructive" />
    case "Scheduled":
    case "Confirmed":
    case "Rescheduled":
      return <Clock className="h-4 w-4 text-blue-500" /> // Using primary theme color implicitly
    default:
      return null
  }
}

export function AppointmentsSection({
  appointments,
  onScheduleAppointment,
  onEditAppointment,
  onCancelAppointment
}: AppointmentsSectionProps) {
  const upcomingAppointments = appointments
    .filter(
      (a) =>
        isFuture(parseISO(a.dateTime)) &&
        (a.status === "Scheduled" ||
          a.status === "Confirmed" ||
          a.status === "Rescheduled")
    )
    .sort(
      (a, b) => parseISO(a.dateTime).getTime() - parseISO(b.dateTime).getTime()
    )

  const pastAppointments = appointments
    .filter(
      (a) =>
        isPast(parseISO(a.dateTime)) ||
        a.status === "Completed" ||
        a.status === "Cancelled" ||
        a.status === "No Show"
    )
    .sort(
      (a, b) => parseISO(b.dateTime).getTime() - parseISO(a.dateTime).getTime()
    )

  const renderAppointmentTable = (
    appts: PatientAppointment[],
    title: string
  ) => (
    <Card className="shadow-md border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="flex items-center text-lg font-semibold">
            <CalendarDays className="mr-2 h-5 w-5 text-primary" /> {title}
          </CardTitle>
        </div>
        {title.includes("Upcoming") && onScheduleAppointment && (
          <Button variant="outline" size="sm" onClick={onScheduleAppointment}>
            <PlusCircle className="mr-2 h-4 w-4" /> Schedule New
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {appts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appts.map((appt) => (
                <TableRow
                  key={appt.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div>{format(parseISO(appt.dateTime), "PP")}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(parseISO(appt.dateTime), "p")}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{appt.type}</TableCell>
                  <TableCell>{appt.provider}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(appt.status)}
                      className="capitalize flex items-center gap-1.5"
                    >
                      {getStatusIcon(appt.status)} {appt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onEditAppointment &&
                          (appt.status === "Scheduled" ||
                            appt.status === "Confirmed") && (
                            <DropdownMenuItem
                              onClick={() => onEditAppointment(appt.id)}
                            >
                              <Edit3 className="mr-2 h-4 w-4" />
                              Edit/Reschedule
                            </DropdownMenuItem>
                          )}
                        {onCancelAppointment &&
                          (appt.status === "Scheduled" ||
                            appt.status === "Confirmed") && (
                            <DropdownMenuItem
                              onClick={() => onCancelAppointment(appt.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel
                            </DropdownMenuItem>
                          )}
                        {/* Add View Details option */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground py-4 text-center">
            No {title.toLowerCase().includes("upcoming") ? "upcoming" : "past"}{" "}
            appointments.
          </p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {renderAppointmentTable(upcomingAppointments, "Upcoming Appointments")}
      {renderAppointmentTable(pastAppointments, "Past Appointments")}
    </div>
  )
}
