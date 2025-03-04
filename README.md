# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
Skilla Api
Запросы отправляются методом POST. Каждый запрос должен содержать
Authorization: Bearer token
Mango
Работа со звонками
Получить список звонков
https://api.skilla.ru/mango/getList
? date_start=<начальная дата>
& date_end=<конечная дата>
& in_out=<признак входящего или исходящего звонка>
date_start	Начальная дата. Формат YYYY-MM-DD
date_end	Конечная дата. Формат YYYY-MM-DD
in_out	
Признак входящего или исходящего звонка.

Допустимые значения:

1 - входящий звонок
0 - исходящий звонок
пусто - все звонки
limit	Число записей (50 по умолчанию)
Необязательный параметр.
offset	С какой записи идет выборка
Необязательный параметр.
sort_by	Сортировка, возможные значения: date и duration
Необязательный параметр.
order	Сортировка по убыванию или возрастанию, возможные значения: ASC и DESC
Необязательный параметр.
status	Статус звонка, возможные значения: success(дозвонился) и fail(пропущенный)
Необязательный параметр.
from_type[]
(массив)	Тип звонка
Допустимые значения:

clients - клиенты
new_clients - новые клиенты
workers - рабочие
app - приложение
from_persons[]
(массив)	ID сотрудников
sources[]
(массив)	Источник звонка
Допустимые значения:

from_site - с сайта
yandex - yandex номер
google - google номер
12345678 - номер линии
empty - без источника
duration[gte]	Продолжительность звонка больше или равна заданного значение в секундах.
duration[lte]	Продолжительность звонка меньше или равна заданного значение в секундах.
errors[]
(массив)	Ошибки звонка
Допустимые значения:

noerrors - без ошибок
noscript - скрипт не использован
timeover - Превышено время ожидания в очереди удержания
notavailable - Вызываемый номер недоступен
noanswer - Вызов не получил ответа в течение времени ожидания
subscribercompleted - Вызов завершен вызывающим абонентом
results[]
(массив)	Результат звонка
Допустимые значения:

order - оформлен заказ
message - создано обращение
preorder - предварительный заказ
candidate - добавлен кандидат
candidateMessage - обращение от соискателя
search	Для поиска просто добавляем строку поиска
ids[]
(массив)	ID звонков
xls	Добавить со значением 1
Отдает список по фильтрам в формате xlsx
(можно указать массив id звонков выбранные чекбоксом)
Пример ответа:

{
"total_rows": "468",
	"results": [
		{
			"id": 4888120,
			"partnership_id": "136",
			"partner_data": {
				"id": "336",
				"name": "ИП Василек",
				"phone": "7484xxxxxx"
			},
			"date": "2022-04-19 12:10:08",
			"date_notime": "2022-04-19",
			"time": 58,
			"from_number": "79315xxxxxx",
			"from_extension": "",
			"to_number": "sip:hr_xxx@vpbx400105738.mangosip.ru",
			"to_extension": "671",
			"is_skilla": 0,
			"status": "Дозвонился",
			"record": "MToxMDA2NzYxNToxNDM0ODcwNDQzMzow",
			"line_number": "sip:userxx@vpbx400105738.mangosip.ru",
			"line_name": "название линии(источник)",
			"in_out": 1,
			"from_site": 0,
			"source": "",
			"errors": [],
			"disconnect_reason": "",
			"results": [],
			"stages": [],
			"abuse": {
				"date": "2022-05-17 14:35:05",
				"person_name": "Никита",
				"message": "Тестовая жалоба на звонок. Тест тест, можно не отвечать.",
				"support_read_status": 1,
				"support_answer_status": 1,
				"answers": [
					{
						"message": "Уважаемый Никита. Проверили.",
						"from_support": 1,
						"support_read_status": 1,
						"person_read_status": 1
					}
				]
			},
			"contact_name": "",
			"contact_company": "",
			"person_id": 4042,
			"person_name": "Татьяна",
			"person_surname": "Михалкович",
			"person_avatar": "https://lk.skilla.ru/img/noavatar.jpg"
		},
	]
}
		
