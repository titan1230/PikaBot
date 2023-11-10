import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, Embed, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { Command } from "../../types";

const command : Command = {
    name: "ban",
    // cooldown: 10,
    aliases: ["kill"],
    permissions: [PermissionFlagsBits.BanMembers],
    execute: async(message, args) => {

        if (!args[1]) return message.reply("Please mention a user to ban.");
        let target = message.mentions.members?.first() || await message.guild!.members.fetch(args[1]).catch(() => null);
        
        if (!target) return message.reply("Please mention a user to ban.");
        if (target.id === message.author.id) return message.reply("You fucking idiot");
        if (!target.bannable) return message.reply("I can't ban this user.");

        let reason = args.slice(2).join(" ");
        if (!reason) reason = "No Reason Provided";

        if (message.author.id === target.user.id) return message.reply("You can't ban yourself.");
        if (message.member!.roles.highest.position <= target.roles.highest.position) return message.reply("Dum");

        const yes_btn:ButtonBuilder = new ButtonBuilder().setCustomId("yes").setLabel("Yes").setStyle(ButtonStyle.Success).setEmoji("✅");
        const no_btn:ButtonBuilder = new ButtonBuilder().setCustomId("no").setLabel("No").setStyle(ButtonStyle.Danger).setEmoji("❌");

        const row:any = new ActionRowBuilder().addComponents(yes_btn, no_btn);

        const embed = new EmbedBuilder().setDescription("```\nDo you want to ban" + target.user.tag + "?\nReason: "+ reason +"\n```").setColor("Red").setTimestamp();

        await message.channel.send({ embeds:[embed], components: [row]});

        const filter = (i:any) => i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000, max: 1, componentType: ComponentType.Button });

        collector.on("collect", async (i:any) => {
            const id = i.customId;
            
            if (id === "yes") {
                await i.deferUpdate()
                await target!.ban({ reason: reason})
                await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`\`\`\`\nBanned ${target!.user.tag}\nReason: ${reason}\`\`\``).setColor("Red").setTimestamp()]});
                no_btn.setDisabled(true);
                yes_btn.setDisabled(true);
                return
            }

            if (id === "no"){
                await i.deferUpdate()
                await message.channel.send('Command canceled');
                return
            }
        });
    },
}

export default command;