<?php

declare(strict_types=1);

namespace App\Orchid\Filters;

use Illuminate\Database\Eloquent\Builder;
use Orchid\Filters\Filter;
use Orchid\Screen\Fields\Select;

class ReviewRatingFilter extends Filter
{
    /**
     * The displayable name of the filter.
     *
     * @return string
     */
    public function name(): string
    {
        return 'Рейтинг';
    }

    /**
     * The array of matched parameters.
     *
     * @return array
     */
    public function parameters(): array
    {
        return ['rating'];
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
        return $builder->where('rating', $this->request->get('rating'));
    }

    /**
     * Get the display fields.
     */
    public function display(): array
    {
        return [
            Select::make('rating')
                ->options([
                    '1' => '1 звезда',
                    '2' => '2 звезды',
                    '3' => '3 звезды',
                    '4' => '4 звезды',
                    '5' => '5 звезд'
                ])
                ->value($this->request->get('rating'))
                ->title('Рейтинг')
                ->placeholder('Выберите рейтинг'),
        ];
    }
}