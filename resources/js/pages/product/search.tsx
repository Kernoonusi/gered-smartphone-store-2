import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MultipleSelector } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layouts/app-layout';
import { SmartphoneFull } from '@/types';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { router, usePage } from '@inertiajs/react';
import { Battery, Camera, Cpu, Database, MemoryStick, Monitor, Search, SlidersHorizontal, Weight } from 'lucide-react';
import { FormEvent, useState } from 'react';
// Filter options from backend
interface FilterOptions {
  priceRange: [number, number];
  screenSizeRange: [string, string];
  ramOptions: string[];
  storageOptions: string[];
  batteryCapacityRange: [string, string];
  processors: string[];
  operatingSystems: string[];
  cameraRange: [string, string];
  weightRange: [string, string];
}

interface CurrentFilters {
  search?: string;
  brand?: string[];
  priceMin?: number;
  priceMax?: number;
  screenSizeMin?: string;
  screenSizeMax?: string;
  ramFilter?: string[];
  storageFilter?: string[];
  batteryCapacityMin?: string;
  processor?: string[];
  os?: string;
  cameraFilter?: string[];
  weightMax?: string;
}

interface SearchPageProps {
  smartphones: SmartphoneFull[];
  filters: FilterOptions;
  brands: { brand: string }[];
  currentFilters: CurrentFilters;
  [key: string]: unknown;
}

