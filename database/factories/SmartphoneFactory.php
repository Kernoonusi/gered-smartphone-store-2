<?php

namespace Database\Factories;

use App\Models\Smartphone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Smartphone>
 */
class SmartphoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Smartphone::class;

    public function definition(): array
    {
        return [
            'brand' => $this->faker->randomElement(['Samsung', 'Apple', 'Huawei', 'Xiaomi']),
            'model' => $this->faker->word,
            'price' => $this->faker->randomElement([99, 199, 299, 399, 499, 599, 699, 799, 899, 999, 1099]),
            'description' => $this->faker->sentence,
        ];
    }
}
