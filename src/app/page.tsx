import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Heart, Users, Award, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ImageCarousel from "@/components/image-carousel"

export default function LandingPage() {
  const { userId } = auth()
      if (userId != null) redirect("/dashboard")

  const nutritionistImages = [
    {
      src: "/woman.jpg",
      alt: "Professional Female Nutritionist",
    },
    {
      src: "/man.jpg",
      alt: "Professional Male Nutritionist",
    },
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Extra Large Logo */}
              <div className="flex items-center space-x-6">
                <Leaf className="h-20 w-20 md:h-24 md:w-24 text-green-600" />
                <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-green-800">NutriHub</span>
              </div>

              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Professional Nutrition Guidance
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
                  Transform Your Health with
                  <span className="text-green-600"> Expert Nutrition</span>
                </h1>
                <p className="text-xl text-green-700 leading-relaxed">
                  Get expert guidance, and ongoing support from certified nutritionists. Start
                  your journey to better health today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <SignedOut>
                  <Link href="/book">
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg w-full sm:w-auto"
                    >
                      Book an Appointment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg w-full sm:w-auto"
                    >
                      Access Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </SignedIn>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg bg-transparent w-full sm:w-auto"
                >
                  Read Our Blog
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-700">Certified Nutritionists</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/man.jpg"
                  alt="Professional Nutritionist"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Are you an aspiring nutritionist?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join your peers in helping hundreds of satisfied clients who have transformed their lives with our expert nutrition guidance
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                >
                  Join Us!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold bg-transparent w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
                >
                  Access Your Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">NutriHub</span>
              </div>
              <p className="text-green-200">
                Your trusted partner in achieving optimal health through personalized nutrition.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-green-400">Contact</h3>
              <ul className="space-y-2 text-green-200">
                <li>reshoanyazdi@gmail.com</li>
                <li>(+880) 1722388407</li>
                <li>Dhaka, Bangladesh</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-200">
            <p>&copy; {new Date().getFullYear()} NutriHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
