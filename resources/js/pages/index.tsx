import { type SmartphoneFull } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/app-layout';

export default function Welcome() {
  // const { auth } = usePage<SharedData>().props;
  const { smartphones } = usePage<{ smartphones: SmartphoneFull[] }>().props;
  //   console.table(smartphones[0].images);

  return (
    <Layout>
      <Head title="Welcome"></Head>
      <main className="mx-auto flex w-full flex-col gap-12 md:w-10/12">
        <header className="flex h-[70dvh] w-full flex-col items-center justify-center gap-10 text-center md:flex-row md:text-left">
          <div className="flex flex-col gap-6">
            <p className="text-6xl font-semibold uppercase">
              Новый XPhone Pro <br /> вышел
            </p>
            <Button className="mx-auto w-fit rounded-full bg-cyan-500 p-8 md:mx-0" asChild>
              <Link href={route("product.show", { id: 23 })}>
                Смотреть
              </Link>
            </Button>
          </div>
          <img src="iphone16.png" alt="" className="md:w-1/2" />
        </header>
        <article className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] items-center gap-4">
          <h2 className="text-4xl">Новинки</h2>
          <div />
          <Link href={route("product.show", { id: 23 })} className="after:content-['->']">
            Все новинки
          </Link>
          <div className="col-span-3 row-span-1 grid w-full grid-cols-[repeat(5,minmax(200px,1fr))] gap-4 overflow-x-scroll md:overflow-hidden">
            {smartphones.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </article>
        <article className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] items-center gap-4">
          <h2 className="text-4xl">Рекомендуем</h2>
          <div />
          <Link href="/products" className="after:content-['->']">
            Все товары
          </Link>
          <div className="col-span-3 row-span-1 grid w-full grid-cols-[repeat(5,minmax(200px,1fr))] gap-4 overflow-x-scroll md:overflow-hidden">
            {smartphones.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </article>
      </main>
    </Layout>
  );
}
