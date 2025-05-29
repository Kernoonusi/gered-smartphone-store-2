import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import LoginForm from '@/layouts/auth/login-form';
import RegForm from '@/layouts/auth/reg-form';
import ForgetPassForm from '@/layouts/auth/forget-pass-form';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Login() {
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
    <Layout>
      <Card className="mx-auto mt-20 max-w-md">
        <CardContent>
          <Head title={authState === 'login' ? t('actions.login_title') : authState === 'register' ? t('actions.register_title') : t('actions.forgot_title')} />
          <h1 className="mb-6 text-center text-2xl font-bold">
            {authState === 'login' && t('actions.login_header')}
            {authState === 'register' && t('actions.register_header')}
            {authState === 'forgotPassword' && t('actions.forgot_header')}
          </h1>
          {renderForm()}
        </CardContent>
      </Card>
    </Layout>
  );
}
