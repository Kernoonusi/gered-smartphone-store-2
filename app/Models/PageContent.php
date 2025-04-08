<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'key',
        'title',
        'content',
    ];

    /**
     * Get page content by key.
     *
     * @param string $key
     * @return PageContent|null
     */
    public static function getByKey(string $key): ?PageContent
    {
        return self::where('key', $key)->first();
    }
}