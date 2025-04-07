<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SmartphoneSpecificationResource\Pages;
use App\Filament\Resources\SmartphoneSpecificationResource\RelationManagers;
use App\Models\SmartphoneSpecification;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SmartphoneSpecificationResource extends Resource
{
    protected static ?string $model = SmartphoneSpecification::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSmartphoneSpecifications::route('/'),
            'create' => Pages\CreateSmartphoneSpecification::route('/create'),
            'edit' => Pages\EditSmartphoneSpecification::route('/{record}/edit'),
        ];
    }
}
