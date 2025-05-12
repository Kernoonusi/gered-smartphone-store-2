import SearchList from '@/components/search-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MultipleSelector } from '@/components/ui/multi-select';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layouts/app-layout';
import { SmartphoneFull } from '@/types';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { Deferred, Head, router, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Search, SlidersHorizontal } from 'lucide-react';
import { FormEvent, useState } from 'react';

type FilterOptions = Record<string, { type: string; range?: string[]; options: string[]; numberType?: string }>;
type CurrentFilters = Record<string, string[]>;
type PaginationLink = { url: string | null; label: string; active: boolean };
type PaginationMeta = { current_page: number; last_page: number; per_page: number; total: number };
type Paginator<T> = { data: T[]; links: PaginationLink[]; meta: PaginationMeta };

interface SearchPageProps {
  smartphones: Paginator<SmartphoneFull>;
  filters: FilterOptions;
  currentFilters: CurrentFilters;
  [key: string]: unknown;
}

// Тип для RangeSlider
type RangeFilter = {
  key: string;
  group: string;
  label: string;
  type: 'range';
  min: number;
  max: number;
  defaultMin: number;
  defaultMax: number;
  step: number;
  numberType: 'integer' | 'float';
  options: string[];
};

type ExactFilter = {
  key: string;
  group: string;
  label: string;
  type: 'exact';
  options: string[];
};

type FilterConfig = RangeFilter | ExactFilter;

type FiltersState = {
  [key: string]: { min: number; max: number } | string[];
};

function RangeSlider({ f, v, onChange }: { f: RangeFilter; v: [number, number]; onChange: (v: [number, number]) => void }) {
  const { currentLocale } = useLaravelReactI18n();
  const isRu = currentLocale && currentLocale() === 'ru';
  const formatValue = (val: number) => {
    if (isRu && f.key === 'priceRange') {
      return currencyFormatter.format(val);
    }
    return f.numberType === 'integer' ? Math.round(val) : val.toFixed(1);
  };
  return (
    <div className="space-y-2">
      <Slider value={v} min={f.min} max={f.max} step={f.step} onValueChange={onChange} />
      <div className="flex justify-between text-sm text-purple-300">
        <span>{formatValue(v[0])}</span>
        <span>{formatValue(v[1])}</span>
      </div>
      <div className="flex justify-between text-xs text-purple-400">
        <span>{formatValue(f.defaultMin)}</span>
        <span>{formatValue(f.defaultMax)}</span>
      </div>
    </div>
  );
}

