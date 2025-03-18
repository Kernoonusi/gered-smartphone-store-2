<?php
// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Smartphone;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show($productId)
    {
        $product = Smartphone::findOrFail($productId)->with('images', 'specifications')->first();
        
        return Inertia::render('product/index', [
            'product' => $product,
        ]);
    }
}