import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ProfileButton } from '@/layouts/app/profileButton';
import type { Order } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, ShoppingCart } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Footer } from './footer';
import './header.css';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface AppHeaderLayoutProps {
  children: React.ReactNode;
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
  );
}

export default function AppHeaderLayout({ children }: AppHeaderLayoutProps) {
  const { brands, cart } = usePage<{ brands: { brand: string }[]; cart: Order | null }>().props;
  const [scrolled, setScrolled] = useState(false);
  const [supportsScrollTimeline, setSupportsScrollTimeline] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLaravelReactI18n();

  useEffect(() => {
    // Check if browser supports scroll-driven animations
    const checkSupport = () => {
      try {
        return CSS.supports('animation-timeline: scroll()');
      } catch (e) {
        console.error('Browser does not support scroll-driven animations:', e);
        return false;
      }
    };

    const hasSupport = checkSupport();
    setSupportsScrollTimeline(hasSupport);

    // Only add JS-based scroll listener if browser doesn't support scroll-driven animations
    if (!hasSupport) {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 50;
        setScrolled(isScrolled);
      };

      // Initial check
      handleScroll();

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scrollClass = !supportsScrollTimeline && scrolled ? 'js-scrolled' : '';

  return (
    <>
      {/* Top info bar with glassmorphism */}
      <div className={`hidden w-full border-b border-white/10 bg-white/5 backdrop-blur-md md:block ${scrollClass}`}>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_auto_auto_auto_1fr_auto] items-center px-6 py-3">
          <Link href="/about" className="px-3 text-sm font-medium text-white/80 transition-colors hover:text-white">
            {t('header.about')}
          </Link>
          <Link href="/delivery" className="px-3 text-sm font-medium text-white/80 transition-colors hover:text-white">
            {t('header.delivery')}
          </Link>
          <Link href="/warranty" className="px-3 text-sm font-medium text-white/80 transition-colors hover:text-white">
            {t('header.warranty')}
          </Link>
          <Link href="/contacts" className="px-3 text-sm font-medium text-white/80 transition-colors hover:text-white">
            {t('header.contacts')}
          </Link>
          <div />
          <div className="flex gap-4">
            <p className="text-sm font-medium text-white/90">+7 (999) 999-99-99</p>
            <p className="text-sm font-medium text-white/90">+7 (999) 999-99-99</p>
          </div>
        </div>
      </div>

      {/* Combined header and navigation with shrink effect */}
      <header className={`header-container sticky top-0 z-50 ${scrollClass}`} id="main-header">
        <div className="w-full border-b border-fuchsia-500/20 bg-fuchsia-900/80 shadow-lg backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4">
            {/* Main header with logo and cart - visible when not scrolled on desktop */}
            <div className="main-header hidden sm:flex items-center justify-between">
              <Link href="/" className="bg-gradient-to-r from-cyan-300 to-fuchsia-500 bg-clip-text text-3xl font-bold text-transparent">
                {t('header.title')}
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/cart">
                  <Button variant="ghost" className="group relative rounded-full bg-white/10 px-5 text-white hover:bg-white/20">
                    <span>{t('header.cart')}</span>
                    <ShoppingCart className="ml-2" />
                    {cart && cart.items.length > 0 ? (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500 text-xs text-white">
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
                <Link href="/" className="logo-full bg-gradient-to-r from-cyan-300 to-fuchsia-500 bg-clip-text font-bold text-transparent">
                  {t('header.title')}
                </Link>

                <Link href="/search">
                  <Button variant="ghost" className="nav-button h-full rounded-none text-white hover:bg-white/10">
                    {t('header.all_phones')}
                  </Button>
                </Link>

                <div className="scrollbar-hide hidden sm:flex">
                  {brands.length === 0 ? (
                    <SkeletonBrands />
                  ) : (
                    brands.map(({ brand }) => (
                      <Button
                        variant="ghost"
                        className="nav-button h-full rounded-none text-gray-300 hover:bg-white/10 hover:text-white"
                        key={brand}
                        asChild
                      >
                        <Link href={`/search?brand=${brand}`}>{brand}</Link>
                      </Button>
                    ))
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Hamburger mobile toggle */}
                <Button variant="ghost" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  <Menu />
                </Button>

                {/* Cart button - visibility controlled by CSS */}
                <Link href="/cart" className="cart-button-mobile md:hidden">
                  <Button variant="ghost" className="relative rounded-none text-white hover:bg-white/10">
                    <ShoppingCart />
                    {cart && cart.items.length > 0 ? (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500 text-xs text-white">
                        {cart.items.reduce((acc, item) => acc + item.count, 0)}
                      </span>
                    ) : null}
                  </Button>
                </Link>
                <Link href="/cart" className="cart-button-desktop hidden md:block">
                  <Button variant="ghost" className="relative rounded-none text-white hover:bg-white/10">
                    <ShoppingCart />
                    {cart && cart.items.length > 0 ? (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500 text-xs text-white">
                        {cart.items.reduce((acc, item) => acc + item.count, 0)}
                      </span>
                    ) : null}
                  </Button>
                </Link>
                <ProfileButton className="profile-button" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="bg-fuchsia-900/80 shadow-lg backdrop-blur-md md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
              <Link href="/about" className="py-1 text-white hover:underline">
                {t('header.about')}
              </Link>
              <Link href="/delivery" className="py-1 text-white hover:underline">
                {t('header.delivery')}
              </Link>
              <Link href="/warranty" className="py-1 text-white hover:underline">
                {t('header.warranty')}
              </Link>
              <Link href="/contacts" className="py-1 text-white hover:underline">
                {t('header.contacts')}
              </Link>
            </div>
          </nav>
        )}
      </header>

      {children}

      <Footer />
    </>
  );
}
