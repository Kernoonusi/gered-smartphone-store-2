<?php

declare(strict_types=1);

namespace App\Orchid\Layouts\Review;

use App\Orchid\Filters\ReviewRatingFilter;
use Orchid\Filters\Filter;
use Orchid\Screen\Layouts\Selection;

class ReviewFiltersLayout extends Selection
{
    /**
     * @return Filter[]
     */
    public function filters(): iterable
    {
        return [
            ReviewRatingFilter::class,
        ];
    }
}