import { useLaravelReactI18n } from 'laravel-react-i18n';

export function Footer() {
  const { t, currentLocale, setLocale } = useLaravelReactI18n();
  return (
    <footer className="mt-10 w-full border-t border-white/5 bg-black/30 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">{t('footer.title')}</h3>
            <p className="text-white/70">{t('footer.slogan')}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">{t('footer.contacts')}</h3>
            <p className="text-white/70">+7 (999) 999-99-99</p>
            <p className="text-white/70">+7 (999) 999-99-99</p>
            <p className="mt-2 text-white/70">info@geredstore.com</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">{t('footer.info')}</h3>
            <ul className="space-y-2">
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
              <li>
                <a href="/policy" className="text-white/70 transition-colors hover:text-white">
                  {t('footer.policy')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <div className="flex gap-2">
            <button
              className={`rounded border border-white/40 bg-transparent px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-white/10 ${currentLocale() === 'ru' ? 'hidden' : ''}`}
              onClick={() => { setLocale('ru'); localStorage.setItem('locale', 'ru'); }}
              disabled={currentLocale() === 'ru'}
              type="button"
            >
              {t('footer.ru')}
            </button>
            <button
              className={`rounded border border-white/40 bg-transparent px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-white/10 ${currentLocale() === 'en' ? 'hidden' : ''}`}
              onClick={() => { setLocale('en'); localStorage.setItem('locale', 'en'); }}
              disabled={currentLocale() === 'en'}
              type="button"
            >
              {t('footer.en')}
            </button>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-white/50">
          {new Date().getFullYear()} {t('footer.title')}. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
