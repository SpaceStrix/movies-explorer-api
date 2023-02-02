# BackEnd дипломного проекта Movie

## Запуск проекта

> `npm run start` — запускает сервер

> `npm run dev` — запускает сервер с hot-reload

## **Routes**

| Method | Path         | Description                                             |
| ------ | ------------ | ------------------------------------------------------- |
| GET    | /users/me    | Возвращает информацию о пользователе                    |
| PATCH  | /users/me    | Обновляет информацию о пользователе                     |
| GET    | /movies      | Возвращает все сохранённые текущим пользователем фильмы |
| POST   | /movies      | Создаёт фильм                                           |
| DELETE | /movies/\_id | Удаляет сохранённый фильм по id                         |
| POST   | /signup      | Регистрация                                             |
| POST   | /signin      | Авторизация                                             |

## Link

| Type       | IPv4           | URL                                   |
| ---------- | -------------- | ------------------------------------- |
| `frontend` | 84.201.138.129 | `moviespace.nomoredomainsclub.ru`     |
| `backend`  | 84.201.138.129 | `api.moviespace.nomoredomainsclub.ru` |
