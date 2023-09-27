var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
export function getPicture(category, sfw) {
    return __awaiter(this, void 0, void 0, function* () {
        if (sfw) {
            let responce = yield fetch(`https://api.waifu.pics/sfw/${category}`, { method: 'GET' });
            let data = yield responce.json();
            return data;
        }
        else {
            let responce = yield fetch(`https://api.waifu.pics/nsfw/${category}`, { method: 'GET' });
            let data = yield responce.json();
            return data;
        }
    });
}
