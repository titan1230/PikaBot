import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, Interaction, MessageComponentInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import ms from "ms";
import { pool } from "../../clients/db";

const MuteCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("clear-rank")
    .setDescription("Remove a person from message LB")
    .addUserOption(option => {
        return option
        .setName("user")
        .setDescription("User to be cleared")
        .setRequired(true)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async interaction => {

        if (!interaction.inCachedGuild()) return;

        const target = interaction.options.getUser("user", true);

        const yesBtn = new ButtonBuilder()
        .setCustomId("yes")
        .setLabel("Yes")
        .setEmoji("✅")
        .setStyle(ButtonStyle.Primary);

        const noBtn = new ButtonBuilder()
        .setCustomId("no")
        .setLabel("No")
        .setEmoji("❌")
        .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(yesBtn, noBtn);

        const filter = (i: Interaction) => i.user.id === interaction.user.id;

        const sent = await interaction.reply({ content: `Are you sure you want to warn remove <@${target.id}> from the leaderboard?`, components: [row] });
    
        const collector = sent.createMessageComponentCollector({ filter, time: 15000, max: 1, componentType: ComponentType.Button });

        collector.on("collect", async (i: MessageComponentInteraction) => {
            const id = i.customId;

            if (id === "yes") {

                let conn;
                try {
                    conn = await pool.getConnection();

                    await conn.query("DELETE FROM leveling WHERE uid = ?", [target.id]);

                    await interaction.editReply({ components: [], content: `Removed <@${target.id}> from the leaderboard.`});
                } catch (e) {} finally {
                    if (conn) conn.release();
                }
            } else {
                await interaction.editReply({ components: [], content: `Cancelled.` });
            }
        });

        collector.on("end", async () => {
            await interaction.editReply({ components: [] });
        });
    }
}

export default MuteCommand;