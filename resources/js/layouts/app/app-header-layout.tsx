import type React from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Link, usePage } from "@inertiajs/react"
import { ShoppingCart } from "lucide-react"
import { ProfileButton } from "@/layouts/app/profileButton"
import { Footer } from "./footer"
import type { Order } from "@/types"
import { useEffect, useState } from "react"

interface AppHeaderLayoutProps {
  children: React.ReactNode
}

function SkeletonBrands() {
  return (
    <>
      <Skeleton className="h-14 w-28 bg-white/10" />
      <Skeleton className="h-14 w-28 bg-white/10" />
      <Skeleton className="h-14 w-28 bg-white/10" />
      <Skeleton className="h-14 w-28 bg-white/10" />
      <Skeleton className="h-14 w-28 bg-white/10" />
      <Skeleton className="h-14 w-28 bg-white/10" />
      <Skeleton className="h-14 w-28 bg-white/10" />
    </>
  )
}

export default function AppHeaderLayout({ children }: AppHeaderLayoutProps) {
  const { brands, cart } = usePage<{ brands: { brand: string }[]; cart: Order | null }>().props
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])
  return (
    <>
      <div className="hidden w-full bg-white/5 backdrop-blur-md border-b border-white/10 md:block">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-[auto_auto_auto_auto_1fr_auto] items-center py-3 px-6">
          <Link href="/about" className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3">
            О компании
          </Link>
          <Link href="/delivery" className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3">
            Доставка
          </Link>
          <Link href="/warranty" className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3">
            Гарантия
          </Link>
          <Link href="/contacts" className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3">
            Контакты
          </Link>
          <div />
          <div className="flex gap-4">
            <p className="text-sm font-medium text-white/90">+7 (999) 999-99-99</p>
            <p className="text-sm font-medium text-white/90">+7 (999) 999-99-99</p>
          </div>
        </div>
      </div>

      {/* Combined header and navigation with shrink effect */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
        <div className="w-full bg-fuchsia-900/80 backdrop-blur-md border-b border-fuchsia-500/20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Main header with logo and cart - visible when not scrolled on desktop */}
            <div
              className={`hidden md:flex justify-between items-center transition-all duration-300 ${scrolled ? "h-0 py-0 opacity-0 overflow-hidden" : "h-auto py-4 opacity-100"}`}
            >
              <Link
                href="/"
                className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-fuchsia-500 bg-clip-text text-transparent"
              >
                Gered Store
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    className="relative group bg-white/10 hover:bg-white/20 text-white rounded-full px-5"
                  >
                    <span>Корзина</span>
                    <ShoppingCart className="ml-2" />
                    {cart && cart.items.length > 0 ? (
                      <span className="absolute -top-2 -right-2 bg-fuchsia-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.items.reduce((acc, item) => acc + item.count, 0)}
                      </span>
                    ) : null}
                  </Button>
                </Link>
                <ProfileButton rounded />
              </div>
            </div>

            {/* Navigation bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Logo - changes size based on scroll */}
                <Link
                  href="/"
                  className={`font-bold bg-gradient-to-r from-cyan-300 to-fuchsia-500 bg-clip-text text-transparent transition-all duration-300 ${
                    scrolled ? "text-xl py-3 px-2" : "text-3xl py-4 px-2 md:hidden"
                  }`}
                >
                  {scrolled ? "Gered Store" : "G"}
                </Link>

                <Link href="/products">
                  <Button
                    variant="ghost"
                    className={`text-white hover:bg-white/10 rounded-none transition-all duration-300 ${
                      scrolled ? "py-3 text-sm" : "py-5"
                    }`}
                  >
                    Все смартфоны
                  </Button>
                </Link>

                <div className="hidden lg:flex overflow-x-auto scrollbar-hide">
                  {brands.length === 0 ? (
                    <SkeletonBrands />
                  ) : (
                    brands.map(({ brand }) => (
                      <Button
                        variant="ghost"
                        className={`rounded-none text-gray-300 hover:text-white hover:bg-white/10 transition-all even:hidden xl:even:flex ${
                          scrolled ? "py-3 text-sm" : "py-5"
                        }`}
                        key={brand}
                        asChild
                      >
                        <Link href={`/products?brandSearch=${brand}`}>{brand}</Link>
                      </Button>
                    ))
                  )}
                </div>
              </div>

              <div className={scrolled ? "hidden md:flex" : "md:hidden" + " items-center"}>
                {/* Cart button - visible when scrolled on desktop */}
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    className={`relative text-white hover:bg-white/10 rounded-none transition-all duration-300 ${
                      scrolled ? "py-3" : ""
                    }`}
                  >
                    <ShoppingCart />
                    {cart && cart.items.length > 0 ? (
                      <span className="absolute -top-2 -right-2 bg-fuchsia-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.items.reduce((acc, item) => acc + item.count, 0)}
                      </span>
                    ) : null}
                  </Button>
                </Link>
                <ProfileButton rounded />
              </div>
            </div>
          </div>
        </div>
      </header>
      {children}
      <Footer />
    </>
  )
}