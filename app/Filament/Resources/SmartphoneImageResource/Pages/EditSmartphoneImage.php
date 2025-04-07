<?php

namespace App\Filament\Resources\SmartphoneImageResource\Pages;

use App\Filament\Resources\SmartphoneImageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSmartphoneImage extends EditRecord
{
    protected static string $resource = SmartphoneImageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
