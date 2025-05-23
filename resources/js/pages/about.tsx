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

export default function About() {
  const { pageContent } = usePage<PageContentProps>().props;

  return (
    <Layout>
      <main className="mx-auto mt-6 flex w-full flex-col gap-12 md:w-10/12">
        <h1 className="mb-4 text-2xl font-bold">{pageContent?.title || 'О НАС'}</h1>
        {pageContent ? (
          <div dangerouslySetInnerHTML={{ __html: pageContent.content }} className="prose max-w-none" />
        ) : (
          <p className="mb-4">Информация о компании временно недоступна.</p>
        )}
      </main>
    </Layout>
  );
}
