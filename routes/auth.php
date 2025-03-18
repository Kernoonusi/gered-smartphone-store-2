<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Группа маршрутов для гостей
Route::middleware('guest')->group(function () {
    // Регистрация
    Route::post('register', [RegisteredUserController::class, 'store'])->name('register');
    // Вход
    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login');
    Route::get('login', function () {
        return Inertia::render('profile/login');
    })->name('login.page');
    // Запрос ссылки для сброса пароля
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
});

// Группа маршрутов для аутентифицированных пользователей
Route::middleware('auth')->group(function () {
    // Отправка уведомления о верификации email (с ограничением по частоте)
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');
    // Подтверждение пароля
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store'])->name('password.confirm');
    // Выход
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    // Если необходимо, можно добавить маршруты для сброса пароля (например, для POST-запроса после перехода по ссылке)
    Route::post('password/reset', [PasswordResetLinkController::class, 'reset'])->name('password.update');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('settings.password.update');
    Route::put('settings/profile', [ProfileController::class, 'update'])->name('settings.profile.update');
});
