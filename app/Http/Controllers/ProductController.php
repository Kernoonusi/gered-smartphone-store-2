<?php
// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Smartphone;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show($productId)
    {
        $product = Smartphone::with('images', 'specifications')->findOrFail($productId);
        $reviews = Review::with('user')->where('smartphone_id', $product->id)->get();
        
        return Inertia::render('product/index', [
            'product' => $product,
            'reviews' => $reviews,
        ]);
    }
}