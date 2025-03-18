<?php

namespace App\Http\Controllers;

use App\Models\Smartphone;
use Inertia\Inertia;

class MainPageController extends Controller
{
    public function index()
    {
        $smartphones = Smartphone::with(['images', 'specifications'])->limit(5)->get();

        // dd($smartphones);
        // Передаём данные в компонент React "Smartphones/Index"
        return Inertia::render('index', [
            'smartphones' => $smartphones,
        ]);
    }
}
