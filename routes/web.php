<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderReviewController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MainPageController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\SmartphoneController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [MainPageController::class, 'index'])->name('home');
Route::get('/policy', [\App\Http\Controllers\PageContentController::class, 'policy'])->name('policy');
Route::get('/warranty', function () {
    return Inertia::render('warranty');
})->name('warranty');
Route::get('/delivery', function () {
    return Inertia::render('delivery');
})->name('delivery');
Route::get('/contacts', function () {
    return Inertia::render('contacts');
})->name('contacts');
Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');
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
});

require __DIR__.'/auth.php';
