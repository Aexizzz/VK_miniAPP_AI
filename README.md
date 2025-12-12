# VK Mini App (Frontend + NestJS/Prisma backend)

Репозиторий содержит фронт на Vite/React/VKUI и бэкенд на NestJS + Prisma (SQLite по умолчанию). Бэкенд отдает списки контента (music/video/podcast/community/games/friends), хранит настройки пользователя (тема, порядок таббара, флаги уведомлений/рекомендаций) и простую статистику для карточек.

## Стек
- Frontend: Vite + React + VKUI + vk-bridge
- Backend: NestJS 10 + Prisma 5 (SQLite)

## Запуск бэкенда (NestJS + Prisma)
```bash
cd Backend
npm install
cp .env.example .env            # при необходимости поменяйте DATABASE_URL/PORT
npm run prisma:generate
npm run prisma:migrate          # создаст dev.db
npm run prisma:seed             # демо-данные для всех секций
npm run start:dev               # http://localhost:3000
```

### Основные эндпоинты
- `POST /users/sync` — апсерт профиля из VK Bridge.
- `GET /users/:vkUserId` — пользователь со статистикой.
- `GET /content?type=music` — список по типу; без `type` вернет сгруппированные списки для всех секций.
- `POST /content` — создание элемента контента (админ/сидинг).
- `GET/PATCH /users/:vkUserId/settings` — тема, порядок табов, уведомления и рекомендации.
- `GET/PATCH /users/:vkUserId/statistics` — цифры для карточек статистики.

Переменные окружения: `DATABASE_URL` (Prisma, по умолчанию SQLite-файл) и `PORT` (по умолчанию 3000).

## Запуск фронтенда
```bash
cd Frontend
npm install
# echo "VITE_API_BASE_URL=http://localhost:3000" > .env.local   # URL бэка
npm run dev -- --host --port 5173
```

## Заметки
- Backend живет в `Backend/`, сборка в `Backend/dist/` (игнорируется).
- Prisma: `Backend/prisma/schema.prisma`, сиды — `Backend/prisma/seed.ts`.
- Включен CORS в Nest — удобно для vk-tunnel при разработке.
