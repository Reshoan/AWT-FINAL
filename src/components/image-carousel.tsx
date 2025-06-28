"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ImageCarouselProps {
  images: Array<{
    src: string
    alt: string
  }>
  interval?: number
}

export default function ImageCarousel({ images, interval = 4000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            width={500}
            height={600}
            className="w-full h-full object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent" />

      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
