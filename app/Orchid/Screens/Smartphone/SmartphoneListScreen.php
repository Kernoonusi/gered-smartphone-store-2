<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Smartphone;

use App\Models\Smartphone;
use App\Orchid\Layouts\Smartphone\SmartphoneFiltersLayout;
use App\Orchid\Layouts\Smartphone\SmartphoneListLayout;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Toast;

class SmartphoneListScreen extends Screen
{
    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(): iterable
    {
        return [
            'smartphones' => Smartphone::with(['images', 'specifications'])
                ->filters(SmartphoneFiltersLayout::class)
                ->defaultSort('id', 'desc')
                ->paginate(),
        ];
    }

    /**
     * The name of the screen displayed in the header.
     */
    public function name(): ?string
    {
        return 'Управление смартфонами';
    }

    /**
     * Display header description.
     */
    public function description(): ?string
    {
        return 'Список всех смартфонов в системе';
    }

    public function permission(): ?iterable
    {
        return [
            'platform.smartphone.list',
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
                ->route('platform.smartphones.create'),
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
            SmartphoneFiltersLayout::class,
            SmartphoneListLayout::class,
        ];
    }

    /**
     * Remove smartphone
     *
     * @param Request $request
     */
    public function remove(Request $request): void
    {
        Smartphone::findOrFail($request->get('id'))->delete();

        Toast::info('Смартфон удален');
    }
}