<?php

namespace Database\Seeders;

use App\Models\PageContent;
use Illuminate\Database\Seeder;

class PageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Общий стиль для обертки контента страницы, если он не задан в Blade
        // Предполагается, что основной заголовок страницы (PageContent->title) выводится где-то в Blade
        // <div class="container mx-auto px-4 py-8">
        //     <h1 class="text-4xl font-bold text-center mb-12 text-gray-800">{!! $pageContent->title !!}</h1>
        //     <div class="bg-white shadow-xl rounded-lg p-6 md:p-10">
        //         {!! $pageContent->content !!}
        //     </div>
        // </div>
        // Поэтому HTML в 'content' начинается сразу с содержимого этого блока.

        // Страница политики конфиденциальности
        PageContent::firstOrCreate(['key' => 'policy'],
            [
                'title' => 'Политика конфиденциальности',
                'content' => <<<'HTML'
<div class="relative overflow-hidden min-h-screen">
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-fuchsia-400/10 to-transparent rounded-full blur-3xl"></div>

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div class="text-center mb-12">
            <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h1 class="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 sm:text-4xl">Политика конфиденциальности</h1>
            </div>
        </div>

        <div class="prose prose-invert prose-lg max-w-none bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10">
            <h2>1. Общие положения</h2>
            <p>1.1. Настоящая Политика конфиденциальности (далее – «Политика») принята Администратором и действует в отношении всей информации, которую Администратор может получить о Пользователе сайта [укажите доменное имя] (далее – «Сайт» или «Сервис») с любого устройства и при коммуникации с Администратором в любой форме.</p>
            <p>1.2. Используя Сайт (просмотр, чтение текста, отправка или загрузка информации) и предоставляя свои персональные данные, Пользователь Сайта дает согласие на обработку персональных данных в соответствии с данной Политикой, если дополнительные требования к согласию не установлены настоящей Политикой.</p>
            <p>1.3. Для целей настоящей Политики под «Администратором» понимается физическое лицо – [Укажите полное ФИО].</p>

            <h2>2. Персональные данные</h2>
            <p>2.1. Персональные данные – любая информация, относящаяся прямо или косвенно к определенному или определяемому физическому лицу (субъекту персональных данных) - Пользователю.</p>
            <p>2.2. Обработка персональных данных – любое действие (операция) или совокупность действий (операций) с персональными данными, совершаемое с использованием средств автоматизации или без их использования, в том числе сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение.</p>
            <p>2.3. Администратор производит обработку следующих персональных данных: фамилии, имени и отчества (при наличии) пользователя Сервиса.</p>
            <p>2.4. Cookies – небольшие по размеру текстовые файлы, хранящиеся в браузере посетителей Сервиса. При просмотре Сервиса происходит автоматический сбор (из Cookies) следующих обезличенных статистических данных о посетителе Сервиса, в том числе:</p>
            <ul>
                <li>тип выполненного на Сервисе действия (клик, наведение курсора и т.п.);</li>
                <li>дата и время выполнения действия;</li>
                <li>URL страницы;</li>
                <li>Referer;</li>
                <li>IP (без возможности работы с IP-адресами в статистике);</li>
                <li>User-Agent;</li>
                <li>ClientID (идентификатор браузера по файлу Cookie);</li>
                <li>экранное разрешение;</li>
                <li>класс HTML-элемента, на который происходит клик;</li>
                <li>данные о просматриваемых товарах.</li>
            </ul>
            <p>2.5. Администратором обрабатываются статистические и иные данные о посетителе Сервиса, в том числе с использованием систем [укажите систему].</p>
            <p>2.6. Посетитель Сервиса может самостоятельно управлять файлами Cookies, путем изменения настроек браузера.</p>
            <p>2.7. Изменения пользовательских настроек, в результате которых файлы Cookies будут заблокированы или удалены, могут привести к недоступности отдельных компонентов Сервиса.</p>
            <p>2.8. Для получения доступа к материалам Сервиса Пользователю необходимо зарегистрироваться путем заполнения регистрационной формы, содержащей следующие идентифицирующие Пользователя персональные данные: [укажите данные для регистрации].</p>
            <p>2.9. Пройдя процедуру регистрации Пользователь считается принявшим условия Политики в полном объеме, без каких-либо исключений, оговорок, возражений.</p>
            <p>2.10. При регистрации в Сервисе Пользователь обязан предоставить Администратору необходимую, достоверную и актуальную информацию для формирования профиля, включая уникальные для каждого Пользователя логин (адрес электронной почты) и пароль доступа к Сервису.</p>
            <p>2.11. Пользователь считается прошедшим регистрацию после предоставления необходимой, достоверной и актуальной информацию для формирования профиля.</p>
            <p>2.12. По завершении процесса регистрации Пользователь становится обладателем учетных данных Пользователя. Пользователь несет ответственность за безопасность учетных данных, а также за все, что будет сделано на Сервисе под учетными данными Пользователя. Пользователь обязан немедленно уведомить Администратора о любом случае несанкционированного доступа к Сервису без согласия и ведома Пользователя и (или) о любом нарушении безопасности учетной информации Пользователя.</p>

            <h2>3. Цели обработки персональных данных</h2>
            <p>3.1. Администратор обрабатывает персональные данные Пользователя для целей информационно-справочного обслуживания, в том числе предоставления информации о товарах Администратора, а также идентификации Пользователя Сервиса.</p>

            <h2>4. Порядок и условия обработки персональных данных</h2>
            <p>4.1. Обработка персональных данных Пользователя осуществляется без ограничения срока, любым законным способом, в том числе в информационных системах персональных данных с использованием средств автоматизации или без использования таких средств.</p>
            <p>4.2. Обработка персональных данных Пользователя осуществляется на срок действия договорных и иных правоотношений Пользователя и Администратора, любым законным способом, в том числе в информационных системах персональных данных с использованием средств автоматизации или без использования таких средств.</p>
            <p>4.3. Все персональные данные Администратор получает непосредственно от Пользователя или от его представителя, либо от лица, поручившего Администратору обработку персональных данных Пользователя, за исключением случаев, предусмотренных законодательством Российской Федерации.</p>
            <p>4.4. Администратор вправе передавать персональные данные органам дознания и следствия, иным уполномоченным органам по основаниям, предусмотренным действующим законодательством Российской Федерации.</p>
            <p>4.5. Правовым основанием обработки персональных данных Администратором являются: Конституция РФ, Гражданский кодекс РФ, Трудовой кодекс РФ, согласие Пользователя на обработку его персональных данных, договоры, заключаемые между Администратором и Пользователем.</p>
            <p>4.6. Для обеспечения защиты персональных данных Пользователя при их обработке Администратором приняты следующие меры от несанкционированного доступа, а также иных неправомерных действий в отношении персональных данных Пользователя:</p>
            <ul>
                <li>4.6.1. Правовые меры, включающие в себя, в том числе создание документов, направленных на защиту персональных данных: положение о защите персональных данных, издание приказа о назначении лиц, ответственных за защиту персональных данных, заключение соглашений о конфиденциальности с лицами, имеющими доступ к персональным данным.</li>
                <li>4.6.2. Организационные меры, в том числе назначение лиц, ответственных за защиту персональных данных, хранение персональных данных, содержащихся на материальных носителях, в сейфе.</li>
                <li>4.6.3. Технические меры: использование средств защиты информации, прошедших процедуру оценки соответствия требованиям законодательства РФ, взаимодействовать с госсистемой обнаружения, предупреждения и ликвидации последствий кибератак.</li>
            </ul>

            <h2>5. Права пользователя</h2>
            <p>5.1. Пользователь вправе реализовать свои права, предусмотренные законодательством Российской Федерации о персональных данных, в том числе, но не ограничиваясь:</p>
            <ul>
                <li>уточнять, обновлять свои персональные данные, требовать их блокирования или уничтожения;</li>
                <li>запрашивать у Администратора перечень обрабатываемых персональных данных, правовых оснований обработки, источники их получения, информацию о сроках обработки и хранения, а также иные сведения, связанные с обработкой своих персональных данных.</li>
            </ul>

            <h2>6. Права и обязанности Администратора</h2>
            <p>6.1. Администратор обязуется использовать полученную персональную информацию Пользователя только в целях, названных в настоящей Политике.</p>
            <p>6.2. Администратор обязан принимать меры предосторожности для защиты конфиденциальности персональных данных Пользователя согласно порядку, обычно используемого для защиты такого рода информации в деловом обороте.</p>
            <p>6.3. Администратор обязан хранить персональную информацию Пользователя в течение периода времени, необходимого для целей, указанных в настоящей Политике конфиденциальности, если только более длительный срок хранения не является необходимым в соответствии с действующим законодательством.</p>
            <p>6.4. Администратор вправе не удалять данные Пользователя, необходимые для хранения в соответствии с действующим законодательством Российской Федерации.</p>

            <h2>7. Заключительные положения</h2>
            <p>7.1. Согласие действует в течение неограниченного времени. Пользователь вправе отозвать настоящее согласие на обработку своих персональных данных, письменно уведомив об этом Администратора по электронной почте.</p>
        </div>
    </div>
</div>
HTML,
            ]);
        PageContent::firstOrCreate(['key' => 'about'], [
            'title' => 'О НАС',
            'content' => <<<'HTML'
<div class="relative overflow-hidden min-h-screen">
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-sky-400/10 to-transparent rounded-full blur-3xl"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div class="text-center mb-16">
            <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 class="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 sm:text-4xl">О нас</h1>
            </div>
            <p class="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
                Узнайте больше о нашей миссии, команде и ценностях, которые движут нами каждый день.
            </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div class="prose prose-invert prose-lg max-w-none bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10">
                <h2>Наша история</h2>
                <p>Мы начали свой путь в 1861 простой идеи: сделать лучшие смартфоны доступными для каждого. С тех пор мы выросли в команду увлеченных профессионалов, стремящихся предоставить вам не только качественные продукты, но и первоклассный сервис.</p>
                <h2>Наша миссия</h2>
                <p>Наша миссия — предоставлять инновационные и надежные мобильные технологии, которые улучшают жизнь людей, обеспечивая при этом исключительный клиентский опыт.</p>
                <h2>Наши ценности</h2>
                <ul>
                    <li><strong>Клиентоориентированность:</strong> Вы — наш главный приоритет.</li>
                    <li><strong>Инновации:</strong> Мы всегда в поиске лучших решений.</li>
                    <li><strong>Качество:</strong> Мы предлагаем только проверенные и надежные продукты.</li>
                    <li><strong>Прозрачность:</strong> Мы честны с нашими клиентами и партнерами.</li>
                </ul>
            </div>
            <div>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Наша команда" class="rounded-3xl shadow-2xl object-cover w-full h-full aspect-[4/3]"/>
            </div>
        </div>
    </div>
</div>
HTML,
        ], );

        // Страница контактов
        PageContent::firstOrCreate(
            ['key' => 'contacts'],
            [
                'title' => 'КОНТАКТЫ',
                'content' => '
<div class="min-h-screen bg-slate-900 text-white">
    <div class="relative isolate overflow-hidden">
        <!-- Background gradient -->
        <svg class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
            <defs>
                <pattern id="contacts-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                    <path d="M.5 200V.5H200" fill="none" />
                </pattern>
            </defs>
            <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
                <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#contacts-pattern)" />
        </svg>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0ea5e9] to-[#a855f7] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32">
            <!-- Header -->
            <div class="text-center mb-16">
                <h1 class="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500 mb-4">
                    Контакты
                </h1>
                <p class="text-xl text-slate-300 max-w-2xl mx-auto">
                    Мы всегда готовы помочь! Свяжитесь с нами удобным способом
                </p>
            </div>

            <!-- Main Contact Info -->
            <div class="grid lg:grid-cols-2 gap-8 mb-16">
                <!-- Office Info -->
                <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10 hover:ring-sky-400/50 transition-all">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center mr-4 ring-1 ring-sky-500/30">
                            <i class="fas fa-building text-sky-400 text-xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-sky-300">Наш офис</h2>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <i class="fas fa-map-marker-alt text-red-400 text-xl mr-4 mt-1"></i>
                            <div>
                                <h3 class="font-bold text-slate-100 mb-1">Главный офис</h3>
                                <p class="text-slate-300">г. Челябинск, ул. Кирова, д. 25, офис 402</p>
                                <p class="text-sm text-slate-400">4 этаж, лифт работает</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <i class="fas fa-store text-green-400 text-xl mr-4 mt-1"></i>
                            <div>
                                <h3 class="font-bold text-slate-100 mb-1">Розничный магазин</h3>
                                <p class="text-slate-300">г. Челябинск, пр. Ленина, д. 58</p>
                                <p class="text-sm text-slate-400">1 этаж, вход с улицы</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <i class="fas fa-tools text-purple-400 text-xl mr-4 mt-1"></i>
                            <div>
                                <h3 class="font-bold text-slate-100 mb-1">Сервисный центр</h3>
                                <p class="text-slate-300">г. Челябинск, ул. Братьев Кашириных, д. 12</p>
                                <p class="text-sm text-slate-400">Ремонт и диагностика</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Methods -->
                <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10 hover:ring-green-400/50 transition-all">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4 ring-1 ring-green-500/30">
                            <i class="fas fa-phone text-green-400 text-xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-green-300">Связь с нами</h2>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="p-4 bg-slate-700/50 rounded-xl ring-1 ring-green-500/20">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-phone text-green-400 mr-3"></i>
                                <h3 class="font-bold text-slate-100">Горячая линия</h3>
                            </div>
                            <p class="text-slate-200 font-semibold">+7 (999) 999-99-99</p>
                            <p class="text-sm text-slate-400">Круглосуточно, без выходных</p>
                        </div>
                        
                        <div class="p-4 bg-slate-700/50 rounded-xl ring-1 ring-sky-500/20">
                            <div class="flex items-center mb-2">
                                <i class="fab fa-whatsapp text-green-400 mr-3"></i>
                                <h3 class="font-bold text-slate-100">WhatsApp</h3>
                            </div>
                            <p class="text-slate-200 font-semibold">+7 (999) 999-99-99</p>
                            <p class="text-sm text-slate-400">Быстрые ответы в мессенджере</p>
                        </div>
                        
                        <div class="p-4 bg-slate-700/50 rounded-xl ring-1 ring-purple-500/20">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-clock text-purple-400 mr-3"></i>
                                <h3 class="font-bold text-slate-100">Режим работы</h3>
                            </div>
                            <p class="text-slate-200">Пн-Пт: 9:00 - 20:00</p>
                            <p class="text-slate-200">Сб-Вс: 10:00 - 19:00</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Email Contacts Grid -->
            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center text-slate-100 mb-8">Электронная почта</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-sky-400/50 transition-all">
                        <div class="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-sky-500/30">
                            <i class="fas fa-envelope text-sky-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-sky-300 mb-2">Общие вопросы</h3>
                        <p class="text-sky-400 font-medium mb-2">info@gered-store.ru</p>
                        <p class="text-slate-400 text-sm">Информация о товарах, заказах</p>
                    </div>
                    
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-red-400/50 transition-all">
                        <div class="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-red-500/30">
                            <i class="fas fa-exclamation-triangle text-red-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-red-300 mb-2">Претензии</h3>
                        <p class="text-red-400 font-medium mb-2">claims@gered-store.ru</p>
                        <p class="text-slate-400 text-sm">Жалобы, возвраты, споры</p>
                    </div>
                    
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-green-400/50 transition-all">
                        <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-green-500/30">
                            <i class="fas fa-tools text-green-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-green-300 mb-2">Техподдержка</h3>
                        <p class="text-green-400 font-medium mb-2">support@gered-store.ru</p>
                        <p class="text-slate-400 text-sm">Помощь с сайтом, заказами</p>
                    </div>
                    
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-purple-400/50 transition-all">
                        <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-purple-500/30">
                            <i class="fas fa-wrench text-purple-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-purple-300 mb-2">Сервис</h3>
                        <p class="text-purple-400 font-medium mb-2">service@gered-store.ru</p>
                        <p class="text-slate-400 text-sm">Ремонт, гарантия, диагностика</p>
                    </div>
                </div>
            </div>

            <!-- Additional Services -->
            <div class="grid md:grid-cols-3 gap-6 mb-16">
                <div class="bg-gradient-to-br from-sky-600/80 to-cyan-700/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-white ring-1 ring-white/10 hover:shadow-sky-500/40 transition-all">
                    <i class="fas fa-shipping-fast text-3xl mb-4 text-sky-300"></i>
                    <h3 class="text-xl font-bold mb-2 text-sky-200">Доставка</h3>
                    <p class="mb-4 text-slate-300">По Челябинску - в день заказа</p>
                    <p class="text-sky-300 font-medium">delivery@gered-store.ru</p>
                </div>
                
                <div class="bg-gradient-to-br from-green-600/80 to-emerald-700/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-white ring-1 ring-white/10 hover:shadow-green-500/40 transition-all">
                    <i class="fas fa-handshake text-3xl mb-4 text-green-300"></i>
                    <h3 class="text-xl font-bold mb-2 text-green-200">Партнерство</h3>
                    <p class="mb-4 text-slate-300">Сотрудничество с бизнесом</p>
                    <p class="text-green-300 font-medium">partners@gered-store.ru</p>
                </div>
                
                <div class="bg-gradient-to-br from-purple-600/80 to-indigo-700/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-white ring-1 ring-white/10 hover:shadow-purple-500/40 transition-all">
                    <i class="fas fa-briefcase text-3xl mb-4 text-purple-300"></i>
                    <h3 class="text-xl font-bold mb-2 text-purple-200">Карьера</h3>
                    <p class="mb-4 text-slate-300">Вакансии и трудоустройство</p>
                    <p class="text-purple-300 font-medium">hr@gered-store.ru</p>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10 text-center">
                <h2 class="text-3xl font-bold text-slate-100 mb-4">Остались вопросы?</h2>
                <p class="text-slate-300 mb-6 max-w-2xl mx-auto">
                    Наша команда всегда готова помочь! Выберите удобный способ связи, 
                    и мы ответим в кратчайшие сроки.
                </p>
                <div class="flex flex-wrap justify-center gap-4">
                    <a href="tel:+79999999999" class="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:from-sky-600 hover:to-sky-700 transition-all ring-1 ring-sky-700/50">
                        <i class="fas fa-phone mr-2"></i>Позвонить
                    </a>
                    <a href="mailto:info@gered-store.ru" class="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:from-pink-600 hover:to-pink-700 transition-all ring-1 ring-pink-700/50">
                        <i class="fas fa-envelope mr-2"></i>Написать
                    </a>
                    <a href="https://wa.me/79999999999" class="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all ring-1 ring-green-700/50">
                        <i class="fab fa-whatsapp mr-2"></i>WhatsApp
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>',
            ]
        );

        // Страница доставки и оплаты
        PageContent::firstOrCreate(
            ['key' => 'delivery'],
            [
                'title' => 'ДОСТАВКА И ОПЛАТА',
                'content' => '
<div class="min-h-screen bg-slate-900 text-white">
    <div class="relative isolate overflow-hidden">
        <!-- Background gradient -->
        <svg class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
            <defs>
                <pattern id="delivery-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                    <path d="M.5 200V.5H200" fill="none" />
                </pattern>
            </defs>
            <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
                <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#delivery-pattern)" />
        </svg>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#10b981] to-[#3b82f6] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32">
            <!-- Header -->
            <div class="text-center mb-16">
                <h1 class="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 mb-4">
                    Доставка и оплата
                </h1>
                <p class="text-xl text-slate-300 max-w-2xl mx-auto">
                    Быстро, удобно и безопасно - выберите подходящий способ
                </p>
            </div>

            <!-- Delivery Methods -->
            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center text-slate-100 mb-12">Способы доставки</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10 hover:ring-emerald-400/50 transition-all">
                        <div class="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-emerald-500/30">
                            <i class="fas fa-motorcycle text-emerald-400 text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-emerald-300 mb-4">Курьерская доставка</h3>
                        <div class="space-y-3 mb-6">
                            <div class="flex justify-between items-center">
                                <span class="text-slate-300">По Челябинску</span>
                                <span class="font-bold text-emerald-400">250 ₽</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-slate-300">Область</span>
                                <span class="font-bold text-emerald-400">400 ₽</span>
                            </div>
                            <div class="bg-emerald-700/30 p-3 rounded-lg ring-1 ring-emerald-600/40">
                                <p class="text-sm text-emerald-300 font-medium">Бесплатно от 8 000 ₽</p>
                            </div>
                        </div>
                        <ul class="text-sm text-slate-400 space-y-2">
                            <li class="flex items-center"><i class="fas fa-check text-emerald-500 mr-2"></i>Доставка в день заказа</li>
                            <li class="flex items-center"><i class="fas fa-check text-emerald-500 mr-2"></i>Время доставки: 2-4 часа</li>
                            <li class="flex items-center"><i class="fas fa-check text-emerald-500 mr-2"></i>Проверка при получении</li>
                        </ul>
                    </div>
                    
                    <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10 hover:ring-sky-400/50 transition-all">
                        <div class="w-16 h-16 bg-sky-500/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-sky-500/30">
                            <i class="fas fa-store text-sky-400 text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-sky-300 mb-4">Самовывоз</h3>
                        <div class="space-y-3 mb-6">
                            <div class="flex justify-between items-center">
                                <span class="text-slate-300">Стоимость</span>
                                <span class="font-bold text-sky-400">Бесплатно</span>
                            </div>
                            <div class="bg-sky-700/30 p-3 rounded-lg ring-1 ring-sky-600/40">
                                <p class="text-sm text-sky-300 font-medium">Готов через 30 минут</p>
                            </div>
                        </div>
                        <ul class="text-sm text-slate-400 space-y-2">
                            <li class="flex items-center"><i class="fas fa-check text-sky-500 mr-2"></i>пр. Ленина, д. 58</li>
                            <li class="flex items-center"><i class="fas fa-check text-sky-500 mr-2"></i>Пн-Пт: 9:00-20:00</li>
                            <li class="flex items-center"><i class="fas fa-check text-sky-500 mr-2"></i>Сб-Вс: 10:00-19:00</li>
                        </ul>
                    </div>
                    
                    <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10 hover:ring-purple-400/50 transition-all">
                        <div class="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-purple-500/30">
                            <i class="fas fa-shipping-fast text-purple-400 text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-purple-300 mb-4">По России</h3>
                        <div class="space-y-3 mb-6">
                            <div class="flex justify-between items-center">
                                <span class="text-slate-300">СДЭК</span>
                                <span class="font-bold text-purple-400">от 300 ₽</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-slate-300">Почта России</span>
                                <span class="font-bold text-purple-400">от 250 ₽</span>
                            </div>
                            <div class="bg-purple-700/30 p-3 rounded-lg ring-1 ring-purple-600/40">
                                <p class="text-sm text-purple-300 font-medium">Расчет при оформлении</p>
                            </div>
                        </div>
                        <ul class="text-sm text-slate-400 space-y-2">
                            <li class="flex items-center"><i class="fas fa-check text-purple-500 mr-2"></i>Доставка 2-7 дней</li>
                            <li class="flex items-center"><i class="fas fa-check text-purple-500 mr-2"></i>Отслеживание посылки</li>
                            <li class="flex items-center"><i class="fas fa-check text-purple-500 mr-2"></i>Страхование груза</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Payment Methods -->
            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center text-slate-100 mb-12">Способы оплаты</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-emerald-400/50 transition-all">
                        <div class="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-emerald-500/30">
                            <i class="fas fa-credit-card text-emerald-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-emerald-300 mb-2">Банковские карты</h3>
                        <p class="text-slate-400 text-sm mb-3">Visa, MasterCard, МИР</p>
                        <div class="text-xs text-slate-500">
                            <p>• Мгновенное зачисление</p>
                            <p>• Безопасные платежи</p>
                            <p>• 3D Secure</p>
                        </div>
                    </div>
                    
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-sky-400/50 transition-all">
                        <div class="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-sky-500/30">
                            <i class="fas fa-mobile-alt text-sky-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-sky-300 mb-2">Электронные кошельки</h3>
                        <p class="text-slate-400 text-sm mb-3">ЮMoney, QIWI, WebMoney</p>
                        <div class="text-xs text-slate-500">
                            <p>• Быстрые переводы</p>
                            <p>• Без комиссии</p>
                            <p>• Удобно с телефона</p>
                        </div>
                    </div>
                    
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-orange-400/50 transition-all">
                        <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-orange-500/30">
                            <i class="fas fa-money-bill-wave text-orange-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-orange-300 mb-2">Наличными</h3>
                        <p class="text-slate-400 text-sm mb-3">При получении</p>
                        <div class="text-xs text-slate-500">
                            <p>• Курьеру или в магазине</p>
                            <p>• Проверка перед оплатой</p>
                            <p>• Сдача с любой суммы</p>
                        </div>
                    </div>
                    
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-purple-400/50 transition-all">
                        <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-purple-500/30">
                            <i class="fas fa-university text-purple-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-purple-300 mb-2">Для юр. лиц</h3>
                        <p class="text-slate-400 text-sm mb-3">Безналичный расчет</p>
                        <div class="text-xs text-slate-500">
                            <p>• Выставление счетов</p>
                            <p>• Работа с НДС</p>
                            <p>• Отсрочка платежа</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Info -->
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10">
                    <h3 class="text-2xl font-bold text-sky-300 mb-6 flex items-center">
                        <i class="fas fa-clock text-sky-400 mr-3"></i>Время обработки
                    </h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-3 bg-sky-700/30 rounded-lg ring-1 ring-sky-600/40">
                            <span class="text-slate-200">Заказы до 16:00</span>
                            <span class="font-bold text-sky-300">Отправка в тот же день</span>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg ring-1 ring-slate-600/40">
                            <span class="text-slate-300">Заказы после 16:00</span>
                            <span class="font-bold text-slate-400">Отправка на следующий день</span>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-emerald-700/30 rounded-lg ring-1 ring-emerald-600/40">
                            <span class="text-slate-200">Срочная доставка</span>
                            <span class="font-bold text-emerald-300">В течение 2 часов</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10">
                    <h3 class="text-2xl font-bold text-emerald-300 mb-6 flex items-center">
                        <i class="fas fa-shield-alt text-emerald-400 mr-3"></i>Гарантии
                    </h3>
                    <div class="space-y-3 text-slate-300">
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-emerald-400 mr-3"></i>
                            <span>Проверка товара при получении</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-emerald-400 mr-3"></i>
                            <span>Возврат в течение 14 дней</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-emerald-400 mr-3"></i>
                            <span>Официальная гарантия производителя</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-emerald-400 mr-3"></i>
                            <span>Обмен при обнаружении брака</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-emerald-400 mr-3"></i>
                            <span>Страхование дорогих заказов</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>',
            ]
        );

        // Страница гарантии и возврата
        PageContent::firstOrCreate(
            ['key' => 'warranty'],
            [
                'title' => 'ГАРАНТИЯ И ВОЗВРАТ',
                'content' => '
<div class="min-h-screen bg-slate-900 text-white">
    <div class="relative isolate overflow-hidden">
        <!-- Background gradient -->
        <svg class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
            <defs>
                <pattern id="warranty-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                    <path d="M.5 200V.5H200" fill="none" />
                </pattern>
            </defs>
            <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
                <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#warranty-pattern)" />
        </svg>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#8b5cf6] to-[#3b82f6] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32">
            <!-- Header -->
            <div class="text-center mb-16">
                <h1 class="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-500 mb-4">
                    Гарантия и возврат
                </h1>
                <p class="text-xl text-slate-300 max-w-2xl mx-auto">
                    Ваши права защищены - мы гарантируем качество и честность
                </p>
            </div>

            <!-- Warranty Terms -->
            <div class="mb-16">
                <h2 class="text-3xl font-bold text-center text-slate-100 mb-12">Гарантийные обязательства</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-sky-400/50 transition-all">
                        <div class="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-sky-500/30">
                            <i class="fas fa-mobile-alt text-sky-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-sky-300 mb-2">Смартфоны</h3>
                        <p class="text-2xl font-bold text-sky-400 mb-2">12 месяцев</p>
                        <p class="text-slate-400 text-sm">Полная гарантия производителя</p>
                    </div>
                    
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-emerald-400/50 transition-all">
                        <div class="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-emerald-500/30">
                            <i class="fas fa-headphones text-emerald-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-emerald-300 mb-2">Наушники</h3>
                        <p class="text-2xl font-bold text-emerald-400 mb-2">12 месяцев</p>
                        <p class="text-slate-400 text-sm">Гарантия на все виды наушников</p>
                    </div>
                    
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-purple-400/50 transition-all">
                        <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-purple-500/30">
                            <i class="fas fa-plug text-purple-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-purple-300 mb-2">Зарядки</h3>
                        <p class="text-2xl font-bold text-purple-400 mb-2">6 месяцев</p>
                        <p class="text-slate-400 text-sm">Зарядные устройства и кабели</p>
                    </div>
                    
                    <div class="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-orange-400/50 transition-all">
                        <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-orange-500/30">
                            <i class="fas fa-mobile text-orange-400 text-xl"></i>
                        </div>
                        <h3 class="font-bold text-orange-300 mb-2">Аксессуары</h3>
                        <p class="text-2xl font-bold text-orange-400 mb-2">6 месяцев</p>
                        <p class="text-slate-400 text-sm">Чехлы, стекла, держатели</p>
                    </div>
                </div>
            </div>

            <!-- Warranty Service -->
            <div class="grid lg:grid-cols-2 gap-8 mb-16">
                <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mr-4 ring-1 ring-emerald-500/30">
                            <i class="fas fa-tools text-emerald-400 text-xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-emerald-300">Гарантийный сервис</h2>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="flex items-start p-4 bg-emerald-700/30 rounded-lg ring-1 ring-emerald-600/40">
                            <i class="fas fa-check-circle text-emerald-400 mr-3 mt-1 flex-shrink-0"></i>
                            <div>
                                <p class="font-medium text-emerald-200">Бесплатная диагностика</p>
                                <p class="text-sm text-slate-300">Определим причину неисправности</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start p-4 bg-sky-700/30 rounded-lg ring-1 ring-sky-600/40">
                            <i class="fas fa-wrench text-sky-400 mr-3 mt-1 flex-shrink-0"></i>
                            <div>
                                <p class="font-medium text-sky-200">Ремонт или замена</p>
                                <p class="text-sm text-slate-300">Восстановим или заменим товар</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start p-4 bg-purple-700/30 rounded-lg ring-1 ring-purple-600/40">
                            <i class="fas fa-clock text-purple-400 mr-3 mt-1 flex-shrink-0"></i>
                            <div>
                                <p class="font-medium text-purple-200">Срок ремонта до 45 дней</p>
                                <p class="text-sm text-slate-300">Согласно закону о защите прав потребителей</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start p-4 bg-orange-700/30 rounded-lg ring-1 ring-orange-600/40">
                            <i class="fas fa-plus text-orange-400 mr-3 mt-1 flex-shrink-0"></i>
                            <div>
                                <p class="font-medium text-orange-200">Продление гарантии</p>
                                <p class="text-sm text-slate-300">После ремонта гарантия продлевается</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4 ring-1 ring-red-500/30">
                            <i class="fas fa-exclamation-triangle text-red-400 text-xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-red-300">Исключения из гарантии</h2>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="flex items-start p-4 bg-red-700/30 rounded-lg ring-1 ring-red-600/40">
                            <i class="fas fa-times-circle text-red-400 mr-3 mt-1 flex-shrink-0"></i>
                            <div>
                                <p class="font-medium text-red-200">Механические повреждения</p>
                                <p class="text-sm text-slate-300">Удары, падения, трещины</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start p-4 bg-red-700/30 rounded-lg ring-1 ring-red-600/40">
                            <i class="fas fa-tint text-red-400 mr-3 mt-1 flex-shrink-0"></i>
                            <div>
                                <p class="font-medium text-red-200">Попадание влаги</p>
                                <p class="text-sm text-slate-300">Вода, другие жидкости</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start p-4 bg-red-700/30 rounded-lg ring-1 ring-red-600/40">
                            <i class="fas fa-user-cog text-red-400 mr-3 mt-1 flex-shrink-0"></i>
                            <div>
                                <p class="font-medium text-red-200">Самостоятельный ремонт</p>
                                <p class="text-sm text-slate-300">Вскрытие корпуса, замена деталей</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start p-4 bg-red-700/30 rounded-lg ring-1 ring-red-600/40">
                            <i class="fas fa-ban text-red-400 mr-3 mt-1 flex-shrink-0"></i>
                            <div>
                                <p class="font-medium text-red-200">Нарушение эксплуатации</p>
                                <p class="text-sm text-slate-300">Неправильное использование</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Return Policy -->
        <div class="mb-16">
            <h2 class="text-3xl font-bold text-center text-slate-100 mb-12">Условия возврата</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10 hover:ring-emerald-400/50 transition-all">
                    <div class="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-emerald-500/30">
                        <i class="fas fa-calendar-alt text-emerald-400 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-emerald-300 mb-4">Сроки возврата</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-slate-300">Смартфоны</span>
                            <span class="font-bold text-emerald-400">15 дней</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-slate-300">Аксессуары</span>
                            <span class="font-bold text-emerald-400">14 дней</span>
                        </div>
                        <div class="bg-emerald-700/30 p-3 rounded-lg ring-1 ring-emerald-600/40">
                            <p class="text-sm text-emerald-200 font-medium">При браке - в любое время</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10 hover:ring-sky-400/50 transition-all">
                    <div class="w-16 h-16 bg-sky-500/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-sky-500/30">
                        <i class="fas fa-check-double text-sky-400 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-sky-300 mb-4">Условия</h3>
                    <ul class="space-y-3 text-slate-300">
                        <li class="flex items-center">
                            <i class="fas fa-check text-sky-400 mr-2"></i>
                            Товарный вид сохранен
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-sky-400 mr-2"></i>
                            Наличие упаковки
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-sky-400 mr-2"></i>
                            Все документы
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-sky-400 mr-2"></i>
                            Полная комплектация
                        </li>
                    </ul>
                </div>
                
                <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10 hover:ring-purple-400/50 transition-all">
                    <div class="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-purple-500/30">
                        <i class="fas fa-money-bill-wave text-purple-400 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-purple-300 mb-4">Возврат средств</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-slate-300">Срок возврата</span>
                            <span class="font-bold text-purple-400">10 дней</span>
                        </div>
                        <div class="bg-purple-700/30 p-3 rounded-lg ring-1 ring-purple-600/40">
                            <p class="text-sm text-purple-200 font-medium">Полная стоимость + доставка</p>
                        </div>
                        <p class="text-slate-300 text-sm">На карту или наличными</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Return Process -->
        <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 ring-1 ring-white/10">
            <h2 class="text-3xl font-bold text-center text-slate-100 mb-8">Как оформить возврат</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-sky-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-1 ring-white/20">
                        <span class="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 class="text-xl font-bold text-sky-300 mb-3">Свяжитесь с нами</h3>
                    <p class="text-slate-300">Позвоните по телефону +7 (999) 999-99-99 или напишите на claims@gered-store.ru</p>
                </div>
                
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-1 ring-white/20">
                        <span class="text-white font-bold text-xl">2</span>
                    </div>
                    <h3 class="text-xl font-bold text-emerald-300 mb-3">Привезите товар</h3>
                    <p class="text-slate-300">Доставьте товар в наш магазин на пр. Ленина, 58 или вызовите курьера</p>
                </div>
                
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-1 ring-white/20">
                        <span class="text-white font-bold text-xl">3</span>
                    </div>
                    <h3 class="text-xl font-bold text-purple-300 mb-3">Получите деньги</h3>
                    <p class="text-slate-300">После проверки товара мы вернем деньги удобным для вас способом</p>
                </div>
            </div>
            
            <div class="mt-8 p-6 bg-slate-700/30 backdrop-blur-sm rounded-xl ring-1 ring-sky-500/30">
                <div class="flex items-center justify-center mb-4">
                    <i class="fas fa-info-circle text-sky-400 text-2xl mr-3"></i>
                    <h3 class="text-xl font-bold text-sky-300">Важная информация</h3>
                </div>
                <div class="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                    <div class="flex items-center">
                        <i class="fas fa-receipt text-sky-400 mr-2"></i>
                        <span>Сохраняйте чек до окончания срока возврата</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-box text-sky-400 mr-2"></i>
                        <span>Не выбрасывайте оригинальную упаковку</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-phone text-sky-400 mr-2"></i>
                        <span>При вопросах звоните нашим консультантам</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-shield-alt text-sky-400 mr-2"></i>
                        <span>Ваши права защищены законом</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>',
            ]
        );
    }
}
