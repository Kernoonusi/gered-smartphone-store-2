import { Toaster } from 'sonner';
import AppHeaderLayout from './app/app-header-layout';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { currencyFormatter } from '@/utils/currencyFormatter';

interface AppLayoutProps {
  children: React.ReactNode;
}
interface PageProps {
    usdToRub: number;
    [key: string]: unknown;
  }

export default function Layout({ children, ...props }: AppLayoutProps) {
  const { usdToRub } = usePage<PageProps>().props;

  // При каждом обновлении курса, обновляем глобальный currencyFormatter
  useEffect(() => {
    if (usdToRub) {
      currencyFormatter.setRate(usdToRub);
    }
  }, [usdToRub]);
  return (
    <AppHeaderLayout {...props}>
      {children}
      <Toaster />
    </AppHeaderLayout>
  );
}
