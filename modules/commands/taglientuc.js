module.exports.config = {
    name: "taglientuc",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "hi",
    description: "Tag liên tục người bạn tag trong 5 lần\nCó thể gọi là gọi hồn người đó",
    commandCategory: "Tiện Ích",
    usages: "taglientuc @mention",
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage("Cần phải tag 1 người bạn muốn gọi hồn", event.threadID);
    let data = await api.getUserInfo(mention);
    let name = data[parseInt(mention)].name;
    var arraytag = [];
        arraytag.push({id: mention, tag: name});
    var a = function (a) { api.sendMessage(a, event.threadID); }
a("Bắt đầu tag !");
setTimeout(() => {a({body: "Alo cậu iu"+" "+name, mentions: arraytag}, )} , 3000);
setTimeout(() => {a({body: "Alo alo"+" "+name, mentions: arraytag}, )} , 5000);
setTimeout(() => {a({body: "Hiện hồn"+" "+name, mentions: arraytag}, )} , 7000);
setTimeout(() => {a({body: "Ai tìm cậu kìa aloo"+" "+name, mentions: arraytag}, )} , 9000);
setTimeout(() => {a({body: "Có người gặp mày kìa đĩ ơi"+" "+name, mentions: arraytag}, )} , 12000);
setTimeout(() => {a({body: "Hiện hồn đi cậu"+" "+name, mentions: arraytag}, )} , 15000);
setTimeout(() => {a({body: "Hiện hồn nhanh không người ta đốt nhà cậu giờ"+" "+name, mentions: arraytag}, )} , 17000);
setTimeout(() => {a({body: "Cậu đâu rồi có người tìm gấp kìa"+" "+name, mentions: arraytag}, )} , 20000);
setTimeout(() => {a({body: "Aloooooooooo trả lời đi alo alo"+" "+name, mentions: arraytag}, )} , 23000);
setTimeout(() => {a({body: "Đừng để Mình nóng"+" "+name, mentions: arraytag}, )} , 25000);
setTimeout(() => {a({body: "Mình đéo tag nữa mệt rồi, pai pai"+" "+name, mentions: arraytag}, )} , 28500);
setTimeout(() => {a({body: "TỚ dỗi rồi"+" "+name, mentions: arraytag}, )} , 31000);
setTimeout(() => {a({body: "Gửi thành công đến"+" "+name, mentions: arraytag}, )} , 36000);
  
  }
