import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post('/register');
  };

  return (
    <>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Имя</label>
          <Input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="Введите имя"
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>
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
        </div>
        <div>
          <label htmlFor="password_confirmation">Подтверждение пароля</label>
          <Input
            id="password_confirmation"
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            placeholder="Подтвердите пароль"
          />
          {errors.password_confirmation && (
            <span className="text-red-500">{errors.password_confirmation}</span>
          )}
        </div>
        <Button type="submit" disabled={processing}>
          {processing ? 'Загрузка...' : 'Зарегистрироваться'}
        </Button>
      </form>
      <p className="mt-4">
        Уже есть аккаунт?{' '}
        <button className="underline" onClick={() => switchState('login')}>
          Войдите!
        </button>
      </p>
    </>
  );
}
