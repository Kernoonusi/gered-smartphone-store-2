import { SmartphoneFull } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './product-card';
import { Button } from './ui/button';

interface SearchListPageProps {
  smartphones: {
    data: SmartphoneFull[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  [key: string]: unknown;
}

export default function SearchList({ resetFilters }: { resetFilters: () => void }) {
  const { t } = useLaravelReactI18n();
  const {
    smartphones: { data, links },
  } = usePage<SearchListPageProps>().props;

  return (
    <>
      <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((smartphone: SmartphoneFull) => (
          <ProductCard key={smartphone.id} item={smartphone} />
        ))}
      </div>
      <div className="mt-6 flex justify-center space-x-2">
        {links.map((link, idx) => {
          const rawLabel = link.label.replace(/&laquo;|&raquo;/g, '');
          const isPrev = link.label.includes('&laquo;');
          const isNext = link.label.includes('&raquo;');
          return (
            <Button
              key={idx}
              disabled={!link.url}
              variant={link.active ? 'default' : 'outline'}
              onClick={() => link.url && router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
            >
              {isPrev ? <ChevronLeft className="h-4 w-4" /> : isNext ? <ChevronRight className="h-4 w-4" /> : rawLabel}
            </Button>
          );
        })}
      </div>
      {/* Empty State */}
      {(!data || data.length === 0) && (
        <div className="mt-8 rounded-2xl border border-purple-300/20 bg-purple-500/10 p-12 text-center shadow-xl backdrop-blur-lg">
          <Search className="mx-auto mb-4 h-12 w-12 text-purple-300" />
          <h3 className="mb-2 text-xl font-medium text-white">{t('empty.title')}</h3>
          <p className="mb-6 text-purple-200">{t('empty.message')}</p>
          <Button variant="outline" className="border-purple-400/30 text-purple-100 hover:bg-purple-700/20" onClick={resetFilters}>
            {t('actions.reset')}
          </Button>
        </div>
      )}
    </>
  );
}
