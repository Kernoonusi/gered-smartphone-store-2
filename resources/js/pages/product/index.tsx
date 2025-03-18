import CartButton from '@/components/add-cart-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layouts/app-layout';
import { SmartphoneFull } from '@/types';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { Head, usePage } from '@inertiajs/react';
import { Camera, Cpu, HardDrive, MemoryStick, MonitorSmartphone, Scale, Smartphone } from 'lucide-react';
import { useState } from 'react';

interface PageProps {
  product: SmartphoneFull;
  [key: string]: unknown;
}

export default function ProductIndex() {
  const { product } = usePage<PageProps>().props;
  const [mainImage, setMainImage] = useState(product.images.length > 0 ? product.images[0] : null);

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

          <div className="bg-opacity-20 dark:bg-opacity-20 border-opacity-30 dark:border-opacity-30 col-span-2 flex flex-col justify-between rounded-3xl border border-white bg-white p-6 shadow-xl backdrop-blur-md md:col-span-1 dark:border-gray-700 dark:bg-gray-800 md:w-80 lg:w-96">
            <p className="text-4xl font-semibold text-slate-800 dark:text-slate-100">{currencyFormatter.format(product.price)}</p>
            <CartButton/>
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
        </Tabs>
      </main>
    </Layout>
  );
}
