<?php

declare(strict_types=1);

namespace App\Orchid\Layouts\Smartphone;

use Orchid\Screen\Field;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Layouts\Rows;

class SmartphoneEditLayout extends Rows
{
    /**
     * Get the fields elements to be displayed.
     *
     * @return Field[]
     */
    protected function fields(): array
    {
        return [
            Input::make('smartphone.brand')
                ->title('Бренд')
                ->required()
                ->placeholder('Введите бренд смартфона'),

            Input::make('smartphone.model')
                ->title('Модель')
                ->required()
                ->placeholder('Введите модель смартфона'),

            Input::make('smartphone.price')
                ->title('Цена')
                ->type('number')
                ->min(0)
                ->step(0.01)
                ->required()
                ->placeholder('Введите цену смартфона'),

            TextArea::make('smartphone.description')
                ->title('Описание')
                ->rows(5)
                ->placeholder('Введите описание смартфона'),
        ];
    }
}