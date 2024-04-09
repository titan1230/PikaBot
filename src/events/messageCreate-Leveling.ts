import { Message } from "discord.js";
import { BotEvent } from "../types";
import { pool } from "../clients/db";
import { getRandomValue } from "../functions";

const cooldown = new Set<String>()

const event: BotEvent = {
    name: "messageCreate",
    execute: async (message: Message) => {
        if (message.author.bot || !message.inGuild() || cooldown.has(message.author.id)) return;

        const blacklistChannel: string[] = ["712590955835949089", ];
        const blackListCategory: string[] = ["709396426509123644", "709354498568618015"];

        if (blacklistChannel.includes(message.channel.id)) return;
        
        if ( message.channel.parentId && blackListCategory.includes(message.channel.parentId)) return;
    
        let conn;
        try {
            conn = await pool.getConnection();

            const getUserData = await conn.query(`SELECT * FROM leveling WHERE uid=?`, [message.author.id]);

            if (!getUserData[0]) {
                await conn.query(`INSERT INTO leveling (uid, msg) VALUES (?, ?)`, [message.author.id, 1]);
                cooldown.add(message.author.id);

                setTimeout(() => {
                    cooldown.delete(message.author.id);
                }, getRandomValue(5000, 3000));
            } else {
                await conn.query(`UPDATE leveling SET msg=msg+1 WHERE uid=?`, [message.author.id]);
                cooldown.add(message.author.id);

                setTimeout(() => {
                    cooldown.delete(message.author.id);
                }, getRandomValue(5000, 3000));
            }
        } catch (err) {
            console.error(err);
            return;
        } finally {
            if (conn) conn.release();
        }
    }
}

export default event