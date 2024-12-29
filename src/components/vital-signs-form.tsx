import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"

const vitalSignsSchema = z.object({
  chiefComplaint: z.string(),
  significantSigns: z.string()
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
    form.setValue("chiefComplaint", chiefComplaint)
    form.setValue("significantSigns", significantSigns)
  }, [chiefComplaint, significantSigns, form])

  function onSubmit(values: z.infer<typeof vitalSignsSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="chiefComplaint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chief Complaint</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the Chief Complaint"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="significantSigns"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Significant Signs</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the Significant Signs"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  )
}
