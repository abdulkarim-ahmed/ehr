// src/components/PrescriptionsSection.tsx
import { Prescription } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pill,
  PlusCircle,
  FileText,
  Edit3,
  Repeat,
  MoreHorizontal,
  Printer
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
import { format, parseISO } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface PrescriptionsSectionProps {
  prescriptions: Prescription[]
  onAddPrescription?: () => void
  onEditPrescription?: (prescriptionId: string) => void
  onRenewPrescription?: (prescriptionId: string) => void
}

const getPrescriptionStatusBadgeVariant = (
  status: Prescription["status"]
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Active":
      return "default" // Use theme's primary or a specific green
    case "Pending Pharmacy":
    case "Filled":
      return "secondary" // Use theme's secondary or a specific yellow/blue
    case "Discontinued":
    case "Expired":
      return "destructive"
    case "Inactive":
      return "outline"
    default:
      return "outline"
  }
}

export function PrescriptionsSection({
  prescriptions,
  onAddPrescription,
  onEditPrescription,
  onRenewPrescription
}: PrescriptionsSectionProps) {
  const activePrescriptions = prescriptions.filter(
    (p) =>
      p.status === "Active" ||
      p.status === "Pending Pharmacy" ||
      p.status === "Filled"
  )
  const pastPrescriptions = prescriptions.filter(
    (p) => !activePrescriptions.find((ap) => ap.id === p.id)
  )

  const renderPrescriptionTable = (
    rxList: Prescription[],
    title: string,
    isHistory: boolean = false
  ) => (
    <Card className={`shadow-md border ${isHistory ? "opacity-90" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="flex items-center text-lg font-semibold">
            {isHistory ? (
              <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
            ) : (
              <Pill className="mr-2 h-5 w-5 text-primary" />
            )}
            {title}
          </CardTitle>
        </div>
        {!isHistory && onAddPrescription && (
          <Button variant="outline" size="sm" onClick={onAddPrescription}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Prescription (eRx)
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {rxList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Instructions</TableHead>
                <TableHead>Prescribed</TableHead>
                <TableHead>Refills</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rxList.map((rx) => (
                <TableRow
                  key={rx.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div>{rx.medicationName}</div>
                    <div className="text-xs text-muted-foreground">
                      {rx.strength} {rx.dosageForm}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm max-w-xs truncate">
                    {rx.instructions}
                  </TableCell>
                  <TableCell>
                    {format(parseISO(rx.datePrescribed), "PP")}
                  </TableCell>
                  <TableCell>{rx.refills}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getPrescriptionStatusBadgeVariant(rx.status)}
                      className="capitalize"
                    >
                      {rx.status}
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
                        {onEditPrescription && rx.status === "Active" && (
                          <DropdownMenuItem
                            onClick={() => onEditPrescription(rx.id)}
                          >
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit/Discontinue
                          </DropdownMenuItem>
                        )}
                        {onRenewPrescription &&
                          rx.refills === 0 &&
                          rx.status === "Active" && (
                            <DropdownMenuItem
                              onClick={() => onRenewPrescription(rx.id)}
                            >
                              <Repeat className="mr-2 h-4 w-4" />
                              Request Renewal
                            </DropdownMenuItem>
                          )}
                        <DropdownMenuItem>
                          <Printer className="mr-2 h-4 w-4" />
                          Print
                        </DropdownMenuItem>
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
            No {isHistory ? "past" : "active"} prescriptions.
          </p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {renderPrescriptionTable(activePrescriptions, "Active Medications")}
      {pastPrescriptions.length > 0 &&
        renderPrescriptionTable(pastPrescriptions, "Medication History", true)}
    </div>
  )
}
