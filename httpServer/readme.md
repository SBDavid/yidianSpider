DEBUG=httpServer:* node app.js
DEBUG=httpServer:* env=beian pm2 start app.js