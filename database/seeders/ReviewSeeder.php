<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Order;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = Order::with('items')->get();
        $this->command->info('Всего заказов: ' . $orders->count());

        $ordersWithSmartphone = $orders->filter(function ($order) {
            return $order->items->isNotEmpty();
        });

        foreach ($ordersWithSmartphone as $order) {
            // Только если у заказа ещё нет отзыва  
            if ($order->review) continue;

            $user = $order->user;
            $item = $order->items->random();

            $review = \Database\Factories\ReviewFactory::new()->make();
            $review->user_id = $user->id;
            $review->order_id = $order->id;
            $review->smartphone_id = $item->product_id;
            $review->save();
        }
    }
}
