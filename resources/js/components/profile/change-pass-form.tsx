import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { router, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

export default function ChangePassForm() {
  // Инициализация формы с начальными значениями
  const { data, setData, put, processing, errors } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

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
        <Button>Изменить пароль</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменение пароля</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-8">
          <div>
            <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
              Текущий пароль
            </label>
            <Input
              id="current_password"
              type="password"
              placeholder="Текущий пароль"
              value={data.current_password}
              onChange={(e) => setData('current_password', e.target.value)}
            />
            {errors.current_password && <p className="text-xs text-red-500">{errors.current_password}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Новый пароль
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Новый пароль"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
              Подтверждение пароля
            </label>
            <Input
              id="password_confirmation"
              type="password"
              placeholder="Подтверждение пароля"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
            />
            {errors.password_confirmation && <p className="text-xs text-red-500">{errors.password_confirmation}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={processing}>
              {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
