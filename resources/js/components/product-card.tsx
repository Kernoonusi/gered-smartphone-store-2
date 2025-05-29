import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Order, OrderItem, SmartphoneFull } from '@/types';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { router, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Cpu, HardDrive, Heart, Maximize2, MemoryStick, Minus, Plus, Scale, ShoppingCart, Smartphone } from 'lucide-react';
import { startTransition, useEffect, useOptimistic, useState } from 'react';
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

  // Правильная инициализация состояния корзины
  const itemInCart = cart?.items.find((cartItem) => cartItem.product_id === item.id);
  const [optimisticIsInCart, setOptimisticIsInCart] = useOptimistic(!!itemInCart);
  const [optimisticIsInFavorites, setOptimisticIsInFavorites] = useOptimistic(item.is_in_favorites || false);
  const [quantity, setQuantity] = useState(itemInCart?.count || 0);
  const hasFullData = 'specifications' in item && 'images' in item;
  const fullData = hasFullData ? (item as SmartphoneFull) : null;
  const { t, currentLocale } = useLaravelReactI18n();

  useEffect(() => {
    const currentItemInCart = cart?.items.find((cartItem) => cartItem.product_id === item.id);
    startTransition(() => {
      setOptimisticIsInCart(!!currentItemInCart);
    });
    // Обновляем количество при изменении корзины
    setQuantity(currentItemInCart?.count || 0);
  }, [cart, item.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const mainSpecifications =
    fullData?.specifications
      ?.filter((spec) => MAIN_SPECS.includes(spec.spec_key))
      .sort((a, b) => MAIN_SPECS.indexOf(a.spec_key) - MAIN_SPECS.indexOf(b.spec_key)) || [];

  const mainImage = fullData?.images && fullData.images.length > 0 ? fullData.images[0].image_path : 'phone.webp';
  // console.log(mainImage);

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
          toast.success(t('products.addedToCart'));
          setOptimisticIsInCart(true);
        },
        onError: () => {
          toast.error(t('products.notAddedToCart'));
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
    setOptimisticIsInCart(false);
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
    const currentPropIsInFavorites = item.is_in_favorites || false;
    const newOptimisticVisualState = !currentPropIsInFavorites;

    // Оптимистично обновляем UI
    startTransition(() => {
      setOptimisticIsInFavorites(newOptimisticVisualState);
    });

    if (currentPropIsInFavorites) {
      // Если было true (в избранном), то удаляем
      router.delete(route('favorites.remove', { id: item.id }), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(t('products.removedFromFavorites'));
        },
        onError: () => {
          toast.error(t('products.notRemovedFromFavorites'));
          startTransition(() => {
            setOptimisticIsInFavorites(currentPropIsInFavorites);
          });
        },
      });
    } else {
      router.post(
        route('favorites.add'),
        { product_id: item.id },
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success(t('products.addedToFavorites'));
          },
          onError: () => {
            toast.error(t('products.notAddedToFavorites'));
            startTransition(() => {
              setOptimisticIsInFavorites(currentPropIsInFavorites);
            });
          },
        },
      );
    }
  };

  return (
    <Card className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/30 bg-white/10 pt-0 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:shadow-2xl">
      {/* Glassmorphism фон с градиентом */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 to-blue-500/10"></div>
      <div className="absolute -top-16 -right-16 -z-10 hidden h-40 w-40 rounded-full bg-indigo-400/20 blur-xl sm:block"></div>
      <div className="absolute -bottom-16 -left-16 -z-10 hidden h-32 w-32 rounded-full bg-blue-300/20 blur-xl sm:block"></div>

      {/* Favorites button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1 z-10 rounded-full bg-black/20 p-1.5 shadow-lg backdrop-blur-md transition-all hover:bg-black/30 sm:top-2 sm:right-2 sm:p-2"
        onClick={onAddToFavorites}
      >
        <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${optimisticIsInFavorites ? 'fill-white text-white' : 'text-white'}`} />
      </Button>

      {/* Изображение */}
      <a
        href={route('product.show', { id: item.id })}
        className="group/image relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200 transition-all duration-300 hover:shadow-lg sm:h-56 md:h-64"
      >
        <img
          src={mainImage}
          srcSet={mainImage}
          onError={(e) => {
            e.currentTarget.src = mainImage;
            e.currentTarget.srcset = mainImage;
          }}
          alt={`${item.brand} ${item.model}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover/image:scale-105"
        />
      </a>

      {/* Содержимое карточки */}
      <CardContent className="px-4">
        {/* Название и цена */}
        <div className="mb-4 space-y-2.5">
          <h3 className="text-lg font-bold tracking-tight text-gray-100 sm:text-xl">
            {item.brand} {item.model}
          </h3>
          <p className="text-xl font-bold text-gray-200 sm:text-2xl">
            {t('products.price :price', {
              price: currentLocale() === 'ru' ? currencyFormatter.format(item.price) : item.price,
            })}
          </p>
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
                  <span className="truncate text-xs font-medium text-gray-200">{spec.spec_value}</span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      {/* Кнопки действий */}
      <CardFooter className="mt-auto flex flex-col items-center justify-center gap-2 px-2 py-3 sm:px-4 sm:py-3">
        {!optimisticIsInCart ? (
          <button
            onClick={onAddToCart}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-indigo-500/80 px-2.5 py-2 text-xs text-white shadow-lg backdrop-blur-md transition-all hover:bg-indigo-600/80 sm:grid sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-2 sm:px-3 sm:py-2.5 sm:text-sm"
            disabled={isAddingToCart}
          >
            <ShoppingCart className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            <span className="truncate">{t('products.addToCart')}</span>
            {/* <div className="hidden sm:block" /> */}
            <p className="hidden whitespace-nowrap sm:block">
              {t('products.price :price', {
                price: currentLocale() === 'ru' ? currencyFormatter.format(item.price) : item.price,
              })}
            </p>
          </button>
        ) : (
          <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 rounded-xl border border-white/10 bg-indigo-500/80 px-2.5 py-1.5 text-xs shadow-lg backdrop-blur-md sm:gap-2.5 sm:px-3 sm:py-2 sm:text-sm">
            <button
              onClick={() => decreaseCount(item)}
              className="flex shrink-0 items-center justify-center rounded-full bg-indigo-600/80 p-1 transition-colors hover:bg-indigo-800/80 sm:p-1.5"
            >
              <p className="sr-only">{t('products.decreaseCount')}</p>
              <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>

            <span className="flex items-center justify-center font-medium tabular-nums">{quantity}</span>

            <button
              onClick={() => increaseCount(item)}
              className="flex shrink-0 items-center justify-center rounded-full bg-indigo-600/80 p-1 transition-colors hover:bg-indigo-800/80 sm:p-1.5"
            >
              <p className="sr-only">{t('products.increaseCount')}</p>
              <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
