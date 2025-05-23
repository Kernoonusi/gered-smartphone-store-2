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
  const [optimisticIsInCart, setOptimisticIsInCart] = useOptimistic(false);
  const [optimisticIsInFavorites, setOptimisticIsInFavorites] = useOptimistic(item.is_in_favorites || false);
  const [quantity, setQuantity] = useState(cart?.items.find((smartphone) => smartphone.product_id === item.id)?.count || 0);
  const hasFullData = 'specifications' in item && 'images' in item;
  const fullData = hasFullData ? (item as SmartphoneFull) : null;
  const { t, currentLocale } = useLaravelReactI18n();

  useEffect(() => {
    const itemInCart = cart?.items.find((cartItem) => cartItem.product_id === item.id);
    startTransition(() => {
      setOptimisticIsInCart(!!itemInCart);
    });
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
          // Ожидаем, что prop item.is_in_favorites обновился,
          // и useOptimistic подхватил это новое значение.
        },
        onError: () => {
          toast.error(t('products.notRemovedFromFavorites'));
          // Откатываем оптимистичное изменение к состоянию пропа до клика
          startTransition(() => {
            setOptimisticIsInFavorites(currentPropIsInFavorites);
          });
        },
        // onFinish опционален, если не требуется специфических действий
      });
    } else {
      // Если было false (не в избранном), то добавляем
      router.post(
        route('favorites.add'),
        { product_id: item.id },
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success(t('products.addedToFavorites'));
            // Аналогично, ожидаем обновления пропа и useOptimistic.
          },
          onError: () => {
            toast.error(t('products.notAddedToFavorites'));
            // Откатываем оптимистичное изменение
            startTransition(() => {
              setOptimisticIsInFavorites(currentPropIsInFavorites);
            });
          },
          // onFinish опционален
        },
      );
    }
  };

  return (
    <Card className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:shadow-2xl sm:w-80">
      {/* Glassmorphism фон с градиентом */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 to-blue-500/10"></div>
      <div className="absolute -top-16 -right-16 -z-10 hidden h-40 w-40 rounded-full bg-indigo-400/20 blur-xl sm:block"></div>
      <div className="absolute -bottom-16 -left-16 -z-10 hidden h-32 w-32 rounded-full bg-blue-300/20 blur-xl sm:block"></div>

      {/* Favorites button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1 rounded-full bg-white p-1.5 shadow-md backdrop-blur-md transition-all sm:top-2 sm:right-2 sm:p-2"
        onClick={onAddToFavorites}
      >
        <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${optimisticIsInFavorites ? 'fill-indigo-500 text-indigo-500' : 'text-indigo-500'}`} />
      </Button>

      {/* Содержимое карточки */}
      <CardContent className="px-4">
        {/* Изображение */}
        <a
          href={route('product.show', { id: item.id })}
          className="group/image mb-5 flex h-40 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200 p-2 shadow-md transition-all duration-300 hover:border-indigo-300 hover:shadow-lg sm:h-52"
        >
          {/* <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/10 to-black/30 opacity-0 transition-opacity group-hover/image:opacity-100"></div> */}
          <img
            src={mainImage}
            srcSet={mainImage}
            onError={(e) => {
              e.currentTarget.src = mainImage;
              e.currentTarget.srcset = mainImage;
            }}
            alt={`${item.brand} ${item.model}`}
            loading="lazy"
            className="h-full w-auto rounded-lg border border-white/60 bg-white object-contain transition-transform duration-500 group-hover/image:scale-105"
          />
        </a>

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
                  <span className="text-xs font-medium text-gray-200">{spec.spec_value}</span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      {/* Кнопки действий */}
      <CardFooter className="mt-auto flex justify-center px-4">
        {!optimisticIsInCart ? (
          <button
            onClick={onAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-indigo-500/80 px-4 py-3 text-white shadow-lg backdrop-blur-md transition-all hover:bg-indigo-600/80 sm:grid sm:grid-cols-[auto_auto_1fr_auto] sm:px-6 sm:py-4"
            disabled={isAddingToCart}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">{t('products.addToCart')}</span>
            <div className="hidden sm:block" />
            <p className="hidden sm:block">
              {t('products.price :price', {
                price: currentLocale() === 'ru' ? currencyFormatter.format(item.price) : item.price,
              })}
            </p>
          </button>
        ) : (
          <div className="grid w-full grid-cols-[auto_auto_auto] place-content-center gap-2 rounded-xl border border-white/10 bg-indigo-500/80 px-3 py-2 text-sm shadow-lg backdrop-blur-md sm:gap-4 sm:px-6 sm:py-4 sm:text-base">
            <button onClick={() => decreaseCount(item)} className="rounded-full bg-indigo-600/80 p-1 transition-colors hover:bg-indigo-800/80">
              <p className="sr-only">{t('products.decreaseCount')}</p>
              <Minus className="h-4 w-4" />
            </button>

            <span className="flex items-center justify-center font-medium">{quantity}</span>

            <button onClick={() => increaseCount(item)} className="rounded-full bg-indigo-600/80 p-1 transition-colors hover:bg-indigo-800/80">
              <p className="sr-only">{t('products.increaseCount')}</p>
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
