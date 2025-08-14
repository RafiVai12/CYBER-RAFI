const moment = require("moment-timezone");
const fs = require("fs-extra");

const settingsPath = __dirname + "/autotime-settings.json";

// প্রাথমিক সেটিংস (যদি ফাইল না থাকে)
if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, JSON.stringify({ enabled: true }, null, 2));
}

const groupThreads = [
    "30711769645137573",
    "30071079139202549",
    "24084870691105207",
    "30581847821463512",
    "9975530682575328"
];

const messages = {
    "00:00": "এখন রাত ১২ টা বাজে, মোবাইল রাখ ঘুমা...! 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃😕",
    "01:00": "রাত ১টা বাজতে চললো, তোরা চ্যাটিং অফ কর...! 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃🙂",
    "02:00": "রাত ২টা বাজে 🙂, তোদের কি ঘুম আসেনা..? 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃🤨",
    "03:00": "এখন রাত ৩টা, সবাই ঘুম আর তোরা জেগে আছিস মানে তোরা বলদ...! 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃🙂",
    "04:00": "ভোর ৪টা বাজে, একটু পর আজান দিবে...! 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃🥰",
    "05:00": "এখন ভোর ৫টা, নামাজ পরসো?...! 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃👀",
    "06:00": "সকাল ৬টা বেজে গেলো, আমি একাই উঠে পরসি...! 🌻𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃💜",
    "07:00": "৭টা বাজে, তোরা এখনো ঘুমাস..! 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃🤔",
    "08:00": "সকাল ৮টা, ঘুম থেকে উঠে পর...!𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃 🤧",
    "09:00": "৯টা বাজে তাও বিছানা ছাড়িস না কেন..?𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃😒", 
    "10:00": "১০টা বেজে গেলো, জমিদারের সন্তানরা এখন নাস্তা করে ফেলো..! 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃🙂",
    "11:00": "১১টা বাজে, কিন্তু সময় কাটছে না..!𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃😖",
    "12:00": "দুপুর ১২টা, কি খবর তোমাদের..? 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃😌",
    "13:00": "১টা বেজে গেসে, নামাজের জন্য প্রস্তুতি নেও..! 💜𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃🌻",
    "14:00": "দুপুর ২টা, সবাই Lunch করে ফেলো...! 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃😋",
    "15:00": "দুপুর ৩টা বাজে, একটু ঘুমাও..! 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃🫶",
    "16:00": "বিকেল ৪টা বেজে গেসে, মাঠে যাও খেলাধুলা করো..! 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃👊",
    "17:00": "এখন বিকেল ৫টা, আসরের নামাজ পড়ে নাও...! 😌𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃🌻",
    "18:00": "৬টা বাজে, সন্ধ্যা হয়ে গেলো...!𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃 🌆",
    "19:00": "৭টা বাজে, মাগরিবের নামাজ পড়তে যাও..! 💜𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃🫶",
    "20:00": "এখন রাত ৮টা, একটু পড়তে বসো..! 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃😒",
    "21:00": "রাত ৯টা বেজে গেলো, কি করছো তোমরা...? 𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃🫣",
    "22:00": "রাত ১০টা Dinner টাইম, খাইসো নাকি খাবা? 😋𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃💜",
    "23:00": "রাত ১১টা বাজে, শুয়ে পড়ো সারাদিন ক্লান্ত ছিলে...!𝐙𝐈𝐒𝐀𝐍 𝐀𝐇𝐌𝐄𝐃😇"
};

module.exports.config = {
    name: "autotime",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "𝐅𝐞𝐫𝐝𝐨𝐮𝐬 𝐖𝐚𝐡𝐢𝐝",
    description: "ঢাকা সময় অনুযায়ী নির্দিষ্ট সময়ে গ্রুপে মেসেজ পাঠাবে (on/off সাপোর্ট সহ)",
    commandCategory: "automation",
    usages: "[on/off]",
    cooldowns: 3
};

let intervalID = null;

module.exports.onLoad = function ({ api }) {
    const settings = JSON.parse(fs.readFileSync(settingsPath));
    if (settings.enabled) {
        startAutoTime(api);
    }
};

module.exports.run = function ({ api, event, args }) {
    const settings = JSON.parse(fs.readFileSync(settingsPath));

    if (args[0] === "on") {
        if (settings.enabled) return api.sendMessage("⏳ Autotime আগেই চালু আছে!", event.threadID);
        settings.enabled = true;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        startAutoTime(api);
        return api.sendMessage("✅ Autotime চালু করা হয়েছে!", event.threadID);
    }

    if (args[0] === "off") {
        if (!settings.enabled) return api.sendMessage("⏳ Autotime আগেই বন্ধ আছে!", event.threadID);
        settings.enabled = false;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        stopAutoTime();
        return api.sendMessage("⛔ Autotime বন্ধ করা হয়েছে!", event.threadID);
    }

    return api.sendMessage("📌 ব্যবহার: autotime on / autotime off", event.threadID);
};

function startAutoTime(api) {
    if (intervalID) clearInterval(intervalID);

    intervalID = setInterval(() => {
        const currentTime = moment().tz("Asia/Dhaka").format("HH:mm");
        if (messages[currentTime]) {
            groupThreads.forEach(threadID => {
                api.sendMessage(messages[currentTime], threadID);
            });
        }
    }, 60 * 1000);
}

function stopAutoTime() {
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    }
  }
