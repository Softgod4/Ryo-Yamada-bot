import { answerText } from "./inputData.js";
export const randomValueFromObject = (obj) => {
    let rand = Math.floor(Math.random() * Object.keys(obj).length);
    return rand;
};
export function textAnswer() {
    const textAnswer = answerText[randomValueFromObject(answerText)];
    return textAnswer;
}
