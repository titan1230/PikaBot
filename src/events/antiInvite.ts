import { EmbedBuilder, Message, PermissionFlagsBits, TextChannel } from "discord.js";
import { BotEvent } from "../types";

const event: BotEvent = {
    name: "messageCreate",
    execute: async (message: Message) => {
        if (message.author.bot) return;
        if (!message.guild) return;

        const links = ["discord.gg", "discord.com/invite", "discordapp.com/invite"];

        for (const link of links) {
            if (!message.content.includes(link)) return;

            const code = message.content.split(link)[1].split(" ")[0];

            const isGuildCode = message.guild.invites.cache.has(code);
            const isVanityCode = code === message.guild.vanityURLCode;

            if (isGuildCode || isVanityCode) return;

            const loggingChannel = await message.guild.channels.fetch(process.env.PIKA_LOGS) as TextChannel;

            await message.delete().catch((err) => {});
            
            const emebd = new EmbedBuilder()
                .setTitle("Anti-Invite")
                .setDescription("You are not allowed to send invites here")
                .setColor("Red")
                .setTimestamp()
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
            message.channel.send({ embeds: [emebd] });

            const loggingEmbed = new EmbedBuilder()
                .setTitle("Anti-Invite ❌")
                .setDescription(`${message.author} has sent an invite in ${message.channel}\n\n**User ID:** ${message.author.id}\n\n**Invite:** ${link}${code}\n\n**Message:** ${message.content}`)
                .setColor("Red")
                .setTimestamp()
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
            loggingChannel.send({ embeds: [loggingEmbed] })
        }
    }
}

export default event