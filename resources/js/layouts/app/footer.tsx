import { Link } from '@inertiajs/react';
import { CreditCard, Gift, LucideIcon, Plane, Truck, UserCheck } from 'lucide-react';

type Adv = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const adv: Adv[] = [
  {
    title: 'Бесплатная доставка',
    description: 'Доставка по всему миру бесплатно',
    icon: Truck,
  },
  {
    title: 'Возврат и обмен',
    description: 'Возврат или обмен в течение 30 дней',
    icon: CreditCard,
  },
  {
    title: 'Скидки до 30%',
    description: 'Каждый день, специально для вас',
    icon: Gift,
  },
  {
    title: 'Подарочные карты',
    description: 'Подарочные карты',
    icon: UserCheck,
  },
  {
    title: 'Доставка по всей России',
    description: 'В любую точку России за 2-3 дня',
    icon: Plane,
  },
];

export function Footer() {
  return (
    <footer className="mx-auto mt-20 flex w-full flex-col items-center gap-12">
      <article className="grid grid-cols-2 gap-4 bg-fuchsia-900 px-12 py-6 md:w-10/12 xl:flex">
        {adv.map(({ title, description, icon: Icon }, index) => (
          <div key={index} className="flex flex-1 flex-col gap-4">
            <Icon size={48} color="white" />
            <h2 className="text-3xl text-white">{title}</h2>
            <p className="text-white">{description}</p>
          </div>
        ))}
      </article>
      <hr />
      <div className="w-full bg-slate-900 py-6 text-center text-slate-200 md:py-12">
        <p className="font-semibold uppercase">© 2025 Gered smartphone store</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-8">
          <li>
            <Link
              href="/"
              className="hover:text-white hover:underline"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Главная
            </Link>
          </li>
          <li>
            <Link href="/policy" className="hover:text-white hover:underline">
              Политика конфиденциальности
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-white hover:underline">
              О компании
            </Link>
          </li>
          <li>
            <Link href="/delivery" className="hover:text-white hover:underline">
              Доставка
            </Link>
          </li>
          <li>
            <Link href="/warranty" className="hover:text-white hover:underline">
              Гарантия
            </Link>
          </li>
          <li>
            <Link href="/contacts" className="hover:text-white hover:underline">
              Контакты
            </Link>
          </li>
          <li>
            <div className="flex gap-4">
              <p className="h-full self-end p-2 text-sm font-semibold transition">+7 (999) 999-99-99</p>
              <p className="h-full self-end p-2 text-sm font-semibold transition">+7 (999) 999-99-99</p>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
}
