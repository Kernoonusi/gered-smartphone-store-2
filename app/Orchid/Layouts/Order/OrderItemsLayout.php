<?php

declare(strict_types=1);

namespace App\Orchid\Layouts\Order;

use App\Models\OrderItem;
use Orchid\Screen\Layouts\Table;
use Orchid\Screen\TD;

class OrderItemsLayout extends Table
{
    /**
     * Data source.
     *
     * @var string
     */
    protected $target = 'order.items';

    /**
     * @return TD[]
     */
    protected function columns(): array
    {
        return [
            TD::make('id', 'ID')
                ->sort(),

            TD::make('product.brand', 'Бренд')
                ->render(function (OrderItem $item) {
                    return $item->product ? $item->product->brand : 'Н/Д';
                }),

            TD::make('product.model', 'Модель')
                ->render(function (OrderItem $item) {
                    return $item->product ? $item->product->model : 'Н/Д';
                }),

            TD::make('count', 'Количество')
                ->sort(),

            TD::make('price', 'Цена за единицу')
                ->sort()
                ->render(function (OrderItem $item) {
                    return number_format($item->price, 2) . ' ₽';
                }),

            TD::make('total', 'Сумма')
                ->render(function (OrderItem $item) {
                    return number_format($item->price * $item->count, 2) . ' ₽';
                }),
        ];
    }
}