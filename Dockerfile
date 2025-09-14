# ======================
# Stage 1: Build React app
# ======================
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install   # ✅ בטוח, לא נופל על lock

COPY . .
RUN npm run build

# ======================
# Stage 2: Serve with Nginx
# ======================
FROM nginx:alpine

# מנקים תוכן ברירת מחדל
RUN rm -rf /usr/share/nginx/html/*

# מעתיקים את התוצאה מה־builder
COPY --from=builder /app/build /usr/share/nginx/html

# קובץ קונפיג Nginx מותאם (אם יש לך)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
