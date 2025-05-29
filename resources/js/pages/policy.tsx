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

export default function Policy() {
  const { pageContent } = usePage<PageContentProps>().props;

  return (
    <Layout>
      <main className="mx-auto mt-6 flex w-full flex-col gap-12 md:max-w-7xl">
        <h1 className="mb-4 text-2xl font-bold">{pageContent?.title || 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ'}</h1>
        {pageContent ? (
          <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
        ) : (
          <p className="mb-4">Информация о политике конфиденциальности временно недоступна.</p>
        )}
      </main>
    </Layout>
  );
}
