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
        $faker = $this->faker;
        $specs = [
            [
                'spec_key' => 'screen_size',
                'spec_value' => $faker->randomFloat(2, 4, 7),
            ],
            [
                'spec_key' => 'battery_capacity',
                'spec_value' => $faker->numberBetween(3000, 7000),
            ],
            [
                'spec_key' => 'ram',
                'spec_value' => $faker->randomElement([2, 4, 6, 8, 12]),
            ],
            [
                'spec_key' => 'storage',
                'spec_value' => $faker->randomElement([32, 64, 128, 256, 512, 1024]),
            ],
            [
                'spec_key' => 'processor',
                'spec_value' => $faker->randomElement([
                    'Apple A14',
                    'Apple A15',
                    'Apple A16',
                    'Samsung Exynos 2100',
                    'Samsung Exynos 2200',
                    'Qualcomm Snapdragon 888',
                    'Qualcomm Snapdragon 8 Gen 1',
                    'Qualcomm Snapdragon 870',
                    'MediaTek Helio P65',
                    'MediaTek Dimensity 1200',
                    'MediaTek Dimensity 9000',
                    'Kirin 9000',
                    'Kirin 990',
                    'Unisoc Tiger T618',
                    'Google Tensor',
                    'Apple M1',
                    'Apple M2',
                    'Qualcomm Snapdragon 7 Gen 1',
                    'Samsung Exynos 1080',
                    'MediaTek Helio G95',
                ]),
            ],
            [
                'spec_key' => 'os',
                'spec_value' => $faker->randomElement(['Android', 'iOS']),
            ],
            [
                'spec_key' => 'camera',
                'spec_value' => $faker->randomElement(['12', '20', '48']),
            ],
            [
                'spec_key' => 'weight',
                'spec_value' => $faker->numberBetween(100, 200),
            ],
            [
                'spec_key' => 'display',
                'spec_value' => $faker->randomElement(['AMOLED', 'OLED', 'IPS', 'LCD']),
            ],
            [
                'spec_key' => 'year',
                'spec_value' => $faker->numberBetween(2022, 2025),
            ],
        ];
        $spec = $faker->randomElement($specs);
        $spec['spec_value_numeric'] = is_numeric($spec['spec_value']) ? (float) $spec['spec_value'] : null;

        return $spec;
    }

    // Новый метод для генерации полного набора характеристик
    public static function generateSpecifications(): array
    {
        $faker = \Faker\Factory::create();
        $specs = [
            [
                'spec_key' => 'screen_size',
                'spec_value' => $faker->randomFloat(2, 4, 7),
            ],
            [
                'spec_key' => 'battery_capacity',
                'spec_value' => $faker->numberBetween(3000, 7000),
            ],
            [
                'spec_key' => 'ram',
                'spec_value' => $faker->randomElement([2, 4, 6, 8, 12]),
            ],
            [
                'spec_key' => 'storage',
                'spec_value' => $faker->randomElement([32, 64, 128, 256, 512, 1024]),
            ],
            [
                'spec_key' => 'processor',
                'spec_value' => $faker->randomElement([
                    'Apple A14',
                    'Apple A15',
                    'Apple A16',
                    'Samsung Exynos 2100',
                    'Samsung Exynos 2200',
                    'Qualcomm Snapdragon 888',
                    'Qualcomm Snapdragon 8 Gen 1',
                    'Qualcomm Snapdragon 870',
                    'MediaTek Helio P65',
                    'MediaTek Dimensity 1200',
                    'MediaTek Dimensity 9000',
                    'Kirin 9000',
                    'Kirin 990',
                    'Unisoc Tiger T618',
                    'Google Tensor',
                    'Apple M1',
                    'Apple M2',
                    'Qualcomm Snapdragon 7 Gen 1',
                    'Samsung Exynos 1080',
                    'MediaTek Helio G95',
                ]),
            ],
            [
                'spec_key' => 'os',
                'spec_value' => $faker->randomElement(['Android', 'iOS']),
            ],
            [
                'spec_key' => 'camera',
                'spec_value' => $faker->randomElement(['12', '20', '48']),
            ],
            [
                'spec_key' => 'weight',
                'spec_value' => $faker->numberBetween(100, 200),
            ],
            [
                'spec_key' => 'display',
                'spec_value' => $faker->randomElement(['AMOLED', 'OLED', 'IPS', 'LCD']),
            ],
            [
                'spec_key' => 'year',
                'spec_value' => $faker->numberBetween(2022, 2025),
            ],
        ];
        // Добавить spec_value_numeric для каждой характеристики
        foreach ($specs as &$spec) {
            $spec['spec_value_numeric'] = is_numeric($spec['spec_value']) ? (float) $spec['spec_value'] : null;
        }
        unset($spec); // на всякий случай

        return $specs;
    }
}
