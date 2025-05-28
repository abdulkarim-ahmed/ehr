import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PatientPage from "./components/Patient-page"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import Dashboard from "./components/patients-dashboard"
import {
  ShieldCheck,
  KeyRound,
  Settings2,
  Activity,
  Palette,
  LogOut,
  Settings
} from "lucide-react"
import { useTheme, Theme, THEME_OPTIONS } from "./context/ThemeContext" // Ensure THEME_OPTIONS keys match CSS classes
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"

const AppLogo = () => (
  <div className="flex items-center justify-center mb-8 text-primary">
    <Activity className="w-10 h-10 mr-3" />
    <h1 className="text-3xl font-bold">EHR Platform</h1>
  </div>
)

export default function App() {
  const { theme: currentVisualTheme, setTheme: setCurrentVisualTheme } =
    useTheme()
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isPasswordVerified, setIsPasswordVerified] = useState(false)

  const [token, setToken] = useState("")
  const [env, setEnv] = useState("dev")
  const [iframeTheme, setIframeTheme] = useState("")
  const [CTA, setCTA] = useState("")

  const [patient, setPatient] = useState<{
    patient_id: string
    patient_name: string
    visit_id: string
  } | null>(null)

  const actualPass = import.meta.env.VITE_PASSWORD

  useEffect(() => {
    const storedToken = localStorage.getItem("bearerToken")
    const localEnv = localStorage.getItem("env")
    const localIframeTheme = localStorage.getItem("iframeTheme")

    setEnv(localEnv || "dev")
    setIframeTheme(localIframeTheme || "")
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
    } else {
      alert("Incorrect password")
    }
  }

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token.trim().length > 0) {
      localStorage.setItem("bearerToken", token)
      localStorage.setItem("env", env)
      localStorage.setItem("iframeTheme", iframeTheme)
      setIsAuthenticated(true)
    } else {
      alert("Bearer token is required.")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("bearerToken")
    localStorage.removeItem("env")
    localStorage.removeItem("iframeTheme")
    setIsAuthenticated(false)
    setIsPasswordVerified(false)
    setPatient(null)
  }

  if (!isPasswordVerified) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-muted p-4">
        <AppLogo />
        <Card className="w-full max-w-md shadow-xl border">
          <CardHeader className="text-center">
            {" "}
            {/* Center title/desc */}
            {/* Using h2 for section title */}
            <CardTitle className="flex items-center justify-center text-2xl">
              <ShieldCheck className="mr-2 h-6 w-6 text-primary" /> Secure
              Access
            </CardTitle>
            <CardDescription>
              Please enter the password to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-[var(--spacing-md)]">
            {" "}
            {/* Using spacing var */}
            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-[var(--spacing-md)]"
            >
              {" "}
              {/* Using spacing var */}
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-[var(--font-size-base)]" // Using font var
              />
              <Button
                type="submit"
                className="w-full h-12 text-[var(--font-size-lg)]"
              >
                {" "}
                {/* Using font var */}
                Verify
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-muted p-4">
        <AppLogo />
        <Card className="w-full max-w-lg shadow-xl border">
          <CardHeader>
            {/* Using h2 for section title */}
            <CardTitle className="flex items-center text-2xl">
              <KeyRound className="mr-2 h-6 w-6 text-primary" /> Application
              Setup
            </CardTitle>
            <CardDescription>
              Configure your access and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-[var(--spacing-md)]">
            {" "}
            {/* Using spacing var */}
            <form
              onSubmit={handleTokenSubmit}
              className="space-y-[var(--spacing-lg)]"
            >
              {" "}
              {/* Using spacing var */}
              <div className="space-y-[var(--spacing-md)]">
                {" "}
                {/* Using spacing var */}
                <div>
                  <label className="text-sm font-medium text-foreground/80 mb-[var(--spacing-xs)] block">
                    Bearer Token <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter Bearer Token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground/80 mb-[var(--spacing-xs)] block">
                    Iframe Theme Name (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., custom-iframe-theme"
                    value={iframeTheme}
                    onChange={(e) => setIframeTheme(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground/80 mb-[var(--spacing-xs)] block">
                    Iframe CTA Text (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Start Consultation"
                    value={CTA}
                    onChange={(e) => setCTA(e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>
              <div className="space-y-[var(--spacing-sm)]">
                {" "}
                {/* Using spacing var */}
                <label className="text-sm font-medium text-foreground/80 flex items-center">
                  <Settings2 className="w-4 h-4 mr-2 text-primary" /> Select
                  Environment
                </label>
                <RadioGroup
                  defaultValue="dev"
                  value={env}
                  name="env"
                  onValueChange={setEnv}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--spacing-sm)]" /* Using spacing var */
                >
                  {["dev", "prod", "altProd"].map((envValue) => (
                    <div key={envValue} className="flex items-center">
                      <RadioGroupItem
                        value={envValue}
                        id={`env-${envValue}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`env-${envValue}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-[var(--spacing-sm)] hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer w-full text-[var(--font-size-sm)] transition-colors" /* Using font and spacing vars */
                      >
                        {envValue.charAt(0).toUpperCase() +
                          envValue.slice(1).replace("altP", "Alt Prod")}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-[var(--spacing-sm)]">
                {" "}
                {/* Using spacing var */}
                <label className="text-sm font-medium text-foreground/80 flex items-center">
                  <Palette className="w-4 h-4 mr-2 text-primary" /> Select
                  Visual Theme
                </label>
                <RadioGroup
                  value={currentVisualTheme}
                  onValueChange={(value) =>
                    setCurrentVisualTheme(value as Theme)
                  }
                  className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--spacing-sm)]" /* Using spacing var */
                >
                  {THEME_OPTIONS.map(
                    (
                      themeOption // Ensure THEME_OPTIONS matches css classes
                    ) => (
                      <div
                        key={themeOption.value}
                        className="flex items-center"
                      >
                        <RadioGroupItem
                          value={themeOption.value}
                          id={`theme-${themeOption.value}`}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={`theme-${themeOption.value}`}
                          className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-[var(--spacing-sm)] hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer w-full text-[var(--font-size-sm)] transition-colors" /* Using font and spacing vars */
                        >
                          {themeOption.label}
                        </label>
                      </div>
                    )
                  )}
                </RadioGroup>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-[var(--font-size-lg)]"
              >
                {" "}
                {/* Using font var */}
                Submit & Launch
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-[var(--content-padding)] sm:px-6">
          <div className="flex items-center">
            <Activity className="h-7 w-7 text-primary mr-2" />
            <span className="font-bold text-xl">EHR Platform</span>
          </div>
          <div className="flex items-center gap-[var(--spacing-md)]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Change theme">
                  <Palette className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={currentVisualTheme}
                  onValueChange={(value) =>
                    setCurrentVisualTheme(value as Theme)
                  }
                >
                  {THEME_OPTIONS.map(
                    (
                      option // Ensure THEME_OPTIONS matches css classes
                    ) => (
                      <DropdownMenuRadioItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </DropdownMenuRadioItem>
                    )
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User settings">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {patient ? (
          <PatientPage
            token={token}
            env={env}
            theme={iframeTheme}
            CTA={CTA}
            patient={patient}
            onReset={() => {
              setPatient(null)
            }}
          />
        ) : (
          <Dashboard
            onPatientClick={(p) => {
              setPatient(p)
            }}
          />
        )}
      </main>
    </div>
  )
}
