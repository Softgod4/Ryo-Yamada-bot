import { Telegraf, Context } from "telegraf";
import { setBotCommands } from "./commandsList.js";
import { text } from "./inputData.js";
import { getPicture } from "./request.js";
import { selectPicsSFW, selectPicsNSFW } from "./selectPics.js";
import dotenv from 'dotenv';
import { message } from "telegraf/filters";
import { textAnswer } from "./answerCommand.js";

dotenv.config();

class Bot {
  private bot: Telegraf<Context>;

  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN!);
    this.setCommands();
    this.setHandlers();
  }

  private setCommands(): void {
    setBotCommands(this.bot);
  }

  private setHandlers(): void {
    this.bot.command('help', this.handleHelpCommand.bind(this));
    this.bot.command('sfw', this.handleSFWCommand.bind(this));
    this.bot.command('nsfw', this.handleNSFWCommand.bind(this));
    this.bot.on(message('sticker'), this.handleAnswerCommand.bind(this))
    this.bot.hears('+', this.handleRespectCommand.bind(this))
  }

  private async handleHelpCommand(ctx: Context): Promise<void> {
    await ctx.replyWithPhoto(
      { source: 'img/boshi+mrbeast.jpg' },
      { caption: text.help }
    );
  }

  private async handleSFWCommand(ctx: Context): Promise<void> {
    try {
      const data = await getPicture(selectPicsSFW(), true);
      const picture: string = data.url;
      await ctx.replyWithPhoto({ url: picture });
    } catch (error: unknown) {
      if (typeof error === 'string') {
        ctx.sendMessage(error)
      }
    }
  }

  private async handleNSFWCommand(ctx: Context): Promise<void> {
    try {
      const data = await getPicture(selectPicsNSFW(), false);
      const picture: string = data.url;
      await ctx.replyWithPhoto({ url: picture });
    } catch (error: unknown) {
      if (typeof error === 'string') {
        ctx.sendMessage(error)
      }
    }
  }

  private async handleAnswerCommand(ctx: Context): Promise<void>{
    try {
      (Math.random() > 0.7) ? await ctx.replyWithVideo(
      { source: 'img/like.gif' },
      { caption: textAnswer()}
      ) : (() => {})
    } catch(err) {
      console.log(err)
    }
  }

  private async handleRespectCommand(ctx: Context): Promise<void>{
    try {
      let message = ctx.message;
      ctx.replyWithVideo(
        { source: "img/respect.gif" },
        { caption: `Уважение оказано @${message?.from.username}`}
      )
    } catch {
      (() => {})
    }
  }

  public launch(): void {
    this.bot.launch();
    process.once('SIGINT', () => this.bot.stop('SIGINT'))
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'))
  }
}

const bot = new Bot();
bot.launch();
