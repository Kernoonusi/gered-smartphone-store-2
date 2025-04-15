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
            'rating' => $this->faker->numberBetween(1, 5),
            // order_id, user_id, smartphone_id будут устанавливаться в сидере
        ];
    }
}