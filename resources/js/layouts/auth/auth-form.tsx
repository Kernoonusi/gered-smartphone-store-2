import { useState } from 'react';
import { DialogContent } from '@/components/ui/dialog';
import LoginForm from './login-form';
import RegForm from './reg-form';
import ForgetPassForm from './forget-pass-form';

export function AuthForm() {
  const [authState, setAuthState] = useState<'login' | 'register' | 'forgotPassword'>('login');

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
      {renderForm()}
    </DialogContent>
  );
}
