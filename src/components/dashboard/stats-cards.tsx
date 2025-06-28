import { Users, Calendar, FileText, TrendingUp } from "lucide-react"

export default function StatsCards() {
  const stats = [
    {
      title: "Total Clients",
      value: "127",
      change: "+12%",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "This Month's Appointments",
      value: "48",
      change: "+8%",
      icon: Calendar,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Blog Posts",
      value: "24",
      change: "+3%",
      icon: FileText,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Engagement Rate",
      value: "94%",
      change: "+5%",
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">{stat.title}</p>
                <p className="text-2xl font-bold text-green-900 mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
