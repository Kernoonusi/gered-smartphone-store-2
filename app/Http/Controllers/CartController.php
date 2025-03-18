<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Smartphone;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    /**
     * Отобразить корзину пользователя.
     */
    public function index()
    {
        $user = Auth::user();

        // Находим корзину (заказ со статусом "cart") для пользователя
        $cart = Order::with('items.product.images')
            ->where('user_id', $user->id)
            ->where('status', 'cart')
            ->first();

        // Если корзина отсутствует, создаём новую
        if (!$cart) {
            $cart = Order::create([
                'user_id' => $user->id,
                'status'  => 'cart',
                'total'   => 0,
            ]);
        }

        $totalPrice = $cart->items()->sum(DB::raw('price * count'));

        $randomSmartphones = Smartphone::with(['images', 'specifications'])->inRandomOrder()->limit(5)->get();

        return Inertia::render('cart/index', [
            'cart' => $cart,
            'products' => Inertia::defer(fn () => $randomSmartphones),
            'totalPrice' => $totalPrice,
            'user' => $user
        ]);
    }

    /**
     * Добавить товар в корзину.
     *  
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|integer',
            'count'      => 'nullable|integer|min:1',
            'price'      => 'required|numeric|min:0',
        ]);

        $user = Auth::user();
        $count = $request->input('count', 1);

        // Получаем или создаём корзину
        $cart = Order::firstOrCreate(
            ['user_id' => $user->id, 'status' => 'cart'],
            ['total' => 0]
        );

        // Проверяем, есть ли уже данный товар в корзине
        $item = $cart->items()->where('product_id', $request->product_id)->first();
        if ($item) {
            $item->count += $count;
            $item->save();
        } else {
            $cart->items()->create([
                'product_id' => $request->product_id,
                'count'      => $count,
                'price'      => $request->price,
            ]);
        }

        // Пересчитываем общую стоимость корзины
        $cart->total = $cart->items()->sum(DB::raw('price * count'));
        $cart->save();

        return response()->json([
            'message' => 'Товар добавлен в корзину',
        ], 200);
    }

    /**
     * Обновить количество товара в корзине.
     * 
     * @param \Illuminate\Http\Request $request
     * @param int $itemId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $itemId): JsonResponse
    {
        $request->validate([
            'count' => 'required|integer|min:1',
        ]);

        $item = OrderItem::findOrFail($itemId);
        $item->count = $request->count;
        $item->save();

        // Обновляем общую стоимость корзины
        $cart = $item->order;
        $cart->total = $cart->items()->sum(DB::raw('price * count'));
        $cart->save();

        return response()->json([
            'message' => 'Корзина обновлена',
        ], 200);
    }

    /**
     * Удалить товар из корзины.
     * 
     * @param int $itemId
     * @return \Illuminate\Http\JsonResponse
     */
    public function remove($itemId): JsonResponse
    {
        $item = OrderItem::findOrFail($itemId);
        $cart = $item->order;
        $item->delete();

        // Пересчитываем общую стоимость корзины
        $cart->total = $cart->items()->sum(DB::raw('price * count'));
        $cart->save();

        return response()->json([
            'message' => 'Товар удалён из корзины',
        ], 200);
    }

    /**
     * Оформить заказ (сменить статус с "cart" на "processing").
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkout(Request $request)
    {
        $request->validate([
            'address' => 'required|string|max:255',
            'paymentMethod' => 'required|string',
            'note' => 'nullable|string',
        ]);

        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->where('status', 'cart')
            ->with('items')
            ->first();

        if (!$order || $order->items->isEmpty()) {
            return response()->json([
                'message' => 'Ваша корзина пуста',
            ], 400);
        }

        $order->address = $request->address;
        $order->payment_method = $request->paymentMethod;
        $order->note = $request->note;
        $order->status = 'processing';
        $order->save();

        return response()->json([
            'message' => 'Заказ успешно оформлен',
        ], 200);
    }
}
