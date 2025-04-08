import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Order, OrderItem, SmartphoneFull } from '@/types';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { router, usePage } from '@inertiajs/react';
import { Cpu, HardDrive, Heart, Maximize2, MemoryStick, Minus, Plus, Scale, ShoppingCart, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

// Спецификации для отображения на карточке (основные)
const MAIN_SPECS = ['ram', 'storage', 'screen_size', 'processor'];

const SPEC_ICONS = {
  processor: Cpu,
  ram: MemoryStick,
  storage: HardDrive,
  screen_size: Maximize2,
  weight: Scale,
};

const SPEC_COLORS = {
  processor: 'cyan',
  ram: 'purple',
  storage: 'blue',
  screen_size: 'indigo',
  weight: 'amber',
};

export function ProductCard({ item }: { item: SmartphoneFull }) {
  const { cart } = usePage<{ cart: Order | null }>().props;
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [quantity, setQuantity] = useState(cart?.items.find((smartphone) => smartphone.product_id === item.id)?.count || 0);
  const hasFullData = 'specifications' in item && 'images' in item;
  const fullData = hasFullData ? (item as SmartphoneFull) : null;

  useEffect(() => {
    const itemInCart = cart?.items.find((cartItem) => cartItem.product_id === item.id);
    setIsInCart(!!itemInCart);
  }, [cart, item.id]);

  const mainSpecifications =
    fullData?.specifications
      ?.filter((spec) => MAIN_SPECS.includes(spec.spec_key))
      .sort((a, b) => MAIN_SPECS.indexOf(a.spec_key) - MAIN_SPECS.indexOf(b.spec_key)) || [];

  const mainImage = fullData?.images && fullData.images.length > 0 ? fullData.images[0].image_path : 'phone.png';

  const onAddToCart = () => {
    setIsAddingToCart(true);

    router.post(
      route('cart.add'),
      {
        product_id: item.id,
        price: item.price,
        count: 1,
      },
      {
        preserveScroll: true,
        only: ['cart'],
        onSuccess: () => {
          toast.success('Товар добавлен в корзину');
          setIsInCart(true);
        },
        onError: () => {
          toast.error('Не удалось добавить товар в корзину');
        },
        onFinish: () => {
          setQuantity(1);
          setIsAddingToCart(false);
        },
      },
    );
  };

  const removeItem = (item: OrderItem) => {
    router.delete(route('cart.remove', { id: item.id }), { only: ['cart', 'totalPrice'], preserveScroll: true });
    setQuantity(0);
    setIsInCart(false);
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

  // Функция добавления в избранное
  const onAddToFavorites = () => {
    toast.error('Добавление в избранное не поддерживается');
    // setIsAddingToFavorites(true);
    // if (isInFavorites) {
    // router.delete(route('favorites.remove', { id: item.id }), {
    //   preserveScroll: true,
    //   onSuccess: () => {
    //     toast.success('Товар удален из избранного');
    //     setIsInFavorites(false);
    //   },
    // onError: () => {
    // toast.error('Не удалось удалить товар из избранного');
    // },
    // onFinish: () => {
    // setIsAddingToFavorites(false);
    // },
    // });
    // } else {
    // router.post(
    // route('favorites.add'),
    // {
    // product_id: item.id,
    // },
    // {
    // preserveScroll: true,
    // onSuccess: () => {
    // toast.success('Товар добавлен в избранное');
    // setIsInFavorites(true);
    // },
    // onError: () => {
    // toast.error('Не удалось добавить товар в избранное');
    // },
    // onFinish: () => {
    // setIsAddingToFavorites(false);
    // },
    // },
    // );
    // }
  };

  return (
    <Card className="group relative flex h-full flex-col justify-between w-full sm:w-80 overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:shadow-2xl">
      {/* Glassmorphism фон с градиентом */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 to-blue-500/10"></div>
      <div className="hidden sm:block absolute -top-16 -right-16 -z-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-xl"></div>
      <div className="hidden sm:block absolute -bottom-16 -left-16 -z-10 h-32 w-32 rounded-full bg-blue-300/20 blur-xl"></div>

      {/* Favorites button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1 right-1 sm:top-2 sm:right-2 rounded-full border-indigo-200/70 bg-white/50 backdrop-blur-sm hover:bg-indigo-50/80 hover:text-indigo-700 p-1.5 sm:p-2"
        onClick={onAddToFavorites}
      >
        <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isInFavorites ? 'fill-indigo-500 text-indigo-500' : 'text-indigo-500'}`} />
      </Button>

      {/* Содержимое карточки */}
      <CardContent className="p-4">
        {/* Изображение */}
        <a
          href={route('product.show', { id: item.id })}
          className="group/image mb-5 flex h-40 sm:h-52 items-center justify-center overflow-hidden rounded-lg p-2"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 opacity-0 transition-opacity group-hover/image:opacity-100"></div>
          <img
            src={mainImage}
            srcSet="phone.png"
            alt={`${item.brand} ${item.model}`}
            className="h-full w-auto object-contain transition-transform duration-500 group-hover/image:scale-105"
          />
        </a>

        {/* Название и цена */}
        <div className="mb-4 space-y-2.5">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-gray-100">
            {item.brand} {item.model}
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-gray-200">{currencyFormatter.format(item.price)}</p>
        </div>

        {/* Спецификации */}
        {hasFullData && (
          <div className="mb-4 flex flex-wrap gap-2">
            {mainSpecifications.map((spec) => {
              const Icon = SPEC_ICONS[spec.spec_key as keyof typeof SPEC_ICONS] || Smartphone;
              const color = SPEC_COLORS[spec.spec_key as keyof typeof SPEC_COLORS] || 'black';
              return (
                <div key={spec.id} className="flex items-center gap-1.5 rounded-lg bg-white/30 px-2.5 py-1.5 backdrop-blur-sm">
                  <div className={`rounded-full bg-${color}-100 p-1`}>
                    <Icon className={`h-3.5 w-3.5 text-${color}-600`} />
                  </div>
                  <span className="text-xs font-medium text-gray-200">{spec.spec_value}</span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      {/* Кнопки действий */}
      <CardFooter className="flex justify-center px-4 mt-auto">
        {!isInCart ? (
          <button
            onClick={onAddToCart}
            className="flex sm:grid sm:grid-cols-[auto_auto_1fr_auto] w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-indigo-500/80 px-4 py-3 sm:px-6 sm:py-4 text-white shadow-lg backdrop-blur-md transition-all hover:bg-indigo-600/80"
            disabled={isAddingToCart}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">В корзину</span>
            <div className="hidden sm:block" />
            <p className="hidden sm:block">{currencyFormatter.format(item.price)}</p>
          </button>
        ) : (
          <div className="grid grid-cols-[auto_auto_auto] w-full place-content-center gap-2 sm:gap-4 rounded-xl border border-white/10 bg-indigo-500/80 px-3 sm:px-6 py-2 sm:py-4 text-sm sm:text-base shadow-lg backdrop-blur-md">
            <button onClick={() => decreaseCount(item)} className="rounded-full bg-indigo-600/80 p-1 transition-colors hover:bg-indigo-800/80">
              <Minus className="h-4 w-4" />
            </button>

            <span className="flex items-center justify-center font-medium">{quantity}</span>

            <button onClick={() => increaseCount(item)} className="rounded-full bg-indigo-600/80 p-1 transition-colors hover:bg-indigo-800/80">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
