import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/app-layout';
import { type SmartphoneFull } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronRight, Clock, Gift, Star, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

// Import shadcn carousel components
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { currencyFormatter } from '@/utils/currencyFormatter';

interface PageProps {
  smartphones: SmartphoneFull[];
  heroSlides: {
    id: number;
    title: string;
    subtitle: string;
    buttonText: string;
    image: string;
    backgroundColor: string;
    productId: number;
    created_at: string;
    updated_at: string;
  }[];
  [key: string]: unknown;
}

export default function Welcome() {
  const { smartphones, heroSlides } = usePage<PageProps>().props;
  const [isVisible, setIsVisible] = useState(false);

  // Featured products
  const featuredProducts = smartphones.slice(0, 3);

  // Trending products
  const trendingProducts = smartphones.slice(0, 5);

  // Recommended products
  const recommendedProducts = smartphones.slice(0, 5);

  // Limited time offers
  const limitedTimeOffers = smartphones.slice(0, 5);

  const brandsToShow = [
    {
      name: 'Apple',
      logo: '/brands/apple-logo.svg',
    },
    {
      name: 'Samsung',
      logo: '/brands/samsung.webp',
    },
    {
      name: 'Xiaomi',
      logo: '/brands/xiaomi.webp',
    },
    {
      name: 'Huawei',
      logo: '/brands/huawei.webp',
    },
  ];
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout>
      <Head title="Welcome"></Head>
      <main className={`mx-auto w-full transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section with Carousel */}
        <section className="relative h-full overflow-hidden">
          <Carousel className="h-full" opts={{ loop: true }}>
            <CarouselContent className="h-full">
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className={`flex h-full w-full items-center ${slide.backgroundColor}`}>
                    <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-8 md:flex-row">
                      <div className="flex flex-col gap-6 text-center md:w-1/2 md:text-left">
                        <div>
                          <h1 className="mt-2 text-5xl font-bold text-white md:text-6xl">{slide.title}</h1>
                          <p className="mt-4 text-xl text-white/90">{slide.subtitle}</p>
                        </div>
                        <Button
                          className="mx-auto w-fit rounded-full bg-white px-8 py-6 text-base font-semibold text-black transition-all duration-300 hover:scale-105 md:mx-0"
                          asChild
                        >
                          <Link href={`/product/${slide.productId}`}>{slide.buttonText}</Link>
                        </Button>
                      </div>
                      <div className="md:w-1/2">
                        <img
                          src={slide.image}
                          srcSet={slide.image}
                          onError={(e) => {
                            e.currentTarget.src = slide.image;
                            e.currentTarget.srcset = slide.image;
                          }}
                          alt={slide.title}
                          className="mx-auto h-[40vh] object-contain drop-shadow-2xl md:h-[50vh]"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 border-none bg-white/20 text-white backdrop-blur-sm hover:bg-white/30" />
            <CarouselNext className="right-4 border-none bg-white/20 text-white backdrop-blur-sm hover:bg-white/30" />
          </Carousel>
        </section>

        {/* Featured Products */}
        <section className="mx-auto mt-16 flex max-w-7xl flex-col gap-5 py-6">
          <h2 className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-center text-3xl font-bold text-transparent">
            Интересные предложения
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((item, index) => (
              <div
                key={index}
                className="group relative min-h-[280px] overflow-hidden rounded-2xl border border-fuchsia-500/20 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={item.images[0]?.image_path || '/placeholder.svg?height=280&width=400'}
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg?height=280&width=400';
                    }}
                    alt={`${item.brand} ${item.model}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-60 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-br from-fuchsia-400 to-pink-500 opacity-40 transition-transform duration-300 group-hover:scale-110" />

                {/* Content overlay */}
                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
                    <h3 className="mb-2 text-2xl leading-tight font-bold text-white">
                      {item.brand} {item.model}
                    </h3>
                    <p className="mb-4 text-sm font-semibold text-cyan-200">{currencyFormatter.format(item.price)}</p>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full border-white/50 bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white"
                    >
                      <a href={route('product.show', { id: item.id })}>Подробнее</a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Showcase */}
        <section className="mx-auto mt-20 flex max-w-7xl flex-col gap-12 py-8">
          <div className="text-center">
            <h2 className="mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-4xl font-bold text-transparent">Наши бренды</h2>
            <p className="text-xl text-gray-300">Работаем только с проверенными производителями мирового уровня</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {brandsToShow.map((brand, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-gradient-to-br hover:from-cyan-400/10 hover:to-fuchsia-400/10 hover:shadow-lg hover:shadow-cyan-400/20"
              >
                {/* Декоративный фон */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Контент */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-20 w-full items-center justify-center">
                    <img
                      src={brand.logo || '/placeholder.svg'}
                      alt={`${brand.name} logo`}
                      className="max-h-16 max-w-full object-contain filter transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                      onError={(e) => {
                        e.currentTarget.src = `/placeholder.svg?height=64&width=120&text=${brand.name}`;
                      }}
                    />
                  </div>

                  {/* Название бренда */}
                  <h3 className="text-lg font-semibold text-white/90 transition-colors duration-300 group-hover:text-white">{brand.name}</h3>

                  {/* Декоративные элементы */}
                  <div className="mt-4 h-px w-0 bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-500 group-hover:w-full" />
                </div>

                {/* Эффект свечения при наведении */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section className="mx-auto mt-16 max-w-7xl py-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-red-500" />
              <h2 className="text-3xl font-bold">Новинки</h2>
            </div>
            <Link href="/products?sort=new" className="flex items-center gap-1 text-gray-600 hover:text-black">
              Все новинки
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <Carousel className="w-full" opts={{ align: 'start' }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {trendingProducts.map((item) => (
                <CarouselItem key={item.id} className="basis-full pl-2 sm:basis-2/3 md:basis-1/2 md:pl-4 lg:basis-1/3 xl:basis-1/4">
                  <ProductCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:block" />
            <CarouselNext className="hidden md:block" />
          </Carousel>
        </section>

        {/* Banner */}
        <section className="mx-auto mt-16 max-w-7xl overflow-hidden rounded-xl">
          <div className="relative bg-gradient-to-r from-violet-600 to-indigo-600 py-12">
            <div className="mx-auto w-10/12">
              <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold text-white md:text-4xl">Подпишитесь на наши новости</h2>
                  <p className="mt-4 text-white/90">Будьте в курсе новинок и специальных предложений</p>
                  <div className="mt-6">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Ваш email"
                        className="w-full rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 pr-32 text-white placeholder-white/70 backdrop-blur-sm focus:border-white/60 focus:ring-2 focus:ring-white/20 focus:outline-none"
                      />
                      <button className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white px-6 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-white/90">
                        Подписаться
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative h-40 w-40 md:h-60 md:w-60">
                  <div
                    className="absolute inset-0 animate-spin rounded-full border-4 border-dashed border-white/30"
                    style={{ animationDuration: '30s' }}
                  />
                  <div className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Gift className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Products */}
        <section className="mx-auto mt-16 max-w-7xl py-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-amber-500" />
              <h2 className="text-3xl font-bold">Рекомендуем</h2>
            </div>
            <Link href="/products?sort=recommended" className="flex items-center gap-1 text-gray-600 hover:text-black">
              Все товары
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <Carousel className="w-full" opts={{ align: 'start' }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {recommendedProducts.map((item) => (
                <CarouselItem key={item.id} className="basis-full pl-2 sm:basis-2/3 md:basis-1/2 md:pl-4 lg:basis-1/3 xl:basis-1/4">
                  <ProductCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:block" />
            <CarouselNext className="hidden md:block" />
          </Carousel>
        </section>

        {/* Limited Time Offers */}
        <section className="mx-auto mt-16 max-w-7xl py-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-orange-500" />
              <h2 className="text-3xl font-bold">Ограниченные предложения</h2>
            </div>
            <Link href="/products?sort=deals" className="flex items-center gap-1 text-gray-600 hover:text-black">
              Все акции
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <Carousel className="w-full" opts={{ align: 'start' }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {limitedTimeOffers.map((item) => (
                <CarouselItem key={item.id} className="relative basis-full pl-2 sm:basis-2/3 md:basis-1/2 md:pl-4 lg:basis-1/3 xl:basis-1/4">
                  <div className="absolute top-2 left-6 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">-15%</div>
                  <ProductCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:block" />
            <CarouselNext className="hidden md:block" />
          </Carousel>
        </section>
      </main>
    </Layout>
  );
}
