<?php

namespace App\Filament\Resources\SmartphoneSpecificationResource\Pages;

use App\Filament\Resources\SmartphoneSpecificationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSmartphoneSpecification extends EditRecord
{
    protected static string $resource = SmartphoneSpecificationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
