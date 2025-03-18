import { usePage, router, Link } from '@inertiajs/react';
import { ChangeProfileForm } from '@/components/profile/change-profile-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Order, User } from '@/types';
import Layout from '@/layouts/app-layout';
import { currencyFormatter } from '@/utils/currencyFormatter';

interface PageProps {
  user: User;
  orders: Order[];
  // isAdmin: boolean;
  [key: string]: unknown;
}

export default function Profile() {
  // Получаем типизированные данные, переданные с сервера
  const { user, orders } = usePage<PageProps>().props;

  // Функция выхода: отправляем POST-запрос по маршруту logout
  const logOut = (): void => {
    router.post(route('logout'));
  };

  // Отображаем понятные статусы заказа
  const statuses: Record<string, string> = {
    processing: 'В обработке',
    delivery: 'Доставляется',
    arrived: 'Доставлен',
  };
  // console.table(orders);
  return (
    <Layout>
      <main className="w-full md:w-10/12 mt-6 flex flex-col gap-12 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Профиль</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-zinc-500">Ваше имя: {user.name}</p>
            <p className="text-zinc-500">Ваша почта: {user.email}</p>
            {/* {user.address && <p className="text-zinc-500">Ваш адрес: {user.address}</p>} */}
          <ChangeProfileForm />
          {/* {isAdmin && (
            <Button className="w-fit" variant="outline">
              <Link href="/admin">Войти в админ панель</Link>
            </Button>
          )} */}
        </CardContent>
        <CardFooter>
          <Button variant="destructive" onClick={logOut}>
            Выйти
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ваши заказы</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p>Заказы отсутствуют</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="w-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle>Заказ #{order.id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {order.items.length > 0 ? (
                        order.items.map((item) => (
                          <li key={item.id}>
                            <Link href={`/products/${item.id}`}>
                              <span className="font-semibold">{item.product.brand} {item.product.model}</span>
                            </Link>{' '}
                            — <span className="font-normal text-gray-500">{item.count}x</span>{' '}
                            <span className="font-semibold">{currencyFormatter.format(item.price)}</span>
                          </li>
                        ))
                      ) : (
                        <div/>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex gap-4 items-center">
                    <p>Статус: </p>
                    <span
                      className={`px-2 py-1 rounded ${
                        order.status === 'processing'
                          ? 'bg-yellow-200 text-yellow-800'
                          : order.status === 'arrived'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {statuses[order.status] || order.status}
                    </span>
                    <p>Итого: {currencyFormatter.format(order.total)}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
    </Layout>
  );
}
