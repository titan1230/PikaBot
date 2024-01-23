import { ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } from "discord.js";
import { pool } from "../../clients/db";
import { Command } from "../../types";

const command: Command = {
    name: "leaderboard",
    permissions: [],
    aliases: ["lb"],
    execute: async function (message, args) {

        const embeds: EmbedBuilder[] = [];

        const next = new ButtonBuilder().setCustomId("next").setLabel("Next").setStyle(ButtonStyle.Primary);
        const prev = new ButtonBuilder().setCustomId("prev").setLabel("Previous").setStyle(ButtonStyle.Primary);

        let conn; let s = ""; let embed; let last;
        try {
            conn = await pool.getConnection();
            const res = await conn.query(`SELECT * FROM leveling ORDER BY msg DESC`);

            const max_pages = Math.ceil(res.length / 10);

            for (let i = 0; i < res.length; i++) {
                s = s + `<@${res[i].uid}> ➤ ${res[i].msg}\n`

                if (i % 10 === 0 && i != 0) {
                    last = i;
                    embed = new EmbedBuilder().setTitle(`Leaderboard - Page ${embeds.length + 1}`).setColor("Yellow");
                    embed.setDescription(s);
                    embeds.push(embed);
                    s = ""
                }
            }

            let s1 = "";
            for (let j = last! + 1; j < res.length; j++) {
                s1 = s1 + `<@${res[j].uid}> ➤ ${res[j].msg}\n`
            }

            if (s1.length >= 1) {
                const lastEmbed = new EmbedBuilder().setTitle(`Leaderboard - Page ${embeds.length + 1}`).setColor("Yellow").setDescription(s1);
                embeds.push(lastEmbed);
            }

            let page = 1;

            const msg = await message.channel.send({ embeds: [embeds[page - 1]], components: [{ type: ComponentType.ActionRow, components: [prev.setDisabled(true), next.setDisabled(max_pages === 1 ? true : false)] }] });
            const mc = msg.createMessageComponentCollector({ filter: (i) => i.user.id === message.author.id, time: 60000, componentType: ComponentType.Button });

            mc.on("collect", async (i) => {
                const id = i.customId;
                mc.resetTimer();

                if (id === "next" && page != max_pages) {
                    page++;
                    await i.deferUpdate();
                    await msg.edit({ embeds: [embeds[page - 1]], components: [{ type: ComponentType.ActionRow, components: [prev.setDisabled(false), next.setDisabled(page === max_pages ? true : false)] }] });
                }

                if (id === "prev" && page != 1) {
                    page--;
                    await i.deferUpdate();
                    await msg.edit({ embeds: [embeds[page - 1]], components: [{ type: ComponentType.ActionRow, components: [prev.setDisabled(page === 1 ? true : false), next.setDisabled(false)] }] });
                }
            });

            mc.on("end", async () => {
                await msg.edit({ embeds: [embeds[page - 1]], components: [] });
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