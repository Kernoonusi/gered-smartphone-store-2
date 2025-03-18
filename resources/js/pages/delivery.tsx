import Layout from '@/layouts/app-layout';

export default function Delivery() {
  return (
    <Layout>
      <main className="mx-auto flex w-full h-[60dvh] flex-col gap-12 md:w-10/12 mt-20">
        <div className="w-full rounded-xl bg-slate-100 dark:bg-slate-900 p-12">
          <h1 className="mb-8 text-center text-4xl">Доставка</h1>
          <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl">Способы доставки:</h2>
              <ul className="list-disc pl-6">
                <li>Доставка курьером</li>
                <li>Доставка по почте</li>
                <li>Самовывоз из нашего магазина</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-2xl">Способы оплаты:</h2>
              <ul className="list-disc pl-6">
                <li>Наличными при получении</li>
                <li>Банковской картой</li>
                <li>Наложенным платежом</li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-center">
              Обрабатываем заказы <strong>с понедельника по пятницу</strong> с 9 до 20
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
