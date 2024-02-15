import { PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { SlashCommand } from "../types";

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
        .setName("message")
        .setDescription("Message to send.")
        .setRequired(true)
        .setMaxLength(2000)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute: async interaction => {
        const user = interaction.options.getUser("user", true)
        let messageID = interaction.options.getString("message", true)

        if (messageID.includes("-")) {
            messageID = messageID.split("-")[1];
        }

        let msg;
        try {
            msg = await interaction.channel?.messages.fetch(messageID);
        } catch (err) {
            console.log(err)
            interaction.reply({ content: `Failed to fetch message.\nRe-check the message ID.`, ephemeral: true })
            return;
        }

        await user.send(msg?.content!).then(() => {
            interaction.reply({ content: `Sent a DM to ${user.username}`, ephemeral: true })
        }).catch(() => {
            interaction.reply({ content: `Failed to send a DM to ${user.username}`, ephemeral: true })
        });
    },
    cooldown: 10
}

export default ClearCommand;