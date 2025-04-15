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
            $table->string('image_path'); // Путь к изображению (путь в storage)
            $table->timestamps();

            $table->foreign('smartphone_id')
                ->references('id')
                ->on('smartphones')
                ->onDelete('cascade');

            $table->index('smartphone_id');
            $table->index('image_path');
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
