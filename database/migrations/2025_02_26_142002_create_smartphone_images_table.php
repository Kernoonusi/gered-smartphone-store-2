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
        Schema::create('smartphone_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('smartphone_id');
            $table->string('image_path'); // Путь к изображению (например, URL или путь в storage)
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
        Schema::dropIfExists('smartphone_images');
    }
};
