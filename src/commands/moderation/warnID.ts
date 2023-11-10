import { EmbedBuilder, Message } from "discord.js";
import { Command } from "../../types";
import { pool } from "../../clients/db";
import moment from "moment";
import warn from "./warn";

const command: Command = {
    name: "warnid",
    permissions: [],
    aliases: ["infowarn"],
    execute: async function (message: Message<boolean>, args: string[]) {
        
        if (!args[1] ||  isNaN(Number(args[1]))) return message.reply("Please provide a warn ID.");


        let conn;
        try {
            conn = await pool.getConnection();

            const result = await conn.query(`SELECT * FROM WARN WHERE warn_ID`, [args[1]]);
            if (!result[0]) return message.reply("No warn found for corresponding ID.");

            const embed = new EmbedBuilder()
            .setTitle(`Warn ID: ${result[0].warn_ID}`)
            .setDescription(`**User:** <@${result[0].userID}>\n**Moderator:** <@${result[0].modID}>\n**Reason:** ${result[0].reason}\n**Date:** ${moment(Number(result[0].warn_date)).format("MMMM Do YYYY, h:mm:ss a")}`)
        
            message.reply({embeds: [embed]});
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) conn.release();
        }
    }
}

export default command;