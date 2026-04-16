const {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

const fs = require('fs');

fs.readdirSync('./commands').forEach(file => {
  const cmd = require(`./commands/${file}`);
  client.commands.set(cmd.name, cmd);
});

const mensagemModal = require('./modals/mensagemModal');
const registroModal = require('./modals/registroModal');

const CANAL_REVISAO = "1494078370663891066";
const CARGO_PM = "1494043675196395580";
const CARGO_REMOVER = "1494041040062255154";

const PATENTES = {
  "3ª SARGENTO": { cargo: "1494041432300720269", simbolo: "[❯❯❯]" },
  "CABO": { cargo: "1494041034810982461", simbolo: "[❯❯]" },
  "SOLDADO 1ª CLASSE": { cargo: "1494041036446498886", simbolo: "[❯]" },
  "SOLDADO 2ª CLASSE": { cargo: "1494041036861734914", simbolo: "[ ]" }
};

client.on(Events.MessageCreate, async msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith('!')) return;

  const args = msg.content.slice(1).split(/\s+/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);
  if (command) command.execute(msg);
});

client.on(Events.InteractionCreate, async interaction => {

  if (interaction.isButton()) {

    if (interaction.customId === 'abrir_registro') {
      return registroModal.show(interaction);
    }

    if (interaction.customId === 'abrir_mensagem_modal') {
      return mensagemModal.show(interaction);
    }

    if (interaction.customId.startsWith("aceitar_")) {

      const userId = interaction.customId.split("_")[1];
      const membro = await interaction.guild.members.fetch(userId);

      const embed = interaction.message.embeds[0];

      const nome = embed.data.fields[0].value;
      const id = embed.data.fields[1].value;
      const patente = embed.data.fields[2].value;

      const dados = PATENTES[patente];

      await membro.roles.add([dados.cargo, CARGO_PM]);

      if (membro.roles.cache.has(CARGO_REMOVER)) {
        await membro.roles.remove(CARGO_REMOVER);
      }

      try {
        await membro.setNickname(`${dados.simbolo} ${nome} | ${id}`);
      } catch {}

      return interaction.update({ content: "Aprovado", components: [] });
    }

    if (interaction.customId.startsWith("recusar_")) {
      return interaction.update({ content: "Recusado", components: [] });
    }
  }

  if (interaction.isModalSubmit()) {

    if (interaction.customId === 'modal_mensagem') {
      return mensagemModal.submit(interaction);
    }

    if (interaction.customId === 'modal_registro') {
      return registroModal.submit(interaction, client, CANAL_REVISAO);
    }
  }
});

client.once(Events.ClientReady, () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.login(process.env.TOKEN);
