import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const ClearCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("role_id")
    .setDescription("Send ID of a role.")
    .addRoleOption(option => {
        return option
        .setName("role")
        .setDescription("Role to send id.")
        .setRequired(true)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute: interaction => {
        const role = interaction.options.getRole("role")
        interaction.reply(role!.id)
    },
    cooldown: 10
}

export default ClearCommand;