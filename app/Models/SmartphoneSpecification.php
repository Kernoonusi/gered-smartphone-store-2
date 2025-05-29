<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmartphoneSpecification extends Model
{
    use HasFactory;
    protected $fillable = [
        'smartphone_id', 'spec_key', 'spec_value'
    ];

    // Каждая спецификация принадлежит смартфону
    public function smartphone()
    {
        return $this->belongsTo(Smartphone::class);
    }
}
