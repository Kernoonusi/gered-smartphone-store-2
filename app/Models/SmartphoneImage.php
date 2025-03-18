<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmartphoneImage extends Model
{
    use HasFactory;
    protected $fillable = [
        'smartphone_id', 'image_path',
    ];

    // Каждый image принадлежит смартфону
    public function smartphone()
    {
        return $this->belongsTo(Smartphone::class);
    }
}
