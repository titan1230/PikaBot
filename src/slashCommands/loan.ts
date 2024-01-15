import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import { pool } from "../clients/db";

const ClearCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("loan")
        .addSubcommand(subcommand => {
            return subcommand
                .setName("add")
                .setDescription("Adds a loan to a user")
                .addUserOption(option => {
                    return option
                        .setName("user")
                        .setDescription("User to add loan to")
                        .setRequired(true)
                })
                .addIntegerOption(option => {
                    return option
                        .setName("amount")
                        .setDescription("Amount to add")
                        .setRequired(true)
                })
        })
        .addSubcommand(subcommand => {
            return subcommand
                .setName("remove")
                .setDescription("Removes a loan from a user")
                .addUserOption(option => {
                    return option
                        .setName("user")
                        .setDescription("User to remove loan from")
                        .setRequired(true)
                })
                .addIntegerOption(option => {
                    return option
                        .setName("amount")
                        .setDescription("Amount to remove")
                        .setRequired(true)
                })
        })
        .addSubcommand(subcommand => {
            return subcommand
                .setName("show")
                .setDescription("Lists all loans")
        })
        .setDescription("Delets messages from the current channel."),

    execute: async interaction => {

        const command = interaction.options.getSubcommand()

        switch (command) {

            case "add":

                if (interaction.user.id != "462203190298017793") {
                    interaction.reply({ ephemeral: true, content: "You are not allowed to use this command." })
                    return;
                }

                let user = interaction.options.get("user")?.user
                let amount = Number(interaction.options.get("amount")?.value)

                if (!user) {
                    interaction.reply({ ephemeral: true, content: "User not found." })
                    return;
                }

                if (isNaN(amount)) {
                    interaction.reply({ ephemeral: true, content: "Amount is not a number." })
                    return;
                }

                let conn;
                try {
                    conn = await pool.getConnection();

                    const res = await conn.query("SELECT * FROM users WHERE uid = ?", [user.id])

                    if (res[0].length === 0) {
                        await conn.query("INSERT INTO users (uid, amount) VALUES (?, ?)", [user.id, amount])
                        try {
                            user.send(`You have been given a loan of ${amount} by my master.`)
                        } catch (err) {}
                        interaction.reply({ content: "Successfully added loan." })
                        return;
                    } else {
                        await conn.query("UPDATE users SET amount=amount+? WHERE uid = ?", [amount, user.id])
                        try {
                            user.send(`You have been given a loan of ${amount} by my master.`)
                        } catch (err) {}
                        interaction.reply({ content: "Successfully added loan." })
                    }
                } catch (err) {

                } finally {
                    if (conn) conn.release();
                }

            case "remove":

                if (interaction.user.id != "462203190298017793") {
                    interaction.reply({ ephemeral: true, content: "You are not allowed to use this command." })
                    return;
                }

                user = interaction.options.get("user")?.user
                amount = Number(interaction.options.get("amount")?.value)

                if (!user) {
                    interaction.reply({ ephemeral: true, content: "User not found." })
                    return;
                }

                if (isNaN(amount)) {
                    interaction.reply({ ephemeral: true, content: "Amount is not a number." })
                    return;
                }

                try {
                    conn = await pool.getConnection();

                    const res = await conn.query("SELECT * FROM users WHERE uid = ?", [user.id])

                    if (res[0].length === 0) {
                        interaction.reply({ content: "User not found." })
                        return;
                    } else {
                        await conn.query("UPDATE users SET amount=amount-? WHERE uid = ?", [amount, user.id])
                        try {
                            user.send(`Your loan of ${res[0].amount}`)
                        } catch (err) {}
                        interaction.reply({ content: "Successfully added loan." })
                    }
                } catch (err) {

                } finally {
                    if (conn) conn.release();
                }
            case "show":
                try {
                    conn = await pool.getConnection();

                    const res = await conn.query("SELECT * FROM users")

                    let loans = ""

                    for (let i = 0; i < res[0].length; i++) {
                        const user = await interaction.client.users.fetch(res[i].uuid)
                        loans += `${user.username}: ${res[i].amount}\n`
                    }

                    interaction.reply({ content: loans })
                } catch (err) {

                } finally {
                    if (conn) conn.release();
                }
        }
    },
    cooldown: 10
}

export default ClearCommand;