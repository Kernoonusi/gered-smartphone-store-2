export function Footer() {
  return (
    <footer className="w-full bg-black/30 backdrop-blur-md border-t border-white/5 mt-10">
      <div className="max-w-7xl mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Gered Store</h3>
            <p className="text-white/70">Магазин современных смартфонов и аксессуаров.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Контакты</h3>
            <p className="text-white/70">+7 (999) 999-99-99</p>
            <p className="text-white/70">+7 (999) 999-99-99</p>
            <p className="text-white/70 mt-2">info@geredstore.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-white/70 hover:text-white transition-colors">
                  О компании
                </a>
              </li>
              <li>
                <a href="/delivery" className="text-white/70 hover:text-white transition-colors">
                  Доставка
                </a>
              </li>
              <li>
                <a href="/warranty" className="text-white/70 hover:text-white transition-colors">
                  Гарантия
                </a>
              </li>
              <li>
                <a href="/contacts" className="text-white/70 hover:text-white transition-colors">
                  Контакты
                </a>
              </li>
              <li>
                <a href="/policy" className="text-white/70 hover:text-white transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50">
          © {new Date().getFullYear()} Gered Store. Все права защищены.
        </div>
      </div>
    </footer>
  )
}