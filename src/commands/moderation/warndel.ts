import { ButtonStyle, Message, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, EmbedBuilder, ComponentType } from "discord.js";
import { Command } from "../../types";
import { pool } from "../../clients/db";
import moment from "moment";
import { Connection, PoolConnection } from "mariadb";

const command: Command = {
    name: "delwarn",
    permissions: [PermissionFlagsBits.KickMembers],
    aliases: [],
    execute: async function (message: Message<boolean>, args: string[]) {
        const warnID = args[1];

        if (!warnID || isNaN(Number(warnID))) {
            return message.channel.send("Please provide a valid warn ID.");
        }

        let conn: PoolConnection | undefined;
        try {
            conn = await pool.getConnection();

            const result = await conn.query("SELECT * FROM warns WHERE id = ?", [warnID]);
            
            if (!result.length) {
                return message.channel.send("No warn with that ID exists.");
            }

            
            const yes_btn: ButtonBuilder = new ButtonBuilder().setCustomId("yes").setLabel("Yes").setStyle(ButtonStyle.Success).setEmoji("✅");
            const no_btn: ButtonBuilder = new ButtonBuilder().setCustomId("no").setLabel("No").setStyle(ButtonStyle.Danger).setEmoji("❌");
        
            const row: any = new ActionRowBuilder().addComponents(yes_btn, no_btn);

            const embed = new EmbedBuilder()
            .setDescription("```\nDo you want to delete warn with ID " + warnID + "?\n```")
            .addFields(
                {
                    name: "Warned User",
                    value: `<@${result[0].userID}>`,
                    inline: true
                },
                {
                    name: "Moderator",
                    value: `<@${result[0].modID}>`,
                    inline: true
                },
                {
                    name: "Reason",
                    value: result[0].reason,
                    inline: true
                },
                {
                    name: "Date",
                    value: moment(result[0].warn_date).format("DD/MM/YYYY"),
                    inline: true
                }
            )
            message.reply({ embeds: [embed], components: [row] });

            const filter = (i: any) => i.user.id === message.author.id;
            const collector = message.channel.createMessageComponentCollector({ filter, time: 15000, max: 1, componentType: ComponentType.Button });
            
            collector.on("collect", async (i) => {

                const id = i.customId;

                if (id === "yes") {
                    await i.deferUpdate()
                    await conn!.query("DELETE FROM warns WHERE id = ?", [warnID]);
                    
                    await message.channel.send(`Deleted warn with ID ${warnID}`);
                    return
                }

                if (id === "no") {
                    await i.deferUpdate()
                    await message.channel.send("Command Cancelled");
                    return;
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) conn.release();
        }
    }
}

export default command;