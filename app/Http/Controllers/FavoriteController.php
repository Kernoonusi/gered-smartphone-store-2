<?php

namespace App\Http\Controllers;

use App\Models\Smartphone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FavoriteController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $favorites = $user->favorites()->with(['product.images', 'product.specifications'])->get()->map(function ($favorite) {
            $favorite->product->images->transform(function ($image) {
                $image->image_path = Storage::url($image->image_path);

                return $image;
            });
            $favorite->product->is_in_favorites = true;

            return $favorite->product;
        });

        return Inertia::render('favorite', [
            'favorites' => $favorites,
        ]);
    }

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
        $product = Smartphone::with('specifications', 'images')
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
        $product = Smartphone::with('specifications', 'images')
            ->find($id);

        // Добавляем флаг is_in_favorites к продукту
        $product->is_in_favorites = $user->favorites()->where('product_id', $product->id)->exists();

        return back()->with('product', $product);
    }
}
