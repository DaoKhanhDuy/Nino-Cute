module.exports.config = {
    name: "admin",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "Bật tắt chế độ chỉ qtv dùng lệnh",
    commandCategory: "Hệ thống Admin-bot",
    usages: "Bật tắt chế độ chỉ admin và qtv dùng lệnh",
    cooldowns: 0,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": `[⚜️]•[⚜️] ADMIN [⚜️]•[🔱]\n\n%1 `,
        "listNDH": `[⚜️]•[⚜️] Người Hỗ Trợ Bot [⚜️]•[⚜️] \n\n%1`,
        "notHavePermssion": '[⚜️] Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": '[⚜️] Đã thêm %1 người dùng trở thành admin-bot:\n\n%2',
        "removedAdmin": '[⚜️] Đã gỡ bỏ %1 người điều hành bot:\n\n%2',
        "adminsupport": '[⚜️] Đã thêm %1 người dùng trở thành người hỗ trợ  người điều hành bot:\n\n%2'
    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermssion": '[Admin] You have no permission to use "%1"',
        "addedNewAdmin": '[Admin] Added %1 Admin :\n\n%2',
        "removedAdmin": '[Admin] Remove %1 Admin:\n\n%2'
    }
}
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
module.exports.run = async function ({ api, event, args, Threads, Users, permssion, getText }) {
    const axios = require('axios');
    const request = require('request');
    const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    const fs = require("fs-extra");
    const content = args.slice(1, args.length);
    if (args.length == 0)
    return axios.get('http://api-botchat.xyz/nino.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
    return api.sendMessage({body: `Bạn có thể dùng\n» admin add => thêm người dùng làm admin\n» admin list => xem danh sách các admin \n» admin remove => gỡ bỏ admin\n» admin boxonly => bật tắt chế độ chỉ quản trị viên dùng bot\n» admin only => bật tắt chế độ chỉ admin mới dùng được bot\n» HDSD: ${prefix} admin lệnh bạn cần dùng`,attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
                };
                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
      })
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { NDH } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    switch (args[0]) {
        case "list": {
          listAdmin = ADMINBOT || config.ADMINBOT ||  [];
            var msg = [];
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  const name = (await Users.getData(idAdmin)).name
                    msg.push(`[⚜️] ${name}\n[⚜️] Link: fb.me/${idAdmin}`);
                }
            }
          listNDH = NDH || config.NDH ||  [];
            var msg1 = [];
            for (const idNDH of listNDH) {
                if (parseInt(idNDH)) {
                  const name1 = (await Users.getData(idNDH)).name
                    msg1.push(`[⚜️] ${name1}\n[🔱] Link: fb.me/${idNDH}`);
                }
            }
return axios.get('http://api-botchat.xyz/nino.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
                    api.sendMessage({
body: `[⚜️] ADMINBOT [⚜️]\n»============«\n\n${msg.join("\n")}\n\n————————🔱————————\n\n[⚜️] SUPPORTBOT [⚜️]\n»============«\n\n${msg1.join("\n\n")}`,
                        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
                };
                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
            })
        }
        case "add": { 
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[⚜️] ${id} [⚜️] → ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return axios.get('http://api-botchat.xyz/nino.php').then(res => {
                    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
                    let callback = function () {
                                    api.sendMessage({body: `` + getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                                }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                            };
                            request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
                        })
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return axios.get('http://api-botchat.xyz/nino.php').then(res => {
                    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
                    let callback = function () {
                                    api.sendMessage({body: `` + getText("addedNewAdmin", 1, `[⚜️] ADMIN [⚜️]→ ${name}`), attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                                }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                            };
                            request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
                        })
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
case "sp": {
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    NDH.push(id);
                    config.NDH.push(id);
                    listAdd.push(`[⚜️] ${id} [⚜️] → ${event.mentions[id]}`);
                };
writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
return axios.get('http://api-botchat.xyz/nino.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
                    api.sendMessage({
body: `` + getText("adminsupport", mention.length, listAdd.join("\n").replace(/\@/g, "")),
                        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                    }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                };
                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
            })
            
}
            else if (content.length != 0 && !isNaN(content[0])) {
                NDH.push(content[0]);
                config.NDH.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return axios.get('http://api-botchat.xyz/nino.php').then(res => {
                    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
                    let callback = function () {
                                    api.sendMessage({
                body: `` + getText("adminsupport", 1, `[⚜️] ADMIN SP [⚜️]→ ${name}`),
                                        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                                    }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                                };
                                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
                })
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
        case "remove":
        case "rm":
        case "delete": {
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`[⚜️] ${id} [⚜️] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return axios.get('http://api-botchat.xyz/nino.php').then(res => {
                    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
                    let callback = function () {
                                    api.sendMessage({
                body: `` + getText("removeAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")),
                                        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                                    }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                                };
                                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
                            }) 
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return axios.get('http://api-botchat.xyz/nino.php').then(res => {
                    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
                    let callback = function () {
                                    api.sendMessage({
                body: `` + getText("removedAdmin", 1, `[⚜️] ${content[0]} [⚜️] → ${name}`),
                                        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                                    }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                                };
                                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
                            })
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }
        case 'boxonly': {
          if (permssion != 1) return axios.get('http://api-botchat.xyz/nino.php').then(res => {
            let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
            let callback = function () {
                            api.sendMessage({
        body: `[⚜️] Xin lỗi! lệnh này chỉ quản trị viên box mới dùng được`,
                                attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                            }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                        };
                        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
                    })
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;   
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            axios.get('http://api-botchat.xyz/nino.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
                    api.sendMessage({
body: `[⚜️] Tắt thành công chế độ Quản trị viên tất cả mọi người đều có thể sử dụng bot`,
                        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                    }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                };
                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
            })
        } else {
            adminbox[threadID] = true;
            axios.get('http://api-botchat.xyz/nino.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
                    api.sendMessage({
body: `[⚜️] Tắt thành công chế độ Quản trị viên tất cả mọi người đều có thể sử dụng bot`,
                        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                    }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                };
                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
            })
        }
        writeFileSync(pathData, JSON.stringify(database, null, 4));
        break;
    }
    case 'only':
        case '-o': {
            //---> CODE ADMIN ONLY<---//
            if (permssion != 3) return axios.get('http://api-botchat.xyz/nino.php').then(res => {
                let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
                let callback = function () {
                                api.sendMessage({
            body: `[⚜️] Xin lỗi! lệnh này chỉ admin or admin support mới dùng được`,
                                    attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                                }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                            };
                            request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
                        })
            if (config.adminOnly == false) {
                config.adminOnly = true;
                axios.get('http://api-botchat.xyz/nino.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
                    api.sendMessage({
body: `[⚜️] Bật thành công chỉ Admin mới dùng được bot`,
                        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                    }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                };
                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
            })
            } else {
                config.adminOnly = false;
                axios.get('http://api-botchat.xyz/nino.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
                    api.sendMessage({
body: `[⚜️] Tắt thành công chỉ Admin mới dùng được bot`,
                        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
                    }, threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), messageID);
                };
                request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
            })
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
              }
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}