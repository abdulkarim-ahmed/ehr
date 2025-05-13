import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PatientPage from "./components/Patient-page"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import Dashboard from "./components/patients-dashboard"

export default function App() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isPasswordVerified, setIsPasswordVerified] = useState(false)

  const [token, setToken] = useState("")
  const [env, setEnv] = useState("dev")
  const [theme, setTheme] = useState("")
  const [CTA, setCTA] = useState("")

  const [patient, setPatient] = useState<{
    patient_id: string
    patient_name: string
    visit_id: string
  } | null>(null)

  const actualPass = import.meta.env.VITE_PASSWORD

  useEffect(() => {
    const storedToken = localStorage.getItem("bearerToken")
    const env = localStorage.getItem("env")

    setEnv(env || "dev")
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
      setIsPasswordVerified(true)
    }
  }, [])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === actualPass) {
      setIsPasswordVerified(true)
    }
  }

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token.length > 0) {
      localStorage.setItem("bearerToken", token)
      setIsAuthenticated(true)
    }
  }

  if (!isPasswordVerified) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <form onSubmit={handlePasswordSubmit}>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
              />
              <Button type="submit" className="w-full mb-4">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-600">
                    Mandatory Fields <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter Bearer Token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-600">
                    Optional Fields
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter Theme Name"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Enter CTA Text"
                    value={CTA}
                    onChange={(e) => setCTA(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">
                  Select Environment
                </label>
                <RadioGroup
                  defaultValue="dev"
                  name="env"
                  onValueChange={setEnv}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="dev" value="dev" />
                    <label htmlFor="dev" className="text-sm">
                      Dev
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="prod" value="prod" />
                    <label htmlFor="prod" className="text-sm">
                      Prod
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return patient ? (
    <PatientPage
      token={token}
      env={env}
      theme={theme}
      CTA={CTA}
      patient={patient}
      onReset={() => {
        setPatient(null)
      }}
    />
  ) : (
    <Dashboard
      onPatientClick={(patient: {
        patient_id: string
        patient_name: string
        visit_id: string
      }) => {
        setPatient(patient)
      }}
    />
  )
}
