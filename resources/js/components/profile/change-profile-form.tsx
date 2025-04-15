import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface PageProps {
  user: User;
  [key: string]: unknown;
}

export function ChangeProfileForm() {
  const { user } = usePage<PageProps>().props;
  const { t } = useLaravelReactI18n();

  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
  });

  // Функция отправки формы
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('settings.profile.update'), {
      onSuccess: () => {
        router.reload({ only: ['user'] });
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="w-fit" asChild>
        <Button>{t('profile.change_profile')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('profile.settings_title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {t('profile.name')}
            </label>
            <Input id="name" type="text" placeholder={t('profile.name')} value={data.name} onChange={(e) => setData('name', e.target.value)} />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('profile.email')}
            </label>
            <Input id="email" type="email" placeholder="myemail@example.com" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
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
