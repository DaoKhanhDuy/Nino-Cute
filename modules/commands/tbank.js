'use strict';
module.exports.config = {
    name: "tbank", // Tên lệnh, được sử dụng trong việc gọi lệnh
    version: "1.0.0", // phiên bản của module này
    hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
    credits: "DungUwU", // Công nhận module sở hữu là ai
    description: "ngân hàng xD", // Thông tin chi tiết về lệnh
    commandCategory: "game", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
    usages: "[key]\n-=o===----\nVới các key:\n[-r/register]\n[-i/info]\n[-d/deposit] [số tiền]\n[-w/withdraw] [số tiền]\n[-t/transfer] [@tag/số tài khoản] [số tiền]\n[-s/saving]\n[-l/loan]\n-=o===----", // Cách sử dụng lệnh
    cooldowns: 5,
    dependencies: {
        "canvas": ""
    },
    envConfig: {
        key: "DURg4SRzfZe9JAjTTf"
    }
};

module.exports.languages = {
    "vi": {
        "insufficientBalanceForReg": "Số dư không đủ để đăng ký, bạn cần tối thiểu %1",
        "not_ok": "Server TBank hiện không khả dụng..",
        "input_not_ok": "Dữ liệu bạn nhập có vẻ không hợp lệ..",
        "alreadyRegistered": "Bạn đã đăng ký thẻ từ trước!",
        "isGroup": "Vui lòng inbox bot để sử dụng.",
        "regSuccess": "Đăng ký thành công!",
        "depositSuccess": "Nạp %1$ thành công!\nSố dư trong bank hiện tại: %2$",
        "withdrawSuccess": "Rút %1$ thành công!\nSố dư trong bank hiện tại: %2$",
        "accountInfo": "\n - Tài khoản: %1\n - Mã thẻ: %2\n - Mật mã thẻ: %3\n - Số dư: %4",
        "accountNotAvailable": "Bạn chưa đăng ký tài khoản ngân hàng nào cả!",
        "insufficientBalance": "Số dư không đủ để thực hiện giao dịch này!",
        "minTransferAmount": "Số tiền bạn nhập thấp hơn mức tối thiểu! (%1$)",
        "missingInput": "Thiếu nhập liệu!",
        "lowerThanMinTransferAmount": "Số tiền bạn nhập chưa đạt mức tối thiểu (%1$)",
        "moreThanOneMention": "Vui lòng chỉ tag 1 người.",
        "idNotValid": "Số tài khoản bạn nhập không hợp lệ.",
        "amountNotNumber": "Số tiền bạn nhập không hợp lệ",
        "notEnoughMoneyFromBank": "Số dư bạn không đủ để thực hiện giao dịch này!\nSố tiền muốn chuyển: %1$\nSố tiền cần có: %2$\nSố dư hiện tại: %3$",
        "savingsOptions": "=== Tài Khoản Tiết Kiệm ===\n- 1. Gửi tiền\n- 2. Rút tiền\n- 3. Xem số dư\n\n-o Reply theo số tương ứng thế thực thi.",
        "savingsBalance": "Số dư sổ tiết kiệm của bạn hiện tại là: %1$\nSố dư tiết kiệm có thể rút: %2$",
        "savingsRequestSuccess": "Thực thi thành công!\nSố dư sổ tiết kiệm hiện tại: %1$",
        "loanOptions": "=== Vay Ngân Hàng ===\n- 1. Vay tiền\n- 2. Trả nợ\n- 3. Xem số nợ\n\n-o Reply theo số tương ứng thế thực thi.",
        "loanBalance": "Tổng số nợ của bạn hiện tại là: %1$\nDanh sách nợ của bạn:\n Số tiền - Lãi suất - Thời hạn\n %2",
        "loanRequestSuccess": "Thực thi thành công!\nSố nợ hiện tại: %1$",
        "outOfChoosenRange": "Lựa chọn của bạn không hợp lệ, vui lòng chọn lại.",
        "enterAmount": "Hãy nhập số tiền.",
        "enterPasswordFromInbox": "Vui lòng kiểm tra tin nhắn bot gửi cho bạn.",
        "enterSecretKey": "Vui lòng reply tin nhắn này mã bảo mật của bạn",
        "forReal": "Bằng 1 cách thân kỳ nào đó mà bạn đến được đây...",
        "invalidCommand": "===== TBank =====\n[-r] register: Đăng ký tài khoản.\n[-i] info: Thông tin tài khoản.\n[-d] deposit: Nạp tiền.\n[-w] withdraw: Rút tiền.\n[-t] transfer: Chuyển tiền vào tài khoản khác.\n[-s] savings: Sổ tiết kiệm\n[-l] loan: Vay tiền.\n\n-o Để biết thêm chi tiết, dùng:\n%1help %2",
    }
};

