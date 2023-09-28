import { answerText, stickerId } from "./inputData.js";

export function stickerAnswer(): string {
    const sticker = stickerId[1];
    return sticker;
}

export function textAnswer(): string {
    const textAnswer = answerText[1];
    return textAnswer;
}