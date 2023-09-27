var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Telegraf } from "telegraf";
import { setBotCommands } from "./commands.js";
import { text } from "./text.js";
import { getPicture } from "./request.js";
import { selectPicsSFW, selectPicsNSFW } from "./selectPics.js";
import dotenv from 'dotenv';
dotenv.config();
class Bot {
    constructor() {
        this.bot = new Telegraf(process.env.BOT_TOKEN);
        this.setCommands();
        this.setHandlers();
    }
    setCommands() {
        setBotCommands(this.bot);
    }
    setHandlers() {
        this.bot.command('help', this.handleHelpCommand.bind(this));
        this.bot.command('sfw', this.handleSFWCommand.bind(this));
        this.bot.command('nsfw', this.handleNSFWCommand.bind(this));
    }
    handleHelpCommand(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ctx.replyWithPhoto({ source: 'img/boshi+mrbeast.jpg' }, { caption: text.help });
        });
    }
    handleSFWCommand(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield getPicture(selectPicsSFW(), true);
                const picture = data.url;
                yield ctx.replyWithPhoto({ url: picture });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    handleNSFWCommand(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield getPicture(selectPicsNSFW(), false);
                const picture = data.url;
                yield ctx.replyWithPhoto({ url: picture });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    launch() {
        this.bot.launch();
    }
}
const bot = new Bot();
bot.launch();
