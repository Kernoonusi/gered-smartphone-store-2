import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ForgotPasswordFormProps {
  switchState: (state: 'login' | 'register' | 'forgotPassword') => void;
}

export default function ForgotPasswordForm({ switchState }: ForgotPasswordFormProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post('/password/email');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            placeholder="Введите email"
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>
        <Button type="submit" disabled={processing}>
          {processing ? 'Загрузка...' : 'Отправить ссылку для восстановления'}
        </Button>
      </form>
      <p className="mt-4">
        Вспомнили пароль?{' '}
        <button className="underline" onClick={() => switchState('login')}>
          Войдите!
        </button>
      </p>
    </>
  );
}
