import Layout from '@/layouts/app-layout';

export default function Contacts() {
  return (
    <Layout>
      <main className="mx-auto flex w-full h-[60dvh] flex-col gap-12 md:w-10/12 mt-20">
        <div className="w-full rounded-xl bg-gray-100 dark:bg-slate-900 p-12 shadow-lg">
          <h1 className="mb-8 text-center text-4xl font-bold">Свяжитесь с нами</h1>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-2xl font-bold">Адрес</p>
              <p>г. Москва, ул. Пушкина, д. 17</p>
            </div>
            <div>
              <p className="mb-4 text-2xl font-bold">Контактная информация</p>
              <p>
                <a href="tel:+1234567890">+7 (999) 999-99-99</a>
              </p>
              <p>
                <a href="mailto:info@example.com">info@example.com</a>
              </p>
              <p>Пн-Пт: 9:00 - 18:00</p>
              <p>Сб-Вс: выходной</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
