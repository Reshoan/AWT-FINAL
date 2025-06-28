import type React from "react"
import { UserButton } from "@clerk/nextjs"
import { Leaf, Home, Calendar, PenTool } from "lucide-react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage: "dashboard" | "appointments" | "blog"
}

export default function DashboardLayout({ children, currentPage }: DashboardLayoutProps) {
  const navItems = [
    {
      id: "dashboard",
      icon: Home,
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      id: "appointments",
      icon: Calendar,
      href: "/appointments",
      label: "Appointments",
    },
    {
      id: "blog",
      icon: PenTool,
      href: "/blog",
      label: "Blog",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex">
      {/* Lime Green Sidebar */}
      <div className="w-20 bg-lime-500 flex flex-col items-center py-6 shadow-lg">
        {/* Logo */}
        <div className="mb-8">
          <Leaf className="h-8 w-8 text-white" />
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-6">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`p-3 rounded-xl transition-all duration-200 group relative ${
                  isActive ? "bg-white text-lime-600 shadow-lg" : "text-white hover:bg-lime-400"
                }`}
                title={item.label}
              >
                <Icon className="h-6 w-6" />

                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* User Button at Bottom */}
        <div className="mt-auto">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}
