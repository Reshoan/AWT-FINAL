import { TrendingUp, Eye, Heart, MessageCircle } from "lucide-react"

export default function BlogStats() {
  const stats = [
    {
      label: "Latest Post Views",
      value: "245",
      change: "+12%",
      icon: Eye,
    },
    {
      label: "Total Likes",
      value: "1.8K",
      change: "+8%",
      icon: Heart,
    },
    {
      label: "Comments",
      value: "342",
      change: "+15%",
      icon: MessageCircle,
    },
  ]

  return (
    <div>
      <h3 className="font-semibold text-white mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        Blog Performance
      </h3>
      <div className="space-y-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-green-700 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className="w-4 h-4 text-green-300 mr-2" />
                  <span className="text-green-200 text-xs">{stat.label}</span>
                </div>
                <span className="text-green-300 text-xs">{stat.change}</span>
              </div>
              <div className="text-white font-semibold text-lg mt-1">{stat.value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
