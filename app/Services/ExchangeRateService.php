<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class ExchangeRateService
{
    public static function getUsdToRubRate(): float
    {
        // Кэшируем курс на 60 минут
        return Cache::remember('usd_to_rub_rate', 3600, function () {
            // $response = Http::get('https://api.exchangerate-api.com/v4/latest/USD');
            // if ($response->ok()) {
            //     $rates = $response->json()['rates'];
            //     return $rates['RUB'] ?? 75; // Если не найден, используем значение по умолчанию
            // }
            return 89;
        });
    }
}
