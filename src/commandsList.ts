import { Telegraf } from "telegraf";

export function setBotCommands(bot: Telegraf<any>){
    bot.telegram.setMyCommands([
        {
            command: 'help',
            description: 'Если тебе нужно связаться с администрацией, пиши!'
        },
        {
            command: 'start',
            description: 'Бот начинает работать (необязательно в чате)'
        },
        {
            command: 'sfw',
            description: 'Отправляет случайную аниме-пикчу'
        },
        {
            command: 'nsfw',
            description: 'Отправляет случайную хентай аниме-пикчу'
        },
    ])
}