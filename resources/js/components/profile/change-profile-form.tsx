import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { useForm, router, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

interface PageProps {
  user: User;
  [key: string]: unknown;
}

export function ChangeProfileForm() {
  // Получаем данные пользователя из Inertia ;props
  const { user } = usePage<PageProps>().props;

  // Инициализация формы с начальными значениями из Inertia props
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
  });

  // Функция отправки формы
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('profile.update'), {
      onSuccess: () => {
        // Перезагружаем только свойство user, чтобы обновить данные на клиенте
        router.reload({ only: ['user'] });
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="w-fit" asChild>
        <Button>Изменить профиль</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменение профиля</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Имя
            </label>
            <Input id="name" type="text" placeholder="Имя" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Электронная почта
            </label>
            <Input id="email" type="email" placeholder="myemail@example.com" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>
          <Button type="submit" disabled={processing}>
            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Сохранить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
