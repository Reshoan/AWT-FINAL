import { LoaderCircle, Leaf } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Leaf className="h-12 w-12 text-green-600" />
          <span className="text-3xl font-bold text-green-800">NutriHub</span>
        </div>

        {/* Loading Text */}
        <div className="text-2xl font-semibold text-green-900">Loading...</div>

        {/* Spinner */}
        <LoaderCircle className="w-16 h-16 text-green-600 animate-spin" />
      </div>
    </div>
  )
}
