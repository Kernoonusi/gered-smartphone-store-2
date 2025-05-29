<?php

namespace App\Filament\Resources\PageContentResource\Pages;

use App\Filament\Resources\PageContentResource;
use Filament\Resources\Pages\ListRecords;

class ListPageContents extends ListRecords
{
    protected static string $resource = PageContentResource::class;

    protected static ?string $title = 'Контент страниц';

    protected function getHeaderActions(): array
    {
        return [];
    }
}
