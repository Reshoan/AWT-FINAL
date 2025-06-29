import { EventForm } from "@/components/forms/EventForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/drizzle/db"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"


export const revalidate = 0

export default async function EditEventPage({
  params: { eventId },
}: {
  params: { eventId: string }
}) {
  const { userId, redirectToSignIn } = auth()
  if (userId == null) return redirectToSignIn()

  const event = await db.query.EventTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) =>
      and(eq(clerkUserId, userId), eq(id, eventId)),
  })

  if (event == null) return notFound()

   return (
    <DashboardLayout currentPage="appointments">
      <div className="space-y-6 ">
          
          <div>
            <h1 className="text-3xl font-bold text-green-900 mb-2 flex justify-center">Edit Event</h1>
            <p className="text-green-700 flex justify-center">Update your appointment type details</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-6">Event Details</h2>
              <EventForm event={{ ...event, description: event.description || undefined }} />
            </div>
          </div>
        </div>
    </DashboardLayout>
  )
}
