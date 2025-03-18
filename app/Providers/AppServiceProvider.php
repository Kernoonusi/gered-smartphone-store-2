<?php

namespace App\Providers;

use App\Models\Order;
use App\Models\Smartphone;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'brands' => function () {
                // Кэширование списка брендов на 60 минут
                return Cache::remember('smartphone_brands', now()->addMinutes(60), function () {
                    return Smartphone::select('brand')
                        ->distinct()
                        ->orderBy('brand')
                        ->get();
                });
            },
            'cart' => function () {
                return Order::with('items.product')
                    ->where('user_id', Auth::id())
                    ->where('status', 'cart')
                    ->first();
            },
        ]);
    }
}
