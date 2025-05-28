import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from "react"

export type Theme = "theme-blue" | "theme-pink" | "theme-sleek-dark"

export const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "theme-blue", label: "Cool Blue" },
  { value: "theme-pink", label: "Soft Pink" },
  { value: "theme-sleek-dark", label: "Sleek Dark" }
]

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("app-visual-theme") as Theme | null
    return storedTheme || "theme-blue" // Default theme
  })

  useEffect(() => {
    const root = document.documentElement
    THEME_OPTIONS.forEach((opt) => root.classList.remove(opt.value)) // Remove old theme classes
    root.classList.add(theme) // Add current theme class
    localStorage.setItem("app-visual-theme", theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
