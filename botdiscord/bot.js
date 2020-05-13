const Discord = require('discord.js')
var config = require('./config.json');
const bot = new Discord.Client()
var MongoClient = require("mongodb").MongoClient;
var db;

bot.on('ready', function () {
  console.log(config.ConnectedMsg)
})

if(config.debug == true){
    process.on('unhandledRejection', error => {
        console.error('Unhandled promise rejection:', error);
    });
}

MongoClient.connect(config.mangoserver, { useUnifiedTopology: true}, function(error, client) {
    if (error) return funcCallback(error);
    db = client.db(config.BDD);
    console.log(`Connecté à la base de données '${config.BDD}'`);
});


bot.login(config.token)

//#region Message
// COUNT NB USER
bot.on('message', message => {
    if (message.content === '!user') {
        let myguild = bot.guilds.get(config.discordserver)
        let nb = myguild.memberCount;
        message.reply(nb)
    }
})

// ADD TO MANGO NB MSG ALLY
bot.on('message', message => {
    if (message.content === 'ally') {
        var objNew = { name: "Ally", ClientID: message.author.id.toString() , date: Date.now() };  
        AddMessageAlly(objNew)
    }
})

// ADD TO MANGO NB MSG HORDE
bot.on('message', message => {
    if (message.content === 'horde') {
        var objNew = { name: "Horde", ClientID: message.author.id.toString() , date: Date.now() };  
        AddMessageHorde(objNew)
    }
})

// NB OF MESSAGE BY DAY
var NbByDay = 0;
bot.on('message', message => {
    var objNew = { nbOfMessages: NbByDay, date: Date.now() };
    NbByDay ++;
    //console.log(NbByDay);
})

// Generate chanlist
var NbByDay = 0;
var finalObj = {};
var lastHelloCommandDate, lastHelloCommandUser;
bot.on('message', message => {
    if (message.content === '@!>chan') {
        var i = 0;
        const categoryChannels = bot.channels;
        categoryChannels.cache.forEach(channel => {
            //message.reply(channel.name + " => " + channel.id);
            var objNew = { name: channel.name, chanID: channel.id , date: Date.now() };  
            finalObj[i] = objNew;
            i++;
        });
        console.log(i);
        console.log(finalObj);
        SendChannelsList(finalObj);
    }
})
//#endregion
function AddMessageHorde(objNew){
    db.collection("MessageHorde").insertOne(objNew, null, function (error, results) {
        if (error) throw error;
    
        console.log("Le document a bien été inséré");    
    });
}
function AddMessageAlly(objNew){
    db.collection("MessageAlly").insertOne(objNew, null, function (error, results) {
        if (error) throw error;
    
        console.log("Le document a bien été inséré");    
    });
}

function NumberOfMessage(){
    db.collection("MessagesByDay").insertOne(objNew, null, function (error, results) {
        if (error) throw error;
    
        console.log("Le document a bien été inséré");    
    });  
}

function SendChannelsList(objNew){
    db.collection("ChannelsList").deleteMany({});
    db.collection("ChannelsList").insertOne(objNew, null, function (error, results) {
        if (error) throw error;
    
        console.log("Le document a bien été inséré");    
    });  
}