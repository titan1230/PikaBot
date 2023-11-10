import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, PermissionFlagsBits } from "discord.js";
import { Command } from "../../types";

const command: Command = {
    name: "rr",
    permissions: [PermissionFlagsBits.Administrator],
    aliases: [],
    execute: function (message: Message<boolean>, args: string[]) {
        message.delete()

        const GenderRow:any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('male')
                .setLabel('Male')
                .setEmoji('♂️')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('female')
                .setLabel('Female')
                .setEmoji('♀️')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('others')
                .setLabel('Rather Not Say')
                .setEmoji('🤐')
                .setStyle(ButtonStyle.Primary),
        )

        const deviceRow:any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('desktop')
                .setLabel('Desktop')
                .setEmoji('🖥')
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId('laptop')
                .setLabel('Laptop')
                .setEmoji('💻')
                .setStyle(ButtonStyle.Primary),
            
            new ButtonBuilder()
                .setCustomId('phone')
                .setLabel('Phone')
                .setEmoji('📱')
                .setStyle(ButtonStyle.Primary),
        )

        const notifRow:any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('announcement')
                .setLabel('Announcements')
                .setEmoji('📢')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('updates')
                .setLabel('Server Updates')
                .setEmoji('🔔')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('sponcer')
                .setLabel('Sponsorships')
                .setEmoji('💸')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('partner')
                .setLabel('Partnerships')
                .setEmoji('🥂')
                .setStyle(ButtonStyle.Primary)
        )

        const playerRow:any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('myuu-player')
                .setLabel('Myuu Player')
                .setEmoji('🌿')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('pkmn-player')
                .setLabel('Pokemon Bot Player')
                .setEmoji('🌴')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('pk2-player')
                .setLabel('PokeTwo Player')
                .setEmoji('🪵')
                .setStyle(ButtonStyle.Primary),
        );

        const giveawayRow:any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('myuu-give')
                .setLabel('Myuu Giveaways')
                .setEmoji('🎁')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('pkmn-give')
                .setLabel('Pokemon Bot Giveaways') 
                .setEmoji('🪅')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('pk2-give')
                .setLabel('PokeTwo Giveaways')
                .setEmoji('🎊')
                .setStyle(ButtonStyle.Primary),
        )

        const eventRow:any = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('myuu-eve')
                .setLabel('Myuu Events')
                .setEmoji('🏮')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('pkmn-eve')
                .setLabel('Pokemon Bot Events')
                .setEmoji('🎉')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('pk2-eve')
                .setLabel('PokeTwo Events')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🧨'),
        )

        //const str = "-------\nGender\n-------\n\n⸉ˋ‿̩͙‿̩̩̽‿̩͙ ‿̩̥̩‿̩̩̽‿̩͙ˊ⸊\n\n◜♂️◝ <@&958303554911731722>\n◜♀️◝ <@&760089186354069545>\n◜🤐◝ <@&742280588953649224>"
        const nice_thing = '٠ • —– ٠ • —– ٠ • —– ٠ ✤ ٠ —– • ٠ —– • ٠ —– • ٠·\n\n'
        message.channel.send({content: nice_thing +"||@everyone||\n-------\n**__Gender__**\n-------\n\n◜♂️◝ <@&709329115009777716>\n◜♀️◝ <@&709329063034224661>\n◜🤐◝ <@&709612295482900511>", components: [GenderRow], allowedMentions: {parse: ["everyone", "roles"]}}) 
        message.channel.send({content: nice_thing +"||@everyone||\n-------\n**__Devices__**\n-------\n\n◜🖥◝ <@&710012053657485405>\n◜💻◝  <@&710012099652354067>\n◜📱◝ <@&710012171748245555>", components: [deviceRow], allowedMentions: {parse: ["everyone", "roles"]}})
        message.channel.send({content: nice_thing +`||@everyone||\n-------\n**__Notification Pings__**\n-------\n\n◜📢◝ <@&709617591425171496>\n◜🔔◝ <@&745719126290596030>\n◜💸◝ <@&738044822841065532>\n◜🥂◝ <@&738044816465723462>`, components: [notifRow], allowedMentions: {parse: ["everyone", "roles"]}})
        message.channel.send({content: nice_thing +`||@everyone||\n-------\n**__Giveaways Pings__**\n-------\n\n◜🎁◝ <@&719463600506273802>\n◜🪅◝ <@&865804259744546836>\n◜🎊◝ <@&1171725338108244020>`, components: [giveawayRow], allowedMentions: {parse: ["everyone", "roles"]}});
        message.channel.send({content: nice_thing +`||@everyone||\n-------\n**__Events Pings__**\n-------\n\n◜🏮◝ <@&737628220538748978>\n◜🎉◝ <@&1171737891085504542>\n◜🧨◝ <@&1171738148510900234>`, components: [eventRow], allowedMentions: {parse: ["everyone", "roles"]}})
        message.channel.send({content: nice_thing +`||@everyone||\n-------\n**__Access Roles__**\n-------\n\n◜🌿◝ <@&1172450216658616401>\n◜🌴◝ <@&1172450255913103370>\n◜🪵◝ <@&1172450283054452756>`, components: [playerRow], allowedMentions: {parse: ["everyone", "roles"]}});
        message.channel.send(nice_thing)
    },
};


//`⸉ˋ‿̩͙‿̩̩̽‿̩͙ ‿̩̥̩‿̩̩̽‿̩͙ˊ⸊ˎ`
// ٠ • —– ٠ • —– ٠ • —– ٠ ✤ ٠ —– • ٠ —– • ٠ —– • ٠· 

export default command;