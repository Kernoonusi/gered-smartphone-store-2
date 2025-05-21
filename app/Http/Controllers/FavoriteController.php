<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:smartphones,id',
        ]);

        $user = Auth::user();
        $user->favorites()->firstOrCreate([
            'product_id' => $request->product_id,
        ]);

        // Получаем обновленные данные продукта, включая статус избранного
        $product = \App\Models\Smartphone::with('specifications', 'images')
            ->find($request->product_id);

        // Добавляем флаг is_in_favorites к продукту
        $product->is_in_favorites = $user->favorites()->where('product_id', $product->id)->exists();

        return back()->with('product', $product);
    }

    public function destroy(string $id)
    {
        $user = Auth::user();
        $user->favorites()->where('product_id', $id)->delete();

        // Получаем обновленные данные продукта, включая статус избранного
        $product = \App\Models\Smartphone::with('specifications', 'images')
            ->find($id);

        // Добавляем флаг is_in_favorites к продукту
        $product->is_in_favorites = $user->favorites()->where('product_id', $product->id)->exists();

        return back()->with('product', $product);
    }
}
