import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ComponentType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";

const MuteCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bans a person from the server.")
        .addUserOption(option => {
            return option
                .setName("user")
                .setDescription("User to be banned.")
                .setRequired(true)
        })
        .addStringOption(option => {
            return option
                .setName("reason")
                .setDescription("Reason for the ban.")
                .setRequired(false)
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    execute: async interaction => {

        if (!interaction.inCachedGuild()) return;

        let user = interaction.options.get("user", true)?.member;
        let reason = interaction.options.getString("reason");

        if (!user) return interaction.reply({ content: "Please mention a user to ban.", ephemeral: true });

        if (!user.bannable) return interaction.reply({ content: "Cannot ban this member.", ephemeral: true });

        if (interaction.member.roles.highest.position <= user.roles.highest.position) return interaction.reply({ content: "You cannot ban this member.", ephemeral: true });

        const row: any = new ActionRowBuilder().addComponents(
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

        const repl = await interaction.reply({ content: `Are you sure you want to ban <@${user!.user.username}>?`, components: [row] });

        const filter = (i: any) => i.user.id === interaction.user.id;

        const collector = repl.createMessageComponentCollector({ filter, time: 15000, max: 1, componentType: ComponentType.Button });

        collector.on('collect', async i => {
            if (i.customId === "Yes") {

                if (reason) {
                    await user!.ban({ reason: `${reason} - Banned by ${interaction.member.user.username}` });
                    await interaction.editReply({ content: `Banned <@${user!.user.id}> for ${reason}`, components: [] });
                    user?.send(`You were banned from ${interaction.guild?.name} for ${reason}`).catch((err) => { });
                } else {
                    await user!.ban({ reason: `Reason not provided - Banned by ${interaction.member.user.username}` });
                    await interaction.editReply({ content: `Banned <@${user!.user.id}>`, components: [] });
                }
            } else {
                await interaction.editReply({ content: `Cancelled`, components: [] });
            }
        });

        collector.on('end', async () => {

            await interaction.editReply({ content: `Cancelled`, components: [] });

        });
    },
    cooldown: 10
}

export default MuteCommand;