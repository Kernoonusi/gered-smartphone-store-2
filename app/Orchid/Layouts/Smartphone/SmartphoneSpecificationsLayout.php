<?php

declare(strict_types=1);

namespace App\Orchid\Layouts\Smartphone;

use App\Models\SmartphoneSpecification;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Actions\DropDown;
use Orchid\Screen\Actions\ModalToggle;
use Orchid\Screen\Layouts\Table;
use Orchid\Screen\TD;

class SmartphoneSpecificationsLayout extends Table
{
    /**
     * Data source.
     *
     * @var string
     */
    protected $target = 'smartphone.specifications';

    /**
     * @return TD[]
     */
    protected function columns(): array
    {
        return [
            TD::make('id', 'ID')
                ->sort()
                ->render(function (SmartphoneSpecification $specification) {
                    return $specification->id;
                }),

            TD::make('spec_key', 'Характеристика')
                ->sort()
                ->render(function (SmartphoneSpecification $specification) {
                    return $specification->spec_key;
                }),

            TD::make('spec_value', 'Значение')
                ->sort()
                ->render(function (SmartphoneSpecification $specification) {
                    return $specification->spec_value;
                }),

            TD::make('Действия')
                ->align(TD::ALIGN_CENTER)
                ->width('100px')
                ->render(function (SmartphoneSpecification $specification) {
                    return DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            ModalToggle::make('Редактировать')
                                ->icon('bs.pencil')
                                ->modal('editSpecification')  // Используйте отдельное имя для модального окна редактирования
                                ->asyncParameters([
                                    'specification' => $specification->id, // Передаем ID спецификации
                                ]),
                            Button::make('Удалить')
                                ->icon('bs.trash3')
                                ->confirm('Вы уверены, что хотите удалить эту характеристику?')
                                ->method('removeSpecification', [
                                    'id' => $specification->id,
                                ]),
                        ]);
                }),
        ];
    }
}
