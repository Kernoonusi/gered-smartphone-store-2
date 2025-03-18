<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\MainPageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [MainPageController::class, 'index'])->name('home');
Route::get('/policy', function () {
    return Inertia::render('policy');
})->name('policy');
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
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::patch('/cart/item/{id}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/item/{id}', [CartController::class, 'remove'])->name('cart.remove');
    Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
    Route::post('/order/create', [OrderController::class, 'create'])->name('order.create');
});

require __DIR__.'/auth.php';
