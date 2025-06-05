import { SmartphoneFull } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { ProductCard } from './product-card';
import { Button } from './ui/button';
import { JSX } from 'react';

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
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {(() => {
          const pageElements: (JSX.Element)[] = [];
          let lastDisplayedNumericPage = 0;
          const activePageIndex = links.findIndex((l) => l.active);
          const numericLinks = links.filter(
            (link) =>
              !link.label.includes('&laquo;') && !link.label.includes('&raquo;') && !isNaN(Number(link.label.replace(/&laquo;|&raquo;/g, ''))),
          );
          const totalNumericPages = numericLinks.length;

          links.forEach((link, idx) => {
            const rawLabel = link.label.replace(/&laquo;|&raquo;/g, '');
            const isPrev = link.label.includes('&laquo;');
            const isNext = link.label.includes('&raquo;');
            const isNumeric = !isPrev && !isNext && !isNaN(Number(rawLabel));
            const pageNumber = isNumeric ? Number(rawLabel) : null;

            let showButton = false;
            let isAlwaysVisible = false; // For prev, next, active

            if (isPrev || isNext || link.active) {
              showButton = true;
              isAlwaysVisible = true;
            } else if (pageNumber) {
              // Show first and last numeric page
              if (pageNumber === 1 || pageNumber === totalNumericPages) {
                showButton = true;
              }
              // Show pages around active page (e.g., active-1, active, active+1)
              if (
                activePageIndex !== -1 &&
                links[activePageIndex] &&
                !links[activePageIndex].label.includes('&laquo;') &&
                !links[activePageIndex].label.includes('&raquo;')
              ) {
                const activePageNumber = Number(links[activePageIndex].label);
                if (Math.abs(pageNumber - activePageNumber) <= 1) {
                  showButton = true;
                }
              }
            }

            const buttonBaseClasses = `items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3 py-1.5 h-auto`;
            const activeClasses = link.active ? 'bg-primary text-primary-foreground' : 'hover:bg-accent hover:text-accent-foreground';

            // Determine visibility: always visible (prev/next/active) or conditionally visible for sm+ screens
            const visibilityClasses = isAlwaysVisible ? 'inline-flex' : showButton ? 'hidden sm:inline-flex' : 'hidden';

            if (showButton) {
              // Add ellipsis if there's a gap between the last displayed numeric page and the current one
              if (isNumeric && lastDisplayedNumericPage > 0 && pageNumber !== null && pageNumber > lastDisplayedNumericPage + 1) {
                // Check if the ellipsis should be shown on mobile or only sm+
                // For now, ellipsis is sm+
                pageElements.push(
                  <span
                    key={`ellipsis-before-${pageNumber}`}
                    className="hidden items-center justify-center px-1 py-1.5 text-sm font-medium sm:inline-flex"
                  >
                    ...
                  </span>,
                );
              }

              pageElements.push(
                <Button
                  key={link.label + idx} // Ensure unique key
                  disabled={!link.url}
                  variant={link.active ? 'default' : 'outline'}
                  className={`${buttonBaseClasses} ${activeClasses} ${visibilityClasses}`}
                  onClick={() => link.url && router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
                >
                  {isPrev ? <ChevronLeft className="h-4 w-4" /> : isNext ? <ChevronRight className="h-4 w-4" /> : rawLabel}
                </Button>,
              );

              if (isNumeric) {
                lastDisplayedNumericPage = pageNumber ?? 0;
              }
            }
          });
          return pageElements;
        })()}
      </div>
      {/* Empty State */}
      {(!data || data.length === 0) && (
        <div className="mt-8 rounded-2xl border border-purple-300/20 bg-purple-500/10 p-12 text-center shadow-xl backdrop-blur-lg">
          <Search className="mx-auto mb-4 h-12 w-12 text-purple-300" />
          <h3 className="mb-2 text-xl font-medium text-white">{t('filters.emptytitle')}</h3>
          <p className="mb-6 text-purple-200">{t('filters.emptymessage')}</p>
          <Button variant="outline" className="border-purple-400/30 text-purple-100 hover:bg-purple-700/20" onClick={resetFilters}>
            {t('actions.reset')}
          </Button>
        </div>
      )}
    </>
  );
}
