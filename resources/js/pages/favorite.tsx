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
      <div className="container mx-auto py-8 max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-white">{t('pages.my_favorites')}</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((product) => (
              <ProductCard key={product.id} item={product as SmartphoneFull} /> // Используем ProductCard, передаем product как item
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-fuchsia-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-16 text-center shadow-2xl shadow-fuchsia-500/10 backdrop-blur-sm">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 blur-xl"></div>
              <div className="relative rounded-full border border-fuchsia-500/30 bg-gradient-to-r from-fuchsia-600/10 to-cyan-600/10 p-6">
                <svg className="h-16 w-16 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-2xl font-bold text-transparent">
              {t('pages.no_favorites_yet')}
            </h3>
            <p className="mb-8 max-w-md text-lg text-gray-400">{t('pages.start_adding_favorites')}</p>
            <Link
              href="/search"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 px-8 py-4 font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-500/40 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
            >
              <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {t('pages.browse_products')}
            </Link>
          </div>
        )}
      </div>
    </AppHeaderLayout>
  );
}
