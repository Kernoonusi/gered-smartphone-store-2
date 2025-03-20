import CartButton from '@/components/add-cart-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layouts/app-layout';
import { ReviewFull, SmartphoneFull } from '@/types';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { Head, usePage } from '@inertiajs/react';
import { Camera, Cpu, HardDrive, MemoryStick, MonitorSmartphone, Scale, Smartphone, Star, StarHalf } from 'lucide-react';
import { useState } from 'react';

interface PageProps {
  product: SmartphoneFull;
  reviews: ReviewFull[];
  [key: string]: unknown;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 dark:text-gray-600" />
      ))}
    </div>
  );
}

export default function ProductIndex() {
  const { product, reviews } = usePage<PageProps>().props;
  const [mainImage, setMainImage] = useState(product.images.length > 0 ? product.images[0] : null);
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <Layout>
      <Head title={`${product.brand} ${product.model}`} />

      <main className="mx-auto mt-6 flex w-full flex-col gap-12 p-4 md:w-10/12">
        <header className="grid grid-cols-[auto_1fr] gap-4 md:grid-cols-[auto_auto_1fr_auto] md:grid-rows-[auto_auto] md:gap-1">
          <div className="row-span-2 flex flex-col gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.image_path}
                srcSet={'/phone.png'}
                className="h-14 w-14 cursor-pointer rounded-lg border border-gray-200 object-cover transition-all hover:border-cyan-500 dark:border-gray-700"
                alt={`${product.brand} ${product.model} view ${index + 1}`}
                onMouseEnter={() => setMainImage(image)}
              />
            ))}
          </div>

          <img
            src={mainImage?.image_path}
            srcSet={'/phone.png'}
            alt={`${product.brand} ${product.model}`}
            className="row-span-2 max-w-sm rounded-lg shadow-lg"
          />

          <p className="col-span-2 text-4xl font-semibold text-slate-800 dark:text-slate-100">
            Смартфон {product.brand} {product.model} {product.specifications.find((spec) => spec.spec_key === 'ram')?.spec_value} +{' '}
            {product.specifications.find((spec) => spec.spec_key === 'storage')?.spec_value}
          </p>

          <div />

          <div className="bg-opacity-20 dark:bg-opacity-20 border-opacity-30 dark:border-opacity-30 col-span-2 flex flex-col justify-between rounded-3xl border border-white bg-white p-6 shadow-xl backdrop-blur-md md:col-span-1 md:w-80 lg:w-96 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-4xl font-semibold text-slate-800 dark:text-slate-100">{currencyFormatter.format(product.price)}</p>
            <CartButton />
          </div>
        </header>

        <Tabs defaultValue="description" className="w-full">
          <TabsList className="flex h-12 w-full rounded-xl border border-white/30 bg-white/20 p-1 shadow-lg backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/40">
            <TabsTrigger
              value="description"
              className="flex-1 rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow data-[state=inactive]:text-slate-700 data-[state=inactive]:hover:bg-white/40 dark:data-[state=active]:bg-cyan-500 dark:data-[state=inactive]:text-slate-300 dark:data-[state=inactive]:hover:bg-slate-700/40"
            >
              Описание
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="flex-1 rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow data-[state=inactive]:text-slate-700 data-[state=inactive]:hover:bg-white/40 dark:data-[state=active]:bg-cyan-500 dark:data-[state=inactive]:text-slate-300 dark:data-[state=inactive]:hover:bg-slate-700/40"
            >
              Характеристики
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="flex-1 rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow data-[state=inactive]:text-slate-700 data-[state=inactive]:hover:bg-white/40 dark:data-[state=active]:bg-cyan-500 dark:data-[state=inactive]:text-slate-300 dark:data-[state=inactive]:hover:bg-slate-700/40"
            >
              Отзывы
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="description"
            className="mt-2 rounded-xl border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/40"
          >
            <p className="text-slate-800 dark:text-slate-200">{product.description}</p>
          </TabsContent>
          <TabsContent
            value="specs"
            className="mt-2 rounded-xl border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/40"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-white/30 p-4 backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-md dark:bg-slate-700/30">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-full bg-cyan-100 p-2 dark:bg-cyan-900/50">
                    <Cpu className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Процессор</h3>
                </div>
                <p className="pl-11 text-slate-700 dark:text-slate-300">
                  {product.specifications.find((spec) => spec.spec_key === 'processor')?.spec_value}
                </p>
              </div>

              <div className="rounded-lg bg-white/30 p-4 backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-md dark:bg-slate-700/30">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/50">
                    <MemoryStick className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Оперативная память</h3>
                </div>
                <p className="pl-11 text-slate-700 dark:text-slate-300">
                  {product.specifications.find((spec) => spec.spec_key === 'ram')?.spec_value}
                </p>
              </div>

              <div className="rounded-lg bg-white/30 p-4 backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-md dark:bg-slate-700/30">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/50">
                    <HardDrive className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Встроенная память</h3>
                </div>
                <p className="pl-11 text-slate-700 dark:text-slate-300">
                  {product.specifications.find((spec) => spec.spec_key === 'storage')?.spec_value}
                </p>
              </div>

              <div className="rounded-lg bg-white/30 p-4 backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-md dark:bg-slate-700/30">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/50">
                    <Scale className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Вес</h3>
                </div>
                <p className="pl-11 text-slate-700 dark:text-slate-300">
                  {product.specifications.find((spec) => spec.spec_key === 'weight')?.spec_value}
                </p>
              </div>

              <div className="rounded-lg bg-white/30 p-4 backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-md dark:bg-slate-700/30">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/50">
                    <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Диагональ экрана</h3>
                </div>
                <p className="pl-11 text-slate-700 dark:text-slate-300">
                  {product.specifications.find((spec) => spec.spec_key === 'screen_size')?.spec_value}"
                </p>
              </div>

              <div className="rounded-lg bg-white/30 p-4 backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-md dark:bg-slate-700/30">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/50">
                    <MonitorSmartphone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Операционная система</h3>
                </div>
                <p className="pl-11 text-slate-700 dark:text-slate-300">
                  {product.specifications.find((spec) => spec.spec_key === 'os')?.spec_value}
                </p>
              </div>

              <div className="rounded-lg bg-white/30 p-4 backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-md dark:bg-slate-700/30">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-full bg-rose-100 p-2 dark:bg-rose-900/50">
                    <Camera className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">Камера</h3>
                </div>
                <p className="pl-11 text-slate-700 dark:text-slate-300">
                  {product.specifications.find((spec) => spec.spec_key === 'camera')?.spec_value} Мп
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="reviews"
            className="mt-2 rounded-xl border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/40"
          >
            {reviews.length > 0 ? (
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Отзывы покупателей</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <StarRating rating={averageRating} />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{averageRating.toFixed(1)} из 5</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-lg bg-white/30 p-5 backdrop-blur-sm dark:bg-slate-700/30">
                      <div className="mb-3 flex justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage alt={review.user.name} />
                            <AvatarFallback className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                              {review.user.name
                                .split(' ')
                                .map((name) => name[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-slate-800 dark:text-slate-200">{review.user.name}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {new Date(review.created_at).toLocaleString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-lg text-slate-700 dark:text-slate-300">Пока нет отзывов для этого продукта.</p>
                <p className="mt-2 text-slate-500 dark:text-slate-400">Будьте первым, кто оставит отзыв!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
}
