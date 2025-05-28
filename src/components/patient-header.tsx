// components/patient-header.tsx
import { UserCircle, FileText } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Uncomment if you have Avatar

interface PatientHeaderProps {
  patientName: string
  patientId: string
  visitId: string
}

export function PatientHeader({
  patientName,
  patientId,
  visitId
}: PatientHeaderProps) {
  const patientInitials = patientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <div className="mb-8 p-6 bg-card rounded-xl shadow-lg border border-border">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          {/* <Avatar className="h-16 w-16 mr-4">  // Uncomment if you have Avatar
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(patientName)}&backgroundColor=205_85_45,00897b,039be5,3f51b5,6d4c41,8e24aa,d81b60,f4511e`} />
            <AvatarFallback className="text-xl bg-primary text-primary-foreground">{patientInitials}</AvatarFallback>
          </Avatar> */}
          {
            <div className="h-16 w-16 mr-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-semibold">
              {patientInitials}
            </div>
          }
          <div>
            <h1 className="text-3xl font-bold text-primary">{patientName}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center">
                <UserCircle className="w-4 h-4 mr-1.5 text-primary/70" />
                ID: {patientId}
              </span>
              <span className="flex items-center">
                <FileText className="w-4 h-4 mr-1.5 text-primary/70" />
                Visit: {visitId}
              </span>
            </div>
          </div>
        </div>
        {/* Placeholder for additional actions like "Edit Patient Details" */}
        {/* <Button variant="outline">Edit Details</Button> */}
      </div>
    </div>
  )
}
