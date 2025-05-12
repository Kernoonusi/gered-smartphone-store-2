<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroSlide;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            HeroSlideSeeder::class,
            RoleSeeder::class,
            SmartphoneSeeder::class,
            PageContentSeeder::class,
            UserSeeder::class,
            OrderSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
