<?php

namespace App\Http\Controllers;

use App\Models\Smartphone;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MainPageController extends Controller
{
    public function index()
    {
        $smartphones = Smartphone::with(['images', 'specifications'])->limit(5)->get();

        $smartphones->transform(function ($smartphone) {
            $smartphone->images->transform(function ($image) {
                $image->image_path = Storage::url($image->image_path);

                return $image;
            });

            return $smartphone;
        });

        return Inertia::render('index', [
            'smartphones' => $smartphones,
        ]);
    }
}
