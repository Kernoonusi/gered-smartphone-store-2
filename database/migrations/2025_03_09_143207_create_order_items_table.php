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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            // Ссылка на заказ
            $table->unsignedBigInteger('order_id');
            // Идентификатор товара (предполагается, что таблица products уже существует)
            $table->unsignedBigInteger('product_id');
            // Количество товара в заказе
            $table->integer('count');
            // Цена товара на момент заказа
            $table->decimal('price', 10, 2);
            $table->timestamps();

            // Внешние ключи
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('smartphones')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