const bankAPI = 'https://PleasedRoyalblueCylinders.nhattan3011.repl.co/';
const bankBanner = "https://i.ibb.co/HrwT77h/banner-Tbank.jpg";

const getTransferImage = async (data) => await new Promise(async (resolve, reject) => {
    const { registerFont, createCanvas, loadImage } = require('canvas');
    const baseImageURI = 'https://i.ibb.co/hyJ95gV/transfer.jpg';
    try {
        registerFont(await global.utils.assets.font("BOLD-FONT"), {
            family: "Manrope",
            weight: "bold",
            style: "normal"
        });
        const canvas = createCanvas(1280, 1920);
        const ctx = canvas.getContext("2d");
        const pic = await loadImage(baseImageURI).catch(err => console.log('oh no!', err));

        ctx.drawImage(pic, 0, 0, canvas.width, canvas.height);
        ctx.font = `60px "Sans"`;
        ctx.textAlign = "left";

        //SENDER
        ctx.fillText(data.senderName || data.author, 110, 480);
        //RECEIVER
        ctx.fillText(data.receiverName || data.receiver, 110, 775);

        ctx.font = `45px "Sans"`;
        ctx.textAlign = "right";
        //DESCRIPTION
        ctx.fillText("Chuyển Khoản", 1160, 1150);
        //AMOUNT
        ctx.fillText(data.amount + "$", 1160, 1269);
        //FEE
        ctx.fillText(data.fee + "$", 1160, 1386);
        //TOTAL
        ctx.fillText(data.total + "$", 1160, 1503);
        //DATE
        ctx.fillText(data.date, 1160, 1621);

        const imageBuffer = canvas.toBuffer();
        let pathImg = __dirname + `/cache/transfer_${data.transferID}.png`;
        require("fs").writeFileSync(pathImg, imageBuffer);
        return resolve(pathImg);
    } catch (e) {
        reject(e);
    }
});


