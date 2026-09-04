const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');

// Load environment variables from .env file
require('dotenv').config();
const TOKEN = process.env.TOKEN

// Replace with your bot token
// Replace with the URL you want to POST to


const insultes = [
  "Ta gueule",
  "T'es pas intéressant",
  "On s'en fou de ta vie",
  "Pourquoi tu parles",
  "Qui t'as demandé",
  "Arrête de parler, vraiment tu pourrais casser les couilles à un sourd",
  "Non, moi je crois qu'il faut que vous arrêtiez d'essayer de dire des trucs. Ça vous fatigue, déjà, et pour les autres, vous vous rendez pas compte de ce que c'est. Moi quand vous faites ça, ça me fout une angoisse... Je pourrais vous tuer, je crois. De chagrin, hein ! Je vous jure c'est pas bien. Il faut plus que vous parliez avec des gens.",

]

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });
const channelId = "1412728197707075637"
const guildId = "1412728196948037685"
const targetUsername = process.env.TARGET_USERNAME





client.once(Events.ClientReady, async () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
  console.log("En train de bully", targetUsername);
});



// Commandes du bot
client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;
  if (message.author.username !== targetUsername) return

  await message.react("🤫");

  await message.reply({
      content: insultes[Math.floor(Math.random() * insultes.length)],
  });

});

// Gestion des interactions avec les boutons
client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  console.log("oldState", JSON.stringify(oldState));
  console.log("newState", JSON.stringify(newState));
  if (oldState.member.user.username !== targetUsername) return


  // quitte un vocal
  if(oldState.channelId !== null && newState.channelId === null) {
    console.log("leaving channel");
    const channel = newState.guild.channels.fetch(`${channelId}`)
      .then(channel => channel.send("Enfin une bonne idée, arrêter de parler"))
      .then(message => message.react("👎"))
      .catch(console.error);
      
    return

  };
} )

client.login(TOKEN);
