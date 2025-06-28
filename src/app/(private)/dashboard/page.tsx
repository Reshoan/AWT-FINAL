import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import UserPanel from "@/components/dashboard/user-panel"
import StatsCards from "@/components/dashboard/stats-cards"
import UpcomingAppointments from "@/components/dashboard/upcoming-appointments"
import BlogStats from "@/components/dashboard/blog-stats"

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <DashboardLayout currentPage="dashboard">
      <div className="flex gap-6 h-full">
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-green-900 mb-2">Dashboard</h1>
            <p className="text-green-700">Welcome back, {user.firstName || "Nutritionist"}!</p>
          </div>

          <StatsCards />

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-green-900">New appointment booked</p>
                    <p className="text-xs text-green-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-green-900">Blog post published</p>
                    <p className="text-xs text-green-600">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-green-900">Client consultation completed</p>
                    <p className="text-xs text-green-600">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
                  <div className="text-green-600 font-medium">Schedule</div>
                  <div className="text-green-600 font-medium">Appointment</div>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
                  <div className="text-green-600 font-medium">Write</div>
                  <div className="text-green-600 font-medium">Blog Post</div>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
                  <div className="text-green-600 font-medium">View</div>
                  <div className="text-green-600 font-medium">Analytics</div>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
                  <div className="text-green-600 font-medium">Manage</div>
                  <div className="text-green-600 font-medium">Clients</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Dark Green */}
        <div className="w-80 bg-green-800 rounded-xl shadow-lg text-white">
          <UserPanel user={user} />
          <div className="p-6 space-y-6">
            <UpcomingAppointments />
            <BlogStats />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
