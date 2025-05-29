import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function OrderForm() {
  const { data, setData, post, processing, errors, reset } = useForm({
    address: '',
    paymentMethod: '',
    note: '',
  });

  const { t } = useLaravelReactI18n();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('cart.checkout'), {
      onSuccess: () => {
        reset();
        toast.success(t('order.success'));
      },
      onError: (error) => {
        console.error(error);
        toast.error(t('order.error'));
      },
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('order.title')}</DialogTitle>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            {t('order.address')}
          </label>
          <Input
            id="address"
            type="text"
            placeholder={t('order.address_placeholder')}
            value={data.address}
            onChange={(e) => setData('address', e.target.value)}
          />
          {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            {t('order.payment_method')}
          </label>
          <select
            id="paymentMethod"
            value={data.paymentMethod}
            onChange={(e) => setData('paymentMethod', e.target.value)}
            className="w-full rounded border p-2"
          >
            <option value="" className="text-zinc-500">
              {t('order.payment_placeholder')}
            </option>
            <option value="card" className="text-zinc-500">
              {t('order.payment_card')}
            </option>
            <option value="cash" className="text-zinc-500">
              {t('order.payment_cash')}
            </option>
          </select>
          {errors.paymentMethod && <p className="mt-1 text-xs text-red-500">{errors.paymentMethod}</p>}
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            {t('order.note')}
          </label>
          <Input
            id="note"
            type="text"
            placeholder={t('order.note_placeholder')}
            value={data.note}
            onChange={(e) => setData('note', e.target.value)}
          />
          {errors.note && <p className="mt-1 text-xs text-red-500">{errors.note}</p>}
        </div>

        <Button type="submit" disabled={processing}>
          {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t('order.submit')}
        </Button>
      </form>
    </>
  );
}
