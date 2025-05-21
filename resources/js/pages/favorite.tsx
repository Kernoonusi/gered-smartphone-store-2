import { ProductCard } from '@/components/product-card'; // Импортируем ProductCard
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Smartphone, SmartphoneFull } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface FavoritesPageProps {
  favorites: Smartphone[];
}

export default function FavoritesPage({ favorites }: FavoritesPageProps) {
  const { t } = useLaravelReactI18n();

  return (
    <AppHeaderLayout>
      <Head title={t('pages.favorites_title')} />
      <div className="container mx-auto px-4 py-8 lg:w-4/5">
        <h1 className="mb-6 text-3xl font-bold text-white">{t('pages.my_favorites')}</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((product) => (
              <ProductCard key={product.id} item={product as SmartphoneFull} /> // Используем ProductCard, передаем product как item
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-xl font-semibold text-white">{t('pages.no_favorites_yet')}</h3>
            <p className="mt-1 text-gray-400">{t('pages.start_adding_favorites')}</p>
            <div className="mt-6">
              <Link
                href="/search"
                className="inline-flex items-center rounded-md border border-transparent bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-fuchsia-700 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
              >
                {t('pages.browse_products')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppHeaderLayout>
  );
}
