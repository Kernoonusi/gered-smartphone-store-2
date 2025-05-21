<?php

// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Smartphone;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show($productId)
    {
        $product = Smartphone::with(['images', 'specifications'])->findOrFail($productId);

        $product->images->transform(function ($image) {
            $image->image_path = Storage::url($image->image_path);

            return $image;
        });

        $user = Auth::user();
        if ($user) {
            $product->is_in_favorites = $user->favorites()->where('product_id', $product->id)->exists();
        }

        $reviews = Review::with('user')->where('smartphone_id', $product->id)->get();

        return Inertia::render('product/index', [
            'product' => $product,
            'reviews' => $reviews,
        ]);
    }
}
