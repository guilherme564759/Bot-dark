const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'mensagem',
  execute(msg) {

    const embed = new EmbedBuilder()
      .setTitle("📨 Criar mensagem")
      .setDescription("Clique abaixo.");

    const btn = new ButtonBuilder()
      .setCustomId("abrir_mensagem_modal")
      .setLabel("Abrir")
      .setStyle(ButtonStyle.Primary);

    msg.channel.send({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(btn)]
    });
  }
};
