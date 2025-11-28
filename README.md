# VK Mini App (Frontend + DRF backend)

Мини-приложение под VK с фронтом на Vite/React/VKUI и backend на Django REST Framework. Фронт ходит на DRF API для профиля и карточек контента (music/video/podcast/community/games/friends) через `api/`.

## Стек
- Frontend: Vite + React + VKUI + vk-bridge
- Backend: Django 5 + DRF + CORS + requests (VK API)

## Быстрый старт (локально)
1) Клонируйте репозиторий.
2) Backend:
   ```bash
   cd Backend
   python -m venv .venv
   .\.venv\Scripts\activate
   pip install -r requirements.txt
   # (опционально) export VK_SERVICE_TOKEN=<ваш VK сервисный токен>
   python manage.py migrate
   python manage.py runserver 0.0.0.0:8000
   ```
3) Frontend:
   ```bash
   cd ../Frontend
   npm install
   # укажите адрес бэка при необходимости
   # echo "VITE_API_BASE_URL=http://localhost:8000" > .env.local
   npm run dev -- --host --port 5173
   ```
4) Откройте http://localhost:5173 (или адрес из vk-tunnel).

## VK API токен
- Для живых данных: установите `VK_SERVICE_TOKEN` или передавайте токен заголовком `X-Vk-Access-Token` / query `?access_token=...` в запросах к бэку.
- Без токена вернутся заглушки.

## Эндпоинты бэка
- `GET /api/profile/` — профиль пользователя (поля: id, first_name, last_name, photo_200).
- `GET /api/sections/` — список секций с карточками.
- `GET /api/sections/<slug>/` — одна секция (slug: music, video, podcast, community, games, friends).

## Как подключить к VK Mini Apps (dev)
1) В dev.vk.com создайте/откройте приложение, впишите dev URL (из `vk-tunnel`).
2) Запустите фронт с туннелем:
   ```bash
   npm run dev -- --host --port 5173
   # в другом окне
   npm install -g @vkontakte/vk-tunnel
   vk-tunnel --http-protocol=http --host=localhost --port=5173
   ```
3) URL из vk-tunnel добавьте в настройках приложения (строка сайта).
4) В параметрах запуска мини-приложения укажите тот же URL; откройте приложение — оно будет бить в ваш локальный бэк.

## Тестирование
- Backend: `cd Backend && .venv\Scripts\activate && python manage.py test`
- Frontend: `cd Frontend && npm run lint` (если нужно).

## Полезные переменные окружения
- `VITE_API_BASE_URL` — адрес API для фронта (по умолчанию http://localhost:8000).
- `VK_SERVICE_TOKEN` или `VK_USER_TOKEN` — токен для запросов к VK API на бэке.
- `VK_API_VERSION` — версия VK API (по умолчанию 5.199).

## Структура
- `Frontend/src/utils/api.ts` — вызовы API.
- `Frontend/src/hooks/useSections.ts` — загрузка карточек секций.
- `Frontend/src/hooks/vkUser.tsx` — профиль (бэк → fallback VK Bridge).
- `Backend/app/services.py` — обертка над VK API + заглушки.
- `Backend/app/urls.py` — роутинг API.
