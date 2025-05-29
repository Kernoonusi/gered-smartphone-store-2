<?php

namespace App\Filament\Resources\SmartphoneResource\Pages;

use App\Filament\Resources\SmartphoneResource;
use Filament\Resources\Pages\CreateRecord;

class CreateSmartphone extends CreateRecord
{
    protected static string $resource = SmartphoneResource::class;

    protected static ?string $title = 'Создание смартфона';
}
