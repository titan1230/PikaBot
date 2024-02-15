import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const ClearCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("channel_id")
    .setDescription("Send ID of a channel.")
    .addChannelOption(option => {
        return option
        .setName("channel")
        .setDescription("Channel to get ID of.")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute: interaction => {
        const channel = interaction.options.getChannel("channel", true);
        interaction.reply(channel.id);
    },
    cooldown: 10
}

export default ClearCommand;