import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message, PermissionFlagsBits, TextChannel } from "discord.js";
import { Command } from "../../types";

const command: Command = {
    name: "raider",
    permissions: [PermissionFlagsBits.Administrator],
    aliases: [],
    execute: function (message: Message<boolean>, args: string[]) {
        
        const row: any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('raider')
            .setLabel('Raider')
            .setEmoji('⚔️')
            .setStyle(ButtonStyle.Primary),
        )
            
        const embed = new EmbedBuilder()
        .setTitle("Raider Role")
        .setDescription("Click the button below to get the raider role and get notified when a raid is happening.")
        .setColor("Yellow")
        .setFooter({ text: "Want to get rid of the role? Just click the button again!" })
        
        const channel = message.channel.client.channels.cache.get("889624405083439892") as TextChannel
        channel.send({ embeds: [embed], components: [row] })
        // message.channel.send({ embeds: [embed], components: [row] })
    }   
}

export default command;