import { EmbedBuilder, Message } from "discord.js";
import { BotEvent } from "../types";
import { pool } from "../clients/db";

const event: BotEvent = {
    name: "messageCreate",
    execute: async function (message: Message) {
        if (!message.member || message.member.user.bot) return;
        if (!message.guild) return;

        const mention = message.mentions.members?.first();
        const authorID = message.author.id;

        let conn;
        try {
            conn = await pool.getConnection();

            let rows
            rows = await conn.query("SELECT * FROM afk WHERE userID = ?", [authorID]);

            if (!rows[0]) {
                await conn.query("INSERT INTO afk (userID, guildID) VALUES (?, ?)", [authorID, message.guild.id]);
                rows = await conn.query("SELECT * FROM afk WHERE userID = ?", [authorID]);
            }

            if (rows[0].afk === 1) {
                await conn.query("UPDATE afk SET afk = 0 WHERE userID = ?", [authorID]);

                const embed = new EmbedBuilder()
                    .setTitle("Welcome back!")
                    .setDescription(`Welcome back, ${message.author}! I removed your AFK status.`)
                    .setColor("Yellow")
                    .setTimestamp()
                await message.reply({ embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000)).catch(err => console.log(err));
                return;
            }

            if (mention) {
                const result = await conn.query("SELECT * FROM afk WHERE userID = ?", [mention.id]);

                if (result[0] && result[0].afk) {
                    const embed = new EmbedBuilder()
                        .setTitle("AFK")
                        .setDescription("```\n" + `${mention.user.tag} is currently AFK.\nReason - ${result[0].reason}` + "\n```")
                        .setColor("Yellow")
                        .setTimestamp()
                    await message.reply({ embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000)).catch(err => console.log(err));
                }
            }
        } catch (error) {
            console.log(error);
        } finally { 
            if (conn) conn.release();
        }
    }
}

export default event;