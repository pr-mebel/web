# Частный мебельер

## Доступные команды

### Подтянуть .env

```
npx vercel link
npx vercel env pull
```

### Запуск в dev режиме с hot-reload

```
yarn dev
```

### Запуск в prod режиме

```
yarn start
```

### Typescript линтер

```
yarn typecheck:watch
```

### Подключение базы данных

В проекте используется planet scale БД. Войти в нее можно через интерфейс vercel.com.
project -> settings -> integrations -> planetscale.

Туториал по установке planetscale на любую OS: https://docs.planetscale.com/concepts/planetscale-environment-setup

В первый раз нужно будет авторизоваться в cli

```
pscale auth login
```

Запуск БД локально

```
pscale connect orders develop
```

Ссылка на проект orders в planetscale.
https://app.planetscale.com/pr-mebel/orders
