// src/components/AllergiesSection.tsx
import { PatientAllergy } from "@/lib/types"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  PlusCircle,
  Edit3,
  Trash2,
  EllipsisVertical
} from "lucide-react"
import { Button } from "./ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface AllergiesSectionProps {
  allergies: PatientAllergy[]
  onAddAllergy?: () => void // For opening a form modal
  onEditAllergy?: (allergyId: string) => void
  onDeleteAllergy?: (allergyId: string) => void
}

const severityBadgeVariant = (
  severity: PatientAllergy["severity"]
): "default" | "destructive" | "secondary" | "outline" => {
  switch (severity) {
    case "Life-threatening":
      return "destructive"
    case "Severe":
      return "destructive" // Consider a specific "warning" variant for orange if defined in theme
    case "Moderate":
      return "secondary"
    case "Mild":
      return "outline"
    default:
      return "default"
  }
}

export function AllergiesSection({
  allergies,
  onAddAllergy,
  onEditAllergy,
  onDeleteAllergy
}: AllergiesSectionProps) {
  return (
    <Card className="shadow-md border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="flex items-center text-lg font-semibold">
            <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />{" "}
            Allergies & Adverse Reactions
          </CardTitle>
          <CardDescription>
            Known allergies and reactions for this patient.
          </CardDescription>
        </div>
        {onAddAllergy && (
          <Button variant="outline" size="sm" onClick={onAddAllergy}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Allergy
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {allergies && allergies.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Allergen</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reaction</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Recorded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allergies.map((allergy) => (
                <TableRow
                  key={allergy.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium">
                    {allergy.allergen}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {allergy.type || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>{allergy.reaction}</TableCell>
                  <TableCell>
                    <Badge
                      variant={severityBadgeVariant(allergy.severity)}
                      className="capitalize"
                    >
                      {allergy.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {allergy.recordedDate
                      ? new Date(allergy.recordedDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <EllipsisVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onEditAllergy && (
                          <DropdownMenuItem
                            onClick={() => onEditAllergy(allergy.id)}
                          >
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {onDeleteAllergy && (
                          <DropdownMenuItem
                            onClick={() => onDeleteAllergy(allergy.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="mx-auto h-12 w-12 opacity-50 mb-2" />
            <p>No known allergies or adverse reactions recorded.</p>
            {onAddAllergy && (
              <Button
                variant="link"
                size="sm"
                className="mt-2"
                onClick={onAddAllergy}
              >
                Record an allergy
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
