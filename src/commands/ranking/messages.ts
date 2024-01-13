import { EmbedBuilder, Message, PermissionFlagsBits } from "discord.js";
import { Command } from "../../types";
import { pool } from "../../clients/db";

const command: Command = {
    name: "messages",
    permissions: [],
    aliases: ["msginfo", "msgs"],
    execute: async function (message: Message<boolean>, args: string[]) {
        
        let conn;
        try {
            conn = await pool.getConnection();
            
            let res = await conn.query(`SELECT * FROM leveling WHERE uid = ?`, [message.author.id]);
            if (!res[0]) return message.reply("Message count too low, you need to send more messages!!!!!");
            res = res[0];
            const embed = new EmbedBuilder()
            .setTitle("Message Count")
            .setDescription(`You have sent ${res.msg} messages.`)
            .setColor("Yellow")
            .setFooter({ text: "Requested by " + message.author.username })
            message.channel.send({ embeds: [embed] });
        } catch (err) {
            console.error(err);
            return;
        } finally {
            if (conn) conn.release();
        }
    }
}

export default command;