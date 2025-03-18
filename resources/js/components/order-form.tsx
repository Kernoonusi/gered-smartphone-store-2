import { useForm } from '@inertiajs/react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function OrderForm() {
  const { data, setData, post, processing, errors, reset } = useForm({
    address: '',
    paymentMethod: '',
    note: '',
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('cart.checkout'), {
      onSuccess: () => {
        reset();
        toast.success('Заказ успешно оформлен');
      },
      onError: (error) => {
        console.error(error);
        toast.error('Ошибка при оформлении заказа');
      },
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Оформление заказа</DialogTitle>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Адрес
          </label>
          <Input
            id="address"
            type="text"
            placeholder="Введите адрес"
            value={data.address}
            onChange={(e) => setData('address', e.target.value)}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Способ оплаты
          </label>
          <select
            id="paymentMethod"
            value={data.paymentMethod}
            onChange={(e) => setData('paymentMethod', e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="" className="text-zinc-500">Выберите способ оплаты</option>
            <option value="card" className="text-zinc-500">Картой при получении</option>
            <option value="cash" className="text-zinc-500">Наличными при получении</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>
          )}
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Комментарий
          </label>
          <Input
            id="note"
            type="text"
            placeholder="Комментарий (необязательно)"
            value={data.note}
            onChange={(e) => setData('note', e.target.value)}
          />
          {errors.note && <p className="text-red-500 text-xs mt-1">{errors.note}</p>}
        </div>

        <Button type="submit" disabled={processing}>
          {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Оформить заказ
        </Button>
      </form>
    </>
  );
}