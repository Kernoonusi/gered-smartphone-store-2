<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        $permissions = $user->getAllPermissions();

        // Загружаем заказы пользователя вместе с позициями и данными о товарах
        $orders = Order::with('items.product.images', 'items.product.specifications', 'review')
            ->where('user_id', $user->id)
            ->where('status', '!=', 'cart')
            ->has('items')
            ->orderByDesc('created_at')
            ->get();
        return Inertia::render('profile/index', [
            'user' => $user,
            'permissions' => $permissions,
            'orders' => $orders,
        ]);
    }

    /**
     * Update the user's profile.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($request->user()->id)],
        ]);

        $request->user()->update($validated);

        return back();
    }
}