function SearchListSkeleton() {
  return (
    <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="relative flex w-full max-w-xs flex-col items-stretch gap-4 rounded-2xl border border-purple-300/20 bg-[#27243a]/80 p-6 shadow-xl backdrop-blur-lg"
        >
          <div className="absolute top-4 right-4">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="h-40 w-36 rounded-xl bg-zinc-200/60" />
          </div>
          <div className="mt-2">
            <Skeleton className="mb-2 h-6 w-32" /> {/* title */}
            <Skeleton className="mb-2 h-8 w-40" /> {/* price */}
          </div>
          <div className="mb-2 flex flex-wrap gap-2">
            <Skeleton className="h-8 w-12 rounded-xl" />
            <Skeleton className="h-8 w-16 rounded-xl" />
            <Skeleton className="h-8 w-14 rounded-xl" />
            <Skeleton className="h-8 w-36 rounded-xl" />
          </div>
          <div className="mt-auto">
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SmartphoneSearchPage() {
  const { t } = useLaravelReactI18n();
  const { filters, currentFilters } = usePage<SearchPageProps>().props;
  const [searchQuery, setSearchQuery] = useState<string>(currentFilters.search?.[0] || '');

  const filterLabelKey = (key: string) => {
    if (key === 'price') return t('filters.price');
    if (key === 'brand') return t('filters.brand');
    return t(`filters.${key}`);
  };

  const specFiltersConfig: FilterConfig[] = Object.entries(filters).map(([key, { type, range, options, numberType }]) => {
    if (type === 'range') {
      return {
        key,
        group: key === 'brand' ? 'basic' : 'specs',
        label: filterLabelKey(key),
        type: 'range',
        min: Math.min(Number(range?.[0] ?? 0), Number(range?.[1] ?? 100)),
        max: Math.max(Number(range?.[0] ?? 0), Number(range?.[1] ?? 100)),
        defaultMin: Math.min(Number(range?.[0] ?? 0), Number(range?.[1] ?? 100)),
        defaultMax: Math.max(Number(range?.[0] ?? 0), Number(range?.[1] ?? 100)),
        step: numberType === 'integer' ? 1 : Math.abs(Number(range?.[1] ?? 100) - Number(range?.[0] ?? 0)) / 100 || 0.1,
        numberType: numberType === 'integer' ? 'integer' : 'float',
        options: options || [],
      } as RangeFilter;
    } else {
      return {
        key,
        group: key === 'brand' ? 'basic' : 'specs',
        label: filterLabelKey(key),
        type: 'exact',
        options: options || [],
      } as ExactFilter;
    }
  });

  const initialSpecFilters: FiltersState = Object.entries(filters).reduce((acc, [key]) => {
    const specFilter = specFiltersConfig.find((f) => f.key === key);
    if (specFilter && specFilter.type === 'range') {
      acc[key] = {
        min: currentFilters[`${key}Min`] ? Number(currentFilters[`${key}Min`][0]) : specFilter.defaultMin,
        max: currentFilters[`${key}Max`] ? Number(currentFilters[`${key}Max`][0]) : specFilter.defaultMax,
      };
    } else {
      acc[key] = Array.isArray(currentFilters[key]) ? currentFilters[key] : [];
    }
    return acc;
  }, {} as FiltersState);

  const [specFiltersState, setSpecFiltersState] = useState<FiltersState>(initialSpecFilters);

  // UI state
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Group filters by category
  const filterGroups = specFiltersConfig.reduce(
    (acc, filter) => {
      const groupKey = filter.group || 'other'; // Ensure there's always a group key
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(filter);
      return acc;
    },
    {} as Record<string, typeof specFiltersConfig>,
  );
  // Need state for active tab based on available groups
  const availableGroups = Object.keys(filterGroups);
  const [activeFilterTab, setActiveFilterTab] = useState<string>(availableGroups[0] || ''); // Initialize with the first group key

  // Specify numeric parameters to use MultipleSelector instead of slider
  const numericMultipleSelectorKeys = [
    'ram', // Example: RAM, adjust to your actual key
    'storage', // Example: Storage, adjust as needed
    // Add more keys as needed
  ];

  // Исправленная типизация функции обновления фильтров
  const handleSpecFilterChange = (key: string, value: { min: number; max: number } | string[]) => {
    setSpecFiltersState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle changes specifically from MultipleSelector
  const handleMultiSelectChange = (key: string, selectedOptions: string[]) => {
    handleSpecFilterChange(key, selectedOptions);
  };

  const handleSearch = (e?: FormEvent): void => {
    e?.preventDefault();

    const searchParams = {
      search: searchQuery || undefined,
      ...Object.entries(specFiltersState).reduce(
        (acc, [key, value]) => {
          const filterConfig = specFiltersConfig.find((f) => f.key === key);
          if (!filterConfig) return acc;

          // --- Исправление для ram/storage как MultipleSelector ---
          if (numericMultipleSelectorKeys.includes(key) && Array.isArray(value) && value.length > 0) {
            acc[key] = value;
            return acc;
          }

          if (filterConfig.type === 'range') {
            const rangeValue = value as { min: number; max: number };
            if (key === 'priceRange') {
              if (rangeValue.min !== filterConfig.defaultMin) {
                acc['priceMin'] = rangeValue.min;
              }
              if (rangeValue.max !== filterConfig.defaultMax) {
                acc['priceMax'] = rangeValue.max;
              }
            } else {
              if (rangeValue.min !== filterConfig.defaultMin) {
                acc[`${key}Min`] = rangeValue.min;
              }
              if (rangeValue.max !== filterConfig.defaultMax) {
                acc[`${key}Max`] = rangeValue.max;
              }
            }
          } else if (Array.isArray(value) && value.length > 0) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, unknown>,
      ),
    };

    router.get('/search', searchParams, { preserveState: true, preserveScroll: true });
  };

  const resetFilters = (): void => {
    setSearchQuery('');
    const resetSpec: FiltersState = specFiltersConfig.reduce(
      (acc, filter) => ({
        ...acc,
        [filter.key]: filter.type === 'range' ? { min: filter.defaultMin, max: filter.defaultMax } : [],
      }),
      {} as FiltersState,
    );
    setSpecFiltersState(resetSpec);
    router.get('/search', { preserveState: true, preserveScroll: true }); // Navigate to base search URL to clear query params
  };
  const filtersContent = (
    <div className="min-w-[300px] rounded-2xl border border-purple-300/20 bg-purple-500/10 p-6 shadow-xl backdrop-blur-lg dark:shadow-xl dark:shadow-purple-700/20">
      <h3 className="mb-4 text-lg font-semibold text-white">{t('filters.title')}</h3>
      <Tabs value={activeFilterTab} onValueChange={setActiveFilterTab} className="w-full">
        <TabsList className="mb-4 flex flex-wrap gap-2 border-purple-300/30 bg-purple-700/20">
          {Object.entries(filterGroups).map(([groupKey, groupFilters]) => {
            // Find group config for the label
            const groupConfig = groupFilters.length > 0 ? specFiltersConfig.find((f) => f.group === groupKey) : null;
            // Ensure groupConfig is defined and has a label before accessing it
            const groupLabel = groupConfig?.label || groupKey;
            return (
              <TabsTrigger key={groupKey} value={groupKey} className="data-[state=active]:bg-purple-600">
                {/* {groupConfig?.icon && React.createElement(groupConfig.icon, { className: 'mr-2 h-4 w-4' })} */}
                {groupLabel}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {Object.entries(filterGroups).map(([groupKey, groupFilters]) => (
          <TabsContent key={groupKey} value={groupKey} className="mt-0">
            {/* Use consistent grid gap */}
            <div className="grid grid-cols-1 gap-4">
              {groupFilters.map((filter) => (
                <div key={filter.key}>
                  <label className="mb-2 flex items-center text-sm font-medium text-purple-100">
                    {/* {filter.icon && React.createElement(filter.icon, { className: 'mr-2 h-4 w-4' })} */}
                    {filter.label}
                  </label>
                  {(filter.type === 'exact' || numericMultipleSelectorKeys.includes(filter.key)) &&
                  Array.isArray(filter.options) &&
                  filter.options.length > 0 ? (
                    <MultipleSelector
                      options={
                        // If numeric, generate options from range
                        filter.type === 'range' && numericMultipleSelectorKeys.includes(filter.key)
                          ? Array.from({ length: filter.max - filter.min + 1 }, (_, i) => filter.min + i)
                              .filter((v) => Array.isArray(filter.options) && filter.options.includes(v.toString()))
                              .map((v) => ({ value: v.toString(), label: v.toString() }))
                          : filter.options?.map((opt: string) => ({ value: opt, label: opt })) || []
                      }
                      value={(specFiltersState[filter.key] as string[]) || []}
                      onValueChange={(selectedOptions) => handleMultiSelectChange(filter.key, selectedOptions)}
                      placeholder={t('placeholders.select :label', { label: filter.label.toLowerCase() })}
                      className="border-purple-300/30 bg-purple-700/20 text-white placeholder:text-purple-300"
                    />
                  ) : filter.type === 'range' ? (
                    <RangeSlider
                      f={filter}
                      v={[
                        (specFiltersState[filter.key] as { min: number; max: number })?.min ?? filter.min,
                        (specFiltersState[filter.key] as { min: number; max: number })?.max ?? filter.max,
                      ]}
                      onChange={(value) => handleSpecFilterChange(filter.key, { min: value[0], max: value[1] })}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {/* Buttons placed inside the shared filter content block */}
      <div className="mt-6 flex flex-col gap-2 md:gap-4">
        <Button
          type="button"
          className="w-full bg-purple-600 hover:bg-purple-700"
          // Call handleSearch and hide filters if on mobile
          onClick={() => {
            handleSearch();
            if (window.innerWidth < 768) {
              // Simple check for mobile (adjust breakpoint if needed)
              setShowFilters(false);
            }
          }}
        >
          {t('actions.apply')}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-purple-400/30 text-purple-100 hover:bg-purple-700/20"
          // Reset and hide filters if on mobile
          onClick={() => {
            resetFilters();
            if (window.innerWidth < 768) {
              // Simple check for mobile
              setShowFilters(false);
            }
          }}
        >
          {t('actions.reset')}
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>{t('pages.search')}</title>
      </Head>
      <div className="flex min-h-screen flex-col gap-8 p-4 md:flex-row md:p-8">
        {/* Desktop Filters Sidebar - Renders filtersContent */}
        <div className="sticky top-20 hidden h-full w-72 md:block">{filtersContent}</div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Input and Mobile Filter Toggle */}
          <div className="mb-8 rounded-2xl border border-purple-300/20 bg-purple-500/10 p-6 shadow-xl backdrop-blur-lg">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-purple-300" />
                <Input
                  type="text"
                  placeholder={t('placeholders.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-purple-300/30 bg-purple-700/20 pl-10 text-white placeholder:text-purple-300 focus:border-purple-400"
                  // Trigger search on Enter key press
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(e as unknown as FormEvent)}
                />
              </div>
              {/* Mobile Filter Toggle Button */}
              <Button
                type="button"
                variant="outline"
                className="border-purple-400/30 text-purple-100 hover:bg-purple-700/20 md:hidden" /* Show only on mobile */
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-5 w-5" />
                {t('filters.title')} {showFilters ? t('actions.hide') : t('actions.show')}
              </Button>
            </div>

            {/* Mobile Filters Block - Conditionally Renders filtersContent */}
            <div className="md:hidden">
              {showFilters && (
                <div className="mt-6">
                  {/* Render the shared filter content */}
                  {filtersContent}
                </div>
              )}
            </div>
          </div>

          <Deferred data="smartphones" fallback={<SearchListSkeleton />}>
            <SearchList resetFilters={resetFilters} />
          </Deferred>
        </div>
      </div>
    </Layout>
  );
}
