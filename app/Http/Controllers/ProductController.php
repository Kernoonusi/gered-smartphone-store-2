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

        // Добавляем URL к каждому изображению (если поле image_path — путь к файлу)
        $product->images->transform(function ($image) {
            $image->image_path = Storage::url($image->image_path); // предполагается, что поле "path" хранит путь, например: 'images/phone1.jpg'

            return $image;
        });

        // Получаем отзывы с пользователями
        $reviews = Review::with('user')->where('smartphone_id', $product->id)->get();

        return Inertia::render('product/index', [
            'product' => $product,
            'reviews' => $reviews,
        ]);
    }
}
