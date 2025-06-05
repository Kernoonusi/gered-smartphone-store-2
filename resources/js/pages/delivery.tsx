import Layout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface PageContentProps {
  pageContent: {
    id: number;
    key: string;
    title: string;
    content: string;
  } | null;
  [key: string]: unknown;
}

export default function Delivery() {
  const { pageContent } = usePage<PageContentProps>().props;

  useEffect(() => {
    // Загружаем Font Awesome CSS только для этой страницы
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.id = 'font-awesome-css';

    // Проверяем, не загружен ли уже CSS
    if (!document.getElementById('font-awesome-css')) {
      document.head.appendChild(link);
    }

    // Очищаем при размонтировании компонента
    return () => {
      const existingLink = document.getElementById('font-awesome-css');
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };
  }, []);

  return (
    <Layout>
      <main className="mx-auto mt-6 flex w-full flex-col gap-12 md:max-w-7xl">
        <h1 className="mb-4 text-2xl font-bold">{pageContent?.title || 'ДОСТАВКА И ОПЛАТА'}</h1>
        {pageContent ? (
          <div dangerouslySetInnerHTML={{ __html: pageContent.content }} className="prose max-w-none" />
        ) : (
          <div className="w-full rounded-xl bg-slate-100 p-12 dark:bg-slate-900">
            <p className="mb-4">Информация о доставке временно недоступна.</p>
          </div>
        )}
      </main>
    </Layout>
  );
}
