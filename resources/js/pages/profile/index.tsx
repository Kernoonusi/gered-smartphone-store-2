import ChangePassForm from '@/components/profile/change-pass-form';
import { ChangeProfileForm } from '@/components/profile/change-profile-form';
import { OrderReviewForm } from '@/components/profile/order-review-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/layouts/app-layout';
import { Order, Roles, User as UserType } from '@/types';
import { currencyFormatter as baseCurrencyFormatter } from '@/utils/currencyFormatter';
import { Link, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Calendar, Clock, LogOut, Package, Settings, Shield, User, X } from 'lucide-react';
import React, { useMemo, useState } from 'react';

interface PageProps {
  user: UserType;
  orders: Order[];
  [key: string]: unknown;
}

dayjs.extend(localizedFormat);

export default function Profile() {
  const { user, orders } = usePage<PageProps>().props;
  const [activeTab, setActiveTab] = useState('profile');
  const { t, currentLocale } = useLaravelReactI18n();

  // Мемоизация локали и форматтера
  const locale = useMemo(() => (currentLocale() === 'ru' ? 'ru' : 'en'), [currentLocale]);
  const currencyFormatter = useMemo(() => baseCurrencyFormatter, []); // если baseCurrencyFormatter зависит от локали, скорректируйте
  const formatPrice = (price: number) => (locale === 'ru' ? currencyFormatter.format(price) : `$${price}`);

  const logOut = (): void => {
    router.post(route('logout'));
  };

  const statuses: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
    processing: {
      label: t('profile.status_processing'),
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: <Clock className="mr-1 h-4 w-4" />,
    },
    delivery: {
      label: t('profile.status_delivery'),
      className: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: <Package className="mr-1 h-4 w-4" />,
    },
    completed: {
      label: t('profile.status_arrived'),
      className: 'bg-green-100 text-green-800 border-green-200',
      icon: <Calendar className="mr-1 h-4 w-4" />,
    },
    cancelled: {
      label: t('profile.status_cancelled'),
      className: 'bg-red-100 text-red-800 border-red-200',
      icon: <X className="mr-1 h-4 w-4" />,
    },
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const lastOrder = orders.length > 0 ? orders[0] : null;
  const isAdmin = useMemo(() => user.roles.some((role) => role.name === Roles.Admin), [user.roles]);
  const totalSpentRaw = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);

  const formatLargeNumber = (num: number): string => {
    // Конвертируем доллары в рубли для русской локали
    const convertedNum = locale === 'ru' ? currencyFormatter.convert(num) : num;
    const currencySymbol = locale === 'ru' ? '₽' : '$';

    if (convertedNum >= 1000000000) {
      return (convertedNum / 1000000000).toFixed(1) + t('profile.billion') + ' ' + currencySymbol;
    } else if (convertedNum >= 1000000) {
      return (convertedNum / 1000000).toFixed(1) + t('profile.million') + ' ' + currencySymbol;
    } else if (convertedNum >= 1000) {
      return (convertedNum / 1000).toFixed(1) + t('profile.thousand') + ' ' + currencySymbol;
    }
    return formatPrice(num);
  };

  const totalSpent = formatLargeNumber(totalSpentRaw);

  return (
    <Layout>
      <main className="mx-auto mt-6 flex w-full max-w-7xl flex-col gap-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Блок с профилем */}
          <Card className="h-fit md:col-span-1">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="mb-4 h-24 w-24">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="text-md">{user.email}</CardDescription>
              {isAdmin && (
                <Badge className="mt-2" variant="outline">
                  <Shield className="mr-1 h-3 w-3" /> {t('profile.admin')}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">{orders.length}</span>
                  <span className="text-muted-foreground text-sm">{t('profile.orders')}</span>
                </div>
                <div className="flex flex-col">
                  <span className={`text-[clamp(1.5rem,3rem_-_5cqw,3rem)] font-bold transition-all duration-300`}>{totalSpent}</span>
                  <span className="text-muted-foreground text-sm">{t('profile.spent')}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="destructive" onClick={logOut} className="w-full cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" /> {t('profile.log_out')}
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
                  <TabsTrigger value="profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> <p className="hidden sm:inline-block">{t('profile.title')}</p>
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" /> <p className="hidden sm:inline-block">{t('profile.orders')}</p>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" /> <p className="hidden sm:inline-block">{t('profile.settings_title')}</p>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{t('profile.greeting')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground text-sm">{t('profile.name')}</p>
                        <p className="font-medium break-words">{user.name}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">{t('profile.email')}</p>
                        <p className="font-medium break-words">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">{t('profile.registration_date')}</p>
                        <p className="font-medium">{dayjs(user.created_at).locale(locale).format('LL')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">{t('profile.role')}</p>
                        <p className="font-medium">{isAdmin ? t('profile.admin') : t('profile.user')}</p>
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
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">
                                {t('profile.order')} #{lastOrder.id}
                              </CardTitle>
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
                                  <span className="text-sm font-medium">{formatPrice(item.price * item.count)}</span>
                                </li>
                              ))}
                              {lastOrder.items.length > 2 && (
                                <li className="text-muted-foreground text-sm">{t('profile.etc', { count: lastOrder.items.length - 2 })}</li>
                              )}
                            </ul>
                          </CardContent>
                          <CardFooter className="flex justify-between py-3">
                            <span className="text-sm font-medium">{t('profile.total')}</span>
                            <span className="text-[clamp(1.25rem,2.5rem_-_0.0000125*${lastOrder.total},2.5rem)] font-bold transition-all duration-300">
                              {formatPrice(lastOrder.total)}
                            </span>
                          </CardFooter>
                        </Card>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" onClick={() => setActiveTab('orders')}>
                            {t('profile.all_orders')}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {isAdmin && (
                    <div className="mt-6 flex justify-center">
                      <Button asChild className="w-full" variant="outline">
                        <a href="/admin" className="flex w-full items-center justify-center">
                          <Shield className="mr-2 h-4 w-4" /> {t('profile.admin_panel')}
                        </a>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="orders" className="mt-6">
                  <h3 className="mb-4 text-xl font-medium">{t('profile.orders')}</h3>
                  {orders.length === 0 ? (
                    <div className="py-6 text-center">
                      <Package className="text-muted-foreground mx-auto mb-2 h-12 w-12" />
                      <p className="text-lg font-medium">{t('profile.no_orders')}</p>
                      <p className="text-muted-foreground">{t('profile.no_orders_desc')}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => {
                        const orderTotalItems = order.items.reduce((sum, item) => sum + item.count, 0);
                        return (
                          <Card key={order.id} className="overflow-hidden">
                            <CardHeader className="bg-muted/50 py-3">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <CardTitle className="text-base">
                                    {t('profile.order')} #{order.id}
                                  </CardTitle>
                                  <Badge variant="outline" className={statuses[order.status].className}>
                                    {statuses[order.status].icon}
                                    {statuses[order.status].label}
                                  </Badge>
                                </div>
                                <CardDescription>{dayjs(order.created_at).locale(locale).format('LL')}</CardDescription>
                              </div>
                            </CardHeader>
                            <CardContent className="py-3">
                              <ul className="space-y-2 divide-y">
                                {order.items.map((item) => (
                                  <li key={item.id} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                                    <div className="flex items-center gap-2">
                                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded text-xs font-bold">
                                        {item.product.brand.charAt(0)}
                                      </div>
                                      <div>
                                        <Link href={`/product/${item.product.id}`} className="font-medium hover:underline">
                                          {item.product.brand} {item.product.model}
                                        </Link>
                                        <p className="text-muted-foreground text-sm">
                                          {item.count} × {formatPrice(item.price)}
                                        </p>
                                      </div>
                                    </div>
                                    <span className="font-medium">{formatPrice(item.price * item.count)}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                            <CardFooter className="bg-muted/30 flex justify-between py-3">
                              <div>
                                <span className="text-muted-foreground text-sm">
                                  {t('profile.total_items')}: {orderTotalItems}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{t('profile.total')}:</span>
                                <span className="text-lg font-bold">{formatPrice(order.total)}</span>
                              </div>
                            </CardFooter>
                            {order.status === 'completed' && (
                              <div className="bg-muted/10 border-t p-4">
                                <div className="mb-2 font-medium">{t('profile.leave_review')}</div>
                                {order.review ? (
                                  <OrderReviewForm
                                    orderId={order.id}
                                    initialReview={order.review.text}
                                    initialRating={order.review.rating}
                                    disabled={true}
                                  />
                                ) : (
                                  <OrderReviewForm orderId={order.id} />
                                )}
                              </div>
                            )}
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="settings" className="mt-6 space-y-8">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">{t('profile.settings_title')}</h3>
                    <ChangeProfileForm />
                  </div>
                  <Separator />
                  <div>
                    <h3 className="mb-4 text-lg font-medium">{t('profile.password_title')}</h3>
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
