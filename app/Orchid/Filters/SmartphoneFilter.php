<?php

declare(strict_types=1);

namespace App\Orchid\Filters;

use Illuminate\Database\Eloquent\Builder;
use Orchid\Filters\Filter;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;

class SmartphoneFilter extends Filter
{
    /**
     * The displayable name of the filter.
     *
     * @return string
     */
    public function name(): string
    {
        return 'Бренд';
    }

    /**
     * The array of matched parameters.
     *
     * @return array
     */
    public function parameters(): array
    {
        return ['brand'];
    }

    /**
     * Apply to a given Eloquent query builder.
     *
     * @param Builder $builder
     *
     * @return Builder
     */
    public function run(Builder $builder): Builder
    {
        return $builder->where('brand', $this->request->get('brand'));
    }

    /**
     * Get the display fields.
     */
    public function display(): array
    {
        return [
            Input::make('brand')
                ->type('text')
                ->value($this->request->get('brand'))
                ->title('Бренд')
                ->placeholder('Введите бренд'),
        ];
    }
}