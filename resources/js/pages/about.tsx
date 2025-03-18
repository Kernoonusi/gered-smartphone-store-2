import Layout from '@/layouts/app-layout';

export default function About() {
  return (
    <Layout>
      <main className="mx-auto flex w-full flex-col gap-12 md:w-10/12 mt-20">
        <header className="mt-6 flex h-[70dvh] w-full flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600">
          <div className="flex flex-col gap-6 p-12 text-white">
            <p className="text-6xl font-bold uppercase">Gered Store</p>
            <p className="text-2xl">Мы продаем смартфоны</p>
            <p className="text-lg">
              Добро пожаловать в Gered Store! Мы компания, которая продает последние и самые инновационные смартфоны различных брендов. Мы предлагаем
              широкий выбор устройств, включая Apple, Samsung и многие другие. Мы стараемся обеспечить вам наилучший опыт при выборе своего следующего
              смартфона.
            </p>
          </div>
        </header>
      </main>
    </Layout>
  );
}
