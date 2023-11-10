import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import ms from "ms";

const MuteCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("mutes a person")
    .addUserOption(option => {
        return option
        .setName("user")
        .setDescription("User to be muted")
        .setRequired(true)
    })
    .addStringOption(option => {
        return option
        .setName("time")
        .setDescription("Time to be muted")
        .setRequired(false)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    execute: interaction => {

        if (!interaction.inCachedGuild()) return;

        let user = interaction.options.get("user")?.member;
        let time = interaction.options.get("time")?.value || '1h';

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
        );

        let muteRole = interaction.guild?.roles.cache.find(role => role.name === 'Muted');
        const hasRole = user!.roles.cache.find(role => role.name === 'Muted');

        if (hasRole) return interaction.reply("Target is already muted.");

        const filter = (interaction:any) => interaction.user.id === interaction.author.id
        const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 15000, max: 1 })

        collector!.on("collect", async (i) => {
            const id = i.customId
            if (time) {
                if (id === "Yes") {
                    await i.deferUpdate()
                    await user!.roles.add(muteRole!);
                    await interaction.followUp(`Muted <@${user!.user.id}>`);
                    return;
                }

                if (id === "No") {
                    await i.deferUpdate()
                    await interaction.followUp('Command canceled');
                    return;
                }
                return;
            }

            if (id === "Yes") {
                await i.deferUpdate()
                await user!.roles.add(muteRole!);
                await interaction.followUp(`<@${user!.user.id}> has been muted for ${ms(ms(`${time}`))}`);

                setTimeout(function () {
                    user!.roles.remove(muteRole!);
                }, ms(`${time}`));
                return;
            }

            if (id === "No") {
                await i.deferUpdate();
                await interaction.followUp('Command canceled');
                return;
            }
        })
    },
    cooldown: 10
}

export default MuteCommand;