import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/drizzle/db"
import { formatEventDescription } from "@/lib/formatters"
import { clerkClient } from "@clerk/nextjs/server"
import Link from "next/link"
import { Leaf, Calendar, Clock } from "lucide-react"


export const revalidate = 0

export default async function BookingPage() {
  const events = await db.query.EventTable.findMany({
    where: ({ isActive }, { eq }) => eq(isActive, true),
    orderBy: ({ name }, { asc, sql }) => asc(sql`lower(${name})`),
  })

  if (events.length === 0) return <div className="text-center mt-10">No events available.</div>

  // Get unique user IDs and fetch user names
  const uniqueUserIds = [...new Set(events.map(e => e.clerkUserId))]
  const users = await Promise.all(
    uniqueUserIds.map(id => clerkClient().users.getUser(id).then(user => ({
      id,
      fullName: user.fullName
    })).catch(() => ({ id, fullName: "Unknown User" })))
  )
  const userMap = Object.fromEntries(users.map(u => [u.id, u.fullName]))

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

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Book Your Appointment</h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Choose from our available nutrition consultation sessions and start your journey to better health.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {events.map((event) => (
            <EventCard key={event.id} {...event} fullName={userMap[event.clerkUserId as keyof typeof userMap] ?? "Unknown User"} />
          ))}
        </div>
      </div>
    </div>
  )
}

type EventCardProps = {
  id: string
  name: string
  clerkUserId: string
  description: string | null
  durationInMinutes: number
  fullName: string
}

function EventCard({ id, name, description, clerkUserId, durationInMinutes, fullName }: EventCardProps) {
  return (
    <Card className="flex flex-col border-green-100 hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-green-900 text-xl">{name}</CardTitle>
        <CardDescription className="text-green-600 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {formatEventDescription(durationInMinutes)} with <strong className="text-green-700">{fullName}</strong>
        </CardDescription>
      </CardHeader>
      {description && (
        <CardContent className="flex-1">
          <p className="text-green-700">{description}</p>
        </CardContent>
      )}
      <CardFooter className="pt-4">
        <Button asChild className="w-full bg-green-600 hover:bg-green-700">
          <Link href={`/book/${clerkUserId}/${id}`}>
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
