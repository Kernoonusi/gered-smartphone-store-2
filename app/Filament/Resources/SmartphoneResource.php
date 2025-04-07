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

    protected static ?string $navigationIcon = 'heroicon-o-device-phone-mobile';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('model')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('brand')
                    ->required()
                    ->maxLength(50),
                Forms\Components\TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                Forms\Components\Textarea::make('description')
                    ->columnSpanFull(),
                Forms\Components\Repeater::make('images')
                    ->relationship('images')
                    ->schema([
                        Forms\Components\FileUpload::make('image_path')
                            ->label('Image/URL')
                            ->directory('smartphones/images')
                            ->required()
                            ->multiple(false)
                            ->maxSize(2048)
                            ->rule(
                                \Illuminate\Validation\Rule::when(
                                    fn ($state) => filter_var($state, FILTER_VALIDATE_URL),
                                    ['url'],
                                    ['image', 'max:2048']
                                )
                            )
                            ->disk('public')
                            ->directory('smartphones/images')
                            ->visibility('public'),
                    ])
                    ->collapsible()
                    ->maxItems(5)
                    ->itemLabel(fn (array $state): ?string => isset($state['image_path'])
                             ? (filter_var(($path = \Illuminate\Support\Arr::first(\Illuminate\Support\Arr::wrap($state['image_path']))), FILTER_VALIDATE_URL)
                                 ? $path
                                 : basename($path))
                             : null),
                Forms\Components\Repeater::make('specifications')
                    ->relationship('specifications')
                    ->schema([
                        Forms\Components\TextInput::make('spec_key')
                            ->required()
                            ->maxLength(50),
                        Forms\Components\TextInput::make('spec_value')
                            ->required()
                            ->maxLength(100),
                    ])
                    ->defaultItems(1)
                    ->collapsible()
                    ->itemLabel(fn (array $state): ?string => $state['spec_key'] ?? null),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('brand')
                    ->sortable(),
                Tables\Columns\TextColumn::make('model')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->money('USD')
                    ->sortable(),
                Tables\Columns\ImageColumn::make('images.image_path')
                    ->label('Preview')
                    ->size(50)
                    ->stacked()
                    ->limit(3)
                    ->circular(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
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
