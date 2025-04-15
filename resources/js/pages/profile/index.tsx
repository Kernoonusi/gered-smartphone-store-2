import { usePage, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { ChangeProfileForm } from '@/components/profile/change-profile-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Package, User, Shield, LogOut, Settings, Clock } from 'lucide-react';
import { Order, Roles, User as UserType } from '@/types';
import Layout from '@/layouts/app-layout';
import { currencyFormatter } from '@/utils/currencyFormatter';
import ChangePassForm from '@/components/profile/change-pass-form';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface PageProps {
  user: UserType;
  orders: Order[];
  [key: string]: unknown;
}

export default function Profile() {
  // Получаем типизированные данные, переданные с сервера
  const { user, orders } = usePage<PageProps>().props;
  const [activeTab, setActiveTab] = useState("profile");
  const { t, currentLocale } = useLaravelReactI18n();
  dayjs.extend(localizedFormat);
  // Функция выхода: отправляем POST-запрос по маршруту logout
  const logOut = (): void => {
    router.post(route('logout'));
  };

  // Отображаем понятные статусы заказа
  const statuses: Record<string, { label: string, className: string, icon: React.ReactNode }> = {
    processing: { 
      label: t('profile.status_processing'), 
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      icon: <Clock className="h-4 w-4 mr-1" /> 
    },
    delivery: { 
      label: t('profile.status_delivery'), 
      className: 'bg-blue-100 text-blue-800 border-blue-200', 
      icon: <Package className="h-4 w-4 mr-1" /> 
    },
    arrived: { 
      label: t('profile.status_arrived'), 
      className: 'bg-green-100 text-green-800 border-green-200', 
      icon: <Calendar className="h-4 w-4 mr-1" /> 
    },
  };

  // Получение инициалов для аватара
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // Получение последнего заказа
  const lastOrder = orders.length > 0 ? orders[0] : null;

  // Общая сумма всех заказов
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  // console.table(user);
  return (
    <Layout>
      <main className="w-full max-w-6xl mt-6 px-4 flex flex-col gap-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Блок с профилем */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="text-md">{user.email}</CardDescription>
              {user.roles.some(role => role.name === Roles.Admin) && (
                <Badge className="mt-2" variant="outline">
                  <Shield className="h-3 w-3 mr-1" /> {t('profile.admin')}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">{orders.length}</span>
                  <span className="text-sm text-muted-foreground">{t('profile.orders')}</span>
                </div>
                <div className="flex flex-col">
                  <span className={`text-3xl font-bold transition-all duration-300 text-[clamp(1.5rem,3rem_-_5cqw,3rem)]`}>{currentLocale() === 'ru' ? currencyFormatter.format(totalSpent) : `$${totalSpent}`}</span>
                  <span className="text-sm text-muted-foreground">{t('profile.spent')}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="destructive" onClick={logOut} className="w-full">
                <LogOut className="h-4 w-4 mr-2" /> {t('profile.log_out')}
              </Button>
            </CardFooter>
          </Card>

          {/* Основное содержимое профиля */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t('profile.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">
                    <User className="h-4 w-4 mr-2" /> {t('profile.title')}
                  </TabsTrigger>
                  <TabsTrigger value="orders">
                    <Package className="h-4 w-4 mr-2" /> {t('profile.orders')}
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="h-4 w-4 mr-2" /> {t('profile.settings_title')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{t('profile.greeting')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{t('profile.name')}</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t('profile.email')}</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t('profile.registration_date')}</p>
                        <p className="font-medium">{dayjs(user.created_at).locale(currentLocale() === 'ru' ? 'ru' : 'en').format('LL')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t('profile.role')}</p>
                        <p className="font-medium">
                          {user.roles.some(role => role.name === Roles.Admin) ? t('profile.admin') : t('profile.user')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {lastOrder && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">{t('profile.last_order')}</h3>
                        <Card>
                          <CardHeader className="py-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">{t('profile.order')} #{lastOrder.id}</CardTitle>
                              <div className="flex items-center">
                                <Badge variant="outline" className={statuses[lastOrder.status].className}>
                                  {statuses[lastOrder.status].icon}
                                  {statuses[lastOrder.status].label}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="py-2">
                            <ul className="space-y-1">
                              {lastOrder.items.slice(0, 2).map((item) => (
                                <li key={item.id} className="flex justify-between">
                                  <span className="text-sm">
                                    {item.product.brand} {item.product.model} × {item.count}
                                  </span>
                                  <span className="font-medium text-sm">{currentLocale() === 'ru' ? currencyFormatter.format(item.price * item.count) : `$${item.price * item.count}`}</span>
                                </li>
                              ))}
                              {lastOrder.items.length > 2 && (
                                <li className="text-sm text-muted-foreground">
                                  {t('profile.etc', { count: lastOrder.items.length - 2 })}
                                </li>
                              )}
                            </ul>
                          </CardContent>
                          <CardFooter className="py-3 flex justify-between">
                            <span className="text-sm font-medium">{t('profile.total')}</span>
                            <span className="font-bold transition-all duration-300 text-[clamp(1.25rem,2.5rem_-_0.0000125*${totalSpent},2.5rem)]">{currentLocale() === 'ru' ? currencyFormatter.format(totalSpent) : `$${totalSpent}`}</span>
                          </CardFooter>
                        </Card>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                            {t('profile.all_orders')}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {user.roles.some(role => role.name === Roles.Admin) && (
                    <div className="flex justify-center mt-6">
                      <Button asChild className="w-full" variant="outline">
                        <a href="/admin" className="flex items-center w-full justify-center">
                          <Shield className="h-4 w-4 mr-2" /> {t('profile.admin_panel')}
                        </a>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="orders" className="mt-6">
                  <h3 className="text-xl font-medium mb-4">{t('profile.orders')}</h3>
                  {orders.length === 0 ? (
                    <div className="text-center py-6">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-lg font-medium">{t('profile.no_orders')}</p>
                      <p className="text-muted-foreground">{t('profile.no_orders_desc')}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                          <CardHeader className="py-3 bg-muted/50">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-base">{t('profile.order')} #{order.id}</CardTitle>
                                <Badge variant="outline" className={statuses[order.status].className}>
                                  {statuses[order.status].icon}
                                  {statuses[order.status].label}
                                </Badge>
                              </div>
                              <CardDescription>
                                {dayjs(order.created_at).locale(currentLocale() === 'ru' ? 'ru' : 'en').format('LL')}
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="py-3">
                            <ul className="space-y-2 divide-y">
                              {order.items.map((item) => (
                                <li key={item.id} className="flex justify-between items-center py-2 first:pt-0 last:pb-0">
                                  <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xs font-bold">
                                      {item.product.brand.charAt(0)}
                                    </div>
                                    <div>
                                      <Link href={`/products/${item.product.id}`} className="font-medium hover:underline">
                                        {item.product.brand} {item.product.model}
                                      </Link>
                                      <p className="text-sm text-muted-foreground">
                                        {item.count} × {currentLocale() === 'ru' ? currencyFormatter.format(item.price) : item.price}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="font-medium">{currentLocale() === 'ru' ? currencyFormatter.format(item.price * item.count) : item.price * item.count}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter className="py-3 bg-muted/30 flex justify-between">
                            <div>
                              <span className="text-sm text-muted-foreground">{t('profile.total_items')}: {order.items.reduce((sum, item) => sum + item.count, 0)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{t('profile.total')}:</span>
                              <span className="font-bold text-lg">{currentLocale() === 'ru' ? currencyFormatter.format(order.total) : `$${order.total}`}</span>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="settings" className="space-y-8 mt-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">{t('profile.settings_title')}</h3>
                    <ChangeProfileForm />
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-medium mb-4">{t('profile.password_title')}</h3>
                    <ChangePassForm />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </Layout>
  );
}