total_rows	Всего записей по запросу
results	Массив записей
id	id звонка
partnership_id	id партнера
partner_data	Маассив данных о партнере(id, name, phone).
Данные отличаются от текущего партнера, если принят звонок другого партнера.
date	дата и время звонка
date_notime	дата звонка
time	длительность звонка
from_number	номер с которого был звонок
from_extension	внутренний номер с которого был звонок
to_number	номер на который был звконок
to_extension	внутренний номер на который был звконок
is_skilla	Признак того, что звонок ушел в КЦ
status	статус звонка
Возможные значения:

Не дозвонился
Дозвонился
record	id записи звонка
line_number	Номер линии звонка
in_out	Признак входящего или исходящего звонка
from_site	Признак, что звонок с сайта
source	Источник
errors	Оишбки, массив
Пример:


"errors": [
	{
		"title": "Ошибка 1"
	},
	{
		"title": "Ошибка 2"
	}
],
				
disconnect_reason	Причина дисконнекта, если звонок не состоялся
result	Итог звонка, массив
Пример:


"results": [
	{
		"type": "is_new",
		"title": "Новый",
		"tooltip": ""
	}
],
				
type - тип итога:
is_new - новый звонок
message - обращение
order - создан заказ
preorder - создан предзаказ
title - заголовок
tooltip - всплывающая подсказка(если есть)
stages	Операторы пропустившие звонок, массив
Пример:


"stages": [
	{
		"person_name": "Имя",
		"person_surname": "Фамилия",
		"person_mango_phone": "Внутренний номер острудника",
		"duration": "Длительность дозвона",
		"disconnect_reason": "Причина дисконнекта"
	}
],
				
abuse	Жалоба от директора на звонок
Пример:


"abuse": {
	"date": "2022-05-17 14:35:05", //Время подачи жалобы
	"person_name": "Никита",  //Имя подавшего жалобу
	"message": "Тестовая жалоба на звонок. Тест тест, можно не отвечать.",  //Сама жалоба
	"support_read_status": 1, //Статус прочтения жалобы поддержкой
	"support_answer_status": 1,  //Статус ответа на жалобу
	"answers": [  //Ответы
		{
			"message": "Уважаемый Никита. Проверили.", //Текст ответа
			"from_support": 1, //Сообщение от поддержки 1, сообщение от директора 0
			"support_read_status": 1, //Статус прочтения сообщения поддержкой
			"person_read_status": 1 //Статус прочтения сообщения директором
		}
	]
},
				
contact_name	Имя абонента (если определено)
contact_company	Название компании (если определено)
person_id	id сотрудника
person_name	Имя сотрудника
person_surname	Фамилия сотрудника
person_avatar	Аватар сотрудника
Получить запись звонка
https://api.skilla.ru/mango/getRecord
? record=<id записи>
& partnership_id=<id партнера>
record	id записи, есть в в списке звонков - record
partnership_id	id партнера, есть в в списке звонков - partnership_id
В ответ возвращается файл в формате mp3.

Заголоки:
Content-type: audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3
Content-Transfer-Encoding: binary
Content-Disposition: filename="record.mp3"

Инициировать звонок
https://api.skilla.ru/mango/getCallback
? phone=<номер телефона>
phone	номер абонента
В ответ должны получить json данные { "success": true }

Жалоба на звонок
https://api.skilla.ru/mango/sendAbuse
? mango_id=<id звонка>
Жалоба подается директором на звонок с пометкой is_skilla (звонок принят КЦ), на котором есть запись разговора.

В ответ должны получить json данные { "result": true }

Ответ на жалобу
https://api.skilla.ru/mango/answerAbuse
Параметры передаются в теле запроса.

mango_id - id звонка
message - ответ на жалобу
penalty - штраф (если назначаем)
penalty_comment - комментарий к штрафу, обязателен, если назначаем штраф.
В ответ должны получить json данные { "result": true }

Список линий(источников)
https://api.skilla.ru/mango/getLines
Пример ответа:

