const { Telegraf } = require('telegraf');

const bot = new Telegraf(
 process.env.TELEGRAM_BOT_TOKEN
);

module.exports = async (app, emitter) => {
 const botRouter = await bot.createWebhook({
  domain: process.env.BASE_URL
 });

 bot.start((ctx) => {
  // console.log('message:', ctx.message);
  ctx.reply('Welcome, use command "/login" to use your auth token\n\nExample: /login 12345-54645-564564...');
 });

 bot.command('login', (ctx) => {
  // console.log('message:', ctx.message);
  const [command, id] = ctx.message.text.split(' ');
  const userInfo = {
   firstName: ctx.message.from.first_name,
   lastName: ctx.message.from.last_name,
  };
  emitter.emit(`login-${id}`, userInfo);
  ctx.reply('this was command');
 });

 app.use(botRouter);
};