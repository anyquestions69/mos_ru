# Структура
    - ./app веб-приложение (отправляет данные опроса брокеру)
    - ./broker веб-сокет брокер сообщений (принимает данные опроса и отправляет модели ML, получает результат, отправляет обратно)
    - ./ml_worker ML model (принимает результаты опроса от брокера, делает предикт)

    ```text
    user@rs:~$ cd app
    user@rs:~$ cat .env
    user@rs:~$ cd ../
    user@rs:~$ docker-compose up --build -d 
    ```
## Запускаем брокер сообщений для работы микросервисов
    ```text
    user@rs:~$ cd app
    user@rs:~$ nodemon index.js
    ```
    Необходимо запустить RabbitMQ в другом терминале
    ```console
    user@rs:~$ docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.11-management
    ```
    В другом терминале запускаем брокер только после полного запуска RabbitMQ
    ```console
    user@rs:~$ cd broker
    user@rs:~$ nodemon index.js
    ```

    В другом терминале запускаем обработчик результатов опроса
    ```console
    user@rs:~$ cd ml_worke
    user@rs:~$ python rpc_server.py
    ```
    