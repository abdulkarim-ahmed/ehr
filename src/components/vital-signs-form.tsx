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
import { useEffect } from "react"
import { Save } from "lucide-react"

const vitalSignsSchema = z.object({
  chiefComplaint: z.string().min(1, "Chief complaint is required."),
  significantSigns: z.string().min(1, "Significant signs are required.")
})

interface VitalSignsFormProps {
  chiefComplaint?: string
  significantSigns?: string
}

export function VitalSignsForm({
  chiefComplaint = "",
  significantSigns = ""
}: VitalSignsFormProps) {
  const form = useForm<z.infer<typeof vitalSignsSchema>>({
    resolver: zodResolver(vitalSignsSchema),
    defaultValues: {
      chiefComplaint: chiefComplaint,
      significantSigns: significantSigns
    }
  })

  useEffect(() => {
    form.reset({
      // Use form.reset to update defaultValues and form state
      chiefComplaint: chiefComplaint,
      significantSigns: significantSigns
    })
  }, [chiefComplaint, significantSigns, form])

  function onSubmit(values: z.infer<typeof vitalSignsSchema>) {
    console.log("Vital Signs Submitted:", values)
    // Add your submission logic here (e.g., API call)
    alert("Vital signs saved! (Check console for data)")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="chiefComplaint"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-foreground/90">
                Chief Complaint
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the primary reason for the patient's visit..."
                  {...field}
                  className="min-h-[120px] text-base"
                />
              </FormControl>
              <FormDescription>
                The main reason the patient is seeking medical attention.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="significantSigns"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-foreground/90">
                Significant Signs & Symptoms
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List any notable signs, symptoms, or observations..."
                  {...field}
                  className="min-h-[120px] text-base"
                />
              </FormControl>
              <FormDescription>
                Key observations or symptoms reported by the patient or
                observed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
