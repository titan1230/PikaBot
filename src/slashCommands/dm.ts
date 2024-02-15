import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
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
        const message = interaction.options.getString("message", true)

        await user.send(message).then(() => {
            interaction.reply({ content: `Sent a DM to ${user.username}`, ephemeral: true })
        }).catch(() => {
            interaction.reply({ content: `Failed to send a DM to ${user.username}`, ephemeral: true })
        })
    },
    cooldown: 10
}

export default ClearCommand;