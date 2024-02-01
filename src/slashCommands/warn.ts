import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ComponentType, PermissionFlagsBits, SlashCommandBuilder, messageLink } from "discord.js";
import { SlashCommand } from "../types";
import ms from "ms";

const MuteCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("warns a person")
    .addUserOption(option => {
        return option
        .setName("user")
        .setDescription("User to be warned")
        .setRequired(true)
    })
    .addStringOption(option => {
        return option
        .setName("reason")
        .setDescription("Reason of the warning")
        .setRequired(false)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute: async interaction => {

        if (!interaction.inCachedGuild()) return;

        let user = interaction.options.get("user", true)?.member;
        let reason = interaction.options.get("reason")?.value || 'No reason provided';

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

        const sent = await interaction.reply({ content: `Are you sure you want to warn <@${user!.user.id}> for ${reason}?`, components: [row] });

        const filter = (i:any) => i.user.id === interaction.user.id;

        const collector = sent.createMessageComponentCollector({ filter, time: 15000, max: 1, componentType: ComponentType.Button });
    
        collector!.on("collect", async (i) => {
            const id = i.customId;

            if (id === "Yes") {
                await interaction.editReply({ components: [], content: `<@${user!.user.id}> has been warned for ${reason}`});
            } else {
                await interaction.editReply({ components: [], content: `Cancelled.` });
            }
        })
    }
}

export default MuteCommand;