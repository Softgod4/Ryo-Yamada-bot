export function selectPicsSFW() {
    const category = [
        'waifu', 'neko', 'shinobu', 'awoo',
        'megumin', 'bully', 'cuddle', 'cry',
        'kiss', 'lick', 'pat', 'smug', 'bonk',
        'smile', 'wave', 'yeet', 'blush', 'wink',
        'cringe', 'highfive', 'kill', 'happy', 'hug',
    ];
    return category[Math.floor(Math.random() * category.length)];
}
export function selectPicsNSFW() {
    const category = [
        'waifu', 'neko', 'trap', 'blowjob'
    ];
    return category[Math.floor(Math.random() * category.length)];
}
