# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:18-alpine AS build
WORKDIR /app

# התקנה נעולה (מהיר ויציב ב-CI)
COPY package.json package-lock.json ./
RUN npm ci

# מעתיקים קוד ובונים
COPY . .
ENV CI=true
RUN npm run build

# ---- Runtime stage (Nginx) ----
FROM nginx:1.27-alpine

# מתקינים curl בשביל HEALTHCHECK
RUN apk add --no-cache curl

# קונפיג SPA כך ש-refresh יעבוד
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# קבצי ה-build מהשלב הקודם
COPY --from=build /app/build /usr/share/nginx/html

# בריאות בסיסית
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -fsS http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
