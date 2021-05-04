pm2 stop TypeCodeSocial --silent

cd /var/www/typecode-social/backend
npm install
cd /var/www/typecode-social/frontend
npm install
echo "OK"

cd /var/www/typecode-social/frontend
npm run build
echo "OK"

cd /var/www/typecode-social/backend
pm2 start server.js --name TypeCodeSocial
echo "OK"