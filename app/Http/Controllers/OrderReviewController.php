<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;

class OrderReviewController extends Controller
{
    public function store(Request $request, Order $order)
    {
        $validated = $request->validate([
            'review' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        if ($order->review) {
            return back()->with(['message' => 'Отзыв уже оставлен']);
        }

        // Получаем первый товар заказа для связи с отзывом
        $item = $order->items()->first();
        if (!$item) {
            return back()->with(['message' => 'Нельзя оставить отзыв для пустого заказа']);
        }

        $review = new Review([
            'user_id' => $request->user()->id,
            'text' => $validated['review'],
            'rating' => $validated['rating'],
            'smartphone_id' => $item->product_id,
        ]);
        $order->review()->save($review);

        return redirect()->back()->with('success', 'Спасибо за отзыв!');
    }
}
