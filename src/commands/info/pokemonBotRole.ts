import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message, PermissionFlagsBits, TextChannel } from "discord.js";
import { Command } from "../../types";

const command: Command = {
    name: "pkmn_role",
    permissions: [PermissionFlagsBits.Administrator],
    aliases: ["pkmn"],
    execute: function (message: Message<boolean>, args: string[]) {
        
        const row: any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('raider')
            .setLabel('Raider')
            .setEmoji('⚔️')
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId('pkmn-incense')
            .setEmoji('🔮')
            .setLabel(`Incense`)
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId('pkmn-redeem')
            .setEmoji('🎡')
            .setLabel(`Redeem`)
            .setStyle(ButtonStyle.Primary),
        )
        
        const nice_thing = '٠ • —– ٠ • —– ٠ • —– ٠ ✤ ٠ —– • ٠ —– • ٠ —– • ٠·\n\n'
        const channel = message.channel.client.channels.cache.get("1173897867480535060") as TextChannel
        channel.send({ content: nice_thing +`||@everyone||\n-------\n**__Pokemon Bot Roles__**\n-------\n\n◜⚔️◝ <@&1172696602230657095>\n◜🔮◝ <@&1173909184127967273>\n◜🎡◝ <@&1173909291892232244>`, allowedMentions: {parse: ["everyone", "roles"]}, components: [row] });
        channel.send(nice_thing);
    }   
}

export default command;