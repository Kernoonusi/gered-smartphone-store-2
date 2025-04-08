<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            SmartphoneSeeder::class,
            PageContentSeeder::class,
            UserSeeder::class,
            ReviewSeeder::class,
            OrderSeeder::class,
        ]);
    }
}
