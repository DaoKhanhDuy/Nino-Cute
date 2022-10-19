module.exports.config = {
    name: "tikvideo",
    version: "1.1.12",
    hasPermssion: 0,
    credits: "",
    description: "",
    commandCategory: "media",
    usages: "",
    cooldowns: 5,
    dependencies: {"axios": ""}
};
module.exports.run = async function ({ event, api, args, Users }) {
  try{
    const axios = global.nodemodule["axios"];
  const res = await axios.post('https://www.tikwm.com/api/', {
                url: args[0],
                count: 12,
                cursor: 0,
                hd: 1
        });
        if(res.status == 200){
            // test for status you want, etc
            console.log(res.status);
          const k = res.data
             const t = (await axios.get(`${k.data.play}`, { responseType: "stream" })).data;
    return api.sendMessage({ 
      body: `Tiêu đề: ${k.data.title}
      \n\nTên kênh: ${k.data.author.nickname} \n\nTym: ${k.data.digg_count}\n\nView: ${k.data.play_count}\n\n`,
      attachment: t
    }, event.threadID)
  }
  }
    catch (err) {
        console.log(err)
        return api.sendMessage("Đã xảy ra lỗi từ api", event.threadID);
}        
}