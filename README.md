# Структура
    - ./app веб-приложение (отправляет данные опроса брокеру)
    - ./broker веб-сокет брокер сообщений (принимает данные опроса и отправляет модели ML, получает результат, отправляет обратно)
    - ./ml_worker ML model (принимает результаты опроса от брокера, делает предикт)

```console
user@rs:~$ cat app/.env
user@rs:~$ cd ../
user@rs:~$ docker-compose up --build -d 
user@rs:~$ docker-compose up
```
Переходим на http://localhost:3000/test 
и проходим тест,