FROM node:18-alpine
WORKDIR /app


COPY package.json package-lock.json ./
RUN npm ci


COPY prisma ./prisma/


RUN npx prisma generate


COPY . .


COPY wait-for-db.sh ./
RUN chmod +x wait-for-db.sh


EXPOSE 3000


CMD sh -c './wait-for-db.sh mysql:3306 && npx prisma db push && npx prisma db seed && npm run dev'
