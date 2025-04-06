<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Review;

use App\Models\Review;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Relation;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class ReviewEditScreen extends Screen
{
    /**
     * @var Review
     */
    public $review;

    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(Review $review): iterable
    {
        return [
            'review' => $review,
        ];
    }

    /**
     * The name of the screen displayed in the header.
     */
    public function name(): ?string
    {
        return $this->review->exists ? 'Редактирование отзыва' : 'Создание отзыва';
    }

    /**
     * Display header description.
     */
    public function description(): ?string
    {
        return 'Информация об отзыве';
    }

    public function permission(): ?iterable
    {
        return [
            'platform.review.edit',
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
            Button::make('Удалить')
                ->icon('bs.trash3')
                ->confirm('Вы уверены, что хотите удалить этот отзыв?')
                ->method('remove')
                ->canSee($this->review->exists),

            Button::make('Сохранить')
                ->icon('bs.check-circle')
                ->method('save'),
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
            Layout::rows([
                Relation::make('review.user_id')
                    ->title('Пользователь')
                    ->required()
                    ->fromModel('App\\Models\\User', 'name'),

                Relation::make('review.smartphone_id')
                    ->title('Смартфон')
                    ->required()
                    ->fromModel('App\\Models\\Smartphone', 'id')
                    ->displayAppend('full_name'),

                Select::make('review.rating')
                    ->title('Рейтинг')
                    ->required()
                    ->options([
                        1 => '1 - Очень плохо',
                        2 => '2 - Плохо',
                        3 => '3 - Нормально',
                        4 => '4 - Хорошо',
                        5 => '5 - Отлично',
                    ]),

                TextArea::make('review.text')
                    ->title('Текст отзыва')
                    ->required()
                    ->rows(5),
            ])
        ];
    }

    /**
     * Save review
     *
     * @param Review $review
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function save(Review $review, Request $request)
    {
        $request->validate([
            'review.user_id' => 'required|exists:users,id',
            'review.smartphone_id' => 'required|exists:smartphones,id',
            'review.rating' => 'required|integer|min:1|max:5',
            'review.text' => 'required|string',
        ]);

        $review->fill($request->input('review'))->save();

        Toast::info('Отзыв сохранен');

        return redirect()->route('platform.reviews');
    }

    /**
     * Remove review
     *
     * @param Review $review
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function remove(Review $review)
    {
        $review->delete();

        Toast::info('Отзыв удален');

        return redirect()->route('platform.reviews');
    }
}