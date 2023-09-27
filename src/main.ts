import { Telegraf, Context } from "telegraf";
import { setBotCommands } from "./commands.js";
import { text } from "./text.js";
import { getPicture } from "./request.js";
import { selectPicsSFW, selectPicsNSFW } from "./selectPics.js";
import dotenv from 'dotenv';

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
    } catch (error) {
      console.log(error);
    }
  }

  private async handleNSFWCommand(ctx: Context): Promise<void> {
    try {
      const data = await getPicture(selectPicsNSFW(), false);
      const picture: string = data.url;
      await ctx.replyWithPhoto({ url: picture });
    } catch (error) {
      console.log(error);
    }
  }

  public launch(): void {
    this.bot.launch();
  }
}

const bot = new Bot();
bot.launch();
