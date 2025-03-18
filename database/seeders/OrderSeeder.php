<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Smartphone;
use App\Models\OrderItem;

class OrderSeeder extends Seeder
{
    public function run()
    {
        // Получаем всех пользователей
        $users = User::all();

        foreach ($users as $user) {
            // Создаем заказ для пользователя (например, статус "processing")
            $order = Order::create([
                'user_id' => $user->id,
                'status'  => 'processing',
                'total'   => 0, // Пересчитаем после добавления позиций
            ]);

            // Выбираем случайное количество смартфонов (от 1 до 5) для заказа
            $smartphones = Smartphone::inRandomOrder()->take(rand(1, 5))->get();

            foreach ($smartphones as $smartphone) {
                // Определяем случайное количество для текущего смартфона
                $count = rand(1, 3);

                // Создаем позицию заказа с использованием smartphone_id
                OrderItem::create([
                    'order_id'     => $order->id,
                    'product_id'   => $smartphone->id,
                    'count'        => $count,
                    'price'        => $smartphone->price, // Цена смартфона на момент заказа
                ]);
            }

            // Пересчитываем общую сумму заказа: суммируем произведение цены и количества для каждой позиции
            $order->total = OrderItem::where('order_id', $order->id)->sum(DB::raw('price * count'));
            $order->save();
        }
    }
}
