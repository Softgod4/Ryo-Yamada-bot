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
import { setBotCommands } from "./commandsList.js";
import { text } from "./inputData.js";
import { getPicture } from "./request.js";
import { selectPicsSFW, selectPicsNSFW } from "./selectPics.js";
import dotenv from 'dotenv';
import { message } from "telegraf/filters";
import { textAnswer } from "./answerCommand.js";
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
        this.bot.on(message('sticker'), this.handleAnswerCommand.bind(this));
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
                if (typeof error === 'string') {
                    ctx.sendMessage(error);
                }
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
                if (typeof error === 'string') {
                    ctx.sendMessage(error);
                }
            }
        });
    }
    handleAnswerCommand(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (Math.random() > 0.7) ? yield ctx.replyWithVideo({ source: 'img/like.gif' }, { caption: textAnswer() }) : (() => { });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    launch() {
        this.bot.launch();
    }
}
const bot = new Bot();
bot.launch();
