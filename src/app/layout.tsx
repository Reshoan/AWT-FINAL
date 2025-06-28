import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "NutriHub - Your Nutrition Partner",
  description: "Professional nutrition guidance and personalized meal planning",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
