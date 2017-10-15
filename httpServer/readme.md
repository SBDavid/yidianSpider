DEBUG=httpServer:* node app.js
DEBUG=httpServer:* env=pro pm2 start app.js