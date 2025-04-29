FROM node:20-alpine

# Установка необходимых зависимостей
RUN apk add --no-cache libc6-compat

# Установка pnpm конкретной версии
RUN corepack enable && \
    corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# Передаем исходники
COPY . .

# Устанавливаем зависимости и прогоняем сборку
RUN pnpm install --shamefully-hoist && \
    pnpm build

# Экспортируем порт
EXPOSE 3000

# Запускаем приложение
CMD ["pnpm", "start"]