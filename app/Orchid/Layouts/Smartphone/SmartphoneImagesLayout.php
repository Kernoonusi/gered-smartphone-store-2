<?php

declare(strict_types=1);

namespace App\Orchid\Layouts\Smartphone;

use App\Models\SmartphoneImage;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Actions\DropDown;
use Orchid\Screen\Actions\ModalToggle;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Group;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Layouts\Table;
use Orchid\Screen\TD;
use Illuminate\Http\Request;
use Orchid\Support\Facades\Toast;

class SmartphoneImagesLayout extends Table
{
    /**
     * Data source.
     *
     * @var string
     */
    protected $target = 'smartphone.images';

    /**
     * @return TD[]
     */
    protected function columns(): array
    {
        return [
            TD::make('id', 'ID')
                ->sort()
                ->render(function (SmartphoneImage $image) {
                    return $image->id;
                }),

            TD::make('image_path', 'Изображение')
                ->render(function (SmartphoneImage $image) {
                    return "<img src='{$image->image_path}' alt='Изображение' style='max-width: 100px; max-height: 100px;'>";
                }),

            TD::make('image_path', 'Путь к изображению')
                ->sort()
                ->render(function (SmartphoneImage $image) {
                    return $image->image_path;
                }),

            TD::make('Действия')
                ->align(TD::ALIGN_CENTER)
                ->width('100px')
                ->render(function (SmartphoneImage $image) {
                    return DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            ModalToggle::make('Редактировать')
                                ->icon('bs.pencil')
                                ->modal('editImage')
                                ->asyncParameters([
                                    'image' => $image->id, // Передаем ID изображения
                                ]),
                            Button::make('Удалить')
                                ->icon('bs.trash3')
                                ->confirm('Вы уверены, что хотите удалить это изображение?')
                                ->method('removeImage', [
                                    'id' => $image->id,
                                ]),
                        ]);
                }),
        ];
    }

    /**
     * Get the fields elements to be displayed.
     *
     * @return Field[]
     */
    protected function fields(): array
    {
        // Поля перенесены в модальное окно в SmartphoneEditScreen
        return [];
    }
}