export default function SmartphoneSearchPage() {
  const { smartphones, filters, brands, currentFilters } = usePage<SearchPageProps>().props;

  // State for search filters
  const [searchQuery, setSearchQuery] = useState<string>(currentFilters.search || '');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(currentFilters.brand ? currentFilters.brand : []);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentFilters.priceMin || filters.priceRange[0],
    currentFilters.priceMax || filters.priceRange[1],
  ]);

  // State for specification filters
  const [screenSizeRange, setScreenSizeRange] = useState<[string, string]>([
    currentFilters.screenSizeMin || filters.screenSizeRange[0],
    currentFilters.screenSizeMax || filters.screenSizeRange[1],
  ]);
  const [ramFilter, setRamFilter] = useState<string[]>(currentFilters.ramFilter ? currentFilters.ramFilter : []);
  const [storageFilter, setStorageFilter] = useState<string[]>(currentFilters.storageFilter ? currentFilters.storageFilter : []);
  const [batteryMin, setBatteryMin] = useState<string>(currentFilters.batteryCapacityMin || filters.batteryCapacityRange[0]);
  const [processor, setProcessor] = useState<string[]>(currentFilters.processor || []);
  const [os, setOs] = useState<string>(currentFilters.os || '');
  const [cameraFilter, setCameraFilter] = useState<string[]>(currentFilters.cameraFilter ? currentFilters.cameraFilter : []);
  const [weightMax, setWeightMax] = useState<string>(currentFilters.weightMax || filters.weightRange[1]);

  // UI state
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeFilterTab, setActiveFilterTab] = useState<string>('basic');

  const handleSearch = (e: FormEvent): void => {
    e.preventDefault();

    router.get(
      '/search',
      {
        search: searchQuery,
        brand: selectedBrands.length === 0 || selectedBrands.includes('all') ? null : selectedBrands,
        priceMin: priceRange[0],
        priceMax: priceRange[1],
        screenSizeMin: screenSizeRange[0],
        screenSizeMax: screenSizeRange[1],
        ramFilter: ramFilter.length ? ramFilter : undefined,
        storageFilter: storageFilter || undefined,
        batteryCapacityMin: batteryMin !== filters.batteryCapacityRange[0] ? batteryMin : undefined,
        processor: processor || undefined,
        os: os === 'all' ? undefined : os,
        cameraFilter: cameraFilter.length ? cameraFilter : undefined,
        weightMax: weightMax !== filters.weightRange[1] ? weightMax : undefined,
      },
      { preserveState: true, preserveScroll: true, only: ['smartphones', 'filters', 'currentFilters'] },
    );
  };

  const resetFilters = (): void => {
    setSearchQuery('');
    setSelectedBrands([]);
    setPriceRange(filters.priceRange);
    setScreenSizeRange(filters.screenSizeRange);
    setRamFilter([]);
    setStorageFilter([]);
    setBatteryMin(filters.batteryCapacityRange[0]);
    setProcessor([]);
    setOs('');
    setCameraFilter([]);
    setWeightMax(filters.weightRange[1]);

    router.get('/search');
  };
  // console.table(currentFilters);
  // console.table(filters);
  return (
    <Layout>
      <div className="min-h-screen p-4 md:p-8">
        {/* Search Component */}
        <div className="mb-8 rounded-2xl border border-purple-300/20 bg-purple-500/10 p-6 shadow-xl backdrop-blur-lg">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-purple-300" />
                <Input
                  type="text"
                  placeholder="Search smartphones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-purple-300/30 bg-purple-700/10 pl-10 text-white placeholder:text-purple-300 focus:border-purple-400"
                />
              </div>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Search
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-purple-400/30 text-purple-100 hover:bg-purple-700/20"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-5 w-5" />
                Filters
              </Button>
            </div>

            {/* Expandable Filter Section */}
            {showFilters && (
              <div className="mt-6 rounded-xl border border-purple-400/20 bg-purple-800/10 p-4 backdrop-blur-md">
                <Tabs value={activeFilterTab} onValueChange={setActiveFilterTab} className="w-full">
                  <TabsList className="mb-4 border-purple-300/30 bg-purple-700/20">
                    <TabsTrigger value="basic" className="data-[state=active]:bg-purple-600">
                      Basic
                    </TabsTrigger>
                    <TabsTrigger value="display" className="data-[state=active]:bg-purple-600">
                      Display
                    </TabsTrigger>
                    <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600">
                      Performance
                    </TabsTrigger>
                    <TabsTrigger value="camera" className="data-[state=active]:bg-purple-600">
                      Camera & Battery
                    </TabsTrigger>
                  </TabsList>

                  {/* Basic Filters */}
                  <TabsContent value="basic" className="mt-0">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-purple-100">Brand</label>
                        <MultipleSelector
                          options={brands.map((brand) => ({ value: brand.brand, label: brand.brand }))}
                          value={selectedBrands}
                          onValueChange={(options) => setSelectedBrands(options)}
                        />
                      </div>

                      <div className="grid grid-rows-2">
                        <label className="mb-2 block text-sm font-medium text-purple-100">
                          Price Range: ${currencyFormatter.format(Number(priceRange[0]))} - ${currencyFormatter.format(Number(priceRange[1]))}
                        </label>
                        <Slider
                          value={priceRange}
                          min={Number(filters.priceRange[0])}
                          max={Number(filters.priceRange[1])}
                          step={50}
                          onValueChange={(value) => setPriceRange([Number(value[0]), Number(value[1])])}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-purple-100">Operating System</label>
                        <Select value={os} onValueChange={setOs}>
                          <SelectTrigger className="border-purple-300/30 bg-purple-700/20 text-white">
                            <SelectValue placeholder="Any OS" />
                          </SelectTrigger>
                          <SelectContent className="border-purple-300/30 bg-purple-800 text-white">
                            <SelectItem value="all">Any OS</SelectItem>
                            {filters.operatingSystems.map((osOption) => (
                              <SelectItem key={osOption} value={osOption}>
                                {osOption}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Display Filters */}
                  <TabsContent value="display" className="mt-0">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 flex items-center text-sm font-medium text-purple-100">
                          <Monitor className="mr-2 h-4 w-4" />
                          Screen Size: {screenSizeRange[0]}" - {screenSizeRange[1]}"
                        </label>
                        <Slider
                          value={screenSizeRange.map(Number)}
                          min={Number(filters.screenSizeRange[0])}
                          max={Number(filters.screenSizeRange[1])}
                          step={0.1}
                          onValueChange={(value: number[]) => setScreenSizeRange([value[0].toString(), value[1].toString()])}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <label className="mb-2 flex items-center text-sm font-medium text-purple-100">
                          <Weight className="mr-2 h-4 w-4" />
                          Max Weight: {weightMax}g
                        </label>
                        <Slider
                          value={[Number(weightMax)]}
                          min={Number(filters.weightRange[0])}
                          max={Number(filters.weightRange[1])}
                          step={10}
                          onValueChange={(value: number[]) => setWeightMax(value[0].toString())}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Performance Filters */}
                  <TabsContent value="performance" className="mt-0">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div>
                        <label className="mb-2 flex items-center text-sm font-medium text-purple-100">
                          <MemoryStick className="mr-2 h-4 w-4" />
                          Ram
                        </label>
                        <MultipleSelector
                          options={filters.ramOptions.map((ram) => ({ value: ram.toString(), label: `${ram}` }))}
                          value={ramFilter}
                          onValueChange={(options) => setRamFilter(options)}
                          placeholder="Select RAM"
                        />
                      </div>

                      <div>
                        <label className="mb-2 flex items-center text-sm font-medium text-purple-100">
                          <Database className="mr-2 h-4 w-4" />
                          Storage
                        </label>
                        <MultipleSelector
                          options={filters.storageOptions.map((storage) => ({ value: storage.toString(), label: `${storage}` }))}
                          value={storageFilter}
                          onValueChange={(options) => setStorageFilter(options)}
                          placeholder="Select Storage"
                        />
                      </div>

                      <div>
                        <label className="mb-2 flex items-center text-sm font-medium text-purple-100">
                          <Cpu className="mr-2 h-4 w-4" />
                          Processor
                        </label>
                        <MultipleSelector
                          options={filters.processors.map((processor) => ({ value: processor.toString(), label: processor }))}
                          value={processor}
                          onValueChange={(options) => setProcessor(options)}
                          placeholder="Select Processor"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Camera & Battery Filters */}
                  <TabsContent value="camera" className="mt-0">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 flex items-center text-sm font-medium text-purple-100">
                          <Camera className="mr-2 h-4 w-4" />
                          Camera: {cameraFilter.length ? cameraFilter.join(', ') : 'Any'}
                        </label>
                        <MultipleSelector
                          options={filters.cameraRange.map((camera) => ({ value: camera.toString(), label: camera }))}
                          value={cameraFilter}
                          onValueChange={(options) => setCameraFilter(options)}
                          placeholder="Select Camera"
                        />
                      </div>

                      <div>
                        <label className="mb-2 flex items-center text-sm font-medium text-purple-100">
                          <Battery className="mr-2 h-4 w-4" />
                          Minimum Battery Capacity: {batteryMin}mAh
                        </label>
                        <Slider
                          value={[Number(batteryMin)]}
                          min={Number(filters.batteryCapacityRange[0])}
                          max={Number(filters.batteryCapacityRange[1])}
                          step={100}
                          onValueChange={(value: number[]) => setBatteryMin(value[0].toString())}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="mt-6 flex items-end">
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Apply Filters
                  </Button>
                  {/* Add the reset button here */}
                  <Button
                    type="button"
                    variant="outline"
                    className="ml-4 w-full border-purple-400/30 text-purple-100 hover:bg-purple-700/20"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 lg:grid-cols-4">
            {smartphones.map((smartphone) => (
              <ProductCard key={smartphone.id} item={smartphone} />
            ))}
          </div>
        </div>
        {/* Empty State */}
        {(!smartphones || smartphones.length === 0) && (
          <div className="rounded-2xl border border-purple-300/20 bg-purple-500/10 p-12 text-center shadow-xl backdrop-blur-lg">
            <Search className="mx-auto mb-4 h-12 w-12 text-purple-300" />
            <h3 className="mb-2 text-xl font-medium text-white">No smartphones found</h3>
            <p className="mb-6 text-purple-200">Try adjusting your search or filters</p>
            <Button variant="outline" className="border-purple-400/30 text-purple-100 hover:bg-purple-700/20" onClick={resetFilters}>
              Reset all filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
