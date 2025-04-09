<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Gered store') }}</title>
    <meta name="description"
        content="Купите лучшие смартфоны в Gered Store. Большой выбор, выгодные цены, качественный сервис.">
    <meta name="keywords" content="Gered Store, смартфоны, продажа смартфонов, лучшие смартфоны, мобильные телефоны">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="Gered Store">
    <meta property="og:description" content="Купите лучшие смартфоны в Gered Store.">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta name="twitter:card" content="summary_large_image">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased h-full m-0">
    @inertia
</body>

</html>