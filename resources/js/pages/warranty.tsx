import Layout from '@/layouts/app-layout';

export default function Warranty() {
  return (
    <Layout>
      <main className="mx-auto mt-20 flex w-full h-[60dvh] flex-col gap-12 md:w-10/12">
        <div className="flex w-full flex-col items-center gap-12 bg-white dark:bg-slate-900 p-12 md:gap-20 md:p-24">
          <h1 className="text-center text-4xl font-bold">Информация о гарантии</h1>
          <p className="text-center text-2xl">Мы предлагаем гарантию на 2 года для всех товаров, которые мы продаем на нашем сайте</p>

          <div className="flex w-full flex-col justify-center gap-12 md:flex-row">
            <div className="w-full md:w-2/3">
              <p className="text-lg leading-relaxed">
                <span className="font-bold">Подробную информацию уточняйте у менеджера по телефону.</span>
                <br />
                <span className="font-bold">
                  Основанием для гарантии является гарантийный талон или другие документы, предоставляемые маркетплейсом Gered Store или
                  магазином-партнёром;
                </span>
                <br />
                <span className="font-bold">
                  Транспортировка товара весом менее 5 кг обратно продавцу для обмена/возврата, а также для диагностики и гарантийного обслуживания
                  производится покупателем самостоятельно.
                </span>
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <ul className="space-y-4">
                <li className="text-lg font-bold">2 года гарантии</li>
                <li className="text-lg">Бесплатная доставка</li>
                <li className="text-lg">Бесплатный возврат</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
