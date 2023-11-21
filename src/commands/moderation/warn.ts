import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, Message, PermissionFlagsBits } from "discord.js";
import { Command } from "../../types";
import { pool } from "../../clients/db";

const command: Command = {
    name: "warn",
    permissions: [],
    aliases: [],
    execute: async function (message: Message<boolean>, args: string[]) {

        const hasRole = message.member!.roles.cache.find(role => role.id === "719633781371306135");
        if (!hasRole) return message.channel.send("You don't have permission to use this command.");

        if (!args[1]) return message.reply("Please mention a user to warn.");
        
        const user = message.mentions.members?.first() || await message.guild?.members.fetch(args[1]).catch(() => null);
        if (!user) return message.reply("Please mention a user to warn.");
        
        if (user.user.bot) return message.reply("I don't warn my own kind, uwu~");
        if (user.id === process.env.CLIENT_ID) return message.reply("Are you a fucking idiot?, uwu~");
        if (user.id === "462203190298017793") return message.reply("I don't betray my master, uwu~");
        if (user.id === message.author.id) return message.reply("You can't warn yourself...");

        const reason = args.slice(2).join(" ") || "No reason provided.";

        const yes_btn:ButtonBuilder = new ButtonBuilder().setCustomId("yes").setLabel("Yes").setStyle(ButtonStyle.Success).setEmoji("✅");
        const no_btn:ButtonBuilder = new ButtonBuilder().setCustomId("no").setLabel("No").setStyle(ButtonStyle.Danger).setEmoji("❌");

        const row:any = new ActionRowBuilder().addComponents(yes_btn, no_btn);
        const embed = new EmbedBuilder().setDescription("```\nDo you want to warn " + user.user.tag + "?\n\nReason: "+ reason +"\n```").setColor("Red").setTimestamp();

        await message.channel.send({ embeds:[embed], components: [row]});

        const filter = (i:any) => i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000, max: 1, componentType: ComponentType.Button });

        collector.on("collect", async (i) => {
            const id = i.customId;

            if (id === "yes") {
                await i.deferUpdate();

                let conn;
                try {
                    conn = await pool.getConnection();
                    await conn.query(`INSERT INTO WARN (guildID, userID, modID, reason, warn_date, type) VALUES (?, ?, ?, ?, ?, ?);`, [`${message.guild!.id}`, `${user.user.id}`, `${message.author.id}`, `${reason}`,`${Date.now()}`, "Warn"]);
                } catch (error) {
                    console.log(error);
                } finally {
                    if (conn) conn.release();
                }
                await user.send(`You have been warned in ${message.guild?.name} because of \`${reason}\``).catch((err) => console.log(err))
                await message.channel.send("Warned "+ user.user.username+ " for `" + reason+"`");
                return;
            }

            if (id === "no"){
                await i.deferUpdate();
                await message.channel.send('Command canceled');
                return;
            }
        });
    }
}

export default command;