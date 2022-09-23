// @ts-check
require('dotenv').config();
const Koa = require('koa');
const websockify = require('koa-websocket');
const route = require('koa-route');
const Pug = require('koa-pug');
const path = require('path');
const serve = require('koa-static');
const mount = require('koa-mount');
const mongoClient = require('./public/mongo');
const _client = mongoClient.connect();

const app = websockify(new Koa());
const PORT = process.env.PORT;

const pug = new Pug({
  viewPath: path.resolve(__dirname, './views'),
  app,
});

app.use(mount('/public', serve('public')));

app.ws.use(
  route.all('/chat', (ctx) => {
    const { server } = app.ws;
    server?.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          name: 'sever',
          msg: `새로운 유저가 참여했습니다. 현재 유저 수 ${server.clients.size}`,
          bg: 'bg-danger',
          text: 'text-white',
        })
      );
    });

    ctx.websocket.on('message', async (message) => {
      const chat = JSON.parse(message);

      const insertClient = await _client;
      const chatCursor = insertClient.db('Board').collection('chats');
      await chatCursor.insertOne({
        ...chat,
      });

      server?.clients.forEach((client) => {
        client.send(message.toString());
      });
    });

    ctx.websocket.on('close', () => {
      server?.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: 'chat',
            data: {
              name: '서버',
              msg: `유저 한명이 나갔습니다. 현재 유저 수 ${server.clients.size}`,
              bg: 'bg-dark',
              text: 'text-white',
            },
          })
        );
      });
    });
  })
);

app.use(async (ctx) => {
  await ctx.render('chat');
});

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번 포트에서 실행 중입니다!`);
});
