import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    Message,
    PermissionFlagsBits,
    SlashCommandBuilder,
    TextChannel,
} from "discord.js";
import { SlashCommand } from "../../types";
import { getEmotes, randAlphaNum } from "../../functions";
import { pool } from "../../clients/db";

const NewRRCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("new-rr")
        .setDescription("Add a new reaction role message.")
        .addChannelOption((option) => {
            return option
                .setName("channel")
                .setDescription("Channel to send the message")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText);
        })
        .addStringOption((option) => {
            return option
                .setName("message_id")
                .setDescription("Message ID of the message u wana send")
                .setRequired(true);
        })
        .addStringOption((option) => {
            return option
                .setName("name-1")
                .setDescription("BTN 1 NAME")
                .setRequired(true);
        })
        .addRoleOption((option) => {
            return option
                .setName("role-1")
                .setDescription("BTN 1 ROLE")
                .setRequired(true);
        })
        .addStringOption((option) => {
            return option
                .setName("emoji-1")
                .setDescription("BTN 2 EMOJI")
                .setRequired(true);
        })
        .addStringOption((option) => {
            return option.setName("name-2").setDescription("BTN 2 NAME");
        })
        .addRoleOption((option) => {
            return option.setName("role-2").setDescription("BTN 2 ROLE");
        })
        .addStringOption((option) => {
            return option.setName("emoji-2").setDescription("BTN 2 NAME");
        })
        .addStringOption((option) => {
            return option.setName("name-3").setDescription("BTN 3 NAME");
        })
        .addRoleOption((option) => {
            return option.setName("role-3").setDescription("BTN 3 ROLE");
        })
        .addStringOption((option) => {
            return option.setName("emoji-3").setDescription("BTN 3 EMOJI");
        })
        .addStringOption((option) => {
            return option.setName("name-4").setDescription("BTN 4 NAME");
        })
        .addRoleOption((option) => {
            return option.setName("role-4").setDescription("BTN 4 ROLE");
        })
        .addStringOption((option) => {
            return option.setName("emoji-4").setDescription("BTN 4 EMOJI");
        })
        .addStringOption((option) => {
            return option.setName("name-5").setDescription("BTN 5 NAME");
        })
        .addRoleOption((option) => {
            return option.setName("role-5").setDescription("BTN 5 ROLE");
        })
        .addStringOption((option) => {
            return option.setName("emoji-5").setDescription("BTN 5 EMOJI");
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        if (!interaction.inCachedGuild()) return;

        let channel = interaction.options.getChannel(
            "channel",
            true
        ) as TextChannel;
        let message_ID = interaction.options.getString("message_id", true);

        let name1 = interaction.options.getString("name-1", true);
        let role1 = interaction.options.getRole("role-1", true);
        let emoji1 = interaction.options.getString("emoji-1", true);

        let name2 = interaction.options.getString("name-2");
        let role2 = interaction.options.getRole("role-2");
        let emoji2 = interaction.options.getString("emoji-2");

        if (emoji2) {
            const e = getEmotes(emoji2);
            if (e && e.length > 0) emoji2 = e[0];
        }

        let name3 = interaction.options.getString("name-3");
        let role3 = interaction.options.getRole("role-3");
        let emoji3 = interaction.options.getString("emoji-3");

        if (emoji3) {
            const e = getEmotes(emoji3);
            if (e && e.length > 0) emoji3 = e[0];
        }

        let name4 = interaction.options.getString("name-4");
        let role4 = interaction.options.getRole("role-4");
        let emoji4 = interaction.options.getString("emoji-4");

        if (emoji4) {
            const e = getEmotes(emoji4);
            if (e && e.length > 0) emoji4 = e[0];
        }

        let name5 = interaction.options.getString("name-5");
        let role5 = interaction.options.getRole("role-5");
        let emoji5 = interaction.options.getString("emoji-5");

        if (emoji5) {
            const e = getEmotes(emoji5);
            if (e && e.length > 0) emoji5 = e[0];
        }

        const id1 = randAlphaNum();
        const id2 = randAlphaNum();
        const id3 = randAlphaNum();
        const id4 = randAlphaNum();
        const id5 = randAlphaNum();

        if (
            (name2 && (!role2 || !emoji2)) ||
            (role2 && (!name2 || !emoji2)) ||
            (emoji2 && (!name2 || !role2))
        ) {
            return interaction.reply(
                "Please provide both role and emoji for the second button."
            );
        }

        if (
            (name3 && (!role3 || !emoji3)) ||
            (role3 && (!name3 || !emoji3)) ||
            (emoji3 && (!name3 || !role3))
        ) {
            return interaction.reply(
                "Please provide both role and emoji for the third button."
            );
        }

        if (
            (name4 && (!role4 || !emoji4)) ||
            (role4 && (!name4 || !emoji4)) ||
            (emoji4 && (!name4 || !role4))
        ) {
            return interaction.reply(
                "Please provide both role and emoji for the fourth button."
            );
        }

        if (
            (name5 && (!role5 || !emoji5)) ||
            (role5 && (!name5 || !emoji5)) ||
            (emoji5 && (!name5 || !role5))
        ) {
            return interaction.reply(
                "Please provide both role and emoji for the fifth button."
            );
        }

        if (message_ID.includes("-")) {
            message_ID = message_ID.split("-")[1];
        }

        let msg: Message<true> | undefined;
        try {
            msg = await interaction.channel?.messages.fetch(message_ID);

            if (msg?.author.bot) return interaction.reply("Cannot use bot messages.");

            if (msg?.content.length! > 1500) {
                interaction.reply({
                    content: `Message content is too long to send in a DM.`,
                    ephemeral: true,
                });
                return;
            }
        } catch (err) {
            console.log(err);
            interaction.reply({
                content: `Failed to fetch message.\nRe-check the message ID.`,
                ephemeral: true,
            });
            return;
        }

        let row = new ActionRowBuilder<ButtonBuilder>();

        let conn;
        try {

            conn = await pool.getConnection();
            await conn.query(`INSERT INTO rr (custom_id, role_id) VALUES (?, ?)`, [id1, role1.id]);
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId(id1)
                    .setLabel(name1)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(emoji1)
            );

            if (name2 && role2 && emoji2) {
                await conn.query(`INSERT INTO rr (custom_id, role_id) VALUES (?, ?)`, [id2, role2.id]);
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(id2)
                        .setLabel(name2)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(emoji2)
                );
            }

            if (name3 && role3 && emoji3) {
                await conn.query(`INSERT INTO rr (custom_id, role_id) VALUES (?, ?)`, [id3, role3.id]);
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(id3)
                        .setLabel(name3)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(emoji3)
                );
            }

            if (name4 && role4 && emoji4) {
                await conn.query(`INSERT INTO rr (custom_id, role_id) VALUES (?, ?)`, [id4, role4.id]);
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(id4)
                        .setLabel(name4)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(emoji4)
                );
            }

            if (name5 && role5 && emoji5) {
                await conn.query(`INSERT INTO rr (custom_id, role_id) VALUES (?, ?)`, [id5, role5.id]);
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(id5)
                        .setLabel(name5)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(emoji5)
                );
            }
        } catch (e) {
            console.log(e);
        } finally {
            if (conn) conn.release();
        }
        try {

            const sent = await channel.send({ content: "a", allowedMentions: { parse: ["everyone"] } });

            await sent.edit({
                content: `||@everyone||\n${msg?.content}`,
                components: [row],
                allowedMentions: { parse: ["everyone"] }
            });
            interaction.reply({
                content: `Reaction Role message sent to ${channel}.`,
                ephemeral: true,
            });
        } catch (err) {
            console.log(err);
            interaction.reply({
                content: `Failed to send message to ${channel}.`,
                ephemeral: true,
            });
        }
    },
    cooldown: 10,
};

export default NewRRCommand;