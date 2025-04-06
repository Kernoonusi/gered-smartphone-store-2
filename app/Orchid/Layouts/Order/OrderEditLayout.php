<?php

declare(strict_types=1);

namespace App\Orchid\Layouts\Order;

use App\Models\User;
use Orchid\Screen\Field;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Relation;
use Orchid\Screen\Layouts\Rows;

class OrderEditLayout extends Rows
{
    /**
     * Get the fields elements to be displayed.
     *
     * @return Field[]
     */
    protected function fields(): array
    {
        return [
            Relation::make('order.user_id')
                ->title('Пользователь')
                ->required()
                ->fromModel(User::class, 'name'),

            Select::make('order.status')
                ->title('Статус заказа')
                ->options([
                    'processing' => 'В обработке',
                    'delivery' => 'Доставляется',
                    'arrived' => 'Доставлен',
                    'canceled' => 'Отменен',
                ])
                ->required(),

            Input::make('order.total')
                ->title('Общая сумма')
                ->type('number')
                ->min(0)
                ->step(0.01)
                ->required(),

            Input::make('order.address')
                ->title('Адрес доставки')
                ->maxlength(255),

            Select::make('order.payment_method')
                ->title('Способ оплаты')
                ->options([
                    'card' => 'Банковская карта',
                    'cash' => 'Наличные при получении',
                    'online' => 'Онлайн-платеж',
                ])
                ->empty('Не выбрано'),

            TextArea::make('order.note')
                ->title('Примечание к заказу')
                ->rows(5),
        ];
    }
}