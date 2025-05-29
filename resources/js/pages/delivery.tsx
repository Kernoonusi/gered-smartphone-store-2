import Layout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';

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

  return (
    <Layout>
      <main className="mx-auto mt-6 flex w-full flex-col gap-12 md:max-w-7xl">
        <h1 className="mb-4 text-2xl font-bold">{pageContent?.title || 'ДОСТАВКА И ОПЛАТА'}</h1>
        {pageContent ? (
          <div 
            dangerouslySetInnerHTML={{ __html: pageContent.content }} 
            className="prose max-w-none" 
          />
        ) : (
          <div className="w-full rounded-xl bg-slate-100 dark:bg-slate-900 p-12">
            <p className="mb-4">Информация о доставке временно недоступна.</p>
          </div>
        )}
      </main>
    </Layout>
  );
}
