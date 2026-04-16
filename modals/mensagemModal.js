const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder
} = require('discord.js');

module.exports = {

  async show(interaction) {

    const modal = new ModalBuilder()
      .setCustomId('modal_mensagem')
      .setTitle('Enviar Embed');

    const canal = new TextInputBuilder()
      .setCustomId('canal')
      .setLabel('ID do canal')
      .setStyle(TextInputStyle.Short);

    const titulo = new TextInputBuilder()
      .setCustomId('titulo')
      .setLabel('Título')
      .setStyle(TextInputStyle.Short);

    const mensagem = new TextInputBuilder()
      .setCustomId('mensagem')
      .setLabel('Mensagem')
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
      new ActionRowBuilder().addComponents(canal),
      new ActionRowBuilder().addComponents(titulo),
      new ActionRowBuilder().addComponents(mensagem)
    );

    await interaction.showModal(modal);
  },

  async submit(interaction) {

    const canalId = interaction.fields.getTextInputValue('canal');
    const titulo = interaction.fields.getTextInputValue('titulo');
    const mensagem = interaction.fields.getTextInputValue('mensagem');

    const canal = await interaction.client.channels.fetch(canalId).catch(() => null);

    if (!canal) {
      return interaction.reply({ content: 'Canal inválido.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle(titulo)
      .setDescription(mensagem)
      .setColor('Blue');

    await canal.send({ embeds: [embed] });

    interaction.reply({ content: 'Mensagem enviada!', ephemeral: true });
  }
};
