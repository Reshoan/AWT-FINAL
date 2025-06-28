import { Calendar, Clock } from "lucide-react"

export default function UpcomingAppointments() {
  const appointments = [
    {
      id: 1,
      client: "Sarah Johnson",
      time: "10:00 AM",
      date: "Today",
      type: "Initial Consultation",
    },
    {
      id: 2,
      client: "Mike Chen",
      time: "2:00 PM",
      date: "Today",
      type: "Follow-up",
    },
    {
      id: 3,
      client: "Emma Davis",
      time: "9:00 AM",
      date: "Tomorrow",
      type: "Meal Planning",
    },
  ]

  return (
    <div>
      <h3 className="font-semibold text-white mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Upcoming Appointments
      </h3>
      <div className="space-y-3">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-green-700 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white font-medium text-sm">{appointment.client}</span>
              <span className="text-green-200 text-xs">{appointment.date}</span>
            </div>
            <div className="flex items-center text-green-200 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              <span>{appointment.time}</span>
              <span className="ml-2">• {appointment.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
