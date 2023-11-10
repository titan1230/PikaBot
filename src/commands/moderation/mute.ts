import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, PermissionFlagsBits } from "discord.js";
import { Command } from "../../types";
import ms from "ms";

const command: Command = {
    name: "mute",
    permissions: [PermissionFlagsBits.ManageMessages],
    aliases: [],
    execute: async function (message: Message<boolean>, args: string[]) {
        const user = message.mentions.members!.first() || await message.guild!.members.fetch(args[1]).catch(() => null);

        if (!user) return message.reply("Provide someone to mute.");
        console.log(user.avatarURL());
        if (user.id === message.author.id) return message.reply("You can't mute yourself.");
        if (user.id === message.client.user.id) return message.reply("https://tenor.com/view/darth-sidious-you-think-you-can-stop-me-starwars-emperor-stopme-gif-10174472");
        
        let reason = args.slice(2).join(" ") || "No reason provided.";
        const time = args[1] || '1h'

        if (time){
            if (time.length > 5) return message.reply("Time is too long.")
        }

        const row:any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("Yes")
                .setLabel("Yes")
                .setStyle(ButtonStyle.Success)
                .setEmoji("✔"),
            new ButtonBuilder()
                .setCustomId("No")
                .setLabel("No")
                .setStyle(ButtonStyle.Danger)
                .setEmoji("❌")
        )

        let muteRole = message.guild?.roles.cache.find(role => role.name === 'Muted');
        const hasRole = user.roles.cache.find(role => role.name === 'Muted');

        if (hasRole) return message.reply("Target is already muted.");

        const filter = (interaction:any) => interaction.user.id === message.author.id
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000, max: 1 })

        collector.on("collect", async (i) => {
            const id = i.customId
            if (!args[1]) {
                if (id === "Yes") {
                    await i.deferUpdate()
                    await user.roles.add(muteRole!);
                    await message.channel.send(`Muted <@${user.user.id}>`);
                    return
                }

                if (id === "No") {
                    await i.deferUpdate()
                    await message.channel.send('Command canceled');
                    return
                }
                return
            }

            if (id === "Yes") {
                await i.deferUpdate()
                await user.roles.add(muteRole!);
                await message.channel.send(`<@${user.user.id}> has been muted for ${ms(ms(args[1]))}`);

                setTimeout(function () {
                    user.roles.remove(muteRole!);
                }, ms(args[1]));
                return
            }

            if (id === "No") {
                await i.deferUpdate()
                await message.channel.send('Command canceled');
                return
            }
        })
    },
}

export default command;