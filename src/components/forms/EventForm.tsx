"use client"

import { useForm } from "react-hook-form"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { eventFormSchema } from "@/schema/events"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createEvent, deleteEvent, updateEvent } from "@/server/actions/events"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useTransition } from "react"

export function EventForm({
  event,
}: {
  event?: {
    id: string
    name: string
    description?: string
    durationInMinutes: number
    isActive: boolean
  }
}) {
  const [isDeletePending, startDeleteTransition] = useTransition()
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event ?? {
      isActive: true,
      durationInMinutes: 30,
    },
  })

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const action = event == null ? createEvent : updateEvent.bind(null, event.id)
    const data = await action(values)

    if (data?.error) {
      form.setError("root", {
        message: "There was an error saving your Appointment",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6 flex-col">
        {form.formState.errors.root && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            {form.formState.errors.root.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-900 font-medium">Appointment Name</FormLabel>
              <FormControl>
                <Input className="border-green-200 focus:border-green-500 focus:ring-green-500" {...field} />
              </FormControl>
              <FormDescription className="text-green-600">The name users will see when booking</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="durationInMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-900 font-medium">Duration</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-green-600">In minutes</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green-900 font-medium">Description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-32 border-green-200 focus:border-green-500 focus:ring-green-500"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-green-600">Optional description of the Appointment</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-green-600"
                  />
                </FormControl>
                <FormLabel className="text-green-900 font-medium">Active</FormLabel>
              </div>
              <FormDescription className="text-green-600">
                Inactive events will not be visible for users to book
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          {event && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={isDeletePending || form.formState.isSubmitting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this Appointment.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeletePending || form.formState.isSubmitting}
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      startDeleteTransition(async () => {
                        const data = await deleteEvent(event.id)

                        if (data?.error) {
                          form.setError("root", {
                            message: "There was an error deleting your Appointment",
                          })
                        }
                      })
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button
            disabled={isDeletePending || form.formState.isSubmitting}
            type="button"
            asChild
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
          >
            <Link href="/appointments">Go back to Appointments</Link>
          </Button>
          <Button
            disabled={isDeletePending || form.formState.isSubmitting}
            type="submit"
            className="bg-green-600 hover:bg-green-700"
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
