<?php

// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Smartphone;
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

        $reviews = Review::with('user')->where('smartphone_id', $product->id)->get();

        return Inertia::render('product/index', [
            'product' => $product,
            'reviews' => $reviews,
        ]);
    }
}
