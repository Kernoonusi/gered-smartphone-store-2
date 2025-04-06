<?php

declare(strict_types=1);

namespace App\Orchid\Layouts\Review;

use App\Models\Review;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Actions\DropDown;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Layouts\Table;
use Orchid\Screen\TD;

class ReviewListLayout extends Table
{
    /**
     * Data source.
     *
     * @var string
     */
    protected $target = 'reviews';

    /**
     * @return TD[]
     */
    protected function columns(): array
    {
        return [
            TD::make('id', 'ID')
                ->sort()
                ->filter(TD::FILTER_NUMERIC)
                ->render(function (Review $review) {
                    return Link::make((string) $review->id)
                        ->route('platform.reviews.edit', ['review' => $review]);
                }),

            TD::make('user.name', 'Пользователь')
                ->sort()
                ->filter(TD::FILTER_TEXT)
                ->render(function (Review $review) {
                    return $review->user->name ?? 'Нет данных';
                }),

            TD::make('smartphone.brand', 'Бренд')
                ->sort()
                ->filter(TD::FILTER_TEXT)
                ->render(function (Review $review) {
                    return $review->smartphone->brand ?? 'Нет данных';
                }),

            TD::make('smartphone.model', 'Модель')
                ->sort()
                ->filter(TD::FILTER_TEXT)
                ->render(function (Review $review) {
                    return $review->smartphone->model ?? 'Нет данных';
                }),

            TD::make('rating', 'Рейтинг')
                ->sort()
                ->filter(TD::FILTER_NUMERIC)
                ->render(function (Review $review) {
                    return $review->rating . ' / 5';
                }),

            TD::make('text', 'Текст отзыва')
                ->render(function (Review $review) {
                    return mb_substr($review->text, 0, 50) . (mb_strlen($review->text) > 50 ? '...' : '');
                }),

            TD::make('created_at', 'Дата создания')
                ->sort()
                ->render(function (Review $review) {
                    return $review->created_at->format('d.m.Y H:i');
                }),

            TD::make('Действия')
                ->align(TD::ALIGN_CENTER)
                ->width('100px')
                ->render(function (Review $review) {
                    return DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            Link::make('Редактировать')
                                ->route('platform.reviews.edit', $review)
                                ->icon('bs.pencil'),

                            Button::make('Удалить')
                                ->icon('bs.trash3')
                                ->confirm('Вы уверены, что хотите удалить этот отзыв?')
                                ->method('remove', [
                                    'id' => $review->id,
                                ]),
                        ]);
                }),
        ];
    }
}