{
    "result": [
        {
            "number": "73842326935",
            "name": "ЯНДЕКС"
        },
        {
            "number": "73842326925",
            "name": "GOOGLE (РАБ5-2)"
        },
        {
            "number": "sip:user1@kemerovo.mangosip.ru",
            "name": "2ГИС 233-234"
        },
	]
}
		
Партнер
Работа с партнером
Список сотрудников
https://api.skilla.ru/partnership/getPersonsList
? position[]=<должность>
& is_blocked=<признак блокировки>
is_blocked	Признак блокировки
Возможные значения:

1 - заблокирован
0 - не заблокирован
Необязательный параметр
position	Должность (массив)
Возможные значения:

accountant
callleader
callmanager
chief-accountant
controller
copywriter
designer
director
frmanager
hr
hr-assist
leader
mainoperator
manager
moderator
operator
sale-manager
seo
skillmanager
submoderator
supervisor
worksupport
Необязательный параметр
Пример ответа:

[
	{
		"id": "658",
		"name": "Яна",
		"surname": "",
		"patronymic": "",
		"login": "login",
		"phone": "79650xxxxxx",
		"mango_phone": "",
		"email": "",
		"position": "operator",
		"is_blocked": "1",
		"avatar": "https://lk.skilla.ru/img/noavatar.jpg"
	},
]
		
Профиль пользователя + данные партнера
https://api.skilla.ru/partnership/getProfile
Пример ответа:

{
	"id": "650",
	"name": "Артур",
	"surname": "Утенков",
	"patronymic": "Николаевич",
	"login": "dir**",
	"phone": "7917***",
	"mango_phone": "1**",
	"email": "director@**ice.ru",
	"position": "director",
	"is_blocked": "0",
	"avatar": "https://lk.skilla.ru/img/noavatar.jpg",
	"header_notice": {
		"title": "",
		"button_name": "",
		"button_link": ""
	},
	"partnership": {
		"id": "136",
		"name": "ООО \"ГРУЗЧИКОВ-СЕРВИС СПБ\"",
		"brand_name": "Грузчиков-Сервис",
		"brand_ico": "https://lk.skilla.ru/documents/brands/1/ico.png",
		"city": "Санкт-Петербург",
		"phone": "Санкт-Петербург",
		"email": "info@gruzchikov-service.ru",
		"adress": "195027 г. Санкт-Петербург, пр-кт Энергетиков, дом 10А, офис 416",
		"ur_adress": "195027 г. Санкт-Петербург, пр-кт Энергетиков, дом 10А, офис 420",
		"office_adress": "195027 г. Санкт-Петербург, пр-кт Энергетиков, дом 10А, офис 416",
		"inn": "7806268944",
		"kpp": "780601001",
		"rs": "40702810703500018047",
		"bank": "ТОЧКА ПАО БАНКА \"ФК ОТКРЫТИЕ\"",
		"ks": "30101810845250000999",
		"bik": "044525999",
		"ogrn": "1177847173910"
	}
}
		
header_notice	Уведомление в шапку(если есть)
title	Заголовок уведомления
button_name	Название кнопки (если есть)
button_link	Ссылка для кнопки
Пролучение меню пользователя
https://api.skilla.ru/partnership/getMenu
Пример ответа:

[
		{
		"url": "/director/",
		"icon": "",
		"name": "Итоги",
		"is_new": false
	},
	{
		"url": "#",
		"icon": "",
		"name": "Отчеты",
		"submenu": [
			{
				"url": "/director/payments/",
				"icon": "",
				"name": "Бригадиры",
				"is_new": false
			},
		],
		"is_new": false
	},
	{
		"url": "/director/settings/?action=settings2",
		"icon": "",
		"name": "Настройки",
		"is_new": false
	}
]
		
url	url
icon	иконка меню
name	название меню
is_new	признак нового в разделе
submenu	подменю

Получить запись звонка
https://api.skilla.ru/mango/getRecord
? record=<id записи>
& partnership_id=<id партнера>
record	id записи, есть в в списке звонков - record
partnership_id	id партнера, есть в в списке звонков - partnership_id
В ответ возвращается файл в формате mp3.

Заголоки:
Content-type: audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3
Content-Transfer-Encoding: binary
Content-Disposition: filename="record.mp3"