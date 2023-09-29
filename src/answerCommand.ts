import { InputFile } from "telegraf/types";
import { answerText } from "./inputData.js";

export const randomValueFromObject = (obj: { [key: string | number]: string }) => {
    let rand = Math.floor(Math.random() * Object.keys(obj).length)
    return rand
}

export function textAnswer(): string {
    const textAnswer = answerText[randomValueFromObject(answerText)];
    return textAnswer;
  }