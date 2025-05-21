<?php

namespace App\Http\Controllers;

use App\Models\HeroSlide;
use App\Models\Smartphone;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MainPageController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $smartphones = Smartphone::with(['images', 'specifications'])->limit(5)->get();

        if ($user) {
            $favoriteProductIds = $user->favorites()->pluck('product_id')->toArray();
            $smartphones->each(function ($smartphone) use ($favoriteProductIds) {
                $smartphone->is_in_favorites = in_array($smartphone->id, $favoriteProductIds);
            });
        }

        $smartphones->transform(function ($smartphone) {
            $smartphone->images->transform(function ($image) {
                $image->image_path = Storage::url($image->image_path);

                return $image;
            });

            return $smartphone;
        });

        $heroSlides = HeroSlide::all();

        return Inertia::render('index', [
            'heroSlides' => $heroSlides,
            'smartphones' => $smartphones,
        ]);
    }
}
