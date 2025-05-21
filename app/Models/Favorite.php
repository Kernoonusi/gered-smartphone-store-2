<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    public function product()
    {
        return $this->belongsTo(Smartphone::class, 'product_id');
    }

    protected $fillable = ['product_id'];
}
