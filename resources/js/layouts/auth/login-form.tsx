import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface LoginFormProps {
  switchState: (state: 'login' | 'register' | 'forgotPassword') => void;
}

export default function LoginForm({ switchState }: LoginFormProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });
  const { t } = useLaravelReactI18n();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">{t('auth.email')}</label>
          <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder={t('auth.email_placeholder')} />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">{t('auth.password')}</label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            placeholder={t('auth.password_placeholder')}
          />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
          <Button variant="link" className="pl-0" onClick={() => switchState('forgotPassword')}>
            {t('auth.forgot_link')}
          </Button>
        </div>
        <Button type="submit" disabled={processing}>
          {processing ? t('auth.loading') : t('auth.login_button')}
        </Button>
      </form>
      <p className="mt-4 inline-block">
        {t('auth.no_account')}{' '}
        <Button variant="link" className="pl-0" onClick={() => switchState('register')}>
          {t('auth.register_link')}
        </Button>
      </p>
    </>
  );
}
