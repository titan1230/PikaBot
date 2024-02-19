import { ChannelType, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { SlashCommand } from "../../types";

const ClearCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("archive")
    .setDescription("archive")
    .addChannelOption(option => {
        return option
        .setName("channel")
        .setDescription("Channel to archive")
        .setRequired(true)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute: async interaction => {
        const channel = interaction.options.getChannel("channel") as TextChannel

        if(!channel) return interaction.reply({ content: "Channel not found", ephemeral: true });

        channel.setParent(process.env.ARCHIVE_CATEGORY_ID!);
        interaction.reply({ ephemeral: true, content: `Successfully archived ${channel}`});
    },
    cooldown: 10
}

export default ClearCommand;