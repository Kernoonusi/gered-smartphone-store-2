import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Order } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { animate } from 'animejs';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Heart, Menu, ShoppingCart } from 'lucide-react';
import type React from 'react';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import './header.css';

const Footer = lazy(() => import('@/layouts/app/footer'));
const ProfileButton = lazy(() => import('@/layouts/app/profileButton'));

interface AppHeaderLayoutProps {
  children: React.ReactNode;
}

function SkeletonBrands() {
  return (
    <>
      <Skeleton className="h-10 w-24 bg-white/10" />
      <Skeleton className="h-10 w-24 bg-white/10" />
      <Skeleton className="h-10 w-24 bg-white/10" />
      <Skeleton className="h-10 w-24 bg-white/10" />
      <Skeleton className="h-10 w-24 bg-white/10" />
    </>
  );
}

export default function AppHeaderLayout({ children }: AppHeaderLayoutProps) {
  const { brands, cart } = usePage<{ brands: { brand: string }[]; cart: Order | null }>().props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLaravelReactI18n();
  const [searchQuery, setSearchQuery] = useState('');

  const headerRef = useRef<HTMLElement>(null); // Overall header element
  const animatedHeaderContentRef = useRef<HTMLDivElement>(null); // The div whose padding will be animated
  const logoRef = useRef<HTMLAnchorElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const cartButtonRef = useRef<HTMLAnchorElement>(null);
  const profileButtonContainerRef = useRef<HTMLDivElement>(null);

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.get('/search', { search: searchQuery });
  }

  useEffect(() => {
    const headerContentEl = animatedHeaderContentRef.current;
    const logoEl = logoRef.current;
    const searchInputEl = searchInputRef.current;
    const cartButtonEl = cartButtonRef.current;
    const profileContainerEl = profileButtonContainerRef.current;

    if (!headerContentEl) return;

    const navButtons = headerContentEl.querySelectorAll('.nav-button');

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = lastScrollY > 50; // Threshold for shrinking

          // Animate header container padding (simulates shrinking)
          animate(headerContentEl, {
            paddingTop: isScrolled ? '0.5rem' : '1rem',
            paddingBottom: isScrolled ? '0.5rem' : '1rem',
            duration: 300,
            easing: 'easeOutQuad',
          });

          // Animate Logo
          if (logoEl) {
            animate(logoEl, {
              fontSize: isScrolled ? '1.875rem' : '2.25rem', // Tailwind: text-xl to text-2xl/3xl
              duration: 300,
              easing: 'easeOutQuad',
            });
          }

          // Animate Nav Buttons
          if (navButtons && navButtons.length > 0) {
            animate(navButtons, {
              fontSize: isScrolled ? '0.875rem' : '1rem', // Tailwind: text-sm to text-base
              paddingTop: isScrolled ? '0.5rem' : '0.75rem',
              paddingBottom: isScrolled ? '0.5rem' : '0.75rem',
              duration: 300,
              easing: 'easeOutQuad',
            });
          }

          // Animate Search Input
          if (searchInputEl) {
            animate(searchInputEl, {
              height: isScrolled ? '2rem' : '2.5rem', // Tailwind: h-8 to h-10
              fontSize: isScrolled ? '0.875rem' : '1rem',
              paddingTop: isScrolled ? '0.25rem' : '0.5rem',
              paddingBottom: isScrolled ? '0.25rem' : '0.5rem',
              duration: 300,
              easing: 'easeOutQuad',
            });
          }

          // Animate Cart Button (scale)
          if (cartButtonEl) {
            animate(cartButtonEl, {
              scale: isScrolled ? 0.9 : 1,
              duration: 300,
              easing: 'easeOutQuad',
            });
          }

          // Animate Profile Button container (scale)
          if (profileContainerEl) {
            animate(profileContainerEl, {
              scale: isScrolled ? 0.9 : 1,
              duration: 300,
              easing: 'easeOutQuad',
            });
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll(); // Set initial state based on scroll position
    window.addEventListener('scroll', handleScroll, { passive: true });
  }, [t, brands]); // Added brands as it affects navButtons

  return (
    <>
      {/* Top info bar - remains unchanged */}
      <div className={`hidden w-full border-b border-white/10 bg-white/5 backdrop-blur-md md:block`}>
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

      {/* Unified, shrinkable header */}
      <header ref={headerRef} className={`header-container sticky top-0 z-50`} id="main-header">
        <div ref={animatedHeaderContentRef} className="w-full border-b border-fuchsia-500/20 bg-fuchsia-900/80 py-4 shadow-lg backdrop-blur-md">
          {/* Added py-4 for initial padding, will be animated */}
          <div className="mx-auto flex items-center justify-between px-4 lg:w-4/5">
            {/* Left side: Logo + Nav */}
            <div className="flex flex-shrink-0 items-center">
              <Link
                ref={logoRef}
                href="/"
                className="mr-2 bg-gradient-to-r from-cyan-300 to-fuchsia-500 bg-clip-text text-3xl font-bold text-transparent sm:mr-4"
              >
                {t('header.title')}
              </Link>
              <nav className="scrollbar-hide hidden items-center sm:flex">
                <Link href="/search">
                  <Button variant="ghost" className="nav-button h-full rounded-none px-2 py-2 text-base text-white hover:bg-white/10">
                    {t('header.all_phones')}
                  </Button>
                </Link>
                {brands.length === 0 ? (
                  <SkeletonBrands />
                ) : (
                  brands.map(({ brand }) => (
                    <Button
                      variant="ghost"
                      className="nav-button h-full rounded-none px-2 py-2 text-base text-gray-300 hover:bg-white/10 hover:text-white"
                      key={brand}
                      asChild
                    >
                      <Link href={`/search?brand=${brand}`}>{brand}</Link>
                    </Button>
                  ))
                )}
              </nav>
            </div>

            {/* Center: Search Form - adjusted for better flex behavior */}
            <form onSubmit={handleSearchSubmit} className="ml-2 hidden max-w-md min-w-0 flex-grow items-center sm:ml-4 sm:flex">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('header.search')}
                className="h-10 w-full rounded bg-white/10 px-3 py-2 text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
              />
            </form>

            {/* Right side: Cart, Profile, Mobile Menu */}
            <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2 sm:ml-2">
              <Link href="/favorites" className="hidden sm:block">
                <Button variant="ghost" className="h-10 w-10 rounded-full p-2 text-white hover:bg-white/20">
                  <Heart className="h-6 w-6" />
                </Button>
              </Link>
              <Button variant="ghost" className="p-2 text-white md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
              <Link ref={cartButtonRef} href="/cart">
                <Button variant="ghost" className="h-10 w-10 rounded-full p-2 text-white hover:bg-white/20">
                  <ShoppingCart className="h-6 w-6" />
                  {cart && cart.items.length > 0 ? (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500 text-xs text-white">
                      {cart.items.reduce((acc, item) => acc + item.count, 0)}
                    </span>
                  ) : null}
                </Button>
              </Link>
              <Suspense fallback={<Skeleton className="h-10 w-10 rounded-full bg-white/10" />}>
                <div ref={profileButtonContainerRef} className="profile-button-container-element">
                  <ProfileButton className="profile-button-element" rounded />
                </div>
              </Suspense>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - remains the same */}
        {mobileMenuOpen && (
          <nav className="bg-fuchsia-900/80 shadow-lg backdrop-blur-md md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
              <Link href="/about" className="py-2 text-white hover:underline" onClick={() => setMobileMenuOpen(false)}>
                {t('header.about')}
              </Link>
              <Link href="/delivery" className="py-2 text-white hover:underline" onClick={() => setMobileMenuOpen(false)}>
                {t('header.delivery')}
              </Link>
              <Link href="/warranty" className="py-2 text-white hover:underline" onClick={() => setMobileMenuOpen(false)}>
                {t('header.warranty')}
              </Link>
              <Link href="/contacts" className="py-2 text-white hover:underline" onClick={() => setMobileMenuOpen(false)}>
                {t('header.contacts')}
              </Link>
              <Link href="/favorites" className="py-2 text-white hover:underline" onClick={() => setMobileMenuOpen(false)}>
                {t('header.favorites')}
              </Link>
              {/* Mobile Search */}
              <form
                onSubmit={(e) => {
                  handleSearchSubmit(e);
                  setMobileMenuOpen(false);
                }}
                className="mt-2 flex items-center"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('header.search')}
                  className="w-full rounded bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
                />
              </form>
              {/* Mobile Brands */}
              <div className="mt-2 flex flex-col">
                <Link href="/search" className="py-2 text-white hover:underline" onClick={() => setMobileMenuOpen(false)}>
                  {t('header.all_phones')}
                </Link>
                {brands.map(({ brand }) => (
                  <Link
                    key={brand}
                    href={`/search?brand=${brand}`}
                    className="py-2 text-gray-300 hover:text-white hover:underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>

      {children}

      <Suspense fallback={<Skeleton className="h-10 w-full bg-white/10" />}>
        <Footer />
      </Suspense>
    </>
  );
}
