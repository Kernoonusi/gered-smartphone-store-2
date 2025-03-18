import { SmartphoneFull } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { toast } from 'sonner';
import { currencyFormatter } from '@/utils/currencyFormatter';

export function ProductCard({ item }: { item: SmartphoneFull }) {
  const addCart = (item: SmartphoneFull) => {
    router.post(route('cart.add'), {
      product_id: item.id,
      price: item.price,
      count: 1
    }, {
      onSuccess: () => {
        toast.success('Товар добавлен в корзину');
      },
      onError: (error) => {
        toast.error('Ошибка при добавлении товара');
        console.error(error);
      },
      preserveScroll: true,
      only: ['cart', 'totalPrice']
    });
  };
  return (
    <Card className="flex min-w-fit flex-col justify-between">
      <CardHeader>
        <Link href={`/products`} headers={{ productId: item.id.toString() }}>
          <img src={item.images[0].image_path} srcSet={'/phone.png'} alt="" />
        </Link>
      </CardHeader>
      <CardContent>
        <Link href={`/products`} headers={{ productId: item.id.toString() }}>
          <p>
            Смартфон {item.brand} {item.model} {item.specifications.find((spec) => spec.spec_key === 'ram')?.spec_value}{' + '}
            {item.specifications.find((spec) => spec.spec_key === 'storage')?.spec_value}
          </p>
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>{currencyFormatter.format(item.price)}</p>
        <Button variant={'ghost'} onClick={() => addCart(item)} className="w-fit justify-self-end rounded-full">
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
}
