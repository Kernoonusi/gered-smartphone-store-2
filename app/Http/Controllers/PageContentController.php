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
        $pageContent = PageContent::firstOrCreate(
            ['key' => 'policy'],
            ['title' => 'Политика конфиденциальности', 'content' => '<p>Содержимое политики конфиденциальности</p>']
        );
        
        return Inertia::render('policy', [
            'pageContent' => $pageContent,
        ]);
    }

    /**
     * Display the about page.
     */
    public function about()
    {
        $pageContent = PageContent::firstOrCreate(
            ['key' => 'about'],
            ['title' => 'О нас', 'content' => '<p>Информация о компании</p>']
        );
        
        return Inertia::render('about', [
            'pageContent' => $pageContent,
        ]);
    }

    /**
     * Display the contacts page.
     */
    public function contacts()
    {
        $pageContent = PageContent::firstOrCreate(
            ['key' => 'contacts'],
            ['title' => 'Контакты', 'content' => '<p>Наши контактные данные</p>']
        );
        
        return Inertia::render('contacts', [
            'pageContent' => $pageContent,
        ]);
    }

    /**
     * Display the delivery page.
     */
    public function delivery()
    {
        $pageContent = PageContent::firstOrCreate(
            ['key' => 'delivery'],
            ['title' => 'Доставка и оплата', 'content' => '<p>Информация о доставке и оплате</p>']
        );
        
        return Inertia::render('delivery', [
            'pageContent' => $pageContent,
        ]);
    }

    /**
     * Display the warranty page.
     */
    public function warranty()
    {
        $pageContent = PageContent::firstOrCreate(
            ['key' => 'warranty'],
            ['title' => 'Гарантия и возврат', 'content' => '<p>Информация о гарантии и возврате</p>']
        );
        
        return Inertia::render('warranty', [
            'pageContent' => $pageContent,
        ]);
    }
}