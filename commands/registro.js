const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'registro',
  execute(msg) {

    const embed = new EmbedBuilder()
      .setTitle("📋 Registro Polícia Militar")
      .setDescription("Clique abaixo para se registrar.");

    const btn = new ButtonBuilder()
      .setCustomId("abrir_registro")
      .setLabel("Registrar")
      .setStyle(ButtonStyle.Primary);

    msg.channel.send({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(btn)]
    });
  }
};
