import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { SlashCommand } from "../../types";
import ms from "ms";
import { pool } from "../../clients/db";

const ClearCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("counting_ban")
    .setDescription("Bans a user from the counting channel.")
    .addUserOption(option => {
        return option
        .setName("user")
        .setDescription("User to be banned from the counting channel.")
        .setRequired(true)
    })
    .addStringOption(option => {
        return option
        .setName("time")
        .setDescription("Time to ban the user for. (1h, 1d, 1w, 1m, 1y)")
        .setRequired(true)
        .setMaxLength(100)
    })
    .addBooleanOption(option => {
        return option
        .setName("permanent")
        .setDescription("Whether the ban is permanent or not.")
        .setRequired(false)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    execute: async interaction => {

        if (!interaction.inCachedGuild()) return;

        const user = interaction.options.getUser("user", true)
        const time = interaction.options.getString("time", true)
        const permanent = interaction.options.getBoolean("permanent") || false;

        const timeInMs = ms(time);

        if (!timeInMs) {
            interaction.reply({ content: "Invalid time format.", ephemeral: true });
            return;
        }

        const role = interaction.guild?.roles.cache.find(role => role.id === "1207648049757687808");

        if (!role) {
            interaction.reply({ content: "Role not found.", ephemeral: true });
            return;
        }

        const member = interaction.guild?.members.cache.get(user.id);

        if (!member) {
            interaction.reply({ content: "Member not found.", ephemeral: true });
            return;
        }

        if (member.roles.cache.has(role.id)) {
            interaction.reply({ content: "User is already banned from the counting channel.", ephemeral: true });
            return;
        }

        member.roles.add(role);

        let conn;
        try {
            conn = await pool.getConnection();

            if (!permanent) {
                await conn.query("INSERT INTO timeouts (userID, type, time) VALUES (?, ?, ?)", [user.id, "counting", Date.now() + timeInMs]);
            }
            
            interaction.reply({ content: `User has been banned from the counting channel for ${ms(timeInMs)}.`, ephemeral: true });
        } catch (err) {
            console.log(err);
        } finally {
            if (conn) conn.release();
        }
    },
    cooldown: 10
}

export default ClearCommand;