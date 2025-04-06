<?php

declare(strict_types=1);

namespace App\Orchid\Layouts\Smartphone;

use App\Orchid\Filters\SmartphoneFilter;
use Orchid\Filters\Filter;
use Orchid\Screen\Layouts\Selection;

class SmartphoneFiltersLayout extends Selection
{
    /**
     * @return string[]|Filter[]
     */
    public function filters(): array
    {
        return [
            SmartphoneFilter::class,
        ];
    }
}