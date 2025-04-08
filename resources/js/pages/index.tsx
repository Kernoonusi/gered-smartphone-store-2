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

export default function Welcome() {
  const { smartphones } = usePage<{ smartphones: SmartphoneFull[] }>().props;
  const [isVisible, setIsVisible] = useState(false);

  // Featured products
  const featuredProducts = smartphones.slice(0, 3);

  // Trending products
  const trendingProducts = smartphones.slice(0, 5);

  // Recommended products
  const recommendedProducts = smartphones.slice(0, 5);

  // Limited time offers
  const limitedTimeOffers = smartphones.slice(0, 5);

  // Hero banner slides
  const heroSlides = [
    {
      title: 'Новый XPhone Pro',
      subtitle: 'Революционная камера, невероятная производительность',
      buttonText: 'Смотреть',
      image: 'iphone16.png',
      backgroundColor: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      productId: 23,
    },
    {
      title: 'Samsung Galaxy S Ultra',
      subtitle: 'Безграничные возможности в ваших руках',
      buttonText: 'Подробнее',
      image: 'samsung.png',
      backgroundColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      productId: 24,
    },
    {
      title: 'Специальное предложение',
      subtitle: 'Скидки до 30% на аксессуары при покупке смартфона',
      buttonText: 'Получить скидку',
      image: 'accessories.png',
      backgroundColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
      productId: 25,
    },
  ];

  // Fade-in effect on load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout>
      <Head title="Welcome"></Head>
      <main className={`mx-auto w-full transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section with Carousel */}
        <section className="relative h-[80vh] overflow-hidden">
          <Carousel className="h-full" opts={{ loop: true }}>
            <CarouselContent className="h-full">
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className={`flex h-full w-full items-center ${slide.backgroundColor}`}>
                    <div className="mx-auto flex w-10/12 flex-col-reverse items-center justify-between gap-8 md:flex-row">
                      <div className="flex flex-col gap-6 text-center md:w-1/2 md:text-left">
                        <div>
                          <p className="text-lg font-semibold text-white/90 uppercase">Эксклюзивно</p>
                          <h1 className="mt-2 text-5xl font-bold text-white md:text-6xl">{slide.title}</h1>
                          <p className="mt-4 text-xl text-white/90">{slide.subtitle}</p>
                        </div>
                        <Button className="mx-auto w-fit rounded-full bg-white p-8 text-black hover:bg-white/90 md:mx-0" asChild>
                          <Link href={route('product.show', { id: slide.productId })}>{slide.buttonText}</Link>
                        </Button>
                      </div>
                      <div className="md:w-1/2">
                        <img src={slide.image} alt={slide.title} className="mx-auto h-[40vh] object-contain drop-shadow-2xl md:h-[50vh]" />
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
        <section className="mx-auto mt-16 w-10/12 py-6">
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl border-fuchsia-500/20 bg-fuchsia-900/80 shadow-lg backdrop-blur-md p-6 transition-all hover:shadow-lg">
                <div className="absolute -top-10 -right-10 rounded-full bg-cyan-500 p-8 transition-transform group-hover:scale-110" />
                <div className="relative z-10">
                  <h3 className="mb-2 text-xl font-semibold">{item.brand + ' ' + item.model}</h3>
                  <p className="mb-6 text-gray-100">от {currencyFormatter.format(item.price)} ₽</p>
                  <Button asChild variant="outline" className="rounded-full border-white hover:bg-black hover:text-white">
                    <Link href={route('product.show', { id: item.id })}>Подробнее</Link>
                  </Button>
                </div>
                <img
                  src={item.images[0]?.image_path || 'placeholder.png'}
                  alt={item.brand + ' ' + item.model}
                  className="absolute right-0 bottom-0 h-36 w-36 object-contain p-2"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        {/* <section className="mx-auto mt-16 w-10/12 py-6">
          <h2 className="mb-8 text-4xl font-bold">Категории</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {['Смартфоны', 'Планшеты', 'Аксессуары', 'Умные часы'].map((category, index) => (
              <Link href={`/category/${index + 1}`} key={index} className="group relative overflow-hidden rounded-xl">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    index % 4 === 0
                      ? 'from-blue-500 to-cyan-500'
                      : index % 4 === 1
                        ? 'from-purple-500 to-pink-500'
                        : index % 4 === 2
                          ? 'from-amber-500 to-orange-500'
                          : 'from-emerald-500 to-teal-500'
                  } opacity-80 transition-opacity group-hover:opacity-90`}
                />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <h3 className="text-center text-2xl font-bold text-white">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section> */}

        {/* Trending Products */}
        <section className="mx-auto mt-16 w-10/12 py-6">
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
                <CarouselItem key={item.id} className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5">
                  <ProductCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Banner */}
        <section className="mx-auto mt-16 w-10/12 overflow-hidden rounded-xl">
          <div className="relative bg-gradient-to-r from-violet-600 to-indigo-600 py-12">
            <div className="mx-auto w-10/12">
              <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold text-white md:text-4xl">Подпишитесь на наши новости</h2>
                  <p className="mt-4 text-white/90">Будьте в курсе новинок и специальных предложений</p>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <input
                      type="email"
                      placeholder="Ваш email"
                      className="rounded-full px-6 py-3 focus:ring-2 focus:ring-white/20 focus:outline-none"
                    />
                    <Button className="rounded-full bg-white px-6 py-3 text-indigo-600 hover:bg-white/90">Подписаться</Button>
                  </div>
                </div>
                <div className="relative h-40 w-40 md:h-60 md:w-60">
                  <div className="animate-spin-slow absolute inset-0 rounded-full border-4 border-dashed border-white/30" />
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
        <section className="mx-auto mt-16 w-10/12 py-6">
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
                <CarouselItem key={item.id} className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5">
                  <ProductCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Limited Time Offers */}
        <section className="mx-auto mt-16 w-10/12 py-6">
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

          <Carousel className="w-full @container" opts={{ align: 'start' }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {limitedTimeOffers.map((item) => (
                <CarouselItem key={item.id} className="relative basis-full pl-2 @sm:basis-1/2 @md:basis-1/3 md:pl-4 @lg:basis-1/4 @xl:basis-1/5">
                  <div className="absolute top-2 left-6 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">-15%</div>
                  <ProductCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Brand Showcase */}
        <section className="mx-auto mt-16 w-10/12 py-6">
          <h2 className="mb-8 text-center text-3xl font-bold">Наши бренды</h2>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {['apple.svg', 'samsung.svg', 'xiaomi.svg', 'google.svg', 'huawei.svg'].map((brand, index) => (
              <img
                key={index}
                src={`/brands/${brand}`}
                alt="Brand logo"
                className="h-12 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
