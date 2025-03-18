<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Загружаем заказы пользователя вместе с позициями и данными о товарах
        $orders = Order::with('items.product.images', 'items.product.specifications')
            ->where('user_id', $user->id)
            ->has('items')
            ->get();

        return Inertia::render('profile/index', [
            'user'    => $user,
            'orders'  => $orders,
        ]);
    }
}
