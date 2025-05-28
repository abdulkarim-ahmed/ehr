import { PatientAllergy } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AllergiesWidgetProps {
  allergies: PatientAllergy[]
  onViewAll?: () => void // To switch to the full Allergies tab/view
  maxItems?: number
}

const severityBadgeVariant = (
  severity: PatientAllergy["severity"]
): "default" | "destructive" | "secondary" | "outline" => {
  // (Keep your existing severityBadgeVariant logic)
  switch (severity) {
    case "Life-threatening":
      return "destructive"
    case "Severe":
      return "destructive"
    case "Moderate":
      return "secondary" // Assuming secondary is defined well in themes (e.g., an orange/yellow or distinct color)
    case "Mild":
      return "outline"
    default:
      return "default"
  }
}

export function AllergiesWidget({
  allergies,
  onViewAll,
  maxItems = 3
}: AllergiesWidgetProps) {
  const criticalAllergies = [...allergies]
    .sort((a, b) => {
      const severityOrder = {
        "Life-threatening": 0,
        Severe: 1,
        Moderate: 2,
        Mild: 3
      }
      return severityOrder[a.severity] - severityOrder[b.severity]
    })
    .slice(0, maxItems)

  return (
    <Card className="shadow-md border h-full flex flex-col transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
            Key Allergies
          </CardTitle>
          {onViewAll && allergies.length > maxItems && (
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
        {criticalAllergies.length > 0 ? (
          <ul className="space-y-2">
            {criticalAllergies.map((allergy) => (
              <li
                key={allergy.id}
                className="p-2.5 rounded-md bg-muted/50 border border-transparent hover:border-primary/20 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm text-foreground/90">
                    {allergy.allergen}
                  </span>
                  <Badge
                    variant={severityBadgeVariant(allergy.severity)}
                    className="capitalize text-xs px-1.5 py-0.5"
                  >
                    {allergy.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {allergy.reaction}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No critical allergies recorded.
          </p>
        )}
        {allergies.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No allergies recorded.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
