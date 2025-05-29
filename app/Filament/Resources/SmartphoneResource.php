<?php

namespace App\Filament\Resources;

use App\Models\Smartphone;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SmartphoneResource extends Resource
{
    protected static ?string $model = Smartphone::class;

    protected static ?string $navigationLabel = 'Cмартфоны';

    protected static ?string $modelLabel = 'Смартфон';

    protected static ?string $pluralModelLabel = 'Смартфоны';

    protected static ?string $navigationIcon = 'heroicon-o-device-phone-mobile';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('model')
                    ->label('Модель')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('brand')
                    ->label('Бренд')
                    ->required()
                    ->maxLength(50),
                Forms\Components\TextInput::make('price')
                    ->label('Цена')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                Forms\Components\Textarea::make('description')
                    ->label('Описание')
                    ->columnSpanFull(),
                Forms\Components\Repeater::make('images')
                    ->label('Изображения')
                    ->relationship('images')
                    ->schema([
                        Forms\Components\FileUpload::make('image_path')
                            ->label('Image/URL')
                            ->directory('smartphones')
                            ->required()
                            ->multiple(false)
                            ->maxSize(2048)
                            ->image()
                            ->disk('public')
                            ->visibility('public')
                            ->previewable(),
                    ])
                    ->collapsible()
                    ->maxItems(5)
                    ->itemLabel(fn (array $state): ?string => isset($state['image_path'])
                             ? (filter_var(($path = \Illuminate\Support\Arr::first(\Illuminate\Support\Arr::wrap($state['image_path']))), FILTER_VALIDATE_URL)
                                 ? $path
                                 : basename($path))
                             : null),
                Forms\Components\Repeater::make('specifications')
                    ->label('Характеристики')
                    ->relationship('specifications')
                    ->schema([
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\Select::make('spec_key')
                                    ->label('Характеристика')
                                    ->options([
                                        'screen_size' => 'Размер экрана',
                                        'battery_capacity' => 'Емкость батареи',
                                        'ram' => 'Оперативная память',
                                        'storage' => 'Встроенная память',
                                        'processor' => 'Процессор',
                                        'os' => 'Операционная система',
                                        'camera' => 'Камера',
                                        'weight' => 'Вес',
                                        'display' => 'Тип дисплея',
                                        'year' => 'Год выпуска',
                                    ])
                                    ->searchable()
                                    ->createOptionForm([
                                        Forms\Components\TextInput::make('name')
                                            ->required(),
                                    ])
                                    ->createOptionUsing(function (array $data) {
                                        return $data['name'];
                                    })
                                    ->allowHtml(false)
                                    ->required()
                                    ->live()
                                    ->columnSpan(1),
                                Forms\Components\TextInput::make('spec_value')
                                    ->label('Значение')
                                    ->required()
                                    ->maxLength(100)
                                    ->columnSpan(1),
                            ]),
                    ])
                    ->defaultItems(3)
                    ->collapsible()
                    ->cloneable()
                    ->reorderable()
                    ->itemLabel(fn (array $state): ?string => ($state['spec_key'] ?? null) ? ($state['spec_key'].': '.($state['spec_value'] ?? '')) : null)
                    ->addActionLabel('Добавить характеристику')
                    ->extraItemActions([
                        Forms\Components\Actions\Action::make('addCommonSpecs')
                            ->label('Добавить базовые')
                            ->icon('heroicon-m-plus-circle')
                            ->action(function (Forms\Components\Repeater $component): void {
                                $currentState = $component->getState();
                                $commonSpecs = [
                                    ['spec_key' => 'screen_size', 'spec_value' => '6.1'],
                                    ['spec_key' => 'battery_capacity', 'spec_value' => '4000'],
                                    ['spec_key' => 'ram', 'spec_value' => '8'],
                                    ['spec_key' => 'storage', 'spec_value' => '128'],
                                    ['spec_key' => 'processor', 'spec_value' => 'Qualcomm Snapdragon 888'],
                                    ['spec_key' => 'os', 'spec_value' => 'Android'],
                                    ['spec_key' => 'camera', 'spec_value' => '48'],
                                    ['spec_key' => 'weight', 'spec_value' => '150'],
                                    ['spec_key' => 'display', 'spec_value' => 'AMOLED'],
                                    ['spec_key' => 'year', 'spec_value' => '2024'],
                                ];

                                foreach ($commonSpecs as $spec) {
                                    $exists = collect($currentState)->contains('spec_key', $spec['spec_key']);
                                    if (! $exists) {
                                        $currentState[] = $spec;
                                    }
                                }

                                $component->state($currentState);
                            })
                            ->color('success'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('brand')
                    ->label('Бренд')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('model')
                    ->label('Модель')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->label('Цена (USD / RUB)')
                    ->formatStateUsing(function ($state) {
                        $usdPrice = number_format($state, 2);
                        $rubPrice = number_format($state * \App\Services\ExchangeRateService::getUsdToRubRate(), 2);

                        return "{$usdPrice} USD / {$rubPrice} RUB";
                    })
                    ->sortable(),
                Tables\Columns\ImageColumn::make('images.image_path')
                    ->label('Изображения')
                    ->size(50)
                    ->stacked()
                    ->limit(3)
                    ->circular(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Дата создания')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Дата обновления')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('brand')
                    ->options(fn () => Smartphone::pluck('brand', 'brand')->unique()),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('price', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => \App\Filament\Resources\SmartphoneResource\Pages\ListSmartphones::route('/'),
            'create' => \App\Filament\Resources\SmartphoneResource\Pages\CreateSmartphone::route('/create'),
            'edit' => \App\Filament\Resources\SmartphoneResource\Pages\EditSmartphone::route('/{record}/edit'),
        ];
    }
}
