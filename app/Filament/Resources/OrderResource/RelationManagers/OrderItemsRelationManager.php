<?php

namespace App\Filament\Resources\OrderResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class OrderItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'items';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('product_id')
                    ->label('Id')
                    ->required(),
                Forms\Components\TextInput::make('count')
                    ->label('Количество')
                    ->numeric()
                    ->required(),
                Forms\Components\TextInput::make('price')
                    ->label('Цена')
                    ->numeric()
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('product_id')
                    ->label('Id'),
                Tables\Columns\TextColumn::make('count')
                    ->label('Количество'),
                Tables\Columns\TextColumn::make('price')
                    ->label('Цена')
                    ->money('USD'),
            ])
            ->filters([
                //
            ]);
    }
}
