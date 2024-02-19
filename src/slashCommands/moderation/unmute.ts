import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";

const ClearCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Un-mutes a user.")
    .addUserOption(option => {
        return option
        .setName("user")
        .setDescription("The user to un-mute.")
        .setRequired(true)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute: async interaction => {

        const role = await interaction.guild?.roles.fetch("726369003349737502")
        
        const user = interaction.options.getUser("user", true)
        const member = await interaction.guild?.members.fetch(user.id)
        
        if (!member) {
            interaction.reply({ content: "User not found!", ephemeral: true })
            return
        }

        if (!member.roles.cache.has(role!.id)) {
            interaction.reply({ content: "User is not muted!", ephemeral: true })
            return
        }

        await member.roles.remove(role!)
        interaction.reply({ content: "User un-muted!", ephemeral: true })
    },
    cooldown: 10
}

export default ClearCommand;