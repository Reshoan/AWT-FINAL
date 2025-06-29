"use client"

import { useFieldArray, useForm } from "react-hook-form"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants"
import { scheduleFormSchema } from "@/schema/schedule"
import { timeToInt } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatTimezoneOffset } from "@/lib/formatters"
import { Fragment, useState } from "react"
import { Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { saveSchedule } from "@/server/actions/schedule"

type Availability = {
  startTime: string
  endTime: string
  dayOfWeek: (typeof DAYS_OF_WEEK_IN_ORDER)[number]
}

export function ScheduleForm({
  schedule,
}: {
  schedule?: {
    timezone: string
    availabilities: Availability[]
  }
}) {
  const [successMessage, setSuccessMessage] = useState<string>()
  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      timezone: schedule?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      availabilities:
        schedule?.availabilities?.toSorted((a, b) => {
          return timeToInt(a.startTime) - timeToInt(b.startTime)
        }) ?? [],
    },
  })

  const {
    append: addAvailability,
    remove: removeAvailability,
    fields: availabilityFields,
  } = useFieldArray({ name: "availabilities", control: form.control })

  const groupedAvailabilityFields = Object.groupBy(
    availabilityFields.map((field, index) => ({ ...field, index })),
    (availability) => availability.dayOfWeek,
  )

  async function onSubmit(values: z.infer<typeof scheduleFormSchema>) {
    const data = await saveSchedule(values)

    if (data?.error) {
      form.setError("root", {
        message: "There was an error saving your schedule",
      })
    } else {
      setSuccessMessage("Schedule saved successfully!")
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-green-900 mb-6">Set Your Availability</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6 flex-col">
          {form.formState.errors.root && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {form.formState.errors.root.message}
            </div>
          )}
          {successMessage && (
            <div className="text-green-700 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
              {successMessage}
            </div>
          )}

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-900 font-medium">Timezone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Intl.supportedValuesOf("timeZone").map((timezone) => (
                      <SelectItem key={timezone} value={timezone}>
                        {timezone}
                        {` (${formatTimezoneOffset(timezone)})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-[auto,1fr] gap-y-6 gap-x-4">
            {DAYS_OF_WEEK_IN_ORDER.map((dayOfWeek) => (
              <Fragment key={dayOfWeek}>
                <div className="capitalize text-sm font-semibold text-green-900">{dayOfWeek.substring(0, 3)}</div>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    className="size-6 p-1 bg-green-600 hover:bg-green-700 border-green-600"
                    variant="outline"
                    onClick={() => {
                      addAvailability({
                        dayOfWeek,
                        startTime: "9:00",
                        endTime: "17:00",
                      })
                    }}
                  >
                    <Plus className="size-full text-white" />
                  </Button>
                  {groupedAvailabilityFields[dayOfWeek]?.map((field, labelIndex) => (
                    <div className="flex flex-col gap-1" key={field.id}>
                      <div className="flex gap-2 items-center">
                        <FormField
                          control={form.control}
                          name={`availabilities.${field.index}.startTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-24 border-green-200 focus:border-green-500 focus:ring-green-500"
                                  aria-label={`${dayOfWeek} Start Time ${labelIndex + 1}`}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <span className="text-green-700">-</span>
                        <FormField
                          control={form.control}
                          name={`availabilities.${field.index}.endTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-24 border-green-200 focus:border-green-500 focus:ring-green-500"
                                  aria-label={`${dayOfWeek} End Time ${labelIndex + 1}`}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          className="size-6 p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                          variant="ghost"
                          onClick={() => removeAvailability(field.index)}
                        >
                          <X />
                        </Button>
                      </div>
                      <FormMessage className="text-red-600">
                        {form.formState.errors.availabilities?.at?.(field.index)?.root?.message}
                      </FormMessage>
                      <FormMessage className="text-red-600">
                        {form.formState.errors.availabilities?.at?.(field.index)?.startTime?.message}
                      </FormMessage>
                      <FormMessage className="text-red-600">
                        {form.formState.errors.availabilities?.at?.(field.index)?.endTime?.message}
                      </FormMessage>
                    </div>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>

          <div className="flex gap-2 justify-end">
            <Button disabled={form.formState.isSubmitting} type="submit" className="bg-green-600 hover:bg-green-700">
              {form.formState.isSubmitting ? "Saving..." : "Save Schedule"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
