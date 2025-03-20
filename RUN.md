====================

создать образ: docker build -t supa-estate-i .

docker run -d -p 3000:3000 -v D:\Portfolio\supa-real-estate\prisma\data:/app/data -e DATABASE_URL="file:./data/dev.db" --name supa-estate-c supa-estate-i

- создать контейнер и свзяать с бд

запустить (всегда будет запускаться на этих портах)

docker start supa-estate-c

остановить

docker stop supa-estate-c

=====================
 в .env файле должен быть секрет

 NEXTAUTH_SECRET="Wz1p5hn...."

 GOOGLE auth нужно настроить отдельно для каждого домена

====================

tail -f /path/to/your/file - посмотреть содержимое файла

=====

docker logs --follow supa-estate-c - мониторить лог контейнера

=====

мониторить лог

# Step 1: Enter the Docker container
docker exec -it supa-estate-c sh

# Step 2: Follow logs in real-time
tail -f /var/log/your_app.log

============

установить нано файл для редактирования если нужно

# For Alpine:
apk add nano

# For Debian/Ubuntu:
apt update && apt install -y nano

CTRL + O - save CTRL + X - exit




