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
import { Order, PermissionCollection, User as UserType } from '@/types';
import Layout from '@/layouts/app-layout';
import { currencyFormatter } from '@/utils/currencyFormatter';
import ChangePassForm from '@/components/profile/change-pass-form';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface PageProps {
  user: UserType;
  orders: Order[];
  permissions: PermissionCollection;
  [key: string]: unknown;
}

export default function Profile() {
  // Получаем типизированные данные, переданные с сервера
  const { user, orders, permissions } = usePage<PageProps>().props;
  const [activeTab, setActiveTab] = useState("profile");

  // Функция выхода: отправляем POST-запрос по маршруту logout
  const logOut = (): void => {
    router.post(route('logout'));
  };

  // Отображаем понятные статусы заказа
  const statuses: Record<string, { label: string, className: string, icon: React.ReactNode }> = {
    processing: { 
      label: 'В обработке', 
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      icon: <Clock className="h-4 w-4 mr-1" /> 
    },
    delivery: { 
      label: 'Доставляется', 
      className: 'bg-blue-100 text-blue-800 border-blue-200', 
      icon: <Package className="h-4 w-4 mr-1" /> 
    },
    arrived: { 
      label: 'Доставлен', 
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
              {permissions[0].name === 'edit-database' && (
                <Badge className="mt-2" variant="outline">
                  <Shield className="h-3 w-3 mr-1" /> Администратор
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">{orders.length}</span>
                  <span className="text-sm text-muted-foreground">Заказов</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">{currencyFormatter.format(totalSpent)}</span>
                  <span className="text-sm text-muted-foreground">Потрачено</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="destructive" onClick={logOut} className="w-full">
                <LogOut className="h-4 w-4 mr-2" /> Выйти
              </Button>
            </CardFooter>
          </Card>

          {/* Основное содержимое профиля */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Управление профилем</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">
                    <User className="h-4 w-4 mr-2" /> Профиль
                  </TabsTrigger>
                  <TabsTrigger value="orders">
                    <Package className="h-4 w-4 mr-2" /> Заказы
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="h-4 w-4 mr-2" /> Настройки
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Личная информация</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Полное имя</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Электронная почта</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Дата регистрации</p>
                        <p className="font-medium">{format(new Date(user.created_at), 'PPP', { locale: ru })}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Роль</p>
                        <p className="font-medium">
                          {permissions[0].name === 'edit-database' ? 'Администратор' : 'Пользователь'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {lastOrder && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Последний заказ</h3>
                        <Card>
                          <CardHeader className="py-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">Заказ #{lastOrder.id}</CardTitle>
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
                                  <span className="font-medium text-sm">{currencyFormatter.format(item.price * item.count)}</span>
                                </li>
                              ))}
                              {lastOrder.items.length > 2 && (
                                <li className="text-sm text-muted-foreground">
                                  И еще {lastOrder.items.length - 2} товаров...
                                </li>
                              )}
                            </ul>
                          </CardContent>
                          <CardFooter className="py-3 flex justify-between">
                            <span className="text-sm font-medium">Итого:</span>
                            <span className="font-bold">{currencyFormatter.format(lastOrder.total)}</span>
                          </CardFooter>
                        </Card>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                            Все заказы
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {permissions[0].name === 'edit-database' && (
                    <div className="flex justify-center mt-6">
                      <Button className="w-full" variant="outline">
                        <Link href="/admin" className="flex items-center w-full justify-center">
                          <Shield className="h-4 w-4 mr-2" /> Войти в админ панель
                        </Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="orders" className="mt-6">
                  <h3 className="text-xl font-medium mb-4">История заказов</h3>
                  {orders.length === 0 ? (
                    <div className="text-center py-6">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-lg font-medium">Заказов пока нет</p>
                      <p className="text-muted-foreground">Здесь будут отображаться ваши заказы</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                          <CardHeader className="py-3 bg-muted/50">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-base">Заказ #{order.id}</CardTitle>
                                <Badge variant="outline" className={statuses[order.status].className}>
                                  {statuses[order.status].icon}
                                  {statuses[order.status].label}
                                </Badge>
                              </div>
                              <CardDescription>
                                {format(new Date(order.created_at), 'PPp', { locale: ru })}
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
                                        {item.count} × {currencyFormatter.format(item.price)}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="font-medium">{currencyFormatter.format(item.price * item.count)}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter className="py-3 bg-muted/30 flex justify-between">
                            <div>
                              <span className="text-sm text-muted-foreground">Количество товаров: {order.items.reduce((sum, item) => sum + item.count, 0)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Итого:</span>
                              <span className="font-bold text-lg">{currencyFormatter.format(order.total)}</span>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="settings" className="space-y-8 mt-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Изменение данных профиля</h3>
                    <ChangeProfileForm />
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-medium mb-4">Изменение пароля</h3>
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