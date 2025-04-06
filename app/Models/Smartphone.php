<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Filters\Filterable;
use Orchid\Filters\Types\Like;
use Orchid\Filters\Types\Where;
use Orchid\Filters\Types\WhereDateStartEnd;

class Smartphone extends Model
{
    use HasFactory, Filterable;
    protected $fillable = [
        'brand', 'model', 'price', 'description',
    ];
    
    /**
     * The attributes for which you can use filters in url.
     *
     * @var array
     */
    protected $allowedFilters = [
        'id'         => Where::class,
        'brand'      => Like::class,
        'model'      => Like::class,
        'price'      => Where::class,
        'updated_at' => WhereDateStartEnd::class,
        'created_at' => WhereDateStartEnd::class,
    ];

    /**
     * The attributes for which can use sort in url.
     *
     * @var array
     */
    protected $allowedSorts = [
        'id',
        'brand',
        'model',
        'price',
        'updated_at',
        'created_at',
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

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    
    /**
     * Get the full name of the smartphone (brand + model).
     *
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        return $this->brand . ' ' . $this->model;
    }
}
