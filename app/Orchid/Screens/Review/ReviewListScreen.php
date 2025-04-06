<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Review;

use App\Models\Review;
use App\Orchid\Layouts\Review\ReviewFiltersLayout;
use App\Orchid\Layouts\Review\ReviewListLayout;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Toast;

class ReviewListScreen extends Screen
{
    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(): iterable
    {
        return [
            'reviews' => Review::with(['user', 'smartphone'])
                ->filters()
                ->defaultSort('id', 'desc')
                ->paginate(),
        ];
    }

    /**
     * The name of the screen displayed in the header.
     */
    public function name(): ?string
    {
        return 'Управление отзывами';
    }

    /**
     * Display header description.
     */
    public function description(): ?string
    {
        return 'Список всех отзывов в системе';
    }

    public function permission(): ?iterable
    {
        return [
            'platform.review.list',
        ];
    }

    /**
     * The screen's action buttons.
     *
     * @return \Orchid\Screen\Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Link::make('Создать')
                ->icon('bs.plus-circle')
                ->route('platform.reviews.create'),
        ];
    }

    /**
     * The screen's layout elements.
     *
     * @return \Orchid\Screen\Layout[]
     */
    public function layout(): iterable
    {
        return [
            ReviewFiltersLayout::class,
            ReviewListLayout::class,
        ];
    }

    /**
     * Remove review
     *
     * @param Request $request
     */
    public function remove(Request $request): void
    {
        Review::findOrFail($request->get('id'))->delete();

        Toast::info('Отзыв удален');
    }
}