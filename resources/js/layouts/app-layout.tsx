import { currencyFormatter } from '@/utils/currencyFormatter';
import { usePage } from '@inertiajs/react';
import { Suspense, lazy, useEffect } from 'react';
import AppHeaderLayout from './app/app-header-layout';

const Toaster = lazy(() => import('sonner').then((mod) => ({ default: mod.Toaster })));

interface AppLayoutProps {
  children: React.ReactNode;
}
interface PageProps {
  usdToRub: number;
  [key: string]: unknown;
}

export default function Layout({ children, ...props }: AppLayoutProps) {
  const { usdToRub } = usePage<PageProps>().props;

  useEffect(() => {
    if (usdToRub) currencyFormatter.setRate(usdToRub);
  }, [usdToRub]);

  return (
    <AppHeaderLayout {...props}>
      {/* Показываем детей только после того, как headerReady=true */}
      {children}

      <Suspense fallback={null}>
        <Toaster />
      </Suspense>
    </AppHeaderLayout>
  );
}
