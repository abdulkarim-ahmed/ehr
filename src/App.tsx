import { useState, useEffect, useCallback } from "react"
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
  Settings,
  RefreshCw
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
import { ENVS, getApiBaseUrlForEnv } from "./lib/env"
import { loginWithCredentials, refreshAccessToken, ApiError } from "./lib/auth"

const decodeTokenExpiry = (token: string): number | null => {
  if (typeof window === "undefined") return null
  try {
    const parts = token.split(".")
    if (parts.length < 2) return null
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/")
    const decoded = window.atob(base64)
    const payload = JSON.parse(decoded)
    if (payload && typeof payload.exp === "number") {
      return payload.exp * 1000
    }
  } catch {
    // Ignore decode errors
  }
  return null
}

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
  const [refreshToken, setRefreshToken] = useState("")
  const [env, setEnv] = useState("dev")
  const [iframeTheme, setIframeTheme] = useState("")
  const [CTA, setCTA] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [isRefreshingToken, setIsRefreshingToken] = useState(false)
  const [tokenStatus, setTokenStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const [patient, setPatient] = useState<{
    patient_id: string
    patient_name: string
    visit_id: string
  } | null>(null)

  const actualPass = import.meta.env.VITE_PASSWORD

  const handleLogout = useCallback(() => {
    localStorage.removeItem("bearerToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("env")
    localStorage.removeItem("iframeTheme")
    setToken("")
    setRefreshToken("")
    setLoginEmail("")
    setLoginPassword("")
    setLoginError("")
    setTokenStatus(null)
    setIsAuthenticated(false)
    setIsPasswordVerified(false)
    setPatient(null)
  }, [])

  const refreshAccessTokenWithStored = useCallback(
    async (overrideRefreshToken?: string, envOverride?: string) => {
      const refreshTokenToUse = (overrideRefreshToken ?? refreshToken)?.trim()
      const envKey = envOverride ?? env

      if (!refreshTokenToUse) {
        setTokenStatus({
          type: "error",
          message: "No refresh token available. Please sign in again."
        })
        return null
      }

      setIsRefreshingToken(true)
      try {
        const apiBaseUrl = getApiBaseUrlForEnv(envKey)
        const { token: newToken, refresh_token: newRefreshToken } =
          await refreshAccessToken(refreshTokenToUse, apiBaseUrl)

        setToken(newToken)
        localStorage.setItem("bearerToken", newToken)
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken)
          localStorage.setItem("refreshToken", newRefreshToken)
        }

        setIsAuthenticated(true)
        setIsPasswordVerified(true)
        setTokenStatus({
          type: "success",
          message: "Session refreshed."
        })

        return newToken
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to refresh token. Please sign in again."
        setTokenStatus({
          type: "error",
          message
        })

        if (error instanceof ApiError && error.status === 401) {
          handleLogout()
        }
        return null
      } finally {
        setIsRefreshingToken(false)
      }
    },
    [env, refreshToken, handleLogout]
  )

  const handleManualTokenRefresh = useCallback(() => {
    void refreshAccessTokenWithStored()
  }, [refreshAccessTokenWithStored])

  useEffect(() => {
    const storedToken = localStorage.getItem("bearerToken")
    const storedRefreshToken = localStorage.getItem("refreshToken")
    const localEnv = localStorage.getItem("env")
    const localIframeTheme = localStorage.getItem("iframeTheme")

    setEnv(localEnv || "dev")
    setIframeTheme(localIframeTheme || "")

    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
      setIsPasswordVerified(true)
    } else if (storedRefreshToken) {
      setIsPasswordVerified(true)
    }

    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken)
      if (!storedToken) {
        void refreshAccessTokenWithStored(storedRefreshToken, localEnv || "dev")
      }
    }
  }, [refreshAccessTokenWithStored])

  useEffect(() => {
    if (!tokenStatus) return
    const timeout = window.setTimeout(() => setTokenStatus(null), 5000)
    return () => window.clearTimeout(timeout)
  }, [tokenStatus])

  useEffect(() => {
    if (!token || !refreshToken) return
    const expiryTime = decodeTokenExpiry(token)
    if (!expiryTime) return

    const refreshLeadTimeMs = 60 * 1000 // refresh 1 minute before expiry
    const delay = expiryTime - Date.now() - refreshLeadTimeMs

    if (delay <= 0) {
      void refreshAccessTokenWithStored()
      return
    }

    const timeoutId = window.setTimeout(() => {
      void refreshAccessTokenWithStored()
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [token, refreshToken, refreshAccessTokenWithStored])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === actualPass) {
      setIsPasswordVerified(true)
    } else {
      alert("Incorrect password")
    }
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Email and password are required.")
      return
    }

    setLoginError("")
    setIsLoggingIn(true)

    try {
      const apiBaseUrl = getApiBaseUrlForEnv(env)
      const {
        token: bearerToken,
        refresh_token: refreshTokenFromApi
      } = await loginWithCredentials(
        {
          email: loginEmail.trim(),
          password: loginPassword
        },
        apiBaseUrl
      )

      setToken(bearerToken)
      localStorage.setItem("bearerToken", bearerToken)
      if (refreshTokenFromApi) {
        setRefreshToken(refreshTokenFromApi)
        localStorage.setItem("refreshToken", refreshTokenFromApi)
      } else {
        setRefreshToken("")
        localStorage.removeItem("refreshToken")
      }
      localStorage.setItem("env", env)
      localStorage.setItem("iframeTheme", iframeTheme)
      setIsAuthenticated(true)
      setLoginPassword("")
      setTokenStatus({
        type: "success",
        message: "Signed in successfully."
      })
    } catch (error) {
      setLoginError(
        error instanceof Error
          ? error.message
          : "Unable to login. Please try again."
      )
    } finally {
      setIsLoggingIn(false)
    }
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
              onSubmit={handleLoginSubmit}
              className="space-y-[var(--spacing-lg)]"
            >
              {" "}
              {/* Using spacing var */}
              <div className="space-y-[var(--spacing-md)]">
                {" "}
                {/* Using spacing var */}
                <div>
                  <label className="text-sm font-medium text-foreground/80 mb-[var(--spacing-xs)] block">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={loginEmail}
                    autoComplete="username"
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground/80 mb-[var(--spacing-xs)] block">
                    Password <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    autoComplete="current-password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                {loginError && (
                  <p className="text-sm text-destructive" role="alert">
                    {loginError}
                  </p>
                )}
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
                  className="grid grid-cols-1 sm:grid-cols-4 gap-[var(--spacing-sm)]"
                >
                  {Object.entries(ENVS).map(([envKey]) => (
                    <div key={envKey} className="flex items-center">
                      <RadioGroupItem
                        value={envKey}
                        id={`env-${envKey}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`env-${envKey}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-[var(--spacing-sm)] hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer w-full text-[var(--font-size-sm)] transition-colors"
                      >
                        {envKey
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (s) => s.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-[var(--spacing-sm)]">
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
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Signing In..." : "Sign In & Launch"}
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
                  {THEME_OPTIONS.map((option) => (
                    <DropdownMenuRadioItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
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
                  onClick={handleManualTokenRefresh}
                  disabled={isRefreshingToken || !refreshToken}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {isRefreshingToken ? "Refreshing..." : "Refresh Token"}
                </DropdownMenuItem>
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

      {tokenStatus && (
        <div
          className={`px-[var(--content-padding)] py-2 text-sm border-b ${
            tokenStatus.type === "error"
              ? "bg-destructive/10 text-destructive"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {tokenStatus.message}
        </div>
      )}

      <main className="flex-1">
        {patient ? (
          <PatientPage
            token={token}
            iframeUrl={ENVS[env as keyof typeof ENVS]}
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
