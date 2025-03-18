<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'count',
        'price',
    ];

    // Каждая позиция принадлежит заказу
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Предполагается, что существует модель Product
    public function product()
    {
        return $this->belongsTo(Smartphone::class);
    }
}