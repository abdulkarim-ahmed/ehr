import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useMemo } from "react"
import { Save } from "lucide-react"
import { SummarySection } from "@/types/ICDAutomation"


const createVitalSignsSchema = (sections: SummarySection[]) => {
  const schemaObject: Record<string, z.ZodOptional<z.ZodString>> = {}
  
  sections.forEach((section) => {
    const key = section.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
    if (key) {
      schemaObject[key] = z.string().optional()
    }
  })
  
  schemaObject.chiefComplaint = z.string().optional()
  schemaObject.significantSigns = z.string().optional()
  
  return z.object(schemaObject)
}

interface VitalSignsFormProps {
  chiefComplaint?: string
  significantSigns?: string
  sections?: SummarySection[]
}

export function VitalSignsForm({
  chiefComplaint = "",
  significantSigns = "",
  sections = []
}: VitalSignsFormProps) {

  const displaySections = useMemo(() => {
    if (sections && sections.length > 0) {
      return sections
    }

    const fallbackSections: SummarySection[] = []
    if (chiefComplaint) {
      fallbackSections.push({ title: "Chief Complaint", content: chiefComplaint })
    }
    if (significantSigns) {
      fallbackSections.push({ title: "Significant Signs & Symptoms", content: significantSigns })
    }
    return fallbackSections
  }, [sections, chiefComplaint, significantSigns])

  const schema = useMemo(() => createVitalSignsSchema(displaySections), [displaySections])
  
  const defaultValues = useMemo(() => {
    const values: Record<string, string> = {}
    displaySections.forEach((section) => {
      const key = section.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
      if (key) {
        values[key] = section.content
      }
    })

    values.chiefComplaint = chiefComplaint
    values.significantSigns = significantSigns
    return values
  }, [displaySections, chiefComplaint, significantSigns])

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [defaultValues, form])

  function onSubmit(values: z.infer<typeof schema>) {
    console.log("Assessment Submitted:", values)
    // Add your submission logic here (e.g., API call)
    alert("Assessment saved! (Check console for data)")
  }

  if (displaySections.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>No assessment data available.</p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {displaySections.map((section) => {
          const fieldKey = section.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "")
          
          if (!fieldKey) return null

          return (
            <FormField
              key={fieldKey}
              control={form.control}
              name={fieldKey as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-foreground/90">
                    {section.title}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Enter ${section.title.toLowerCase()}...`}
                      {...field}
                      value={field.value || ""}
                      className="min-h-[120px] text-base"
                    />
                  </FormControl>
                  <FormDescription>
                    {section.title} information from the consultation summary.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto min-w-[150px]"
        >
          <Save className="mr-2 h-5 w-5" />
          Save Assessment
        </Button>
      </form>
    </Form>
  )
}
