Запуск: npm start

Адрес: http://localhost:3000/

Перед авторизацией необходимо зарегистрироваться.
Для авторизованного пользователя есть возможность загрузить новый файл (получить ссылку на скачивание) и посмотреть статистику по загрузкам каждого файла.

При загрузке файла счетчик увеличивается на 1.

Использовал lite-server для сервера и XmlHttpResponse для запроса с отправкой (для отображения прогресса).

Поскольку порты для бэка и фронта разные - CORS пришлось настраивать отдель, позволяя необходимые заголовки запросов.