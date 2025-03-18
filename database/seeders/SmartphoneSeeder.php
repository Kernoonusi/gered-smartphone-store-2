<?php

namespace Database\Seeders;

use App\Models\Smartphone;
use Database\Factories\SmartphoneSpecificationFactory;
use Illuminate\Database\Seeder;

class SmartphoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Smartphone::factory()
            ->count(10)
            ->create()
            ->each(function ($smartphone) {
                // Добавляем 3 изображения для каждого смартфона
                $smartphone->images()->saveMany(
                    \App\Models\SmartphoneImage::factory()->count(3)->make()
                );

                // Добавляем 5 характеристик для каждого смартфона
                $specs = SmartphoneSpecificationFactory::generateSpecifications();
                $smartphone->specifications()->createMany($specs);
            });
    }
}
