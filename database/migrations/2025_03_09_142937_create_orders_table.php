<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            // Связь с пользователем, который оформил заказ
            $table->unsignedBigInteger('user_id');
            // Статус заказа (например, processing, delivery, arrived)
            $table->string('status')->default('processing');
            // Способ оплаты
            $table->string('payment_method')->nullable();
            // Адрес доставки
            $table->string('address')->nullable();
            // Комментарий (необязательно)
            $table->text('note')->nullable();
            // Общая стоимость заказа
            $table->decimal('total', 10, 2);
            $table->timestamps();

            // Внешний ключ на таблицу users
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
