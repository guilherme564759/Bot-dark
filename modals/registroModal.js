const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder
} = require('discord.js');

module.exports = {

  async show(interaction) {

    const modal = new ModalBuilder()
      .setCustomId("modal_registro")
      .setTitle("Registro");

    const nome = new TextInputBuilder()
      .setCustomId("nome")
      .setLabel("Nome")
      .setStyle(TextInputStyle.Short);

    const id = new TextInputBuilder()
      .setCustomId("id")
      .setLabel("ID")
      .setStyle(TextInputStyle.Short);

    modal.addComponents(
      new ActionRowBuilder().addComponents(nome),
      new ActionRowBuilder().addComponents(id)
    );

    await interaction.showModal(modal);
  },

  async submit(interaction, client, canalId) {

    const nome = interaction.fields.getTextInputValue("nome");
    const id = interaction.fields.getTextInputValue("id");

    const select = new StringSelectMenuBuilder()
      .setCustomId(`patente|${interaction.user.id}|${nome}|${id}`)
      .setPlaceholder("Escolha a patente")
      .addOptions([
        { label: "3ª Sargento", value: "3ª SARGENTO" },
        { label: "Cabo", value: "CABO" },
        { label: "Soldado 1ª Classe", value: "SOLDADO 1ª CLASSE" }
      ]);

    return interaction.reply({
      content: "Selecione a patente",
      components: [new ActionRowBuilder().addComponents(select)],
      ephemeral: true
    });
  }
};
