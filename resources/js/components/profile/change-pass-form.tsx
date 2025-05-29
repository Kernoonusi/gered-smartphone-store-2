import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { router, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ChangePassForm() {
  // Инициализация формы с начальными значениями
  const { data, setData, put, processing, errors } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const { t } = useLaravelReactI18n();

  // Функция отправки формы
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('settings.password.update'), {
      onSuccess: () => {
        // Перезагружаем только свойство user, чтобы обновить данные на клиенте
        router.reload({ only: ['user'] });
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="w-fit" asChild>
        <Button>{t('profile.change_password')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('profile.password_title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-8">
          <div>
            <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
              {t('profile.current_password')}
            </label>
            <Input
              id="current_password"
              type="password"
              placeholder={t('profile.current_password')}
              value={data.current_password}
              onChange={(e) => setData('current_password', e.target.value)}
            />
            {errors.current_password && <p className="text-xs text-red-500">{errors.current_password}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('profile.new_password')}
            </label>
            <Input
              id="password"
              type="password"
              placeholder={t('profile.new_password')}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
              {t('profile.password_confirmation')}
            </label>
            <Input
              id="password_confirmation"
              type="password"
              placeholder={t('profile.password_confirmation')}
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
            />
            {errors.password_confirmation && <p className="text-xs text-red-500">{errors.password_confirmation}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={processing}>
              {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('profile.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
