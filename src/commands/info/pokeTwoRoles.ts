import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, PermissionFlagsBits, TextChannel } from "discord.js";
import { Command } from "../../types";

const command: Command = {
    name: "pk2_roles",
    permissions: [PermissionFlagsBits.Administrator],
    aliases: ["pk2"],
    execute: function (message: Message<boolean>, args: string[]) {
        
        const row: any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId("pk2-redeem")
            .setLabel("Redeem")
            .setEmoji('⚱️')
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId("pk2-incense")
            .setEmoji('🎠')
            .setLabel(`Incense`)
            .setStyle(ButtonStyle.Primary),
        )

        const nice_thing = '٠ • —– ٠ • —– ٠ • —– ٠ ✤ ٠ —– • ٠ —– • ٠ —– • ٠·\n\n'
        const channel = message.channel.client.channels.cache.get("1173898040516542506") as TextChannel;

        channel.send({ content: nice_thing +`||@everyone||\n-------\n**__PokeTwo Roles__**\n-------\n\n◜⚱️◝ <@&1172696602230657095>\n◜🎠◝ <@&1173909184127967273>`, allowedMentions: {parse: ["everyone", "roles"]}, components: [row] });
        channel.send(nice_thing);
    }
}

export default command;