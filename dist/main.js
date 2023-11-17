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
const bot = new Telegraf(process.env.BOT_TOKEN);
setBotCommands(bot);
bot.command('help', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.replyWithPhoto({ source: 'img/boshi+mrbeast.jpg' }, { caption: text.help });
}));
bot.command('sfw', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
bot.command('nsfw', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
bot.on(message('sticker'), (ctx) => {
    try {
        if (Math.random() > 0.7) {
            ctx.replyWithVideo({ source: 'img/like.gif' }, { caption: textAnswer() });
        }
    }
    catch (err) {
        console.log(err);
    }
});
bot.hears('+', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let message = ctx.message;
        ctx.replyWithVideo({ source: "img/respect.gif" }, { caption: `Уважение оказано @${message === null || message === void 0 ? void 0 : message.from.username}` });
    }
    catch (_a) {
        (() => { });
    }
}));
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
