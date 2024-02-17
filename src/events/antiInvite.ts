import { EmbedBuilder, Message, PermissionFlagsBits, TextChannel } from "discord.js";
import { BotEvent } from "../types";

const event: BotEvent = {
    name: "messageCreate",
    execute: async (message: Message) => {
        if (message.author.bot) return;
        if (!message.guild) return;

        if (message.member?.permissions.has(PermissionFlagsBits.Administrator)) return;

        let regex = /https?:\/\/discord.gg\/(\w+)/g;

        let codeArray:string[] = [];
        let match;

        while ((match = regex.exec(message.content)) !== null) {
            codeArray.push(match[1]); 
        }

        if (codeArray.length === 0) return;

        for (let code of codeArray) {

            const isVanityCode = code === message.guild.vanityURLCode;
            if (isVanityCode) continue;

            let isGuildCode = false;

            try {
                await message.guild.invites.fetch(code);
                isGuildCode = true;
            } catch (err) { }

            if (isGuildCode) continue;

            const loggingChannel = await message.guild.channels.fetch(process.env.PIKA_LOGS).catch((err) => { }) as TextChannel;

            await message.delete().catch((err) => { console.log(err) });

            const emebd = new EmbedBuilder()
                .setTitle("Anti-Invite")
                .setDescription("You are not allowed to send invites here")
                .setColor("Red")
                .setTimestamp()
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
            message.channel.send({ embeds: [emebd] }).catch((err) => { });

            const loggingEmbed = new EmbedBuilder()
                .setTitle("Anti-Invite ❌")
                .setDescription(`${message.author} has sent an invite in ${message.channel}\n\n**User ID:** ${message.author.id}\n\n**Invite:** [Invite Here](https://discord.gg/${code})\n\n**Message:** ${message.content}`)
                .setColor("Red")
                .setTimestamp()
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
            loggingChannel.send({ embeds: [loggingEmbed] }).catch((err) => { });

            break;
        }
    }
}

export default event