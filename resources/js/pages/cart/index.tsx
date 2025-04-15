import { OrderForm } from '@/components/order-form';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Layout from '@/layouts/app-layout';
import { Order, OrderItem, SmartphoneFull, User } from '@/types';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { Deferred, router, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Minus, Plus, Trash } from 'lucide-react';

interface PageProps {
  cart: Order;
  user: User;
  totalPrice: number;
  [key: string]: unknown;
}

function ProductList() {
  const { products } = usePage<{ products: SmartphoneFull[] | undefined; [key: string]: unknown }>().props;
  return (
    <>
      {products && (
        <article className="grid w-full grid-cols-[repeat(5,minmax(200px,1fr))] gap-4 overflow-x-scroll md:overflow-hidden">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </article>
      )}
    </>
  );
}

export default function CartIndex() {
  // Получаем данные, переданные с сервера
  const { cart, user, totalPrice } = usePage<PageProps>().props;
  const { t } = useLaravelReactI18n();

  // Функции для обновления корзины через Inertia
  const increaseCount = (item: OrderItem) => {
    router.patch(route('cart.update', { id: item.id }), { count: item.count + 1 }, { only: ['cart', 'totalPrice'], preserveScroll: true });
  };

  const decreaseCount = (item: OrderItem) => {
    if (item.count <= 1) {
      removeItem(item);
      return;
    }
    router.patch(route('cart.update', { id: item.id }), { count: item.count - 1 }, { only: ['cart', 'totalPrice'], preserveScroll: true });
  };

  const removeItem = (item: OrderItem) => {
    router.delete(route('cart.remove', { id: item.id }), { only: ['cart', 'totalPrice'], preserveScroll: true });
  };

  return (
    <Layout>
      <main className="mx-auto mt-6 flex w-full flex-col gap-12 md:w-10/12">
        {cart.items.length > 0 && (
          <div className="flex items-end gap-4">
            <h2 className="text-3xl font-semibold">{t('cart.title')}</h2>
            <p className="text-zinc-500">
              {cart.items.reduce((acc, item) => acc + item.count, 0)} {t('cart.items_total')}, {currencyFormatter.format(totalPrice)}
            </p>
          </div>
        )}

        <div className="flex flex-col justify-between gap-4 lg:flex-row">
          <article className="flex flex-col gap-4">
            {cart.items.length === 0 ? (
              <p className="text-3xl">{t('cart.empty')}</p>
            ) : (
              cart.items.map((item) => (
                <div key={item.id} className="grid grid-cols-4 gap-2 lg:grid-rows-3">
                  <img
                    src={item.product.images[0].image_path}
                    srcSet={'/phone.png'}
                    alt=""
                    className="row-span-2 mx-auto h-10/12 w-auto lg:row-span-3"
                  />
                  <p className="row-span-1">
                    {item.product.brand} {item.product.model}
                  </p>
                  <div className="row-span-3 m-auto flex items-center justify-center gap-2">
                    <Button type="button" variant="ghost" size="icon" onClick={() => increaseCount(item)} className="text-green-500">
                      <Plus />
                    </Button>
                    <p className="text-center">{item.count}</p>
                    <Button type="button" variant="ghost" size="icon" onClick={() => decreaseCount(item)} className="text-red-500">
                      <Minus />
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item)}
                    className="row-span-3 m-auto flex items-center justify-center text-gray-500"
                  >
                    <Trash />
                  </Button>
                  <p className="row-span-1">{currencyFormatter.format(item.price)}</p>
                </div>
              ))
            )}
          </article>

          {cart.items.length > 0 && (
            <Card className="flex h-fit flex-col justify-between transition-all">
              <CardHeader>
                <CardTitle>{t('cart.to_pay')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="flex justify-between gap-10">
                  {t('cart.items_total')}: <strong>{currencyFormatter.format(totalPrice)}</strong>
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <p>
                  {t('cart.total')}:
                  <br />
                  <span className="text-5xl font-semibold">{currencyFormatter.format(totalPrice)}</span>
                </p>
                {user.email ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>{t('cart.checkout')}</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <OrderForm />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button>{t('cart.need_auth')}</Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>

        <h2>{t('cart.recommend')}</h2>
        <Deferred data="products" fallback={<div>{t('cart.loading')}</div>}>
          <ProductList />
        </Deferred>
      </main>
    </Layout>
  );
}