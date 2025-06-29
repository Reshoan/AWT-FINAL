import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/drizzle/db"
import { formatDateTime } from "@/lib/formatters"
import { clerkClient } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Leaf, Calendar, Mail } from "lucide-react"

export const revalidate = 0

export default async function SuccessPage({
  params: { clerkUserId, eventId },
  searchParams: { startTime },
}: {
  params: { clerkUserId: string; eventId: string }
  searchParams: { startTime: string }
}) {
  const event = await db.query.EventTable.findFirst({
    where: ({ clerkUserId: userIdCol, isActive, id }, { eq, and }) =>
      and(eq(isActive, true), eq(userIdCol, clerkUserId), eq(id, eventId)),
  })

  if (event == null) notFound()

  const calendarUser = await clerkClient().users.getUser(clerkUserId)
  const startTimeDate = new Date(startTime)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2 w-fit">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">NutriHub</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="max-w-xl border-green-100 shadow-lg">
          <CardHeader className="text-center bg-green-50 border-b border-green-100">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-900 mb-2">Booking Confirmed!</CardTitle>
            <CardDescription className="text-lg text-green-700">
              Successfully booked {event.name} with {calendarUser.fullName}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 text-center space-y-6">
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Appointment Details</span>
              </div>
              <p className="text-green-900 font-medium text-lg">{formatDateTime(startTimeDate)}</p>
            </div>

            <div className="flex items-center justify-center gap-2 text-green-600">
              <Mail className="w-5 h-5" />
              <p>You should receive an email confirmation shortly.</p>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/book">Book Another Appointment</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                <Link href="/">Return to Home</Link>
              </Button>
            </div>

            <p className="text-sm text-green-600">You can safely close this page now.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