module.exports.handleReply = async function ({ api, event, Users, handleReply, Currencies, getText }) {

    //DEFINE VALUES AND FUNCTIONS
    const axios = require("axios");
    const { key } = global.configModule[this.config.name];
    const { threadID, messageID, senderID } = event;
    const { increaseMoney, decreaseMoney } = Currencies;
    const send = async (msg) => api.sendMessage(msg, threadID, messageID);
    const sendT = async (msg) => api.sendMessage(msg, threadID);
    const sendIB = async (msg) => api.sendMessage(msg, senderID);

    //CHECK AUTHOR
    if (handleReply.author != senderID) return;

    //DEFINE INPUT
    var input = event.body;
    if (!input) return;

    //HERE COME SWITCH CASE...
    switch (handleReply.type) {
        case "info":
            {
                const secretKey = input;
                await axios.get(encodeURI(bankAPI + `info/${key}_${senderID}_${secretKey}`)).then(async (res) => {
                    let { data } = res;
                    let { status } = data;
                    if (status == -2) return send(data.message);
                    if (status == -1) return send(getText("forReal"));
                    if (status == 0) return send(getText("accountNotAvailable"));
                    api.unsendMessage(handleReply.messageID);
                    return send({
                        body: getText("accountInfo", data.acccountNumber, data.cardNumber, data.secretKey, data.balance),
                        attachment: (await axios.get(encodeURI(data.image), { responseType: "stream" }).catch(e => console.log(e))).data
                    });
                }).catch(e => sendT(getText("not_ok")));
            }
            break;
        case "deposit":
        case "withdraw":
            {
                const secretKey = input;
                let type = handleReply.type == "deposit" ? "deposit" : "withdraw";
                if (type == "deposit") await decreaseMoney(senderID, handleReply.amount);
                await axios.get(encodeURI(bankAPI + `${type}/${key}_${senderID}_${secretKey}_${handleReply.amount}`)).then(async (res) => {
                    let { data } = res;
                    let { status, message } = data;
                    if (status == -2) return send(message).then(async () => await increaseMoney(senderID, handleReply.amount));
                    if (status == -1) return send(getText("forReal")).then(async () => await increaseMoney(senderID, handleReply.amount));
                    if (status == 0) return send(message).then(async () => await increaseMoney(senderID, handleReply.amount));
                    api.unsendMessage(handleReply.messageID);
                    await increaseMoney(senderID, handleReply.amount);
                    return send(getText(`${type}Success`, handleReply.amount, data.balance));
                }).catch(e => sendT(getText("not_ok")));
            }
            break;
        case "transfer":
            {
                const secretKey = input;
                let getTransferSecretCode = await axios.get(encodeURI(bankAPI + `verifyTransfer/${key}_${senderID}_${secretKey}_${handleReply.data.transferID}`)).catch(e => sendT(getText("not_ok")));
                let { data } = getTransferSecretCode;
                let { status, message } = data;
                if (status == -2) return sendIB(message);
                if (status == -1) return sendIB(getText("forReal"));
                if (status == 0) return sendIB(message || getText("notEnoughMoneyFromBank", data.required, data.requested, data.balance));
                api.unsendMessage(handleReply.messageID);
                const fs = require("fs");

                data.senderName = await Users.getNameUser(handleReply.author);
                data.receiverName = await Users.getNameUser(handleReply.receiver);
                await getTransferImage(data).then(path => {
                    sendIB({
                        body: "GIAO DỊCH THÀNH CÔNG!",
                        attachment: fs.createReadStream(path)
                    }).then(fs.unlinkSync(path));
                });
            }
            break;
        case "savings":
        case "loan":
            {
                const secretKey = input;
                let getAccountAccessToken = await axios.get(encodeURI(bankAPI + `getAccountAccessToken/${key}_${senderID}_${secretKey}`)).catch(e => sendT(getText("not_ok")));
                let { data } = getAccountAccessToken;
                let { status, message } = data;
                if (status == -2) return sendIB(message);
                if (status == -1) return sendIB(getText("forReal"));
                if (status == 0) return sendIB(message);
                api.unsendMessage(handleReply.messageID);
                let { accessToken } = data;
                let type = handleReply.type == "savings" ? "savingsOptions" : "loanOptions";
                sendIB(getText(type)).then((err, info) => {
                    global.client.handleReply.push({
                        type,
                        name: this.config.name,
                        messageID: info.messageID,
                        accessToken,
                        author: senderID
                    });
                });
            }
            break;
        case "savingsOptions":
        case "loanOptions":
            {
                const choosenIndex = parseInt(input) - 1;
                if (choosenIndex < 0 || choosenIndex > 3 || isNaN(choosenIndex)) return sendT(getText("outOfChoosenRange"));
                const { accessToken } = handleReply;
                api.unsendMessage(handleReply.messageID);
                let type = handleReply.type == "savingsOptions" ? "savings" : "loan";
                switch (choosenIndex) {
                    case 1:
                    case 2:
                        {
                            let options = "";
                            if (choosenIndex == 1) options = type == "savings" ? "deposit" : "get";
                            else options = type == "savings" ? "withdraw" : "pay";
                            sendIB(getText("enterAmount")).then((err, info) => {
                                global.client.handleReply.push({
                                    type: type == "savings" ? "savingsRequest" : "loanRequest",
                                    name: this.config.name,
                                    messageID: info.messageID,
                                    accessToken,
                                    options
                                });
                            });
                        }
                        break;
                    case 3:
                        {
                            let getSavingsBalance = await axios.get(encodeURI(bankAPI + `${type}/${key}_${accessToken}_balance`)).catch(e => sendT(getText("not_ok")));
                            let { data } = getSavingsBalance;
                            let { status, message } = data;
                            if (status != 1) return sendIB(message);
                            if (type == "savings") {
                                sendIB(getText("savingsBalance", data.balance, data.withdrawable));
                            } else {
                                let loanList = "";
                                for (let i = 0; i < data.loanData.length; i++) 
                                    loanList += `\n${i + 1}. ${data.loanData[i].amount}$ - ${data.loanData[i].interest}$ - ${data.loanData[i].timeLeft}`;
                                sendIB(getText("loanBalance", data.total, loanList));
                            }
                        }
                        break;
                    default:
                        sendIB(getText("outOfChoosenRange"));
                        break;
                }
            }
            break;
        case "savingsRequest":
        case "loanRequest":
            {
                const { accessToken, options } = handleReply;
                const amount = parseInt(input);
                if (isNaN(amount) || amount < 0) return sendIB(getText("amountNotNumber"));
                api.unsendMessage(handleReply.messageID);
                let type = handleReply.type == "savingsRequest" ? "savings" : "loan";
                let savingsRequest = await axios.get(encodeURI(bankAPI + `${type}/${key}_${accessToken}_${options}_${amount}`)).catch(e => sendT(getText("not_ok")));
                let { data } = savingsRequest;
                let { status, message } = data;
                if (status != 1) return sendIB(message);
                sendIB(getText(type == "savings" ? "savingsRequestSuccess" : "loanRequestSuccess", data.balance));
            }
            break;
    }
};

