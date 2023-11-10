import { EmbedBuilder } from "discord.js";
import { Command } from "../../types";
import { pool } from "../../clients/db";

const command : Command = {
    name: "afk",
    cooldown: 2,
    aliases: [],
    permissions: [],
    execute: async (message, args) => {
        
        let conn;
        try {
            let reason = args.slice(1).join(" ") || "AFK";
            if (reason.length > 300) return message.reply("Reason must be less than 300 characters.");

            conn = await pool.getConnection();
            const result = await conn.query("SELECT afk FROM afk WHERE userID=? AND guildID=?", [message.author.id, message.guild?.id]);

            if (!result[0] || result[0].afk) return;

            await conn.query("UPDATE afk SET afk=1,reason=?,time=? WHERE userID=? AND guildID=?", [reason, Math.floor(Date.now()/1000),message.author.id, message.guild?.id]);
            message.reply(`AFK set for reason: ${reason}`);
        } catch (error) {
            console.log(error)
        } finally {
            if (conn) conn.release();
        }
    },
}

export default command