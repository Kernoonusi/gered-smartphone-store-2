<?php

namespace App\Http\Controllers;

use App\Models\Smartphone;
use App\Models\SmartphoneSpecification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SmartphoneController extends Controller
{
    /**
     * Display the search page with smartphones.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Get basic search parameters
        $search = $request->input('search');
        $brand = $request->input('brand');
        $priceMin = $request->input('priceMin', 0);
        $priceMax = $request->input('priceMax', 2000);

        // Get specification filter parameters
        $screenSizeMin = $request->input('screenSizeMin');
        $screenSizeMax = $request->input('screenSizeMax');
        $ramFilter = $request->input('ramFilter');
        $storageFilter = $request->input('storageFilter');
        $batteryCapacityMin = $request->input('batteryCapacityMin');
        $processor = $request->input('processor');
        $os = $request->input('os');
        $cameraMin = $request->input('cameraMin'); // Minimum megapixels
        $weightMax = $request->input('weightMax'); // Maximum weight in grams

        // Get search results
        $smartphones = $this->getSearchResults($request);

        // Get filter ranges for specifications
        $specRanges = $this->getSpecificationRanges();

        // Get processors and OS options for filters
        $processors = SmartphoneSpecification::where('spec_key', 'processor')
            ->distinct()
            ->pluck('spec_value')
            ->sort()
            ->values();

        $operatingSystems = SmartphoneSpecification::where('spec_key', 'os')
            ->distinct()
            ->pluck('spec_value')
            ->sort()
            ->values();

        // Return Inertia view with data
        return Inertia::render('product/search', [
            'smartphones' => $smartphones,
            'filters' => [
                'priceRange' => [
                    Smartphone::min('price') ?? 0,
                    Smartphone::max('price') ?? 2000,
                ],
                'screenSizeRange' => $specRanges['screen_size'],
                'ramOptions' => $specRanges['ram'],
                'storageOptions' => $specRanges['storage'],
                'batteryCapacityRange' => $specRanges['battery_capacity'],
                'processors' => $processors,
                'operatingSystems' => $operatingSystems,
                'cameraRange' => $specRanges['camera'],
                'weightRange' => $specRanges['weight'],
            ],
            'currentFilters' => [
                'search' => $search,
                'brand' => is_array($brand) ? $brand : (is_string($brand) ? [$brand] : []),
                'priceMin' => $priceMin,
                'priceMax' => $priceMax,
                'screenSizeMin' => $screenSizeMin,
                'screenSizeMax' => $screenSizeMax,
                'ramFilter' => $ramFilter,
                'storageFilter' => $storageFilter,
                'batteryCapacityMin' => $batteryCapacityMin,
                'processor' => $processor,
                'os' => $os,
                'cameraMin' => $cameraMin,
                'weightMax' => $weightMax,
            ],
        ]);
    }

    /**
     * Get min/max ranges and options for specifications.
     */
    private function getSpecificationRanges(): array
    {
        return [
            'screen_size' => [
                SmartphoneSpecification::where('spec_key', 'screen_size')->min('spec_value') ?? 0,
                SmartphoneSpecification::where('spec_key', 'screen_size')->max('spec_value') ?? 0,
            ],
            'ram' => SmartphoneSpecification::where('spec_key', 'ram')
                ->distinct()
                ->pluck('spec_value')
                ->sort()
                ->values()
                ->toArray(),
            'storage' => SmartphoneSpecification::where('spec_key', 'storage')
                ->distinct()
                ->pluck('spec_value')
                ->sort()
                ->values()
                ->toArray(),
            'battery_capacity' => [
                SmartphoneSpecification::where('spec_key', 'battery_capacity')->min('spec_value') ?? 0,
                SmartphoneSpecification::where('spec_key', 'battery_capacity')->max('spec_value') ?? 0,
            ],
            'camera' => SmartphoneSpecification::where('spec_key', 'camera')
                ->distinct()
                ->pluck('spec_value')
                ->sort()
                ->values()
                ->toArray(),
            'weight' => [
                SmartphoneSpecification::where('spec_key', 'weight')->min('spec_value') ?? 0,
                SmartphoneSpecification::where('spec_key', 'weight')->max('spec_value') ?? 0,
            ],
        ];
    }

    private function getSearchResults($request)
    {
        // Общие фильтры
        $search = $request->input('search');
        $brand = $request->input('brand');
        $priceMin = $request->input('priceMin', 0);
        $priceMax = $request->input('priceMax', 2000);

        // Фильтры по спецификациям
        $ramFilter = $request->input('ramFilter'); // например: "8,12" или массив
        $storageFilter = $request->input('storageFilter'); // например: "32,64" или массив
        $screenSizeMin = $request->input('screenSizeMin'); // например, 4.02
        $screenSizeMax = $request->input('screenSizeMax'); // например, 6.51
        $batteryCapacityMin = $request->input('batteryCapacityMin'); // например, 4000
        $cameraFilter = $request->input('cameraFilter'); // например: "12,16" или массив
        $weightMax = $request->input('weightMax');

        $os = $request->input('os');
        $processor = $request->input('processor');

        // Базовый запрос
        $query = Smartphone::with(['images', 'specifications'])
            ->when($search, function ($q) use ($search) {
                $q->where(function ($query) use ($search) {
                    if (! empty(trim($search))) {
                        $query->where('model', 'like', "%{$search}%")
                            ->orWhere('description', 'like', "%{$search}%");
                    }
                });
            })
            ->when($brand, function ($q) use ($brand) {
                // Преобразуем входной параметр в массив, удаляя пустые значения
                $brands = is_array($brand)
                    ? $brand
                    : (is_string($brand)
                        ? array_map('trim', explode(',', $brand))
                        : []);
                $brands = array_filter($brands); // Удаляем пустые элементы

                if (! empty($brands)) {
                    // Используем whereIn с проверкой регистра или точного совпадения
                    $q->whereIn('brand', $brands);
                }
            })
            ->whereBetween('price', [$priceMin, $priceMax]);

        // Фильтр по памяти (RAM) — вариант 1: точное совпадение по нескольким значениям
        if ($ramFilter) {
            $ramValues = is_array($ramFilter) ? $ramFilter : array_map('trim', explode(',', $ramFilter));
            $ramValues = array_map(function ($value) {
                return str_replace(' ', '', strtolower($value)); // Normalize RAM values
            }, $ramValues);
            $query->whereHas('specifications', function ($q) use ($ramValues) {
                $q->where('spec_key', 'ram')
                    ->whereIn(DB::raw('REPLACE(LOWER(spec_value), " ", "")'), $ramValues);
            });
        }

        // Фильтр по размеру экрана — вариант 2: сравнение числового значения
        if ($screenSizeMin || $screenSizeMax) {
            $query->whereHas('specifications', function ($q) use ($screenSizeMin, $screenSizeMax) {
                $q->where('spec_key', 'screen_size')
                    ->when($screenSizeMin, function ($q2) use ($screenSizeMin) {
                        $q2->whereRaw('CAST(spec_value AS REAL) >= ?', [$screenSizeMin]);
                    })
                    ->when($screenSizeMax, function ($q2) use ($screenSizeMax) {
                        $q2->whereRaw('CAST(spec_value AS REAL) <= ?', [$screenSizeMax]);
                    });
            });
        }

        if ($storageFilter) {
            $storageValues = is_array($storageFilter) ? $storageFilter : array_map('trim', explode(',', $storageFilter));
            $storageValues = array_map(function ($value) {
                return str_replace(' ', '', strtolower($value)); // Normalize storage values
            }, $storageValues);
            $query->whereHas('specifications', function ($q) use ($storageValues) {
                $q->where('spec_key', 'storage')
                    ->whereIn(DB::raw('REPLACE(LOWER(spec_value), " ", "")'), $storageValues);
            });
        }

        // Фильтр по ёмкости батареи — вариант 2: сравнение числового значения
        if ($batteryCapacityMin) {
            $query->whereHas('specifications', function ($q) use ($batteryCapacityMin) {
                $q->where('spec_key', 'battery_capacity')
                    ->whereRaw("CAST(TRIM(REPLACE(REPLACE(spec_value, 'mAh', ''), 'mah', '')) AS INTEGER) >= ?", [$batteryCapacityMin]);
            });
        }

        // Фильтр по камере — вариант 1: множественный выбор
        if ($cameraFilter) {
            $cameraValues = is_array($cameraFilter) ? $cameraFilter : explode(',', $cameraFilter);
            $cameraValues = array_map(fn($value) => str_replace(' ', '', strtolower($value)), $cameraValues);
        
            $query->whereHas('specifications', function ($q) use ($cameraValues) {
                $q->where('spec_key', 'camera')
                    ->where(function ($query) use ($cameraValues) {
                        foreach ($cameraValues as $value) {
                            $query->orWhereRaw("REPLACE(LOWER(spec_value), ' ', '') = ?", [$value]);
                        }
                    });
            });
        }        

        // Фильтр по весу — вариант 2: сравнение числового значения
        if ($weightMax) {
            $query->whereHas('specifications', function ($q) use ($weightMax) {
                $q->where('spec_key', 'weight')
                    ->whereRaw('CAST(spec_value AS REAL) <= ?', [$weightMax]);
            });
        }

        // Фильтр по операционной системе
        if ($os) {
            $query->whereHas('specifications', function ($q) use ($os) {
                $q->where('spec_key', 'os')
                    ->where('spec_value', $os);
            });
        }

        // Фильтр по процессору
        if ($processor = $request->input('processor')) {
            $processorValues = is_array($processor) ? $processor : explode(',', $processor);
            $processorValues = array_map(fn ($value) => str_replace(' ', '', strtolower($value)), $processorValues);

            $query->whereHas('specifications', function ($q) use ($processorValues) {
                $q->where('spec_key', 'processor')
                    ->where(function ($query) use ($processorValues) {
                        foreach ($processorValues as $value) {
                            $query->orWhereRaw("REPLACE(LOWER(spec_value), ' ', '') LIKE ?", ["%{$value}%"]);
                        }
                    });
            });
        }

        // Получаем результаты и обрабатываем вывод
        $smartphones = $query->get()->map(function ($smartphone) {
            $smartphone->specifications_array = $smartphone->specifications
                ? $smartphone->specifications->pluck('spec_value', 'spec_key')->toArray()
                : [];
            $smartphone->image_url = $smartphone->images->isNotEmpty()
                ? asset('storage/'.$smartphone->images[0]->image_path)
                : asset('phone.png');

            return $smartphone;
        });

        return $smartphones;
    }

    /**
     * Display details of a specific smartphone.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $smartphone = Smartphone::with([
            'images',
            'specifications',
            'brand',
            'reviews.user',
        ])
            ->findOrFail($id);

        // Format smartphone data
        $smartphoneData = [
            'id' => $smartphone->id,
            'brand' => $smartphone->brand,
            'model' => $smartphone->model,
            'price' => $smartphone->price,
            'description' => $smartphone->description,
            'created_at' => $smartphone->created_at,
            'updated_at' => $smartphone->updated_at,
            'images' => $smartphone->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'image_path' => asset('storage/'.$image->image_path),
                    'smartphone_id' => $image->smartphone_id,
                    'created_at' => $image->created_at,
                    'updated_at' => $image->updated_at,
                ];
            }),
            'specifications' => $smartphone->specifications->map(function ($spec) {
                return [
                    'id' => $spec->id,
                    'smartphone_id' => $spec->smartphone_id,
                    'spec_key' => $spec->spec_key,
                    'spec_value' => $spec->spec_value,
                    'created_at' => $spec->created_at,
                    'updated_at' => $spec->updated_at,
                ];
            }),
            'reviews' => $smartphone->reviews->map(function ($review) {
                return [
                    'id' => $review->id,
                    'user_id' => $review->user_id,
                    'smartphone_id' => $review->smartphone_id,
                    'text' => $review->text,
                    'rating' => $review->rating,
                    'created_at' => $review->created_at,
                    'updated_at' => $review->updated_at,
                    'user' => [
                        'id' => $review->user->id,
                        'name' => $review->user->name,
                        'email' => $review->user->email,
                        'avatar' => $review->user->avatar ? asset('storage/'.$review->user->avatar) : null,
                    ],
                ];
            }),
            // Get average rating
            'average_rating' => $smartphone->reviews->avg('rating') ?? 0,
        ];

        // Get related smartphones (same brand, different model)
        $relatedSmartphones = Smartphone::with(['images'])
            ->where('brand', $smartphone->brand)
            ->where('id', '!=', $smartphone->id)
            ->limit(4)
            ->get()
            ->map(function ($relatedPhone) {
                $imageUrl = $relatedPhone->images->isNotEmpty()
                    ? asset('storage/'.$relatedPhone->images[0]->image_path)
                    : asset('phone.png');

                return [
                    'id' => $relatedPhone->id,
                    'model' => $relatedPhone->model,
                    'price' => $relatedPhone->price,
                    'image_url' => $imageUrl,
                ];
            });

        return Inertia::render('product/index', [
            'smartphone' => $smartphoneData,
            'relatedSmartphones' => $relatedSmartphones,
        ]);
    }
}
