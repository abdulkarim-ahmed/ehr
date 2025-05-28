// src/components/patients-dashboard.tsx
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { mockPatientsList } from "@/lib/mock-data" // Using new mock data
import type { Patient, CurrentPatientContext } from "@/lib/types" // Import Patient type
import {
  Users,
  Search,
  Eye,
  UserPlus,
  ArrowUpDown,
  EllipsisVertical
} from "lucide-react"
import { useState, useMemo } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

type SortConfig = {
  key: keyof Patient | null
  direction: "ascending" | "descending"
}

export default function Dashboard({
  onPatientClick
}: {
  onPatientClick: (patientContext: CurrentPatientContext) => void
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "ascending"
  })

  const filteredAndSortedPatients = useMemo(() => {
    const SearchedPatients = mockPatientsList.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.dob.includes(searchTerm)
    )

    if (sortConfig.key) {
      SearchedPatients.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const valA = (a as any)[sortConfig.key!]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const valB = (b as any)[sortConfig.key!]

        if (valA < valB) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (valA > valB) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    return SearchedPatients
  }, [searchTerm, sortConfig])

  const requestSort = (key: keyof Patient) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof Patient) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />
    }
    return sortConfig.direction === "ascending" ? (
      <ArrowUpDown className="ml-2 h-4 w-4 transform rotate-0 transition-transform" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4 transform rotate-180 transition-transform" />
    )
  }

  return (
    <div className="flex flex-1 flex-col bg-muted/20 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
            <Users className="mr-3 h-8 w-8 text-primary" />
            Patient Roster
          </h1>
          <p className="text-muted-foreground">
            Manage and view patient records.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, ID, DOB..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-background pl-8 h-10 md:w-[250px] lg:w-[350px]"
            />
          </div>
          <Button className="h-10">
            <UserPlus className="mr-2 h-4 w-4" /> Add Patient
          </Button>
        </div>
      </div>

      <Card className="shadow-lg border flex-1 flex flex-col">
        <CardContent className="p-0 flex-1">
          <Table>
            <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
              <TableRow>
                {(
                  ["id", "name", "dob", "gender", "lastVisitDate"] as const
                ).map((key) => (
                  <TableHead
                    key={key}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => requestSort(key as keyof Patient)}
                  >
                    <div className="flex items-center">
                      {key.charAt(0).toUpperCase() +
                        key
                          .slice(1)
                          .replace(/([A-Z])/g, " $1")
                          .trim()}{" "}
                      {/* Prettify label */}
                      {getSortIcon(key as keyof Patient)}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPatients.length > 0 ? (
                filteredAndSortedPatients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className="hover:bg-muted/30 transition-colors"
                    onClick={() =>
                      onPatientClick({
                        patient_id: patient.id,
                        patient_name: patient.name,
                        visit_id: patient.visits[0]?.id || "N/A"
                      })
                    }
                  >
                    <TableCell className="font-medium text-primary py-3">
                      {patient.id}
                    </TableCell>
                    <TableCell className="font-semibold py-3">
                      {patient.name}
                    </TableCell>
                    <TableCell className="py-3">
                      {new Date(patient.dob).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-3">{patient.gender}</TableCell>
                    <TableCell className="py-3">
                      {patient.lastVisitDate
                        ? new Date(patient.lastVisitDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-right py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              onPatientClick({
                                patient_id: patient.id,
                                patient_name: patient.name,
                                visit_id: patient.visits[0]?.id || "N/A"
                              })
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" /> View Record
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => e.stopPropagation()}
                          >
                            Edit Demographics
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => e.stopPropagation()}
                          >
                            Schedule Appointment
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={(e) => e.stopPropagation()}
                            className="text-destructive focus:text-destructive"
                          >
                            Archive Patient
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {filteredAndSortedPatients.length > 0 && (
          <CardFooter className="p-4 border-t">
            <div className="text-xs text-muted-foreground">
              Showing <strong>{filteredAndSortedPatients.length}</strong> of{" "}
              <strong>{mockPatientsList.length}</strong> patients.
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
