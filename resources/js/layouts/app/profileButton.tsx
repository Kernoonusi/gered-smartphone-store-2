import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { User } from 'lucide-react';
import { AuthForm } from '../auth/auth-form';

export function ProfileButton({ rounded }: { rounded?: boolean }) {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      {auth.user?.email ? (
        <Button variant="ghost" asChild className={`h-full gap-4 ${rounded ? '' : 'rounded-none'}`}>
          <Link href="/profile">
            <p className="hidden md:block">{auth.user.name}</p>
            <User />
          </Link>
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className={`h-full gap-4 ${rounded ? '' : 'rounded-none'}`}>
              <p className="hidden md:block">Войти</p>
              <User />
            </Button>
          </DialogTrigger>
          <AuthForm />
        </Dialog>
      )}
    </>
  );
}
