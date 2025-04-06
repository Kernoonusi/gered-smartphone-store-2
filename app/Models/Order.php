<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Filters\Filterable;
use Orchid\Filters\Types\Like;
use Orchid\Filters\Types\Where;
use Orchid\Filters\Types\WhereDateStartEnd;

class Order extends Model
{
    use HasFactory, Filterable;
    
    /**
     * The attributes for which you can use filters in url.
     *
     * @var array
     */
    protected $allowedFilters = [
        'id'         => Where::class,
        'status'     => Like::class,
        'total'      => Where::class,
        'user_id'    => Where::class,
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
        'status',
        'total',
        'user_id',
        'updated_at',
        'created_at',
    ];

    protected $fillable = [
        'user_id',
        'status',
        'total',
        'address',
        'payment_method',
        'note',
    ];

    // Заказ принадлежит пользователю
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Заказ имеет много позиций
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}