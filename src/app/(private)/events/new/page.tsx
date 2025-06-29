import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { EventForm } from "@/components/forms/EventForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewEventPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <DashboardLayout currentPage="appointments">
      <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold text-green-900 mb-2 flex justify-center">Create New Appointment</h1>
            <p className="text-green-700 flex justify-center">Set up a new appointment type for your clients</p>
          </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-6">Appointment Details</h2>
              <EventForm />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