module.exports.run = async function ({ api, event, args, Currencies, Threads, getText }) {
    //DEFINE VALUES AND FUNCTIONS
    const axios = require("axios");
    const { key } = global.configModule[this.config.name];
    const { threadID, messageID, senderID, mentions } = event;
    const { increaseMoney, decreaseMoney, getData } = Currencies;
    const send = async (msg) => api.sendMessage(msg, threadID, messageID);
    const sendT = async (msg) => api.sendMessage(msg, threadID);
    const sendIB = async (msg) => api.sendMessage(msg, senderID);
    const registrationFee = 200; //ANY AMOUNTS SHOULD WORK
    const minTransferAmount = 500; //ANY AMOUNTS SHOULD WORK


    //GET SENDER BALANCE//
    let balance = (await getData(senderID)).money;

    //I DON'T KNOW WHAT TO COMMENT HERE... ANY SUGGESTIONS?
    switch (args[0]) {
        case "-r":
        case "reg":
        case "register":
            {
                if (balance < registrationFee) return send(getText("insufficientBalanceForReg", registrationFee));
                if (event.isGroup) return send(getText("isGroup"));
                await decreaseMoney(senderID, registrationFee);
                await axios.get(encodeURI(bankAPI + `reg/${key}_${senderID}`)).then(async (res) => {
                    let { data } = res;
                    let { status } = data;
                    if (status == -2) return send(data.message).then(async () => await increaseMoney(senderID, registrationFee));
                    else if (status == -1) return send(getText("forReal")).then(async () => await increaseMoney(senderID, registrationFee));
                    else if (status == 0) return send(getText("alreadyRegistered")).then(async () => await increaseMoney(senderID, registrationFee));
                    else {
                        //The status seems good..
                        let { card } = data;
                        return send({
                            body: getText("regSuccess") + getText("accountInfo", card.accountNumber, card.cardNumber, card.secretKey, card.balance),
                            attachment: (await axios.get(encodeURI(card.image), { responseType: "stream" }).catch(e => sendT(getText("not_ok")))).data
                        });
                    }
                }).catch(e => sendT(getText("not_ok")));
            }
            break;
        case "-i":
        case "info":
            {
                if (event.isGroup) return send(getText("isGroup"));
                let findAccount = await axios.get(encodeURI(bankAPI + `find/${key}_${senderID}`)).catch(e => sendT(getText("not_ok")));
                let { data } = findAccount;
                let { status } = data;
                if (status == -2) return send(data.message);
                else if (status == -1) return send(getText("forReal"));
                else if (status == 0) return send(getText("accountNotAvailable"));
                send(getText("enterSecretKey")).then((err, info) => {
                    global.client.handleReply.push({
                        type: "info",
                        name: this.config.name,
                        messageID: info.messageID,
                        author: senderID
                    });
                });
            }
            break;
        case "-d":
        case "deposit":
        case "-w":
        case "withdraw":
            {
                if (event.isGroup) return send(getText("isGroup"));
                const amount = parseInt(args[1]);
                if (isNaN(amount) || amount < 0) return sendIB(getText("amountNotNumber"));
                if (["-d", "deposit"].includes(args[0])) {
                    if (balance < amount) return sendIB(getText("insufficientBalance"));
                }
                sendIB(getText("enterSecretKey")).then((err, info) => {
                    global.client.handleReply.push({
                        type: ["-d", "deposit"].includes(args[0]) ? "deposit" : "withdraw",
                        name: this.config.name,
                        messageID: info.messageID,
                        author: senderID,
                        amount
                    });
                });
            }
            break;
        case "-t":
        case "transfer":
            {
                //DEFINE INPUT
                if (args.length < 3) return sendT(getText("missingInput"));
                let receiver = args[1], nameL = args[1].length;
                let tags = Object.keys(mentions);
                if (tags[0]) {
                    if (tags.length > 1) return send(getText("moreThanOneMention"));
                    receiver = tags[0];
                    nameL = mentions[tags[0]].length;
                }
                let transferAmount = parseInt(args.slice(1).join(" ").slice(nameL + 1));

                //CHECK INPUT
                if (isNaN(parseInt(receiver))) return send(getText("idNotValid"));
                if (isNaN(parseInt(transferAmount))) return send(getText("amountNotNumber"));

                if (transferAmount < minTransferAmount) return send(getText("lowerThanMinTransferAmount", minTransferAmount));
                await axios.get(encodeURI(bankAPI + `requestTransfer/${key}_${senderID}_${receiver}_${transferAmount}`)).then(res => {
                    let { data } = res;
                    let { status, message } = data;
                    if (status == -2) return send(message);
                    else if (status == -1) return send(getText("forReal"));
                    else if (status == 0) return send(message);
                    else {
                        //The status seems good..
                        return send(getText("enterPasswordFromInbox")).then(() => {
                            sendIB(getText("enterSecretKey")).then((err, info) => {
                                global.client.handleReply.push({
                                    type: "Transfer",
                                    name: this.config.name,
                                    messageID: info.messageID,
                                    data,
                                    receiver,
                                    author: senderID
                                });
                            });
                        });
                    }
                }).catch(e => sendT(getText("not_ok")));
            }
            break;
        case "-s":
        case "savings":
        case "-l":
        case "loan":
            {
                if (event.isGroup) return send(getText("isGroup"));
                send(getText("enterSecretKey")).then((err, info) => {
                    global.client.handleReply.push({
                        type: ["-s", "savings"].includes(args[0]) ? "savings" : "loan",
                        name: this.config.name,
                        messageID: info.messageID,
                        author: senderID
                    });
                });
            }
            break;
        default:
            //getPrefix
            const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
            const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
            sendT({
                body: getText("invalidCommand", prefix, this.config.name),
                attachment: (await axios.get(encodeURI(bankBanner), { responseType: "stream" }).catch(e => sendT(getText("not_ok")))).data
            });
            break;
    }
};