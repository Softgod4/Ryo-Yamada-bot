import { Telegraf, Context } from "telegraf";
import { setBotCommands } from "./commandsList.js";
import { text } from "./inputData.js";
import { getPicture } from "./request.js";
import { selectPicsSFW, selectPicsNSFW } from "./selectPics.js";
import dotenv from 'dotenv';
import { message } from "telegraf/filters";
import { textAnswer } from "./answerCommand.js";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

setBotCommands(bot);

bot.command('help', async (ctx: Context) => {
  await ctx.replyWithPhoto(
    { source: 'img/boshi+mrbeast.jpg' },
    { caption: text.help }
  );
});

bot.command('sfw', async (ctx: Context) => {
  try {
    const data = await getPicture(selectPicsSFW(), true);
    const picture: string = data.url;
    await ctx.replyWithPhoto({ url: picture });
  } catch (error: unknown) {
    if (typeof error === 'string') {
      ctx.sendMessage(error)
    }
  }
});

bot.command('nsfw', async (ctx: Context) => {
  try {
    const data = await getPicture(selectPicsNSFW(), false);
    const picture: string = data.url;
    await ctx.replyWithPhoto({ url: picture });
  } catch (error: unknown) {
    if (typeof error === 'string') {
      ctx.sendMessage(error)
    }
  }
});

bot.on(message('sticker'), (ctx: Context) => {
  try {
    if (Math.random() > 0.7) {
      ctx.replyWithVideo(
        { source: 'img/like.gif' },
        { caption: textAnswer() }
      );
    }
  } catch (err) {
    console.log(err);
  }
});

bot.hears('+', async (ctx: Context) => {
  try {
    let message = ctx.message;
    ctx.replyWithVideo(
      { source: "img/respect.gif" },
      { caption: `Уважение оказано @${message?.from.username}`}
    );
  } catch {
    (() => {});
  }
});

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
