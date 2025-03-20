<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\Smartphone;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $smartphones = Smartphone::all();

        if ($users->isEmpty() || $smartphones->isEmpty()) {
            $this->command->info('Нет пользователей или смартфонов для создания отзывов.');
            return;
        }

        Review::factory(100)->make()->each(function ($review) use ($users, $smartphones) {
            $review->user()->associate($users->random());
            $review->smartphone()->associate($smartphones->random());
            $review->save();
        });
    }
}
