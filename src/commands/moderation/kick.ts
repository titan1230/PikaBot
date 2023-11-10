import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, PermissionFlagsBits } from "discord.js";
import { Command } from "../../types";

const command: Command = {
    name: "kick",
    permissions: [PermissionFlagsBits.KickMembers],
    aliases: [],
    execute: async function (message: Message<boolean>, args: string[]) {
        
        if (!args[1]) return message.channel.send("Please mention a user to kick.");
        const user = message.mentions.members!.first() || await message.guild!.members.fetch(args[1]).catch(() => null);

        if (!user) {
            message.channel.send("Please mention a user to kick.");
            return;
        }

        if (!user.kickable) {
            message.channel.send("I can't kick this user.");
            return;
        }

        const yes_btn = new ButtonBuilder().setCustomId("yes").setLabel("Yes").setStyle(ButtonStyle.Success);
        const no_btn = new ButtonBuilder().setCustomId("no").setLabel("No").setStyle(ButtonStyle.Danger);

        const row:any = new ActionRowBuilder().addComponents(yes_btn, no_btn);

        message.channel.send({content: `Are you sure you want to kick ${user.user.tag}?`, components: [row]});

        const filter = (i:any) => i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({filter, time: 15000, max: 1});

        collector.on("collect", async (i:any) => {

            const id = i.customId;

            if (id === "yes") {
                await i.deferUpdate();
                await user.kick();
                await message.channel.send(`Kicked ${user.user.tag}`);
                return;
            }

            if (id === "no") {
                await i.deferUpdate();
                await message.channel.send("Canceled");
                return;
            }
        });
    }
}

export default command;