import { ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } from "discord.js";
import { pool } from "../../clients/db";
import { Command } from "../../types";

const command: Command = {
    name: "leaderboard",
    permissions: [],
    aliases: ["lb"],
    execute: async function (message, args) {

        const embeds: EmbedBuilder[] = [];
        const embed = new EmbedBuilder().setTitle("Leaderboard").setColor("Yellow");

        const next = new ButtonBuilder().setCustomId("next").setLabel("Next").setStyle(ButtonStyle.Secondary);
        const prev = new ButtonBuilder().setCustomId("prev").setLabel("Previous").setStyle(ButtonStyle.Secondary);

        let conn; let s = "";
        try {
            conn = await pool.getConnection();
            const res = await conn.query(`SELECT * FROM leveling ORDER BY msg DESC`);

            const max_pages = Math.ceil(res.length / 10);

            for (let i = 0; i < res.length; i++) {
                s = s + `<@${res[i].uid}> ➤ ${res[i].msg}\n`

                if (i % 10 === 0) {
                    embed.setDescription(s)
                    embeds.push(embed);
                    s = ""
                }
            }

            let page = 1;

            const msg = await message.channel.send({ embeds: [embeds[page - 1]], components: [{ type: ComponentType.ActionRow, components: [prev.setDisabled(true).toJSON(), next.setDisabled(max_pages === 1 ? true : false).toJSON()] }] });
            const mc = message.createMessageComponentCollector({ filter: (i) => i.user.id === message.author.id, time: 60000, componentType: ComponentType.Button });

            mc.on("collect", async (i) => {
                const id = i.customId;
                mc.resetTimer();

                if (id === "next" && page != max_pages) {
                    page++;
                    await i.deferUpdate();
                    await msg.edit({ embeds: [embeds[page - 1]], components: [{ type: ComponentType.ActionRow, components: [prev.setDisabled(false).toJSON(), next.setDisabled(page === max_pages ? true : false).toJSON()] }] });
                }

                if (id === "next" && page === max_pages) {
                    i.reply({ ephemeral: true, content: "You are already on the last page!" });
                }

                if (id === "prev" && page != 1) {
                    page--;
                    await i.deferUpdate();
                    await msg.edit({ embeds: [embeds[page - 1]], components: [{ type: ComponentType.ActionRow, components: [prev.setDisabled(page === 1 ? true : false).toJSON(), next.setDisabled(false).toJSON()] }] });
                }
            });

        } catch (err) {
            console.error(err);
            return;
        } finally {
            if (conn) conn.release();
        }
    }
}

export default command;