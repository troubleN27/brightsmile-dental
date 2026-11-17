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

Если `TELEGRAM_BOT_TOKEN` или `TELEGRAM_CHAT_ID` не заданы, сайт работает, а `POST /api/booking` отвечает `500` и пишет в лог сервера, какой переменной не хватает.

## Заявки в Telegram

1. Откройте [@BotFather](https://t.me/BotFather), отправьте `/newbot`, задайте имя — получите токен бота.
2. Напишите своему боту любое сообщение (или добавьте его в рабочую группу администраторов и напишите там).
3. Откройте `https://api.telegram.org/bot<ТОКЕН>/getUpdates` и найдите `"chat":{"id": ...}` — это `TELEGRAM_CHAT_ID` (у групп он начинается с `-`).
4. Впишите оба значения в `.env.local` и перезапустите `npm run dev`. Для продакшена добавьте их в Vercel → Project → Settings → Environment Variables.
5. Отправьте тестовую заявку с сайта — сообщение придёт в чат за пару секунд.

Защита формы: скрытое поле-ловушка для ботов и не больше 3 заявок с одного IP за 10 минут. Счётчик хранится в памяти сервера; при росте нагрузки его стоит перенести в Redis/Upstash.

## Структура

```
messages/            тексты интерфейса (ru.json, en.json)
src/app/[locale]/    страницы сайта для каждого языка
src/app/api/booking/ приём заявок и отправка в Telegram
src/components/      layout (шапка, футер, меню), sections (секции лендинга), ui (базовые компоненты)
src/data/            услуги, врачи, кейсы, отзывы, FAQ на двух языках
src/lib/             схема формы, Telegram, ограничение частоты, форматирование цен
src/config/site.ts   контакты клиники, часы работы, статистика — в одном месте
src/i18n/            настройки языков и навигации
src/proxy.ts         определение языка посетителя и редирект с «/»
docs/                требования к продукту и техническая спецификация
```

Контакты клиники меняются в `src/config/site.ts`, тексты — в `messages/*.json`.
