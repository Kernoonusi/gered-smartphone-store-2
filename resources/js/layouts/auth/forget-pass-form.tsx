import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ForgotPasswordFormProps {
  switchState: (state: 'login' | 'register' | 'forgotPassword') => void;
}

export default function ForgotPasswordForm({ switchState }: ForgotPasswordFormProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });
  const { t } = useLaravelReactI18n();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post('/password/email');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">{t('actions.email_label')}</label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            placeholder={t('actions.email_placeholder')}
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>
        <Button type="submit" disabled={processing}>
          {processing ? t('actions.loading') : t('actions.reset_button')}
        </Button>
      </form>
      <p className="mt-4">
        {t('actions.remembered')} {' '}
        <button className="underline" onClick={() => switchState('login')}>
          {t('actions.login_link')}
        </button>
      </p>
    </>
  );
}
