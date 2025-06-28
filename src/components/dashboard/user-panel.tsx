import type { User } from "@clerk/nextjs/server"
import Image from "next/image"

interface UserPanelProps {
  user: User
}

export default function UserPanel({ user }: UserPanelProps) {
  return (
    <div className="p-6 border-b border-green-700">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <Image
            src={user.imageUrl || "/placeholder.svg?height=80&width=80"}
            alt={user.firstName || "User"}
            width={80}
            height={80}
            className="rounded-full border-4 border-green-600 object-cover"
          />
        </div>
        <h3 className="font-semibold text-lg text-white">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-green-200 text-sm">{user.emailAddresses[0]?.emailAddress}</p>
        <div className="mt-3 px-3 py-1 bg-green-700 rounded-full text-xs text-green-100">Certified Nutritionist</div>
      </div>
    </div>
  )
}
