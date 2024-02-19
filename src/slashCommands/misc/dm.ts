import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { SlashCommand } from "../../types";

const ClearCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("dm-user")
    .setDescription("DM a user.")
    .addUserOption(option => {
        return option
        .setName("user")
        .setDescription("User to DM.")
        .setRequired(true)
    })
    .addStringOption(option => {
        return option
        .setName("title")
        .setDescription("Title of the message.")
        .setRequired(true)
        .setMaxLength(100)
    })
    .addStringOption(option => {
        return option
        .setName("message")
        .setDescription("Message to send.")
        .setRequired(true)
        .setMaxLength(2000)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute: async interaction => {

        if (!interaction.inCachedGuild()) return;

        const user = interaction.options.getUser("user", true)
        const title = interaction.options.getString("title", true)
        let messageID = interaction.options.getString("message", true)

        const LOGGING_CHANNEL = interaction.guild?.channels.cache.get("1207634201810313257") as TextChannel;

        const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor("Yellow")
        .setThumbnail(interaction.client.user?.avatarURL() || null)
        .setTimestamp()

        if (messageID.includes("-")) {
            messageID = messageID.split("-")[1];
        }

        let msg: any;
        try {
            msg = await interaction.channel?.messages.fetch(messageID);

            if (msg?.content.length! > 1500) {
                interaction.reply({ content: `Message content is too long to send in a DM.`, ephemeral: true })
                return;
            }
            embed.setDescription(msg?.content!);
        } catch (err) {
            console.log(err)
            interaction.reply({ content: `Failed to fetch message.\nRe-check the message ID.`, ephemeral: true })
            return;
        }

        await user.send({ embeds: [embed] }).then(() => {
            interaction.reply({ content: `Sent a DM to ${user.username}`, ephemeral: true })

            const logEmbed = new EmbedBuilder()
            .setTitle(`DM Sent to ${user.username}`)
            .setColor("Random")
            .setTimestamp()
            .setDescription(`**Sent By - ${interaction.user.username}**\n\n**Message Content:**\n${msg?.content}`)
            
            LOGGING_CHANNEL.send({ embeds: [logEmbed] }).catch(() => {
                console.log(`FAILED TO LOG - { DM SENT }`)
            });
            
        }).catch(() => {
            interaction.reply({ content: `Failed to send a DM to ${user.username}`, ephemeral: true })
        });
    },
    cooldown: 10
}

export default ClearCommand;