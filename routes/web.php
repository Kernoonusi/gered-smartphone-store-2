<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\MainPageController;
use App\Http\Controllers\OrderReviewController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\SmartphoneController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [MainPageController::class, 'index'])->name('home');
use App\Http\Controllers\PageContentController;

Route::get('/policy', [PageContentController::class, 'policy'])->name('policy');
Route::get('/warranty', [PageContentController::class, 'warranty'])->name('warranty');
Route::get('/delivery', [PageContentController::class, 'delivery'])->name('delivery');
Route::get('/contacts', [PageContentController::class, 'contacts'])->name('contacts');
Route::get('/about', [PageContentController::class, 'about'])->name('about');
Route::get('/search', [SmartphoneController::class, 'index'])->name('search');
Route::get('/product/{id}', [ProductController::class, 'show'])->name('product.show');
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::patch('/cart/item/{id}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/item/{id}', [CartController::class, 'remove'])->name('cart.remove');
    Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
    // Оставить отзыв на заказ
    Route::post('/orders/{order}/review', [OrderReviewController::class, 'store']);

    // Favorites routes
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites', [FavoriteController::class, 'store'])->name('favorites.add');
    Route::delete('/favorites/{id}', [FavoriteController::class, 'destroy'])->name('favorites.remove');
});

require __DIR__.'/auth.php';
