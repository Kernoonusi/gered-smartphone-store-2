import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MultipleSelector } from '@/components/ui/multi-select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layouts/app-layout';
import { SmartphoneFull } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Search, SlidersHorizontal } from 'lucide-react';
import { FormEvent, useState } from 'react';

type FilterOptions = Record<string, { type: string; range?: string[]; options: string[]; numberType?: string }>;
type CurrentFilters = Record<string, string[]>;

interface SearchPageProps {
  smartphones: SmartphoneFull[];
  filters: FilterOptions;
  currentFilters: CurrentFilters;
  [key: string]: unknown;
}

export default function SmartphoneSearchPage() {
  const { t } = useLaravelReactI18n();
  const { smartphones, filters, currentFilters } = usePage<SearchPageProps>().props;
  const [searchQuery, setSearchQuery] = useState<string>(currentFilters.search?.[0] || '');

  // --- Типы фильтров ---
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

  const initialSpecFilters: FiltersState = Object.entries(filters).reduce(
    (acc, [key]) => {
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
    },
    {} as FiltersState,
  );

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
  const handleSpecFilterChange = (
    key: string,
    value: { min: number; max: number } | string[]
  ) => {
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
            if (rangeValue.min !== filterConfig.defaultMin) {
              acc[`${key}Min`] = rangeValue.min;
            }
            if (rangeValue.max !== filterConfig.defaultMax) {
              acc[`${key}Max`] = rangeValue.max;
            }
          } else if (Array.isArray(value) && value.length > 0) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, unknown>
      ),
    };

    router.get('/search', searchParams, { preserveState: true, preserveScroll: true });
  };

  const resetFilters = (): void => {
    setSearchQuery('');
    const resetSpec: FiltersState = specFiltersConfig.reduce(
      (acc, filter) => ({
        ...acc,
        [filter.key]: filter.type === 'range'
          ? { min: filter.defaultMin, max: filter.defaultMax }
          : [],
      }),
      {} as FiltersState
    );
    setSpecFiltersState(resetSpec);
    router.get('/search', { preserveState: true, preserveScroll: true }); // Navigate to base search URL to clear query params
  };
  const filtersContent = (
    <div className="rounded-2xl border border-purple-300/20 bg-purple-500/10 p-6 shadow-xl backdrop-blur-lg">
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
                    <div className="space-y-2">
                      <Slider
                        // Ensure value is always an array of two numbers
                        value={[
                          (specFiltersState[filter.key] as { min: number; max: number })?.min ?? filter.min,
                          (specFiltersState[filter.key] as { min: number; max: number })?.max ?? filter.max,
                        ]}
                        min={filter.min}
                        max={filter.max}
                        step={filter.step}
                        onValueChange={(value) => handleSpecFilterChange(filter.key, { min: value[0], max: value[1] })}
                      />
                      {/* Display current selected range */}
                      <div className="flex justify-between text-sm text-purple-300">
                        <span>
                          {filter.numberType === 'integer'
                            ? Math.round((specFiltersState[filter.key] as { min: number; max: number })?.min ?? filter.defaultMin)
                            : ((specFiltersState[filter.key] as { min: number; max: number })?.min ?? filter.defaultMin).toFixed(1)}
                        </span>
                        <span>
                          {filter.numberType === 'integer'
                            ? Math.round((specFiltersState[filter.key] as { min: number; max: number })?.max ?? filter.defaultMax)
                            : ((specFiltersState[filter.key] as { min: number; max: number })?.max ?? filter.defaultMax).toFixed(1)}
                        </span>
                      </div>
                      {/* Display min/max of the range */}
                      <div className="flex justify-between text-xs text-purple-400">
                        <span>{filter.numberType === 'integer' ? Math.round(filter.defaultMin) : filter.defaultMin.toFixed(1)}</span>
                        <span>{filter.numberType === 'integer' ? Math.round(filter.defaultMax) : filter.defaultMax.toFixed(1)}</span>
                      </div>
                    </div>
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

          {/* Product Grid Section */}
          <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {smartphones.map((smartphone) => (
              <ProductCard key={smartphone.id} item={smartphone} />
            ))}
          </div>

          {/* Empty State */}
          {(!smartphones || smartphones.length === 0) && (
            <div className="mt-8 rounded-2xl border border-purple-300/20 bg-purple-500/10 p-12 text-center shadow-xl backdrop-blur-lg">
              <Search className="mx-auto mb-4 h-12 w-12 text-purple-300" />
              <h3 className="mb-2 text-xl font-medium text-white">{t('empty.title')}</h3>
              <p className="mb-6 text-purple-200">{t('empty.message')}</p>
              <Button variant="outline" className="border-purple-400/30 text-purple-100 hover:bg-purple-700/20" onClick={resetFilters}>
                {t('actions.reset')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
