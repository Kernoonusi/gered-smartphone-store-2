import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import "./header.css";
import { ProfileButton } from './profileButton';
import { Footer } from './footer';

interface AppHeaderLayoutProps {
  children: React.ReactNode;
}

function SkeletonBrands() {
  return (
    <>
      <Skeleton className="h-14 w-28" />
      <Skeleton className="h-14 w-28" />
      <Skeleton className="h-14 w-28" />
      <Skeleton className="h-14 w-28" />
      <Skeleton className="h-14 w-28" />
      <Skeleton className="h-14 w-28" />
      <Skeleton className="h-14 w-28" />
    </>
  );
}

export default function AppHeaderLayout({ children }: AppHeaderLayoutProps) {
  const { brands } = usePage<{ brands: { brand: string }[] }>().props;

  return (
    <>
      <header className="overflow-hidden">
        <div className="hidden w-screen flex-col items-center overflow-hidden md:flex">
          <div className="hidden w-10/12 grid-cols-[auto_auto_auto_auto_1fr_auto] grid-rows-1 gap-2 md:grid">
            <Link href="/about" className="border-opacity-0 hover:border-opacity-100 h-full border-b border-black p-2 text-sm transition-all">
              О компании
            </Link>
            <Link href="/delivery" className="border-opacity-0 hover:border-opacity-100 h-full border-b border-black p-2 text-sm transition-all">
              Доставка
            </Link>
            <Link href="/warranty" className="border-opacity-0 hover:border-opacity-100 h-full border-b border-black p-2 text-sm transition-all">
              Гарантия
            </Link>
            <Link href="/contacts" className="border-opacity-0 hover:border-opacity-100 h-full border-b border-black p-2 text-sm transition-all">
              Контакты
            </Link>
            <div />
            <div className="flex gap-4">
              <p className="h-full self-end p-2 text-sm font-semibold transition">+7 (999) 999-99-99</p>
              <p className="h-full self-end p-2 text-sm font-semibold transition">+7 (999) 999-99-99</p>
            </div>
          </div>
          <hr className="w-full overflow-hidden" />
          <nav className="grid w-10/12 grid-cols-[auto_1fr_auto] items-center gap-12 py-2">
            <Link href="/" className="h-full p-2 text-3xl transition-all">
              Gered Store
            </Link>
            <div />
            <div>
              <Link href="/cart">
                <Button variant="ghost" className="h-full gap-4">
                  Корзина
                  <ShoppingCart />
                </Button>
              </Link>
              <ProfileButton rounded />
            </div>
          </nav>
        </div>
      </header>
      <nav className="sticky top-0 z-50 overflow-hidden">
        <div className="top-0 flex w-screen justify-center gap-4 overflow-hidden bg-fuchsia-900 transition-all md:gap-1">
          <Link href="/" className="anim-elem h-full w-fit p-2 text-3xl text-cyan-300 transition-all md:flex">
            G
          </Link>
          <Link href="/products">
            <Button variant={'ghost'} className="rounded-none py-7 text-2xl text-white md:mr-10">
              Все смартфоны
            </Button>
          </Link>
          <div className="flex">
            {brands.length == 0 ? (
              <SkeletonBrands />
            ) : (
              brands.map(({ brand }) => (
                <Button
                  variant={'ghost'}
                  className="hidden rounded-none py-7 text-2xl text-gray-300 even:hidden lg:flex xl:text-xl xl:even:flex 2xl:text-2xl"
                  key={brand}
                  asChild
                >
                  <Link href={`/products?brandSearch=${brand}`}>
                    {brand}
                  </Link>
                </Button>
              ))
            )}
          </div>
          <div className="anim-elem text-white md:ml-10">
            <Link href="/cart">
              <Button variant="ghost" className="h-full gap-4 rounded-none">
                <p className="hidden md:block">Корзина</p>
                <ShoppingCart />
              </Button>
            </Link>
            <ProfileButton />
          </div>
        </div>
      </nav>
      {children}
      <Footer />
    </>
  );
}
