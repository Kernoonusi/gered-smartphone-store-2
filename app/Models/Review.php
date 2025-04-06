<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Filters\Filterable;
use Orchid\Filters\Types\Like;
use Orchid\Filters\Types\Where;
use Orchid\Filters\Types\WhereDateStartEnd;

class Review extends Model
{
    use HasFactory, Filterable;
    
    /**
     * The attributes for which you can use filters in url.
     *
     * @var array
     */
    protected $allowedFilters = [
        'id'           => Where::class,
        'user_id'      => Where::class,
        'smartphone_id' => Where::class,
        'rating'       => Where::class,
        'text'         => Like::class,
        'updated_at'   => WhereDateStartEnd::class,
        'created_at'   => WhereDateStartEnd::class,
    ];

    /**
     * The attributes for which can use sort in url.
     *
     * @var array
     */
    protected $allowedSorts = [
        'id',
        'user_id',
        'smartphone_id',
        'rating',
        'updated_at',
        'created_at',
    ];
    
    protected $fillable = [
        'user_id',
        'smartphone_id',
        'text',
        'rating',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function smartphone()
    {
        return $this->belongsTo(Smartphone::class);
    }
}
