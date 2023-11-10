import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, Message, PermissionFlagsBits } from "discord.js";
import { Command } from "../../types";

const command: Command = {
    name: "unmute",
    permissions: [PermissionFlagsBits.ManageMessages],
    aliases: [],
    execute: async function (message: Message<boolean>, args: string[]) {

        if (!args[1]) return message.reply("Provide someone to unmute.");
        const user = message.mentions.members!.first() || await message.guild!.members.fetch(args[1]);

        if (!user) return message.reply("Provide someone to unmute.");
        if (!user.roles.cache.find(r => r.name === "Muted")) return message.reply("This user is not muted.");

        const muteRole = message.guild?.roles.cache.find(role => role.name === 'Muted');

        const yes_btn: ButtonBuilder = new ButtonBuilder().setCustomId("yes").setLabel("Yes").setStyle(ButtonStyle.Success).setEmoji("✅");
        const no_btn: ButtonBuilder = new ButtonBuilder().setCustomId("no").setLabel("No").setStyle(ButtonStyle.Danger).setEmoji("❌");

        const row: any = new ActionRowBuilder().addComponents(yes_btn, no_btn);
        const embed = new EmbedBuilder().setDescription("```\nDo you want to unmute" + user.user.tag + "?\n```").setColor("Red").setTimestamp();

        await message.channel.send({ embeds: [embed], components: [row] });

        const filter = (i: any) => i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000, max: 1, componentType: ComponentType.Button });

        collector.on("collect", async (i) => {
            const id = i.customId;

            if (id === "yes") {
                await i.deferUpdate()
                await user.roles.remove(muteRole!)

                await message.channel.send(`Unmuted <@${user.user.id}>`);
                return
            }

            if (id === "No") {
                await i.deferUpdate()
                await message.channel.send('Command canceled');
                return
            }
        });
    }
}

export default command;