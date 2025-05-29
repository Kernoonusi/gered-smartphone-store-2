<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController
{
    public function show()
    {
        return Inertia::render('Auth/Login');
    }
}