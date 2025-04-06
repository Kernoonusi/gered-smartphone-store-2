<?php

declare(strict_types=1);

namespace App\Orchid\Layouts\Smartphone;

use App\Models\Smartphone;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Actions\DropDown;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Layouts\Table;
use Orchid\Screen\TD;

class SmartphoneListLayout extends Table
{
    /**
     * Data source.
     *
     * @var string
     */
    protected $target = 'smartphones';

    /**
     * @return TD[]
     */
    protected function columns(): array
    {
        return [
            TD::make('id', 'ID')
                ->sort()
                ->filter(TD::FILTER_NUMERIC)
                ->render(function (Smartphone $smartphone) {
                    return Link::make((string) $smartphone->id)
                        ->route('platform.smartphones.edit', $smartphone->id);
                }),

            TD::make('brand', 'Бренд')
                ->sort()
                ->filter(TD::FILTER_TEXT)
                ->render(function (Smartphone $smartphone) {
                    return $smartphone->brand;
                }),

            TD::make('model', 'Модель')
                ->sort()
                ->filter(TD::FILTER_TEXT)
                ->render(function (Smartphone $smartphone) {
                    return $smartphone->model;
                }),

            TD::make('price', 'Цена')
                ->sort()
                ->filter(TD::FILTER_NUMERIC)
                ->render(function (Smartphone $smartphone) {
                    return number_format($smartphone->price, 2) . ' $';
                }),

            TD::make('images', 'Изображения')
                ->render(function (Smartphone $smartphone) {
                    return $smartphone->images->count() . ' шт.';
                }),

            TD::make('specifications', 'Характеристики')
                ->render(function (Smartphone $smartphone) {
                    return $smartphone->specifications->count() . ' шт.';
                }),

            TD::make('created_at', 'Дата создания')
                ->sort()
                ->render(function (Smartphone $smartphone) {
                    return $smartphone->created_at->format('d.m.Y H:i');
                }),

            TD::make('Действия')
                ->align(TD::ALIGN_CENTER)
                ->width('100px')
                ->render(function (Smartphone $smartphone) {
                    return DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            Link::make('Редактировать')
                                ->route('platform.smartphones.edit', $smartphone->id)
                                ->icon('bs.pencil'),

                            Button::make('Удалить')
                                ->icon('bs.trash3')
                                ->confirm('Вы уверены, что хотите удалить этот смартфон?')
                                ->method('remove', [
                                    'id' => $smartphone->id,
                                ]),
                        ]);
                }),
        ];
    }
}