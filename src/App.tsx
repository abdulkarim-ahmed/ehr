import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PatientPage from "./components/Patient-page"

export default function App() {
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isPasswordVerified, setIsPasswordVerified] = useState(false)

  const actualPass = import.meta.env.VITE_PASSWORD

  useEffect(() => {
    const storedToken = localStorage.getItem("bearerToken")
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
              <Button type="submit" className="w-full mb-4">Submit</Button>
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
            <form onSubmit={handleTokenSubmit}>
              <Input
                type="text"
                placeholder="Enter bearer token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="mb-4"
              />
              <Button type="submit" className="w-full mb-4">Submit</Button>
            </form>
            
          </CardContent>
        </Card>
      </div>
    )
  }

  return <PatientPage token={token} />
}