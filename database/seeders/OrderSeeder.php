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
            for ($i = 0; $i < 10; $i++) {
                // Создаем заказ для пользователя (например, статус "processing")
                $order = Order::create([
                    'user_id' => $user->id,
                    'status'  => 'processing',
                    'total'   => 0, // Пересчитаем после добавления позиций
                ]);

                // Выбираем случайное количество смартфонов (от 1 до 5) для заказа
                $smartphones = Smartphone::inRandomOrder()->take(rand(1, 5))->get();
                $total = 0;

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
                    $total += $smartphone->price * $count;
                }

                // Пересчитываем общую сумму заказа: суммируем произведение цены и количества для каждой позиции
                $order->total = $total;
                $order->save();
            }
        }
    }
}
