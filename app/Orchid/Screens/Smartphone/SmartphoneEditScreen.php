<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Smartphone;

use App\Models\Smartphone;
use App\Models\SmartphoneImage;
use App\Models\SmartphoneSpecification;
use App\Orchid\Layouts\Smartphone\SmartphoneEditLayout;
use App\Orchid\Layouts\Smartphone\SmartphoneImagesLayout;
use App\Orchid\Layouts\Smartphone\SmartphoneSpecificationsLayout;
use Illuminate\Http\Request;
use Orchid\Attachment\File;
use Orchid\Attachment\Models\Attachment;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Actions\ModalToggle;
use Orchid\Screen\Fields\Attach;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class SmartphoneEditScreen extends Screen
{
    /**
     * @var Smartphone
     */
    public $smartphone;

    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(Smartphone $smartphone): iterable
    {
        $smartphone->load(['images', 'specifications']);

        return [
            'smartphone' => $smartphone,
        ];
    }

    /**
     * The name of the screen displayed in the header.
     */
    public function name(): ?string
    {
        return $this->smartphone->exists ? 'Редактирование: '.$this->smartphone->brand.' '.$this->smartphone->model : 'Создание смартфона';
    }

    /**
     * Display header description.
     */
    public function description(): ?string
    {
        return 'Информация о смартфоне, его характеристиках и изображениях';
    }

    public function permission(): ?iterable
    {
        return [
            'platform.smartphone.edit',
        ];
    }

    /**
     * The screen's action buttons.
     *
     * @return \Orchid\Screen\Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Button::make('Удалить')
                ->icon('bs.trash3')
                ->confirm('Вы уверены, что хотите удалить этот смартфон?')
                ->method('remove')
                ->canSee($this->smartphone->exists),

            Button::make('Сохранить')
                ->icon('bs.check-circle')
                ->method('save'),
            ModalToggle::make('Добавить характеристику')
                ->icon('bs.plus')
                ->modal('addSpecification')
                ->method('saveSpecification')
                ->parameters([
                    'smartphone_id' => $this->smartphone->id,
                ]),
            ModalToggle::make('Добавить изображение')
                ->icon('bs.image')
                ->modal('addImage')
                ->method('addImage')
                ->parameters([
                    'smartphone_id' => $this->smartphone->id,
                ]),
        ];
    }

    /**
     * The screen's layout elements.
     *
     * @return \Orchid\Screen\Layout[]
     */
    public function layout(): iterable
    {
        return [
            Layout::tabs([
                'Основная информация' => [
                    SmartphoneEditLayout::class,
                ],
                'Характеристики' => [
                    SmartphoneSpecificationsLayout::class,
                ],
                'Изображения' => [
                    SmartphoneImagesLayout::class,
                ],
            ]),
            Layout::modal('addSpecification', [
                Layout::rows([
                    Input::make('smartphone.id')
                        ->type('hidden')
                        ->value($this->smartphone->id),
                    Input::make('specification.spec_key')
                        ->title('Характеристика')
                        ->placeholder('Например: Процессор, Память, Экран')
                        ->required(),
                    Input::make('specification.spec_value')
                        ->title('Значение')
                        ->placeholder('Например: Snapdragon 888, 128 ГБ, 6.1 дюйм')
                        ->required(),
                ]),
            ])
                ->title('Добавить характеристику')
                ->applyButton('Добавить')
                ->closeButton('Отмена'),

            // Модальное окно для редактирования существующей спецификации
            Layout::modal('editSpecification', [
                Layout::rows([
                    Input::make('specification.id')
                        ->type('hidden'),
                    Input::make('specification.spec_key')
                        ->title('Характеристика')
                        ->placeholder('Например: Процессор, Память, Экран')
                        ->required(),
                    Input::make('specification.spec_value')
                        ->title('Значение')
                        ->placeholder('Например: Snapdragon 888, 128 ГБ, 6.1 дюйм')
                        ->required(),
                ]),
            ])
                ->title('Редактировать характеристику')
                ->applyButton('Сохранить')
                ->closeButton('Отмена')
                ->async('asyncGetSpecification'),

            // Модальное окно для добавления изображения
            Layout::modal('addImage', [
                Layout::rows([
                    Input::make('smartphone.id')
                        ->type('hidden')
                        ->value($this->smartphone->id),
                    Attach::make('upload')
                        ->accept('image/*')
                        ->required(),
                ]),
            ])
                ->title('Добавить изображение')
                ->applyButton('Добавить')
                ->closeButton('Отмена'),

            // Модальное окно для редактирования изображения
            Layout::modal('editImage', [
                Layout::rows([
                    Input::make('image.id')
                        ->type('hidden'),
                    Upload::make('image.file')
                        ->title('Изображение')
                        ->acceptedFiles('image/*')
                        ->maxFiles(1)
                        ->required(),
                ]),
            ])
                ->title('Редактировать изображение')
                ->applyButton('Сохранить')
                ->closeButton('Отмена')
                ->async('asyncGetImage'),
        ];
    }

    // Метод для асинхронной загрузки данных спецификации
    public function asyncGetSpecification(SmartphoneSpecification $specification): array
    {
        return [
            'specification' => [
                'id' => $specification->id,
                'spec_key' => $specification->spec_key,
                'spec_value' => $specification->spec_value,
            ],
        ];
    }

    // Метод для асинхронной загрузки данных изображения
    public function asyncGetImage(SmartphoneImage $image): array
    {
        return [
            'image' => [
                'id' => $image->id,
                'image_path' => $image->image_path,
            ],
        ];
    }

    // Метод для обработки сохранения редактируемой спецификации
    public function saveSpecification(Request $request)
    {
        $specificationId = $request->input('specification.id');

        // Если ID существует, обновляем существующую запись
        if ($specificationId) {
            $specification = SmartphoneSpecification::find($specificationId);
            $specification->spec_key = $request->input('specification.spec_key');
            $specification->spec_value = $request->input('specification.spec_value');
            $specification->save();

            Alert::success('Характеристика успешно обновлена');
        } else {
            // Иначе создаем новую запись
            SmartphoneSpecification::create([
                'smartphone_id' => $request->input('smartphone.id'),
                'spec_key' => $request->input('specification.spec_key'),
                'spec_value' => $request->input('specification.spec_value'),
            ]);

            Alert::success('Характеристика успешно добавлена');
        }

        return redirect()->back();
    }

    /**
     * Save smartphone
     *
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function save(Smartphone $smartphone, Request $request)
    {
        $request->validate([
            'smartphone.brand' => 'required|string|max:255',
            'smartphone.model' => 'required|string|max:255',
            'smartphone.price' => 'required|numeric|min:0',
            'smartphone.description' => 'nullable|string',
        ]);

        $smartphone->fill($request->input('smartphone'))->save();

        Toast::info('Смартфон сохранен');

        return redirect()->route('platform.smartphones');
    }

    /**
     * Remove smartphone
     *
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function remove(Smartphone $smartphone)
    {
        $smartphone->delete();

        Toast::info('Смартфон удален');

        return redirect()->route('platform.smartphones');
    }

    /**
     * Add specification to smartphone
     */
    public function addSpecification(Smartphone $smartphone, Request $request): void
    {
        $request->validate([
            'specification.spec_key' => 'required|string|max:255',
            'specification.spec_value' => 'required|string|max:255',
        ]);

        $specData = $request->input('specification');
        $specData['smartphone_id'] = $smartphone->id;

        SmartphoneSpecification::create($specData);

        Toast::info('Характеристика добавлена');
    }

    /**
     * Remove specification from smartphone
     */
    public function removeSpecification(Request $request): void
    {
        $smartphone = Smartphone::find($request->input('smartphone.id'));
        $specification = $smartphone->specifications()->findOrFail($request->get('id'));
        $specification->delete();

        Toast::info('Характеристика удалена');
    }

    /**
     * Add or update image for smartphone
     */
    public function addImage(Smartphone $smartphone, Request $request): void
    {
        $request->validate([
            'smartphone.id' => 'required',
            'upload' => 'required',
        ]);

        $smartphoneId = $request->input('smartphone.id');
        $file = new File($request->file('upload'));
        dd($file);
        if (empty($files) || ! is_array($files)) {
            Toast::error('Файл не был загружен');

            return;
        }
 
        $attachmentId = $files[0];
        $attachment = Attachment::find($attachmentId);

        if (! $attachment) {
            Toast::error('Не удалось найти загруженный файл');

            return;
        }

        $imagePath = $attachment->url();

        if (empty($imagePath)) {
            Toast::error('Не удалось получить путь к изображению');

            return;
        }

        if ($imageId) {
            $image = SmartphoneImage::find($imageId);

            // Удаляем старое изображение, если оно существует
            $oldAttachment = Attachment::where('path', str_replace('/storage/', '', $image->image_path))->first();
            if ($oldAttachment) {
                $oldAttachment->delete();
            }

            $image->image_path = $imagePath;
            $image->save();

            Toast::info('Изображение успешно обновлено');
        } else {
            $smartphone->images()->create([
                'image_path' => $imagePath,
            ]);

            Toast::info('Изображение добавлено');
        }
    }

    /**
     * Remove image from smartphone
     */
    public function removeImage(Request $request): void
    {
        $smartphone = Smartphone::find($request->input('smartphone.id'));
        $image = $smartphone->images()->findOrFail($request->get('id'));
        $image->delete();

        Toast::info('Изображение удалено');
    }
}
