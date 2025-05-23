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
        PageContent::firstOrCreate(
            ['key' => 'policy'],
            [
                'title' => 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ',
                'content' => '
<div class="prose prose-slate max-w-none lg:prose-lg prose-headings:text-sky-700 prose-h2:font-semibold prose-h2:mb-5 prose-h2:pb-2 prose-h2:border-b prose-h2:border-sky-200 prose-h3:text-slate-700 prose-h3:font-medium prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1 prose-strong:font-semibold">
    <p class="text-slate-600">
        Интернет-магазин «Gered», расположенный на доменном имени www.адрес, (организационно-правовая форма, полное наименование организации, ИП), и
        юридическим адресом (юридический адрес), в лице (должность уполномоченного лица, ФИО), действующего (-ей) на основании (указать документ,
        удостоверяющий полномочия и его реквизиты), именуемое в дальнейшем «Продавец», обеспечивает конфиденциальность и защиту персональных данных
        Пользователей и Покупателей, которые могут быть получены Продавцом при использовании интернет-магазина, в соответствии с действующим
        законодательством Российской Федерации.
    </p>

    <h2><i class="fas fa-file-contract fa-fw mr-2 text-sky-600"></i>1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
    <p><strong>1.1.</strong> Настоящая Политика конфиденциальности определяет порядок сбора, использования, хранения, обработки, передачи и
    защиты персональных данных Пользователей и Покупателей интернет-магазина «Gered» (далее – Интернет-магазин).</p>
    <p><strong>1.2.</strong> Использование интернет-магазина означает безоговорочное согласие Пользователя или Покупателя с настоящей Политикой конфиденциальности и указанными в ней
    условиями обработки его персональных данных. В случае несогласия с условиями Политики конфиденциальности Пользователь или Покупатель должен
    воздержаться от использования интернет-магазина.</p>
    <p><strong>1.3.</strong> Продавец не проверяет достоверность предоставляемых Пользователем или Покупателем
    персональных данных и не имеет возможности оценивать его дееспособность. Однако Продавец исходит из того, что Пользователь или Покупатель
    предоставляет достоверные и достаточные персональные данные и поддерживает их в актуальном состоянии.</p>

    <h2><i class="fas fa-database fa-fw mr-2 text-sky-600"></i>2. СБОР И ИСПОЛЬЗОВАНИЕ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
    <p><strong>2.1.</strong> Персональные данные Пользователя или Покупателя могут быть собраны и использованы для
    следующих целей:</p>
    <ul>
        <li>оформления заказа и доставки Товара;</li>
        <li>предоставления информации о Товаре, акциях, скидках и специальных предложениях;</li>
        <li>обработки и учета платежей;</li>
        <li>обеспечения обратной связи с Пользователем или Покупателем, включая уведомления, запросы и консультации;</li>
        <li>улучшения качества работы интернет-магазина, разработки новых услуг и функций;</li>
        <li>проведения маркетинговых исследований и анализа данных;</li>
        <li>соблюдения требований законодательства Российской Федерации.</li>
    </ul>

    <h2><i class="fas fa-exchange-alt fa-fw mr-2 text-sky-600"></i>3. ПЕРЕДАЧА ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
    <p><strong>3.1.</strong> Продавец не передает персональные данные Пользователя или Покупателя третьим лицам, за исключением
    случаев, предусмотренных действующим законодательством Российской Федерации.</p>
    <p><strong>3..2</strong> Персональные данные Пользователя или Покупателя могут быть
    переданы третьим лицам только в случаях, когда это необходимо для выполнения обязательств перед Пользователем или Покупателем, включая
    оформление заказа и доставку Товара, а также в случаях, предусмотренных действующим законодательством Российской Федерации.</p>
    <p><strong>3.3.</strong> Передача персональных данных Пользователя или Покупателя третьим лицам может осуществляться только с согласия Пользователя или Покупателя, за
    исключением случаев, предусмотренных действующим законодательством Российской Федерации.</p>

    <h2><i class="fas fa-shield-alt fa-fw mr-2 text-sky-600"></i>4. ЗАЩИТА ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
    <p><strong>4.1.</strong> Продавец принимает все необходимые организационные и технические меры для защиты персональных данных Пользователя или Покупателя от
    неправомерного доступа, изменения, раскрытия или уничтожения.</p>
    <p><strong>4.2.</strong> Продавец обеспечивает конфиденциальность персональных данных Пользователя
    или Покупателя и не разглашает их третьим лицам, за исключением случаев, предусмотренных действующим законодательством Российской Федерации.</p>
    <p><strong>4.3.</strong> Продавец принимает все необходимые меры для обеспечения безопасности персональных данных Пользователя или Покупателя при их передаче по
    сети Интернет, включая использование защищенных протоколов и шифрования данных.</p>

    <div class="mt-8 p-4 bg-sky-50 border-l-4 border-sky-500 rounded-md">
        <p class="text-sm text-sky-700 flex items-start">
            <i class="fas fa-info-circle fa-fw mr-3 mt-1 text-sky-600"></i>
            <span><strong>Важно:</strong> Внимательно ознакомьтесь с текстом политики конфиденциальности, и если Вы не согласны с каким-либо пунктом политики, Вы вправе отказаться от
            использования интернет-магазина и не совершать действий, указанный в п. 1.2. настоящей Политики.</span>
        </p>
    </div>
</div>',
            ]
        );

        // Страница "О нас"
        PageContent::firstOrCreate(
            ['key' => 'about'],
            [
                'title' => 'О НАС',
                'content' => '
<div class="space-y-16">
    <section class="text-center py-8 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl shadow-xl text-white">
        <i class="fas fa-store fa-3x mb-4 opacity-75"></i>
        <h2 class="text-4xl font-extrabold mb-3 tracking-tight">Добро пожаловать в Gered Store!</h2>
        <p class="text-xl font-light max-w-3xl mx-auto px-4 opacity-90">
            Мы - современный интернет-магазин электроники, сфокусированный на предоставлении вам лучших гаджетов и аксессуаров от ведущих мировых брендов.
        </p>
    </section>

    <section class="bg-slate-50 p-8 rounded-xl shadow-lg">
        <div class="flex flex-col md:flex-row items-center text-center md:text-left">
            <i class="fas fa-bullseye fa-3x text-sky-500 mb-4 md:mb-0 md:mr-6"></i>
            <div>
                <h3 class="text-3xl font-bold text-slate-800 mb-2">Наша миссия</h3>
                <p class="text-lg text-slate-600 leading-relaxed">
                    Предоставлять нашим клиентам доступ к самым современным технологиям по справедливым ценам, обеспечивая при этом высокий уровень сервиса, экспертные консультации и качественное обслуживание на каждом этапе.
                </p>
            </div>
        </div>
    </section>

    <section>
        <h3 class="text-3xl font-bold text-slate-800 mb-10 text-center">Почему выбирают нас?</h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-sky-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center text-sky-500 mb-3">
                    <i class="fas fa-box-open fa-2x mr-3"></i>
                    <h4 class="font-semibold text-xl text-slate-700">Широкий ассортимент</h4>
                </div>
                <p class="text-slate-500">Продукции от проверенных и надежных производителей.</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-sky-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center text-sky-500 mb-3">
                    <i class="fas fa-shield-alt fa-2x mr-3"></i>
                    <h4 class="font-semibold text-xl text-slate-700">Гарантия на все товары</h4>
                </div>
                <p class="text-slate-500">Мы уверены в качестве и предоставляем официальную гарантию.</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-sky-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center text-sky-500 mb-3">
                    <i class="fas fa-shipping-fast fa-2x mr-3"></i>
                    <h4 class="font-semibold text-xl text-slate-700">Быстрая доставка</h4>
                </div>
                <p class="text-slate-500">Оперативная доставка по всей России.</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-sky-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center text-sky-500 mb-3">
                    <i class="fas fa-headset fa-2x mr-3"></i>
                    <h4 class="font-semibold text-xl text-slate-700">Проф. консультации</h4>
                </div>
                <p class="text-slate-500">Поможем с выбором и ответим на все вопросы.</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-sky-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center text-sky-500 mb-3">
                    <i class="fas fa-tags fa-2x mr-3"></i>
                     <h4 class="font-semibold text-xl text-slate-700">Скидки и бонусы</h4>
                </div>
                <p class="text-slate-500">Гибкая система лояльности для наших клиентов.</p>
            </div>
             <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-sky-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center text-sky-500 mb-3">
                    <i class="fas fa-thumbs-up fa-2x mr-3"></i>
                     <h4 class="font-semibold text-xl text-slate-700">Клиентоориентированность</h4>
                </div>
                <p class="text-slate-500">Ваше удобство и удовлетворенность – наш приоритет.</p>
            </div>
        </div>
    </section>

    <section class="text-center bg-slate-800 text-white p-10 rounded-xl shadow-xl">
         <i class="fas fa-users fa-3x mb-4 opacity-75"></i>
        <h3 class="text-3xl font-bold mb-3">Наша команда</h3>
        <p class="text-lg leading-relaxed max-w-2xl mx-auto opacity-90">
            Наша команда состоит из опытных специалистов и энтузиастов своего дела, которые всегда готовы помочь с выбором, предоставить подробную информацию и ответить на все ваши вопросы. Мы любим то, что делаем, и стремимся сделать ваш опыт покупок максимально приятным и продуктивным!
        </p>
    </section>
</div>',
            ]
        );

        // Страница контактов
        PageContent::firstOrCreate(
            ['key' => 'contacts'],
            [
                'title' => 'КОНТАКТЫ',
                'content' => '
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2 bg-white p-8 rounded-xl shadow-xl">
        <h2 class="text-3xl font-bold text-sky-700 mb-8 flex items-center">
            <i class="fas fa-address-book fa-fw mr-4"></i> Свяжитесь с нами
        </h2>
        <div class="space-y-6">
            <div class="flex items-start group">
                <i class="fas fa-map-marker-alt fa-lg text-sky-500 mt-1 mr-4 group-hover:text-sky-700 transition-colors"></i>
                <div>
                    <h3 class="font-semibold text-lg text-slate-800">Наш адрес:</h3>
                    <p class="text-slate-600">г. Москва, ул. Примерная, д. 123, офис 45</p>
                </div>
            </div>
            <hr class="border-slate-200">
            <div class="flex items-start group">
                <i class="fas fa-phone-alt fa-lg text-sky-500 mt-1 mr-4 group-hover:text-sky-700 transition-colors"></i>
                <div>
                    <h3 class="font-semibold text-lg text-slate-800">Телефон для связи:</h3>
                    <p><a href="tel:+79991234567" class="text-sky-600 hover:text-sky-800 hover:underline transition duration-150 text-lg">+7 (999) 123-45-67</a></p>
                </div>
            </div>
            <hr class="border-slate-200">
            <div class="flex items-start group">
                <i class="fas fa-envelope fa-lg text-sky-500 mt-1 mr-4 group-hover:text-sky-700 transition-colors"></i>
                <div>
                    <h3 class="font-semibold text-lg text-slate-800">Электронная почта:</h3>
                    <p><a href="mailto:info@gered-store.ru" class="text-sky-600 hover:text-sky-800 hover:underline transition duration-150 text-lg">info@gered-store.ru</a></p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-sky-600 text-white p-8 rounded-xl shadow-xl flex flex-col justify-between">
        <div>
            <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-clock fa-fw mr-3"></i> Режим работы
            </h2>
            <div class="space-y-2 mb-8 opacity-90">
                <p><span class="font-medium">Понедельник - Пятница:</span> 9:00 - 20:00</p>
                <p><span class="font-medium">Суббота:</span> 10:00 - 18:00</p>
                <p><span class="font-medium">Воскресенье:</span> выходной</p>
            </div>
        </div>
        <div>
            <h2 class="text-2xl font-bold mb-4 flex items-center">
                <i class="fas fa-comment-dots fa-fw mr-3"></i> Обратная связь
            </h2>
            <p class="opacity-90 leading-relaxed mb-4">
                Остались вопросы или есть предложения? Мы всегда рады помочь!
            </p>
            <a href="mailto:info@gered-store.ru?subject=Обратная%20связь" class="inline-block w-full text-center bg-white text-sky-600 font-semibold py-3 px-6 rounded-lg hover:bg-sky-100 transition duration-150">
                <i class="fas fa-paper-plane mr-2"></i> Написать нам
            </a>
        </div>
    </div>
</div>

<div class="mt-12 bg-white rounded-xl shadow-xl overflow-hidden">
    <h2 class="text-2xl md:text-3xl font-bold text-sky-700 pt-8 px-8 text-center md:text-left">Мы на карте</h2>
    <div class="bg-slate-200 h-72 md:h-96 flex items-center justify-center text-slate-500 mt-6">
        <div class="text-center">
            <i class="fas fa-map-marked-alt fa-5x mb-4 text-slate-400"></i>
            <p class="text-lg">Здесь будет интерактивная карта нашего местоположения.</p>
            <p class="text-sm">(Не забудьте вставить код для встраивания карты)</p>
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
<div class="space-y-16">
    <section>
        <div class="text-center mb-12">
            <i class="fas fa-truck-loading fa-3x text-sky-500 mb-4"></i>
            <h2 class="text-4xl font-extrabold text-slate-800 tracking-tight">Условия доставки</h2>
            <p class="mt-3 text-xl text-slate-600 max-w-2xl mx-auto">Мы предлагаем несколько удобных способов доставки ваших заказов.</p>
        </div>

        <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-sky-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center text-sky-600 mb-4">
                    <i class="fas fa-motorcycle fa-2x mr-4"></i>
                    <h3 class="text-2xl font-bold text-slate-800">Курьерская доставка (Москва)</h3>
                </div>
                <ul class="list-none text-slate-600 space-y-3">
                    <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i>Стоимость: <span class="font-semibold ml-1">300 руб.</span></li>
                    <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i>Сроки: <span class="font-semibold ml-1">1-2 рабочих дня</span></li>
                    <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i>Время: с 10:00 до 22:00</li>
                    <li class="flex items-center text-green-600 font-semibold"><i class="fas fa-star text-yellow-400 mr-2"></i>При заказе от 10 000 руб. - <span class="underline">бесплатно!</span></li>
                </ul>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-sky-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center text-sky-600 mb-4">
                    <i class="fas fa-store-alt fa-2x mr-4"></i>
                    <h3 class="text-2xl font-bold text-slate-800">Самовывоз (Москва)</h3>
                </div>
                <p class="text-slate-600 mb-2">Заберите заказ из нашего офиса:</p>
                <p class="font-medium text-slate-700 mb-3"><i class="fas fa-map-marker-alt mr-2 text-sky-500"></i>г. Москва, ул. Примерная, д. 123, офис 45</p>
                <p class="text-slate-600"><i class="fas fa-clock mr-2 text-sky-500"></i>График пункта выдачи: <span class="font-semibold">Пн-Пт с 10:00 до 20:00</span></p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-sky-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center text-sky-600 mb-4">
                    <i class="fas fa-globe-americas fa-2x mr-4"></i>
                    <h3 class="text-2xl font-bold text-slate-800">Доставка по России</h3>
                </div>
                 <ul class="list-none text-slate-600 space-y-3">
                    <li class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>Стоимость рассчитывается индивидуально при оформлении заказа.</li>
                    <li class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>Сроки: от <span class="font-semibold mx-1">2 до 14 рабочих дней</span> (зависит от региона).</li>
                    <li class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>Компании: СДЭК, Boxberry, Почта России.</li>
                </ul>
            </div>
        </div>
    </section>

    <hr class="border-slate-200">

    <section>
        <div class="text-center mb-12">
            <i class="fas fa-credit-card fa-3x text-sky-500 mb-4"></i>
            <h2 class="text-4xl font-extrabold text-slate-800 tracking-tight">Способы оплаты</h2>
            <p class="mt-3 text-xl text-slate-600 max-w-2xl mx-auto">Выберите удобный для вас способ оплаты заказа.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="flex flex-col items-center text-center bg-slate-50 p-6 rounded-xl shadow hover:shadow-md transition-shadow">
                <i class="fas fa-money-bill-wave fa-2x text-green-500 mb-3"></i>
                <h4 class="font-semibold text-lg text-slate-700">Наличными курьеру</h4>
                <p class="text-sm text-slate-500">(При получении)</p>
            </div>
            <div class="flex flex-col items-center text-center bg-slate-50 p-6 rounded-xl shadow hover:shadow-md transition-shadow">
                <div class="flex mb-3">
                    <i class="fab fa-cc-visa fa-2x text-blue-700 mr-2"></i>
                    <i class="fab fa-cc-mastercard fa-2x text-red-600 mr-2"></i>
                    <i class="fas fa-credit-card fa-2x text-yellow-500"></i> </div>
                <h4 class="font-semibold text-lg text-slate-700">Банковской картой</h4>
                 <p class="text-sm text-slate-500">(Онлайн или курьеру)</p>
            </div>
            <div class="flex flex-col items-center text-center bg-slate-50 p-6 rounded-xl shadow hover:shadow-md transition-shadow">
                <i class="fas fa-file-invoice-dollar fa-2x text-purple-500 mb-3"></i>
                <h4 class="font-semibold text-lg text-slate-700">Безналичный расчет</h4>
                <p class="text-sm text-slate-500">(Для юридических лиц)</p>
            </div>
            <div class="flex flex-col items-center text-center bg-slate-50 p-6 rounded-xl shadow hover:shadow-md transition-shadow">
                <i class="fas fa-qrcode fa-2x text-gray-700 mb-3"></i>
                <h4 class="font-semibold text-lg text-slate-700">Система Быстрых Платежей</h4>
                <p class="text-sm text-slate-500">(СБП)</p>
            </div>
        </div>
    </section>
</div>',
            ]
        );

        // Страница гарантии и возврата
        PageContent::firstOrCreate(
            ['key' => 'warranty'],
            [
                'title' => 'ГАРАНТИЯ И ВОЗВРАТ',
                'content' => '
<div class="prose prose-slate max-w-none lg:prose-lg prose-headings:text-sky-700 prose-h2:font-bold prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-sky-200 prose-h3:text-slate-800 prose-h3:font-semibold prose-h3:mb-3 prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-3 prose-li:flex prose-li:items-start prose-li:before:content-["\f058"] prose-li:before:font-[FontAwesome] prose-li:before:text-green-500 prose-li:before:mr-3 prose-li:before:mt-1 prose-ol:list-none prose-ol:pl-0 prose-ol:space-y-3 prose-ol:counter-reset-list-item prose-li:items-start prose-li:counter-increment-list-item prose-li:before:content-[counter(list-item)"._"] prose-li:before:font-semibold prose-li:before:text-sky-600 prose-li:before:mr-2 prose-a:text-sky-600 hover:prose-a:text-sky-800 hover:prose-a:underline prose-p:leading-relaxed">
    
    <h2>
        <i class="fas fa-shield-alt fa-fw mr-3 text-sky-600"></i>Гарантийные обязательства
    </h2>
    <p>На всю продукцию, приобретенную в нашем магазине Gered Store, распространяется официальная гарантия. Срок гарантии составляет от 12 до 24 месяцев в зависимости от типа товара и конкретного производителя. Мы ценим ваше доверие и гарантируем качество каждого товара.</p>
    
    <h3><i class="fas fa-clipboard-list fa-fw mr-2 text-slate-600"></i>Условия предоставления гарантии:</h3>
    <ul>
        <li>Гарантия действительна при наличии правильно заполненного гарантийного талона (если он предусмотрен) и документа, подтверждающего покупку (кассовый/товарный чек).</li>
        <li>Гарантия не распространяется на повреждения, вызванные неправильной эксплуатацией, механическими воздействиями, попаданием влаги, использованием неоригинальных аксессуаров или самостоятельным ремонтом.</li>
        <li>Ремонт и обслуживание осуществляются в авторизованных сервисных центрах производителя. Контакты СЦ указаны в гарантийном талоне или на сайте производителя.</li>
        <li>Транспортировка товара в сервисный центр и обратно осуществляется силами и за счет покупателя, если иное не предусмотрено условиями гарантии.</li>
    </ul>
    
    <hr class="my-10 border-sky-100">

    <h2>
        <i class="fas fa-undo-alt fa-fw mr-3 text-sky-600"></i>Возврат и обмен товара
    </h2>
    <p>Мы соблюдаем законодательство РФ. Вы можете вернуть или обменять товар надлежащего качества в течение 14 дней с момента покупки (не считая дня покупки) при соблюдении следующих условий:</p>
    
    <h3><i class="fas fa-check-square fa-fw mr-2 text-slate-600"></i>Условия для возврата/обмена:</h3>
    <ul>
        <li>Товар не был в употреблении, сохранены его товарный вид, потребительские свойства, пломбы и фабричные ярлыки.</li>
        <li>Сохранена оригинальная и неповрежденная упаковка товара со всеми комплектующими.</li>
        <li>Имеются все документы, подтверждающие факт и условия покупки в нашем магазине.</li>
        <li>Отсутствуют следы эксплуатации, механические повреждения (царапины, сколы и т.п.).</li>
        <li>Товар не входит в <a href="http://www.consultant.ru/document/cons_doc_LAW_17579/2747a7495896168937f2159e17960f52778781f7/" target="_blank" rel="noopener noreferrer">перечень товаров</a>, не подлежащих возврату или обмену.</li>
    </ul>
    
    <h3 class="mt-6"><i class="fas fa-tasks fa-fw mr-2 text-slate-600"></i>Процедура возврата/обмена:</h3>
    <ol>
        <li>Свяжитесь с нами по телефону <a href="tel:+79991234567">+7 (999) 123-45-67</a> или email <a href="mailto:info@gered-store.ru">info@gered-store.ru</a>, чтобы уведомить о намерении и уточнить детали.</li>
        <li>Аккуратно упакуйте товар в полной комплектации. Приложите заявление на возврат/обмен (образец предоставим) и копию чека.</li>
        <li>Согласуйте с менеджером способ передачи товара (в нашем офисе или отправка транспортной компанией).</li>
        <li>После получения и проверки товара, мы произведем возврат денежных средств или обмен в установленные законом сроки (обычно до 10 дней для возврата денег).</li>
    </ol>
    
    <div class="mt-10 p-6 bg-sky-50 border-l-4 border-sky-500 rounded-r-md">
        <p class="text-slate-700 flex items-start">
            <i class="fas fa-info-circle fa-lg mr-3 mt-1 text-sky-600"></i>
            <span><strong>Обратите внимание:</strong> Подробные условия гарантии, возврата и обмена, а также актуальный перечень товаров, не подлежащих возврату, уточняйте у наших менеджеров или в соответствующих нормативных актах РФ. Мы всегда готовы помочь и ответить на ваши вопросы!</span>
        </p>
    </div>
</div>',
            ]
        );
    }
}
