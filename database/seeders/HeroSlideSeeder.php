<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use Illuminate\Database\Seeder;

class HeroSlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HeroSlide::create([
            'title' => 'Новый XPhone Pro',
            'subtitle' => 'Революционная камера, невероятная производительность',
            'buttonText' => 'Смотреть',
            'image' => 'iphone16.webp',
            'backgroundColor' => 'bg-gradient-to-r from-cyan-500 to-blue-500',
            'productId' => 23,
        ]);

        HeroSlide::create([
            'title' => 'Samsung Galaxy S Ultra',
            'subtitle' => 'Безграничные возможности в ваших руках',
            'buttonText' => 'Подробнее',
            'image' => 'iphone16.webp',
            'backgroundColor' => 'bg-gradient-to-r from-purple-500 to-pink-500',
            'productId' => 24,
        ]);

        HeroSlide::create([
            'title' => 'Специальное предложение',
            'subtitle' => 'Скидки до 30% на аксессуары при покупке смартфона',
            'buttonText' => 'Получить скидку',
            'image' => 'iphone16.webp',
            'backgroundColor' => 'bg-gradient-to-r from-amber-500 to-orange-500',
            'productId' => 25,
        ]);
    }
}
