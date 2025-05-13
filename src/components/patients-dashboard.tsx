import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { patients } from "@/lib/patients"

export default function Dashboard({
  onPatientClick
}: {
  onPatientClick: (patient: {
    patient_id: string
    patient_name: string
    visit_id: string
  }) => void
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
        </div>

        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>
                    <Button
                      className="text-emerald-600 hover:underline"
                      variant={"link"}
                      onClick={() =>
                        onPatientClick({
                          patient_id: patient.id,
                          patient_name: patient.name,
                          visit_id: patient.visits[0].id
                        })
                      }
                    >
                      {patient.name}
                    </Button>
                  </TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.visits[0].date}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                      Active
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={"outline"}
                      onClick={() =>
                        onPatientClick({
                          patient_id: patient.id,
                          patient_name: patient.name,
                          visit_id: patient.visits[0].id
                        })
                      }
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
