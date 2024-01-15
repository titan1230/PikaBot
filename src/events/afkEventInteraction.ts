import { EmbedBuilder, Message } from "discord.js";
import { BotEvent } from "../types";
import { pool } from "../clients/db";

const event: BotEvent = {
    name: "messageCreate",
    execute: async (message: Message) => {
        if (!message.interaction) return;
        if (message.member && !message.member.user.bot) return;
        if (!message.guild) return;
        
        let conn;
        try {
            conn = await pool.getConnection();

            let rows;
            rows = await conn.query("SELECT * FROM afk WHERE userID = ?", [message.interaction.user.id]);

            if (!rows[0]) {
                return;
            }

            if (rows[0].afk === 1) {
                await conn.query("UPDATE afk SET afk = 0 WHERE userID = ?", [message.interaction.user.id]);

                const embed = new EmbedBuilder()
                    .setTitle("Welcome back!")
                    .setDescription(`Welcome back, ${message.interaction.user}! I removed your AFK status.`)
                    .setColor("Yellow")
                    .setTimestamp()
                await message.reply({ embeds: [embed] }).then(m => setTimeout(() => m.delete(), 5000)).catch(err => console.log(err));
                return;
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) conn.release();
        }
    }
}

export default event