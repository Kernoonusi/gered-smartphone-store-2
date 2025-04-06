<?php

declare(strict_types=1);

namespace App\Orchid\Layouts\Order;

use App\Orchid\Filters\OrderStatusFilter;
use Orchid\Filters\Filter;
use Orchid\Screen\Layouts\Selection;

class OrderFiltersLayout extends Selection
{
    /**
     * @return Filter[]
     */
    public function filters(): iterable
    {
        return [
            OrderStatusFilter::class,
        ];
    }
}