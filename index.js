const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) return;

  const args = message.content.slice(1).split(/\s+/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);
  if (command) command.execute(message);
});

const mensagemModal = require('./modals/mensagemModal');

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId === 'abrir_mensagem_modal') {
      return mensagemModal.show(interaction);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'modal_mensagem') {
      return mensagemModal.submit(interaction);
    }
  }
});

client.once(Events.ClientReady, () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.login(process.env.TOKEN);
