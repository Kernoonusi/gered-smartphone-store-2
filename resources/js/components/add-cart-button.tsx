import { Order, OrderItem, SmartphoneFull } from '@/types';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { router, usePage } from '@inertiajs/react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PageProps {
  cart: Order | null;
  product: SmartphoneFull;
  inCartProp: boolean;
  [key: string]: unknown;
}

export default function CartButton() {
  const { cart, product, inCartProp } = usePage<PageProps>().props;
  const [quantity, setQuantity] = useState(cart?.items.find((item) => item.product_id === product.id)?.count || 0);
  const [inCart, setInCart] = useState(inCartProp);

  const addCart = (item: SmartphoneFull) => {
    router.post(
      route('cart.add'),
      {
        product_id: item.id,
        price: item.price,
        count: 1,
      },
      {
        onSuccess: () => {
          toast.success('Товар добавлен в корзину');
          setInCart(true);
          setQuantity(1);
        },
        onError: (error) => {
          toast.error('Ошибка при добавлении товара');
          console.error(error);
        },
        preserveScroll: true,
        only: ['cart', 'totalPrice'],
      },
    );
  };

  const increaseCount = (phone: SmartphoneFull) => {
    const item = cart?.items.find((item) => item.product_id === phone.id);
    if (!item) return;
    router.patch(route('cart.update', { id: item.id }), { count: item.count + 1 }, { only: ['cart', 'totalPrice'], preserveScroll: true });
    setQuantity(item.count + 1);
  };

  const decreaseCount = (phone: SmartphoneFull) => {
    const item = cart?.items.find((item) => item.product_id === phone.id);
    if (!item) return;
    if (item.count <= 1) {
      removeItem(item);
      return;
    }
    router.patch(route('cart.update', { id: item.id }), { count: item.count - 1 }, { only: ['cart', 'totalPrice'], preserveScroll: true });
    setQuantity(item.count - 1);
  };

  const removeItem = (item: OrderItem) => {
    router.delete(route('cart.remove', { id: item.id }), { only: ['cart', 'totalPrice'], preserveScroll: true });
    setQuantity(0);
    setInCart(false);
  };

  return (
    <>
      {!inCart ? (
        <button
          onClick={() => addCart(product)}
          className="grid grid-cols-[auto_auto_1fr_auto] place-content-center gap-2 rounded-xl border border-white/10 bg-cyan-500/80 px-6 py-4 text-white shadow-lg backdrop-blur-md transition-all hover:bg-cyan-600/90 hover:shadow-cyan-200/50 dark:hover:shadow-cyan-900/50"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>В корзину</span>
          <div />
          <p>{currencyFormatter.format(product.price)}</p>
        </button>
      ) : (
        <div className="grid grid-cols-[auto_auto_auto] place-content-center gap-4 rounded-xl border border-white/10 bg-cyan-600/80 px-6 py-4 text-white shadow-lg backdrop-blur-md">
          <button onClick={() => decreaseCount(product)} className="rounded-full bg-cyan-700/80 p-1 transition-colors hover:bg-cyan-800/80">
            <Minus className="h-4 w-4" />
          </button>

          <span className="flex items-center justify-center font-medium">{quantity}</span>

          <button onClick={() => increaseCount(product)} className="rounded-full bg-cyan-700/80 p-1 transition-colors hover:bg-cyan-800/80">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}
