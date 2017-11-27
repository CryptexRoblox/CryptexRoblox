const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");



client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setGame(`with ${client.users.size} users | !help`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`${client.guilds.size} servers | !help`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers | !help`);
});

client.on('message', message => {
  if (message.content === 'help') {
    message.reply('Having problems with the bot? Join the discord and ask the developers to try to figure out the problem!');
    message.reply('https://discord.gg/PVCwxKF');
  }
});

client.on("message", async message => {
  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "verify") {
    const m = await message.channel.send("Verifying...");
    m.edit(`Cryptex Roblox has no service to Verify anyone right now, that will be added in the near future.`);
  }

  if(command === "about") {
    const m = await message.channel.send("Loading..");
    m.edit(`This Discord Server is for the bot Cryptex Roblox, Cryptex Roblox is an easy to use service that provides ROBLOX-to-Discord verification/linking, and many other management commands. Founded/Developed by CryptexSin#5429 and SpecOps#0357`);
  }


  if(command === "owners") {
    const m = await message.channel.send("Loading..");
    m.edit(`CryptexSin (aka American_Geyser) SpecOps (aka TacticalChievlier)`);
  }

  if(command === "botinvite") {
    const m = await message.channel.send("Loading..");
    m.edit(`https://discordapp.com/oauth2/authorize?client_id=382657508298194946&scope=bot&permissions=872772671`);
  }

  if(command === "cryptexinvite") {
    const m = await message.channel.send("Loading..");
    m.edit(`https://discord.gg/PVCwxKF`);
  }

  if(command === "servers") {
    const m = await message.channel.send("Loading...");
    m.edit(`Cryptex Roblox is on: ${client.guilds.size} servers`);
  }

  if (message.content === "!roll") {
    var result = Math.floor((Math.random() * 100) + 1);
    client.reply(message, "You rolled a: " + result);
  }

  if (message.content === "!help") {
    message.channel.send(
      "**Cryptex Commands**" +
      "\n" +
      "\n`!help` - Show's what I can do" +
      "\n`!question <your question>` - Ask and you shall recieve" +
      "\n`!roll` - Roll a number between 1-100" +
      "\n`!flip` - Flip a coin" +
      "\n`!8ball` - !8ball [message]" +
      "\n`!about` - What the bot is for" +
      "\n`!servers` - See how many servers im in" +
      "\n`!purge` - delete messages" +
      "\n**Customer Commands**" +
      "\n" +
      "\n`!kick` - Kick a member" +
      "\n`!ban` - Ban a member, optional time limit" +
      "\n`!say` - !Say [your-message]" +
      "\n`!verify` - Verify Accounts on your Server" +
}

  if (message.content === "!flip") {
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
      message.reply(message, "The coin landed on heads");
    } else if (result == 2) {
      message.reply(message, "The coin landed on tails");
    }
  }


  if (message.content === "!8ball") {
    var sayings = ["It is certain",
                  "It is decidedly so",
                  "Without a doubt",
                  "Yes, definitely",
                  "You may rely on it",
                  "As I see it, yes",
                  "Most likely",
                  "Outlook good",
                  "Yes",
                  "Signs point to yes",
                  "Reply hazy try again",
                  "Ask again later",
                  "Better not tell you now",
                  "Cannot predict now",
                  "Concentrate and ask again",
                  "Don't count on it",
                  "My reply is no",
                  "My sources say no",
                  "Outlook not so good",
                  "Very doubtful"];

    var result = Math.floor((Math.random() * sayings.length) + 0);
    message.reply(message, sayings[result]);
  }


  if(command === "twitter") {
    const m = await message.channel.send("Loading..");
    m.edit(`RoLink Discord Twitter: https://twitter.com/CryptexRoblox`);
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

  if(command === "kick") {
    if(!message.member.roles.some(r=>["Customer"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if(command === "ban") {
    if(!message.member.roles.some(r=>["Customer"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "purge") {
    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
})



client.login('Token_ID');
