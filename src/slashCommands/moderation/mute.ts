import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ComponentType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import ms from "ms";
import { pool } from "../../clients/db";

const MuteCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("mutes a person")
    .addUserOption(option => {
        return option
        .setName("user")
        .setDescription("User to be muted")
        .setRequired(true)
    })
    .addStringOption(option => {
        return option
        .setName("time")
        .setDescription("Time to be muted")
        .setRequired(false)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute: async interaction => {

        if (!interaction.inCachedGuild()) return;

        let user = interaction.options.get("user", true)?.member;
        let time = interaction.options.getString("time") || "1h";

        const timeInMs = ms(time);

        if (!timeInMs) {
            interaction.reply({ content: "Invalid time format.", ephemeral: true });
            return;
        }

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

        let muteRole = interaction.guild?.roles.cache.find(role => role.name === 'Muted');
        const hasRole = user!.roles.cache.find(role => role.name === 'Muted');

        if (hasRole) return interaction.reply("Target is already muted.");
        
        const repl = await interaction.reply({ content: `Are you sure you want to mute <@${user!.user.id}> for ${ms(ms(`${time}`))}?`, components: [row] });
        
        const filter = (i:any) => i.user.id === interaction.user.id;
        
        const collector = repl.createMessageComponentCollector({ filter, time: 15000, max: 1, componentType: ComponentType.Button });
        
        collector!.on("collect", async (i) => {
            const id = i.customId;

            if (id === "Yes") {
                await i.deferUpdate()
                await user!.roles.add(muteRole!);
                await interaction.followUp(`<@${user!.user.id}> has been muted for ${ms(ms(`${time}`))}`);

                let conn;
                try {
                    conn = await pool.getConnection();

                    const res = await conn.query("INSERT INTO timeouts (userID, type, time) VALUES (?, ?, ?)", [user!.user.id, "mute", Date.now() + timeInMs]);
                } catch (err) {
                    console.log(err);
                } finally {
                    if (conn) conn.release();
                }
                return;
            }

            if (id === "No") {
                await i.deferUpdate();
                await interaction.followUp('Command canceled');
                return;
            }
        })

        collector!.on("end", async (i) => {
            if (i.size === 0) {
                await interaction.editReply({ content: "Command timed out", components: [] });
            }
        })
    },
    cooldown: 10
}

export default MuteCommand;