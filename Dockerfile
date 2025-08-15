# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:18-alpine AS build
WORKDIR /app

# מתקין תלויות לפי ה-lock (מהיר ויציב ל-CI)
COPY package.json package-lock.json ./
RUN npm ci

# מעתיק קוד ובונה
COPY . .
ENV CI=true
RUN npm run build

# ---- Runtime stage (Nginx) ----
FROM nginx:1.27-alpine

# קונפיג' SPA כדי ש-refresh בנתיבים יעבוד
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# קבצי ה-build מהשלב הקודם
COPY --from=build /app/build /usr/share/nginx/html

# (רשות) בריאות בסיסית
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
