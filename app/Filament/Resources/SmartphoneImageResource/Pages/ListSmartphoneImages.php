<?php

namespace App\Filament\Resources\SmartphoneImageResource\Pages;

use App\Filament\Resources\SmartphoneImageResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSmartphoneImages extends ListRecords
{
    protected static string $resource = SmartphoneImageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
