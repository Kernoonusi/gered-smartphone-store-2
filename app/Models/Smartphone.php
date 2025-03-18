<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Smartphone extends Model
{
    use HasFactory;
    protected $fillable = [
        'brand', 'model', 'price', 'description',
    ];

    // Связь один ко многим с изображениями
    public function images()
    {
        return $this->hasMany(SmartphoneImage::class);
    }

    // Связь один ко многим с характеристиками
    public function specifications()
    {
        return $this->hasMany(SmartphoneSpecification::class);
    }
}
