import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface RegFormProps {
  switchState: (state: 'login' | 'register' | 'forgotPassword') => void;
}

export default function RegForm({ switchState }: RegFormProps) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }); 
  const { t } = useLaravelReactI18n();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post('/register');
  };

  return (
    <>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">{t('actions.name')}</label>
          <Input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder={t('actions.name_placeholder')}
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">{t('actions.email')}</label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            placeholder={t('actions.email_placeholder')}
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">{t('actions.password')}</label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            placeholder={t('actions.password_placeholder')}
          />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="password_confirmation">{t('actions.password_confirmation')}</label>
          <Input
            id="password_confirmation"
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            placeholder={t('actions.password_confirmation_placeholder')}
          />
          {errors.password_confirmation && (
            <span className="text-red-500">{errors.password_confirmation}</span>
          )}
        </div>
        <Button type="submit" disabled={processing}>
          {processing ? t('actions.loading') : t('actions.register_button')}
        </Button>
      </form>
      <p className="mt-4">
        {t('actions.have_account')} {' '}
        <button className="underline" onClick={() => switchState('login')}>
          {t('actions.login_link')}
        </button>
      </p>
    </>
  );
}
