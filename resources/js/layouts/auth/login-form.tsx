import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface LoginFormProps {
  switchState: (state: 'login' | 'register' | 'forgotPassword') => void;
}

export default function LoginForm({ switchState }: LoginFormProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Вход</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Введите email" />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            placeholder="Введите пароль"
          />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
          <Button variant="link" className="pl-0" onClick={() => switchState('forgotPassword')}>
            Забыли пароль?
          </Button>
        </div>
        <Button type="submit" disabled={processing}>
          {processing ? 'Загрузка...' : 'Войти'}
        </Button>
      </form>
      <p className="mt-4 inline-block">
        Нет аккаунта?{' '}
        <Button variant="link" className="pl-0" onClick={() => switchState('register')}>
          Зарегистрируйтесь!
        </Button>
      </p>
    </>
  );
}
