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
        // Создаем запись для страницы политики конфиденциальности
        PageContent::create([
            'key' => 'policy',
            'title' => 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ',
            'content' => '<p class="mb-4">
          Интернет-магазин «Gered», расположенный на доменном имени www.адрес, организационно-правовая форма, полное наименование организации, ИП), и
          юридическим адресом юридический адрес, в лице должность уполномоченного лица, ФИО, действующего (-ей) на основании указать документ,
          удостоверяющий полномочия и его реквизиты, именуемое в дальнейшем «Продавец», обеспечивает конфиденциальность и защиту персональных данных
          Пользователей и Покупателей, которые могут быть получены Продавцом при использовании интернет-магазина, в соответствии с действующим
          законодательством Российской Федерации.
        </p>
        <p class="mb-4">
          1. ОБЩИЕ ПОЛОЖЕНИЯ 1.1. Настоящая Политика конфиденциальности определяет порядок сбора, использования, хранения, обработки, передачи и
          защиты персональных данных Пользователей и Покупателей интернет-магазина «Gered» (далее – Интернет-магазин). 1.2. Использование
          интернет-магазина означает безоговорочное согласие Пользователя или Покупателя с настоящей Политикой конфиденциальности и указанными в ней
          условиями обработки его персональных данных. В случае несогласия с условиями Политики конфиденциальности Пользователь или Покупатель должен
          воздержаться от использования интернет-магазина. 1.3. Продавец не проверяет достоверность предоставляемых Пользователем или Покупателем
          персональных данных и не имеет возможности оценивать его дееспособность. Однако Продавец исходит из того, что Пользователь или Покупатель
          предоставляет достоверные и достаточные персональные данные и поддерживает их в актуальном состоянии.
        </p>
        <p class="mb-4">
          2. СБОР И ИСПОЛЬЗОВАНИЕ ПЕРСОНАЛЬНЫХ ДАННЫХ 2.1. Персональные данные Пользователя или Покупателя могут быть собраны и использованы для
          следующих целей: - оформления заказа и доставки Товара; - предоставления информации о Товаре, акциях, скидках и специальных предложениях; -
          обработки и учета платежей; - обеспечения обратной связи с Пользователем или Покупателем, включая уведомления, запросы и консультации; -
          улучшения качества работы интернет-магазина, разработки новых услуг и функций; - проведения маркетинговых исследований и анализа данных; -
          соблюдения требований законодательства Российской Федерации.
        </p>
        <p class="mb-4">
          3. ПЕРЕДАЧА ПЕРСОНАЛЬНЫХ ДАННЫХ 3.1. Продавец не передает персональные данные Пользователя или Покупателя третьим лицам, за исключением
          случаев, предусмотренных действующим законодательством Российской Федерации. 3.2. Персональные данные Пользователя или Покупателя могут быть
          переданы третьим лицам только в случаях, когда это необходимо для выполнения обязательств перед Пользователем или Покупателем, включая
          оформление заказа и доставку Товара, а также в случаях, предусмотренных действующим законодательством Российской Федерации. 3.3. Передача
          персональных данных Пользователя или Покупателя третьим лицам может осуществляться только с согласия Пользователя или Покупателя, за
          исключением случаев, предусмотренных действующим законодательством Российской Федерации.
        </p>
        <p class="mb-4">
          4. ЗАЩИТА ПЕРСОНАЛЬНЫХ ДАННЫХ 4.1. Продавец принимает все необходимые меры для защиты персональных данных Пользователя или Покупателя от
          неправомерного доступа, изменения, раскрытия или уничтожения. 4.2. Продавец обеспечивает конфиденциальность персональных данных Пользователя
          или Покупателя и не разглашает их третьим лицам, за исключением случаев, предусмотренных действующим законодательством Российской Федерации.
          4.3. Продавец принимает все необходимые меры для обеспечения безопасности персональных данных Пользователя или Покупателя при их передаче по
          сети Интернет, включая использование защищенных протоколов и шифрования данных.
        </p>
        <p>
          Внимательно ознакомьтесь с текстом политики конфиденциальности, и если Вы не согласны с каким-либо пунктом политики, Вы вправе отказаться от
          использования интернет-магазина и не совершать действий, указанный в п. 1.2. настоящей Политики.
        </p>',
        ]);
    }
}