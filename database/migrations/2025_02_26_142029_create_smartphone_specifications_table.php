<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('smartphone_specifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('smartphone_id');
            $table->string('spec_key');    // Название характеристики (например, "screen_size")
            $table->string('spec_value');  // Значение характеристики (например, "6.1 inches")
            $table->float('spec_value_numeric')->nullable(); // Числовое значение, если применимо
            $table->timestamps();

            // Определяем внешний ключ
            $table->foreign('smartphone_id')
                ->references('id')
                ->on('smartphones')
                ->onDelete('cascade');

            $table->index('smartphone_id');
            $table->index(['spec_key', 'spec_value_numeric', 'spec_value', 'smartphone_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('smartphone_specifications');
    }
};
