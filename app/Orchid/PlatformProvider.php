<?php

declare(strict_types=1);

namespace App\Orchid;

use Orchid\Platform\Dashboard;
use Orchid\Platform\ItemPermission;
use Orchid\Platform\OrchidServiceProvider;
use Orchid\Screen\Actions\Menu;
use Orchid\Support\Color;

class PlatformProvider extends OrchidServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @param Dashboard $dashboard
     *
     * @return void
     */
    public function boot(Dashboard $dashboard): void
    {
        parent::boot($dashboard);

        // ...
    }

    /**
     * Register the application menu.
     *
     * @return Menu[]
     */
    public function menu(): array
    {
        return [
            Menu::make('Панель управления')
                ->icon('bs.house')
                ->title('Навигация')
                ->route(config('platform.index')),
                
            Menu::make('Смартфоны')
                ->icon('bs.phone')
                ->route('platform.smartphones')
                ->permission('platform.smartphone.list'),
                
            Menu::make('Заказы')
                ->icon('bs.cart')
                ->route('platform.orders')
                ->permission('platform.order.list'),
                
            Menu::make('Отзывы')
                ->icon('bs.star')
                ->route('platform.reviews')
                ->permission('platform.review.list')
                ->divider(),
                
            Menu::make('Примеры')
                ->icon('bs.collection')
                ->list([
                    Menu::make('Базовый пример')
                        ->icon('bs.collection')
                        ->route('platform.example'),
                        
                    Menu::make('Формы')
                        ->icon('bs.card-list')
                        ->route('platform.example.fields'),
                        
                    Menu::make('Макеты')
                        ->icon('bs.window-sidebar')
                        ->route('platform.example.layouts'),
                        
                    Menu::make('Сетка')
                        ->icon('bs.columns-gap')
                        ->route('platform.example.grid'),
                        
                    Menu::make('Графики')
                        ->icon('bs.bar-chart')
                        ->route('platform.example.charts'),
                        
                    Menu::make('Карточки')
                        ->icon('bs.card-text')
                        ->route('platform.example.cards'),
                ])
                ->divider(),

            Menu::make(__('Users'))
                ->icon('bs.people')
                ->route('platform.systems.users')
                ->permission('platform.systems.users')
                ->title(__('Access Controls')),

            Menu::make(__('Roles'))
                ->icon('bs.shield')
                ->route('platform.systems.roles')
                ->permission('platform.systems.roles')
                ->divider(),

            Menu::make('Documentation')
                ->title('Docs')
                ->icon('bs.box-arrow-up-right')
                ->url('https://orchid.software/en/docs')
                ->target('_blank'),

            Menu::make('Changelog')
                ->icon('bs.box-arrow-up-right')
                ->url('https://github.com/orchidsoftware/platform/blob/master/CHANGELOG.md')
                ->target('_blank')
                ->badge(fn () => Dashboard::version(), Color::DARK),
        ];
    }

    /**
     * Register permissions for the application.
     *
     * @return ItemPermission[]
     */
    public function permissions(): array
    {
        return [
            ItemPermission::group(__('System'))
                ->addPermission('platform.systems.roles', __('Roles'))
                ->addPermission('platform.systems.users', __('Users')),
                
            ItemPermission::group('Смартфоны')
                ->addPermission('platform.smartphone.list', 'Просмотр списка')
                ->addPermission('platform.smartphone.edit', 'Редактирование'),
                
            ItemPermission::group('Заказы')
                ->addPermission('platform.order.list', 'Просмотр списка')
                ->addPermission('platform.order.edit', 'Редактирование'),
                
            ItemPermission::group('Отзывы')
                ->addPermission('platform.review.list', 'Просмотр списка')
                ->addPermission('platform.review.edit', 'Редактирование'),
        ];
    }
}
