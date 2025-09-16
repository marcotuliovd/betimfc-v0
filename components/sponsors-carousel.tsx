"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const sponsors = [
  {
    id: 1,
    name: "Banco Regional",
    logo: "/placeholder.svg?height=80&width=200&text=Banco+Regional",
    category: "Patrocinador Master",
  },
  {
    id: 2,
    name: "Construtora Betim",
    logo: "/placeholder.svg?height=80&width=200&text=Construtora+Betim",
    category: "Patrocinador Oficial",
  },
  {
    id: 3,
    name: "Supermercados Unidos",
    logo: "/placeholder.svg?height=80&width=200&text=Supermercados+Unidos",
    category: "Apoiador",
  },
  {
    id: 4,
    name: "Auto Peças MG",
    logo: "/placeholder.svg?height=80&width=200&text=Auto+Peças+MG",
    category: "Apoiador",
  },
  {
    id: 5,
    name: "Farmácia Central",
    logo: "/placeholder.svg?height=80&width=200&text=Farmácia+Central",
    category: "Apoiador",
  },
  {
    id: 6,
    name: "Pizzaria do Torcedor",
    logo: "/placeholder.svg?height=80&width=200&text=Pizzaria+do+Torcedor",
    category: "Apoiador",
  },
]

export function SponsorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 768) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + itemsPerView >= sponsors.length ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(timer)
  }, [itemsPerView])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerView >= sponsors.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, sponsors.length - itemsPerView) : prevIndex - 1))
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nossos Patrocinadores</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Empresas que acreditam no Betim Futebol e apoiam nossos sonhos
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
                width: `${(sponsors.length * 100) / itemsPerView}%`,
              }}
            >
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="flex-shrink-0 px-4" style={{ width: `${100 / sponsors.length}%` }}>
                  <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
                    <div className="text-center">
                      <img
                        src={sponsor.logo || "/placeholder.svg"}
                        alt={sponsor.name}
                        className="h-16 w-auto mx-auto mb-4 object-contain"
                      />
                      <h3 className="font-semibold text-foreground mb-1">{sponsor.name}</h3>
                      <p className="text-sm text-muted-foreground">{sponsor.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background shadow-md"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background shadow-md"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(sponsors.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / itemsPerView) === index ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              onClick={() => setCurrentIndex(index * itemsPerView)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
