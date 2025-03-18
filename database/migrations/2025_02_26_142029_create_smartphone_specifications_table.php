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
            $table->timestamps();

            // Определяем внешний ключ
            $table->foreign('smartphone_id')
                  ->references('id')
                  ->on('smartphones')
                  ->onDelete('cascade');
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
