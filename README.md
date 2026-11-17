# BrightSmile Dental

Сайт стоматологической клиники BrightSmile Dental (Сан-Франциско). Одностраничный лендинг на русском и английском языках: услуги и цены, врачи, отзывы, ответы на частые вопросы и онлайн-запись на приём с мгновенным уведомлением администратора в Telegram.

## Стек

- [Next.js 16](https://nextjs.org) (App Router, TypeScript, Cache Components)
- [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Radix UI)
- [next-intl](https://next-intl.dev) — языки `/ru` и `/en`
- [lucide-react](https://lucide.dev) — иконки
- Шрифт Manrope (`next/font`, кириллица и латиница)
- Хостинг — Vercel

## Запуск

Нужен Node.js 20.9 или новее.

```bash
npm install
cp .env.example .env.local   # заполните значения
npm run dev                  # http://localhost:3000
```

| Команда | Что делает |
|---|---|
| `npm run dev` | Локальный сервер разработки |
| `npm run build` | Продакшен-сборка |
| `npm run start` | Запуск собранного сайта |
| `npm run lint` | Проверка кода ESLint |

## Переменные окружения

| Переменная | Назначение |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Токен Telegram-бота, который присылает заявки (только на сервере) |
| `TELEGRAM_CHAT_ID` | Чат администратора, куда приходят заявки |
| `NEXT_PUBLIC_SITE_URL` | Публичный адрес сайта для SEO-ссылок |

## Структура

```
messages/            тексты интерфейса (ru.json, en.json)
src/app/[locale]/    страницы сайта для каждого языка
src/components/      layout (шапка, футер, меню) и ui (базовые компоненты)
src/config/site.ts   контакты клиники, часы работы, статистика — в одном месте
src/i18n/            настройки языков и навигации
src/proxy.ts         определение языка посетителя и редирект с «/»
docs/                требования к продукту и техническая спецификация
```

Контакты клиники меняются в `src/config/site.ts`, тексты — в `messages/*.json`.
