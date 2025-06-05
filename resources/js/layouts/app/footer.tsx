import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Footer() {
  const { t } = useLaravelReactI18n();
  return (
    <footer className="mt-10 w-full border-t border-white/5 bg-black/30 backdrop-blur-md">
      <div className="mx-auto max-w-7xl py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-3">
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-xl font-bold text-white">{t('footer.title')}</h3>
            <p className="text-sm text-white/70">{t('footer.slogan')}</p>
          </div>
          <div className="text-center">
            <h3 className="mb-4 text-lg font-semibold text-white">{t('footer.contacts')}</h3>
            <p className="text-sm text-white/70">+7 (999) 999-99-99</p>
            <p className="text-sm text-white/70">+7 (999) 999-99-99</p>
            <p className="mt-2 text-sm text-white/70">info@gered-store.ru</p>
          </div>
          <div className="text-center md:text-right">
            <h3 className="mb-4 text-lg font-semibold text-white">{t('footer.info')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/policy" className="text-white/70 transition-colors hover:text-white">
                  {t('footer.policy')}
                </a>
              </li>
              <li>
                <a href="/about" className="text-white/70 transition-colors hover:text-white">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="/delivery" className="text-white/70 transition-colors hover:text-white">
                  {t('footer.delivery')}
                </a>
              </li>
              <li>
                <a href="/warranty" className="text-white/70 transition-colors hover:text-white">
                  {t('footer.warranty')}
                </a>
              </li>
              <li>
                <a href="/contacts" className="text-white/70 transition-colors hover:text-white">
                  {t('footer.contacts')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          {new Date().getFullYear()} {t('footer.title')}. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
