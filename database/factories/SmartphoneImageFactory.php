<?php

namespace Database\Factories;

use App\Models\SmartphoneImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SmartphoneImage>
 */
class SmartphoneImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = SmartphoneImage::class;
    
    public function definition(): array
    {
        return [
            'image_path' => $this->faker->imageUrl(640, 480, 'tech'), // Генерирует URL изображения
        ];
    }
}
