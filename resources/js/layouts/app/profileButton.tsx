import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { User } from 'lucide-react';
import { AuthForm } from '../auth/auth-form';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export function ProfileButton({ rounded, className }: { rounded?: boolean, className?: string }) {
  const { auth } = usePage<SharedData>().props;
  const { t } = useLaravelReactI18n();
  
  return (
    <>
      {auth.user?.email ? (
        <Button variant="ghost" className={`text-white hover:bg-white/10 ${rounded ? 'rounded-full' : 'rounded-none'} ${className || ''}`}>
          <Link href="/profile" className="flex gap-2 items-center">
            <p className="hidden md:block">{auth.user.name}</p>
            <User className="h-5 w-5" />
          </Link>
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className={`flex gap-2 items-center text-white hover:bg-white/10 ${rounded ? 'rounded-full' : 'rounded-none'} ${className || ''}`}>
              <p className="hidden md:block">{t('actions.login')}</p>
              <User className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <AuthForm />
        </Dialog>
      )}
    </>
  );
}