<?php

namespace Database\Factories;

use App\Models\SmartphoneSpecification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SmartphoneSpecification>
 */
class SmartphoneSpecificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = SmartphoneSpecification::class;

    public function definition(): array
    {
        return [
            'spec_key' => 'dummy',
            'spec_value' => 'dummy',
        ];
    }

    // Новый метод для генерации полного набора характеристик
    public static function generateSpecifications(): array
    {
        $faker = \Faker\Factory::create();

        return [
            [
                'spec_key' => 'screen_size',
                'spec_value' => $faker->randomFloat(2, 4, 7).' inches',
            ],
            [
                'spec_key' => 'battery_capacity',
                'spec_value' => $faker->numberBetween(2000, 5000).' mAh',
            ],
            [
                'spec_key' => 'ram',
                'spec_value' => $faker->numberBetween(2, 12).' GB',
            ],
            [
                'spec_key' => 'storage',
                'spec_value' => $faker->numberBetween(32, 256).' GB',
            ],
            [
                'spec_key' => 'processor',
                'spec_value' => $faker->word.' processor',
            ],
            [
                'spec_key' => 'os',
                'spec_value' => $faker->randomElement(['Android', 'iOS']),
            ],
        ];
    }
}
