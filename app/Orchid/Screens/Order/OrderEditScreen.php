<?php

declare(strict_types=1);

namespace App\Orchid\Screens\Order;

use App\Models\Order;
use App\Orchid\Layouts\Order\OrderEditLayout;
use App\Orchid\Layouts\Order\OrderItemsLayout;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class OrderEditScreen extends Screen
{
    /**
     * @var Order
     */
    public $order;

    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(Order $order): iterable
    {
        $order->load(['user', 'items.product']);

        return [
            'order' => $order,
        ];
    }

    /**
     * The name of the screen displayed in the header.
     */
    public function name(): ?string
    {
        return $this->order->exists ? 'Заказ №' . $this->order->id : 'Создание заказа';
    }

    /**
     * Display header description.
     */
    public function description(): ?string
    {
        return 'Информация о заказе и его позициях';
    }

    public function permission(): ?iterable
    {
        return [
            'platform.order.edit',
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
                ->confirm('Вы уверены, что хотите удалить этот заказ?')
                ->method('remove')
                ->canSee($this->order->exists),

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
            Layout::tabs([
                'Информация о заказе' => [
                    OrderEditLayout::class,
                ],
                'Позиции заказа' => [
                    OrderItemsLayout::class,
                ],
            ]),
        ];
    }

    /**
     * Save order
     *
     * @param Order $order
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function save(Order $order, Request $request)
    {
        $request->validate([
            'order.user_id' => 'required|exists:users,id',
            'order.status' => 'required|string|max:255',
            'order.total' => 'required|numeric|min:0',
            'order.address' => 'nullable|string|max:255',
            'order.payment_method' => 'nullable|string|max:255',
            'order.note' => 'nullable|string',
        ]);

        $order->fill($request->input('order'))->save();

        Toast::info('Заказ сохранен');

        return redirect()->route('platform.orders');
    }

    /**
     * Remove order
     *
     * @param Order $order
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function remove(Order $order)
    {
        $order->delete();

        Toast::info('Заказ удален');

        return redirect()->route('platform.orders');
    }
}