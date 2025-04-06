<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Order;

use App\Models\Order;
use App\Orchid\Layouts\Order\OrderFiltersLayout;
use App\Orchid\Layouts\Order\OrderListLayout;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class OrderListScreen extends Screen
{
    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(): iterable
    {
        return [
            'orders' => Order::with(['user', 'items.product'])
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
        return 'Управление заказами';
    }

    /**
     * Display header description.
     */
    public function description(): ?string
    {
        return 'Список всех заказов в системе';
    }

    public function permission(): ?iterable
    {
        return [
            'platform.order.list',
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
                ->route('platform.orders.create'),
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
            OrderFiltersLayout::class,
            OrderListLayout::class,
        ];
    }

    /**
     * Remove order
     *
     * @param Request $request
     */
    public function remove(Request $request): void
    {
        Order::findOrFail($request->get('id'))->delete();

        Toast::info('Заказ удален');
    }
}