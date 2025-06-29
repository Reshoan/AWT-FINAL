import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Clock, User, Plus} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScheduleForm } from "@/components/forms/ScheduleForm"
import Link from "next/link"
import { CopyEventButton } from "@/components/CopyEventButton"
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
import { cn } from "@/lib/utils"
import { auth } from "@clerk/nextjs/server"
import { CalendarPlus, CalendarRange } from "lucide-react"


export default async function AppointmentsPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const { userId, redirectToSignIn } = auth()

  if (userId == null) return redirectToSignIn()

  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  })

  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    with: { availabilities: true },
  })

  return (
    <DashboardLayout currentPage="appointments">
       <div>
            <h1 className="text-5xl font-bold text-green-900 mb-2 flex justify-center">Appointments</h1>
            <p className="text-green-700 flex justify-center">Manage your client appointments and schedule</p>
          </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
         
          
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Half - Calendar and Appointments */}
          <div className="space-y-6">
            <div className="flex gap-4 items-baseline flex justify-center">
                    <h1 className="text-2xl font-bold text-green-700 mb-2 flex justify-center">
                      Appointment Types
                    </h1>
                    
                  </div>
                  <div className="flex justify-center mb-4">
                    <Link href="/events/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2 flex justify-center" />
              New Appointment
            </Button>
          </Link>
                  </div>
                  {events.length > 0 ? (
                    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
                      {events.map(event => (
                        <EventCard key={event.id} {...event} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-green-700 flex justify-center">
                      You do not have any events yet. Create your first event to get
                      started!
                      </p>
                    </div>
                  )}
          </div>

          {/* Right Half - Schedule Form */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <ScheduleForm schedule={schedule} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
type EventCardProps = {
  id: string
  isActive: boolean
  name: string
  description: string | null
  durationInMinutes: number
  clerkUserId: string
}

function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <Card className={cn("flex flex-col", !isActive && "border-secondary/50")}>
      <CardHeader className={cn(!isActive && "opacity-50", "text-green-900 flex justify-center")}>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description != null && (
        <CardContent className={cn(!isActive && "opacity-50")}>
          {description}
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2 mt-auto">
        {isActive && (
          <CopyEventButton
            variant="outline"
            eventId={id}
            clerkUserId={clerkUserId}
          />
        )}
        <Button asChild  className="bg-green-600 hover:bg-green-700">
          <Link href={`/events/${id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}