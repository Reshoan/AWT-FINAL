import { SignUp } from "@clerk/nextjs"
import { Leaf } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2 w-fit">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">NutriHub</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-900 mb-2">Join NutriHub</h1>
            <p className="text-green-700">Start your journey to better health today</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white",
                  socialButtonsBlockButton: "border-green-200 hover:bg-green-50",
                  socialButtonsBlockButtonText: "text-green-700",
                  formFieldInput: "border-green-200 focus:border-green-500 focus:ring-green-500",
                  footerActionLink: "text-green-600 hover:text-green-700",
                  identityPreviewText: "text-green-700",
                  identityPreviewEditButton: "text-green-600 hover:text-green-700",
                },
              }}
              redirectUrl="/sign-in"
              signInUrl="/sign-in"
            />
          </div>

          <div className="text-center mt-6">
            <p className="text-green-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-semibold hover:text-green-700 underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-green-100 bg-white/50 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-600 text-sm">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-green-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-green-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
