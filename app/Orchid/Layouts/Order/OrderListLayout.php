<?php

declare(strict_types=1);

namespace App\Orchid\Layouts\Order;

use App\Models\Order;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Actions\DropDown;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Layouts\Table;
use Orchid\Screen\TD;

class OrderListLayout extends Table
{
    /**
     * Data source.
     *
     * @var string
     */
    protected $target = 'orders';

    /**
     * @return TD[]
     */
    protected function columns(): array
    {
        return [
            TD::make('id', 'ID')
                ->sort()
                ->filter(TD::FILTER_NUMERIC)
                ->render(function (Order $order) {
                    return Link::make((string) $order->id)
                        ->route('platform.orders.edit', ['order' => $order]);
                }),

            TD::make('user.name', 'Пользователь')
                ->sort()
                ->filter(TD::FILTER_TEXT),

            TD::make('status', 'Статус')
                ->sort()
                ->filter(TD::FILTER_TEXT)
                ->render(function (Order $order) {
                    $statuses = [
                        'processing' => 'В обработке',
                        'delivery' => 'Доставляется',
                        'arrived' => 'Доставлен',
                        'canceled' => 'Отменен',
                    ];
                    return $statuses[$order->status] ?? $order->status;
                }),

            TD::make('total', 'Сумма')
                ->sort()
                ->filter(TD::FILTER_NUMERIC)
                ->render(function (Order $order) {
                    return number_format($order->total, 2) . ' ₽';
                }),

            TD::make('payment_method', 'Способ оплаты')
                ->sort()
                ->filter(TD::FILTER_TEXT)
                ->render(function (Order $order) {
                    $methods = [
                        'card' => 'Банковская карта',
                        'cash' => 'Наличные при получении',
                        'online' => 'Онлайн-платеж',
                    ];
                    return $methods[$order->payment_method] ?? $order->payment_method;
                }),

            TD::make('created_at', 'Дата создания')
                ->sort()
                ->render(function (Order $order) {
                    return $order->created_at->format('d.m.Y H:i');
                }),

            TD::make('Действия')
                ->align(TD::ALIGN_CENTER)
                ->width('100px')
                ->render(function (Order $order) {
                    return DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            Link::make('Редактировать')
                                ->route('platform.orders.edit', $order)
                                ->icon('bs.pencil'),

                            Button::make('Удалить')
                                ->icon('bs.trash3')
                                ->confirm('Вы уверены, что хотите удалить этот заказ?')
                                ->method('remove', [
                                    'id' => $order->id,
                                ]),
                        ]);
                }),
        ];
    }
}