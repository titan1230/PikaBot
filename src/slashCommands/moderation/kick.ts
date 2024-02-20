import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ComponentType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";

const MuteCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a person from the server.")
    .addUserOption(option => {
        return option
        .setName("user")
        .setDescription("User to be kicked.")
        .setRequired(true)
    })
    .addStringOption(option => {
        return option
        .setName("reason")
        .setDescription("Reason for the kick.")
        .setRequired(false)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    execute: async interaction => {

        if (!interaction.inCachedGuild()) return;

        let user = interaction.options.get("user", true)?.member;
        let reason = interaction.options.getString("reason");

        if (!user) return interaction.reply({ content: "Please mention a user to kick.", ephemeral: true });

        if (!user.kickable) return interaction.reply({ content: "Cannot kick this member.", ephemeral: true });
        
        if (interaction.member.roles.highest.position <= user.roles.highest.position) return interaction.reply({ content: "You cannot kick this member.", ephemeral: true });

        const row:any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("Yes")
                .setLabel("Yes")
                .setStyle(ButtonStyle.Success)
                .setEmoji("✔"),
            new ButtonBuilder()
                .setCustomId("No")
                .setLabel("No")
                .setStyle(ButtonStyle.Danger)
                .setEmoji("❌")
        );

        const repl = await interaction.reply({ content: `Are you sure you want to kick <@${user!.user.username}>?`, components: [row] });

        const filter = (i:any) => i.user.id === interaction.user.id;

        const collector = repl.createMessageComponentCollector({ filter, time: 15000, max: 1, componentType: ComponentType.Button });
    
        collector.on('collect', async i => {
            if (i.customId === "Yes") {
                await user!.kick();

                if (reason) {
                    await interaction.editReply({ content: `Kicked <@${user!.user.id}> for ${reason}`, components: [] });
                    user?.send(`You were kicked from ${interaction.guild?.name} for ${reason}`).catch((err) => {});
                } else {
                    await interaction.editReply({ content: `Kicked <@${user!.user.id}>`, components: [] });
                }
            } else {
                await interaction.editReply({ content: `Cancelled`, components: [] });
            }
        });
    },
    cooldown: 10
}

export default MuteCommand;