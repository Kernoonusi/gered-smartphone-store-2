<?php

namespace Database\Seeders;

use App\Models\Smartphone;
use Database\Factories\SmartphoneSpecificationFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SmartphoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('smartphone_images')->truncate();
        DB::table('smartphone_specifications')->truncate();
        DB::table('smartphones')->truncate();
        
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
