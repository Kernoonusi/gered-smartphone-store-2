<?php

namespace App\Http\Controllers;

use App\Models\PageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageContentController extends Controller
{
    /**
     * Display the policy page.
     */
    public function policy()
    {
        $pageContent = PageContent::getByKey('policy');
        
        return Inertia::render('policy', [
            'pageContent' => $pageContent,
        ]);
    }
}