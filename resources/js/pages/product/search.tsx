import { useState, FormEvent } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, Search, Smartphone, SlidersHorizontal } from 'lucide-react';
import { SmartphoneFull } from '@/types';


// Page props from Inertia
interface SearchPageProps {
  smartphones: SmartphoneFull[];
  filters: {
    priceRange: [number, number];
  };
  [key: string]: unknown;
}

export default function SearchPage() {
  const { smartphones, filters } = usePage<SearchPageProps>().props;
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  const handleSearch = (e: FormEvent): void => {
    e.preventDefault();
    Inertia.get('/smartphones', {
      search: searchQuery,
      brand: selectedBrand,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
    }, { preserveState: true });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4 md:p-8">
      {/* Glassmorphism Header */}
      <div className="bg-purple-600/10 backdrop-blur-lg border border-purple-300/20 rounded-2xl shadow-xl p-6 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">SmartStore</h1>
        <p className="text-purple-100">Find your perfect smartphone</p>
      </div>
      
      {/* Search Component */}
      <div className="bg-purple-500/10 backdrop-blur-lg border border-purple-300/20 rounded-2xl shadow-xl p-6 mb-8">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-purple-300" />
              <Input
                type="text"
                placeholder="Search smartphones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-purple-700/10 border-purple-300/30 text-white placeholder:text-purple-300 focus:border-purple-400"
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
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>
          
          {/* Expandable Filter Section */}
          {showFilters && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-purple-800/10 backdrop-blur-md rounded-xl border border-purple-400/20">
              <div>
                <label className="block text-sm font-medium text-purple-100 mb-2">Brand</label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="bg-purple-700/20 border-purple-300/30 text-white">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-800 border-purple-300/30 text-white">
                    <SelectItem value="">All Brands</SelectItem>
                    {brands.map(brand => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>{brand.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-100 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={2000}
                  step={50}
                  onValueChange={(value: number[]) => setPriceRange(value as [number, number])}
                  className="mt-2"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
      
      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {smartphones && smartphones.map(smartphone => (
          <Card key={smartphone.id} className="bg-purple-500/10 backdrop-blur-lg border border-purple-300/20 hover:bg-purple-600/20 transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-white">{smartphone.model}</CardTitle>
                <Smartphone className="h-6 w-6 text-purple-300" />
              </div>
              <CardDescription className="text-purple-200">{smartphone.brand.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-32 mb-4 flex items-center justify-center">
                <img 
                  src={smartphone.image_url} 
                  alt={smartphone.model} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-200">Storage</span>
                  <span className="text-white">{smartphone.storage} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">RAM</span>
                  <span className="text-white">{smartphone.ram} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Screen</span>
                  <span className="text-white">{smartphone.screen_size}"</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-lg font-bold text-white">${smartphone.price}</span>
              <Button 
                variant="outline" 
                className="border-purple-400/30 text-purple-100 hover:bg-purple-700/20"
                onClick={() => router.visit(`/smartphones/${smartphone.id}`)}
              >
                Details <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Empty State */}
      {(!smartphones || smartphones.length === 0) && (
        <div className="bg-purple-500/10 backdrop-blur-lg border border-purple-300/20 rounded-2xl shadow-xl p-12 text-center">
          <Search className="h-12 w-12 mx-auto text-purple-300 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No smartphones found</h3>
          <p className="text-purple-200 mb-6">Try adjusting your search or filters</p>
          <Button 
            variant="outline" 
            className="border-purple-400/30 text-purple-100 hover:bg-purple-700/20"
            onClick={() => {
              setSearchQuery('');
              setSelectedBrand('');
              setPriceRange([0, 2000]);
              Inertia.get('/smartphones');
            }}
          >
            Reset all filters
          </Button>
        </div>
      )}
    </div>
  );
};