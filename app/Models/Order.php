<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

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