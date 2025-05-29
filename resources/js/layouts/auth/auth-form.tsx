import { useState } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { DialogContent } from '@/components/ui/dialog';
import LoginForm from './login-form';
import RegForm from './reg-form';
import ForgetPassForm from './forget-pass-form';

export function AuthForm() {
  const [authState, setAuthState] = useState<'login' | 'register' | 'forgotPassword'>('login');
  const { t } = useLaravelReactI18n();

  const renderForm = () => {
    switch (authState) {
      case 'login':
        return <LoginForm switchState={setAuthState} />;
      case 'register':
        return <RegForm switchState={setAuthState} />;
      case 'forgotPassword':
        return <ForgetPassForm switchState={setAuthState} />;
      default:
        return null;
    }
  };

  return (
    <DialogContent>
      <h1 className="mb-6 text-center text-2xl font-bold">
        {authState === 'login' && t('actions.login_header')}
        {authState === 'register' && t('actions.register_header')}
        {authState === 'forgotPassword' && t('actions.forgot_header')}
      </h1>
      {renderForm()}
    </DialogContent>
  );
}
