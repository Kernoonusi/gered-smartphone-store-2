<?php

namespace App\Http\Controllers;

use App\Models\Smartphone;
use App\Models\SmartphoneSpecification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        // Basic search parameters
        $search = $request->input('search');
        $brand = $request->input('brand');
        $priceMin = $request->input('priceMin', 0);
        $priceMax = $request->input('priceMax', 2000);

        // Get all specification keys from database
        $specKeys = SmartphoneSpecification::distinct('spec_key')->pluck('spec_key');

        // Dynamic filters preparation
        $dynamicFilters = [];
        $currentFilters = [
            'search' => $search,
            'brand' => is_array($brand) ? $brand : (is_string($brand) ? [$brand] : []),
            'priceMin' => $priceMin,
            'priceMax' => $priceMax,
        ];

        foreach ($specKeys as $key) {
            // Determine filter type (numeric or categorical)
            $sampleValue = SmartphoneSpecification::where('spec_key', $key)
                ->first()
                ?->spec_value;

            $isNumeric = is_numeric($sampleValue);

            // Store filter configuration
            $dynamicFilters[$key] = $isNumeric ? 'range' : 'exact';

            // Collect current filter values
            $currentFilters[$key] = $isNumeric
                ? [
                    'min' => $request->input($key.'Min'),
                    'max' => $request->input($key.'Max'),
                ]
                : $request->input($key.'Filter');
        }

        // Get specification ranges/options
        $specRanges = $this->getSpecificationRanges($specKeys->toArray());
        // Merge specification ranges and dynamic filters
        $specRangesAndFilters = [];
        $numericMultipleSelectorKeys = ['ram', 'storage']; // добавь свои ключи
        foreach ($specKeys as $key) {
            $sample = SmartphoneSpecification::where('spec_key', $key)->first();

            if (! $sample) {
                continue;
            }

            $isNumeric = is_numeric($sample->spec_value);

            if ($isNumeric) {
                $specValues = SmartphoneSpecification::where('spec_key', $key)
                    ->pluck('spec_value')
                    ->filter(fn ($v) => $v !== null && $v !== '')
                    ->map(fn ($v) => (string) (floatval($v)))
                    ->unique()
                    ->values();
                $min = $specValues->min() !== null ? floatval($specValues->min()) : 0;
                $max = $specValues->max() !== null ? floatval($specValues->max()) : 0;
                $isInteger = $specValues->every(fn ($v) => floor(floatval($v)) == floatval($v));

                $filter = [
                    'type' => 'range',
                    'range' => [$min, $max],
                    'numberType' => $isInteger ? 'integer' : 'float',
                ];
                // Если ключ в списке — добавляем options для чекбоксов
                if (in_array($key, $numericMultipleSelectorKeys)) {
                    $options = $specValues->toArray();
                    $filter['options'] = $options;
                }
                $specRangesAndFilters[$key] = $filter;
            } else {
                $specRangesAndFilters[$key] = [
                    'type' => 'exact',
                    'options' => SmartphoneSpecification::where('spec_key', $key)
                        ->distinct()
                        ->pluck('spec_value')
                        ->filter(fn ($v) => $v !== null && $v !== '')
                        ->sort()
                        ->values()
                        ->toArray(),
                ];
            }
        }

        // Return Inertia view with data
        return Inertia::render('product/search', [
            'smartphones' => Inertia::defer(function () use ($request, $specKeys) {
                return $this->getSearchResults($request, $specKeys->toArray());
            }),
            'filters' => array_merge([
                'priceRange' => [
                    'type' => 'range',
                    'range' => [
                        Smartphone::min('price') ?? 0,
                        Smartphone::max('price') ?? 2000,
                    ],
                ],
            ], $specRangesAndFilters),
            'currentFilters' => $currentFilters,
        ]);
    }

    /**
     * Get min/max ranges and options for specifications.
     */
    private function getSpecificationRanges(array $specKeys): array
    {
        $ranges = [];

        foreach ($specKeys as $key) {
            $sample = SmartphoneSpecification::where('spec_key', $key)->first();

            if (! $sample) {
                continue;
            }

            $isNumeric = is_numeric($sample->spec_value);

            if ($isNumeric) {
                $ranges[$key] = [
                    SmartphoneSpecification::where('spec_key', $key)->min('spec_value') ?? 0,
                    SmartphoneSpecification::where('spec_key', $key)->max('spec_value') ?? 0,
                ];
            } else {
                $ranges[$key] = SmartphoneSpecification::where('spec_key', $key)
                    ->distinct()
                    ->pluck('spec_value')
                    ->sort()
                    ->values()
                    ->toArray();
            }
        }

        return $ranges;
    }

    private function getSearchResults($request, array $specKeys)
    {
        // Общие фильтры
        $search = $request->input('search');
        $brand = $request->input('brand');
        $priceMin = $request->input('priceMin', 0);
        $priceMax = $request->input('priceMax', 2000);

        // Базовый запрос
        $query = Smartphone::with(['images', 'specifications'])
            ->distinct()
            ->when($search, function ($q) use ($search) {
                $q->where(function ($query) use ($search) {
                    if (trim($search) !== '') {
                        $query->where('model', 'like', "%{$search}%")
                            ->orWhere('description', 'like', "%{$search}%");
                    }
                });
            })
            ->when($brand, function ($q) use ($brand) {
                $brands = is_array($brand)
                    ? $brand
                    : array_map('trim', explode(',', $brand));
                $brands = array_filter($brands);
                if (! empty($brands)) {
                    $q->whereIn('brand', $brands);
                }
            })
            ->whereBetween('price', [$priceMin, $priceMax]);

        // --- Исправление для ram/storage: поддержка массива значений ---
        foreach (['ram', 'storage'] as $specKey) {
            if ($request->has($specKey) && is_array($request->input($specKey))) {
                $values = $request->input($specKey);
                $query->whereHas('specifications', function ($q) use ($specKey, $values) {
                    $q->where('spec_key', $specKey)
                        ->whereIn('spec_value', $values);
                });
            } else {
                // Старое поведение с диапазоном
                $min = $request->input($specKey.'Min');
                $max = $request->input($specKey.'Max');
                if ($min !== null) {
                    $query->whereHas('specifications', function ($q) use ($specKey, $min) {
                        $q->where('spec_key', $specKey)
                            ->where('spec_value', '>=', $min);
                    });
                }
                if ($max !== null) {
                    $query->whereHas('specifications', function ($q) use ($specKey, $max) {
                        $q->where('spec_key', $specKey)
                            ->where('spec_value', '<=', $max);
                    });
                }
            }
        }

        // Динамическая обработка фильтров
        foreach ($specKeys as $specKey) {
            if (! in_array($specKey, ['ram', 'storage'])) {
                // Определяем тип фильтра по примеру значения
                $sampleValue = SmartphoneSpecification::where('spec_key', $specKey)
                    ->first()
                    ?->spec_value;
                $filterType = is_numeric($sampleValue) ? 'range' : 'exact';
                // Значение фильтра для данной характеристики может передаваться разными способами:
                // Для точного совпадения – например, 'ramFilter'
                // Для диапазона – ожидаем два поля: 'screen_sizeMin' и 'screen_sizeMax'
                if ($filterType === 'exact') {
                    $filterParam = $request->input($specKey) ?? $request->input($specKey.'Filter');
                    if ($filterParam) {
                        $values = is_array($filterParam)
                            ? $filterParam
                            : array_map('trim', explode(',', $filterParam));
                        $query->whereHas('specifications', function ($q) use ($specKey, $values) {
                            $q->where('spec_key', $specKey)
                                ->whereIn('spec_value', $values);
                        });
                    }
                } elseif ($filterType === 'range') {
                    // Варианты: если переданы минимальное или максимальное значение
                    $minParam = $request->input($specKey.'Min');
                    $maxParam = $request->input($specKey.'Max');
                    if ($minParam || $maxParam) {
                        $query->whereHas('specifications', function ($q) use ($specKey, $minParam, $maxParam) {
                            $q->where('spec_key', $specKey);
                            if ($minParam) {
                                $q->where('spec_value_numeric', '>=', $minParam);
                            }
                            if ($maxParam) {
                                $q->where('spec_value_numeric', '<=', $maxParam);
                            }
                        });
                    }
                }
            }
        }

        // Выполнение запроса с пагинацией и обработка результата
        $perPage = $request->input('perPage', 12);
        $page = $request->input('page', 1);
        $paginator = $query->paginate($perPage, ['*'], 'page', $page)->withQueryString();

        $paginator->getCollection()->transform(function ($smartphone) {
            $smartphone->specifications_array = $smartphone->specifications
                ? $smartphone->specifications->pluck('spec_value', 'spec_key')->toArray()
                : [];
            $smartphone->image_url = $smartphone->images->isNotEmpty()
                ? asset('storage/'.$smartphone->images[0]->image_path)
                : asset('phone.webp');

            $smartphone->images->transform(function ($image) {
                $image->image_path = Storage::url($image->image_path);

                return $image;
            });

            return $smartphone;
        });

        return $paginator;
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
                    : asset('phone.webp');

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
