import { EmbedBuilder, Message } from "discord.js";
import { Command } from "../../types";
import { pool } from "../../clients/db";

const command: Command = {
    name: "warns",
    permissions: [],
    aliases: ["showWarns"],
    execute: async function (message: Message<boolean>, args: string[]) {
        
        let user = args[1] ? (message.mentions.members?.first() ? message.mentions.members?.first() : await message.guild?.members.fetch(args[1])) :  message.member;
        
        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query("SELECT * FROM WARN WHERE userID=? AND guildID=?", [user?.id, message.guild?.id]);

            const embed = new EmbedBuilder().setTitle(`Warn list of ${user?.user.tag}`);

            if (!result[0]) {
                embed.setDescription("No warns found.");
                return message.reply({embeds: [embed]});
            }

            let warns:any[] = [];

            for (let i=0; i<result.length; i++) {
                warns.push(
                    {
                        name: `Warn ID: ${result[i].warn_ID}`,
                        value: `**Reason:** ${result[i].reason}`,
                        inline: true
                    }
                )
            }

            embed.addFields(warns);
            embed.setFooter({text: `Total warns: ${result.length} | To get more info about a warn, use ..warnid <warnID>`});
            message.reply({embeds: [embed]});
        } catch (err) {
            console.log(err);
        } finally {
            if (conn) conn.release();
        }
    }
}

export default command;