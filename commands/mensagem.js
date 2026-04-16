const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'mensagem',
  execute(message) {

    const embed = new EmbedBuilder()
      .setTitle('📨 Criar mensagem')
      .setDescription('Clique abaixo para abrir o formulário.')
      .setColor('Blue');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('abrir_mensagem_modal')
        .setLabel('Abrir formulário')
        .setStyle(ButtonStyle.Primary)
    );

    message.channel.send({ embeds: [embed], components: [row] });
  }
};
