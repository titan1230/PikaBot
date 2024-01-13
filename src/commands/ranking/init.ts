import { EmbedBuilder, Message, PermissionFlagsBits } from "discord.js";
import { Command } from "../../types";
import { pool } from "../../clients/db";

const command: Command = {
    name: "init",
    permissions: [PermissionFlagsBits.Administrator],
    aliases: [],
    execute: async function (message: Message<boolean>, args: string[]) {
        await message.delete();
        let s; let s1; let s2; let s3; let s4; let s5; let se;

        let conn;
        try {
            conn = await pool.getConnection();
            const res = await conn.query(`SELECT * FROM leveling ORDER BY msg DESC LIMIT 5`);

            s = `︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵\n. • ☆ . °__**Chit-Chat Leaderboard   **__s°:. *₊ ° .\n︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶\n\n─ ･ ｡ Updated <t:${Math.round(Date.now() / 1000)}:R>\n\n╭୧ ✎ ‧₊ — — — — — — — ₊˚ ˊ˗\n`;
            s1 = `┊ ・1. ${res[0] ? `<@${res[0].uid}>\n` : "\n"}`
            s2 = `┊ ・2. ${res[1] ? `<@${res[1].uid}>\n` : "\n"}`
            s3 = `┊ ・3. ${res[2] ? `<@${res[2].uid}>\n` : "\n"}`
            s4 = `┊ ・4. ${res[3] ? `<@${res[3].uid}>\n` : "\n"}`
            s5 = `┊ ・5. ${res[4] ? `<@${res[4].uid}>\n` : "\n"}`
            se = `╰・─・─・─・─・─・─・─・─・₊˚`
        } catch (err) {
            console.error(err);
            return;
        } finally {
            if (conn) conn.release();
        }

        message.channel.send({ content: s + s1 + s2 + s3 + s4 + s5 + se });
    }
}

export default command;