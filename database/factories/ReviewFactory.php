<?php

namespace Database\Factories;

use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition(): array
    {
        return [
            'text'   => $this->faker->sentence(20),
            'rating' => $this->faker->randomFloat(1, 1, 5),
        ];
    }
}