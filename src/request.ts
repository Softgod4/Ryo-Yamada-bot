import { promises } from "dns";
import { METHODS } from "http";
import fetch from "node-fetch";

export async function getPicture(category: string, sfw: boolean): Promise<any> {
    if(sfw){
        let responce = await fetch(`https://api.waifu.pics/sfw/${category}`, {method: 'GET'})
        let data: unknown = await responce.json(); 
        return data;
    } else {
        let responce = await fetch(`https://api.waifu.pics/nsfw/${category}`, {method: 'GET'})
        let data: unknown = await responce.json(); 
        return data;
    }
}
