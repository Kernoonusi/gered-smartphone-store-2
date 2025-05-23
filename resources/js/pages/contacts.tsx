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

export default function Contacts() {
  const { pageContent } = usePage<PageContentProps>().props;

  return (
    <Layout>
      <main className="mx-auto mt-6 flex w-full flex-col gap-12 md:w-10/12">
        <h1 className="mb-4 text-2xl font-bold">{pageContent?.title || 'КОНТАКТЫ'}</h1>
        {pageContent ? (
          <div 
            dangerouslySetInnerHTML={{ __html: pageContent.content }} 
            className="prose max-w-none" 
          />
        ) : (
          <div className="w-full rounded-xl bg-gray-100 dark:bg-slate-900 p-12 shadow-lg">
            <p className="mb-4">Контактная информация временно недоступна.</p>
          </div>
        )}
      </main>
    </Layout>
  );
}
