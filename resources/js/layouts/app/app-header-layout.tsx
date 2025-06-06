import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Order } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { animate, onScroll } from 'animejs';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Heart, Menu, Phone, ShoppingCart } from 'lucide-react';
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
  const { t, currentLocale, setLocale } = useLaravelReactI18n();
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
    const isMobile = window.innerWidth < 768;

    if (isMobile) return;

    const headerContentEl = animatedHeaderContentRef.current;
    const logoEl = logoRef.current;
    const searchInputEl = searchInputRef.current;
    const cartButtonEl = cartButtonRef.current;
    const profileContainerEl = profileButtonContainerRef.current;

    if (!headerContentEl) return;

    const navButtons = headerContentEl.querySelectorAll('.nav-button');

    // Header container padding animation
    animate(headerContentEl, {
      paddingTop: ['1rem', '0.5rem'],
      paddingBottom: ['1rem', '0.5rem'],
      duration: 300,
      ease: 'outQuad',
      autoplay: onScroll({
        enter: '50px top',
        leave: 'top top',
        sync: true,
      }),
    });

    // Logo animation
    if (logoEl) {
      animate(logoEl, {
        fontSize: ['2.25rem', '1.875rem'], // Tailwind: text-2xl/3xl to text-xl
        duration: 300,
        ease: 'outQuad',
        autoplay: onScroll({
          enter: '50px top',
          leave: 'top top',
          sync: true,
        }),
      });
    }

    // Nav Buttons animation
    if (navButtons && navButtons.length > 0) {
      animate(navButtons, {
        fontSize: ['1rem', '0.875rem'], // Tailwind: text-base to text-sm
        paddingTop: ['0.75rem', '0.5rem'],
        paddingBottom: ['0.75rem', '0.5rem'],
        duration: 300,
        ease: 'outQuad',
        autoplay: onScroll({
          enter: '50px top',
          leave: 'top top',
          sync: true,
        }),
      });
    }

    // Search Input animation
    if (searchInputEl) {
      animate(searchInputEl, {
        height: ['2.5rem', '2rem'], // Tailwind: h-10 to h-8
        fontSize: ['1rem', '0.875rem'],
        paddingTop: ['0.5rem', '0.25rem'],
        paddingBottom: ['0.5rem', '0.25rem'],
        duration: 300,
        ease: 'outQuad',
        autoplay: onScroll({
          enter: '50px top',
          leave: 'top top',
          sync: true,
        }),
      });
    }

    // Cart Button animation (scale)
    if (cartButtonEl) {
      animate(cartButtonEl, {
        scale: [1, 0.9],
        duration: 300,
        ease: 'outQuad',
        autoplay: onScroll({
          enter: '50px top',
          leave: 'top top',
          sync: true,
        }),
      });
    }

    // Profile Button container animation (scale)
    if (profileContainerEl) {
      animate(profileContainerEl, {
        scale: [1, 0.9],
        duration: 300,
        ease: 'outQuad',
        autoplay: onScroll({
          enter: '50px top',
          leave: 'top top',
          sync: true,
        }),
      });
    }
  }, [t, brands]);

  return (
    <>
      {/* Top info bar - remains unchanged */}
      <div className={`hidden w-full border-b border-white/10 bg-white/5 backdrop-blur-md md:block`}>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_auto_auto_auto_1fr_auto] items-center py-3">
          <Link href="/about" className="pr-3 text-sm font-medium text-white/80 transition-colors hover:text-white">
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
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1 text-sm font-medium text-white/90">
              <Phone className="se inline" size={15} /> +7 (999) 999-99-99
            </p>
            <p className="flex items-center gap-1 text-sm font-medium text-white/90">
              <Phone className="inline" size={15} />
              +7 (999) 999-99-99
            </p>
            <div className="ml-3 flex items-center gap-2">
              <button
                className={`rounded px-2 py-1 text-xs font-medium transition-colors ${currentLocale() === 'ru' ? 'cursor-default text-fuchsia-400' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                onClick={() => {
                  if (currentLocale() !== 'ru') {
                    setLocale('ru');
                    localStorage.setItem('locale', 'ru');
                  }
                }}
                disabled={currentLocale() === 'ru'}
                type="button"
              >
                RU
              </button>
              <button
                className={`rounded px-2 py-1 text-xs font-medium transition-colors ${currentLocale() === 'en' ? 'cursor-default text-fuchsia-400' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                onClick={() => {
                  if (currentLocale() !== 'en') {
                    setLocale('en');
                    localStorage.setItem('locale', 'en');
                  }
                }}
                disabled={currentLocale() === 'en'}
                type="button"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Unified, shrinkable header */}
      <header ref={headerRef} className={`header-container top-0 sticky z-50`} id="main-header">
        <div
          ref={animatedHeaderContentRef}
          className="flex w-full justify-center border-b border-fuchsia-500/20 bg-fuchsia-900/80 py-4 shadow-lg backdrop-blur-md"
        >
          {/* Added py-4 for initial padding, will be animated */}
          <div className="flex w-full max-w-7xl items-center justify-between">
            {/* Left side: Logo + Nav */}
            <div className="flex flex-shrink-0 items-center">
              <Link
                ref={logoRef}
                href="/"
                className="mr-2 bg-gradient-to-r from-cyan-300 to-fuchsia-500 bg-clip-text pl-2 text-xl font-bold text-transparent sm:mr-4 sm:p-0 sm:text-3xl"
              >
                GERED STORE
              </Link>
              <nav className="scrollbar-hide hidden items-center sm:flex sm:gap-2">
                <Button variant="ghost" className="nav-button rounded-full px-2 text-base text-white hover:bg-white/10" asChild>
                  <Link href="/search">{t('header.all_phones')}</Link>
                </Button>
                {brands.length === 0 ? (
                  <SkeletonBrands />
                ) : (
                  brands.map(({ brand }) => (
                    <Button
                      variant="ghost"
                      className="nav-button rounded-full px-2 text-base text-gray-300 hover:bg-white/10 hover:text-white"
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
            <div className="flex flex-shrink-0 items-center gap-1 sm:ml-2 sm:gap-2">
              <Link href="/favorites" className="hidden sm:block">
                <Button variant="ghost" className="h-10 w-10 rounded-full p-2 text-white hover:bg-white/20">
                  <Heart className="h-6 w-6" />
                </Button>
              </Link>
              <Button variant="ghost" className="p-2 text-white md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
              <Link ref={cartButtonRef} href="/cart">
                <Button variant="ghost" className="h-10 w-10 rounded-full text-white hover:bg-white/20">
                  <ShoppingCart className="h-6 w-6" />
                  {cart && cart.items.length > 0 ? (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500 text-xs text-white">
                      {cart.items.reduce((acc, item) => acc + item.count, 0)}
                    </span>
                  ) : null}
                </Button>
              </Link>
              <Suspense fallback={<Skeleton className="h-10 w-10 rounded-full bg-white/10" />}>
                <div ref={profileButtonContainerRef} className="profile-button-container-element pr-0">
                  <ProfileButton className="profile-button-element nav-button" rounded />
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
              {/* Mobile Language Switcher */}
              <div className="mt-2 flex items-center justify-center gap-2 border-t border-white/10 pt-3">
                <button
                  className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${currentLocale() === 'ru' ? 'bg-fuchsia-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'}`}
                  onClick={() => {
                    if (currentLocale() !== 'ru') {
                      setLocale('ru');
                      localStorage.setItem('locale', 'ru');
                      setMobileMenuOpen(false);
                    }
                  }}
                  disabled={currentLocale() === 'ru'}
                  type="button"
                >
                  RU
                </button>
                <button
                  className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${currentLocale() === 'en' ? 'bg-fuchsia-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'}`}
                  onClick={() => {
                    if (currentLocale() !== 'en') {
                      setLocale('en');
                      localStorage.setItem('locale', 'en');
                      setMobileMenuOpen(false);
                    }
                  }}
                  disabled={currentLocale() === 'en'}
                  type="button"
                >
                  EN
                </button>
              </div>
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
