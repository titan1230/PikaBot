import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import { color, readCommands, readSlashCommands } from "../functions";
import { Command } from "../types";


module.exports = (client : Client) => {

    let slashCommandsDir = join(__dirname,"../slashCommands")
    let commandsDir = join(__dirname,"../commands")

    const commands: Command[] = readCommands(commandsDir, client);
    const slashCommands : SlashCommandBuilder[] = readSlashCommands(slashCommandsDir, client);


    const rest = new REST({version: "10"}).setToken(process.env.TOKEN);

    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: slashCommands.map(command => command.toJSON())
    })
    .then((data : any) => {
        console.log(color("text", `🔥 Successfully loaded ${color("variable", data.length)} slash command(s)`))
        console.log(color("text", `🔥 Successfully loaded ${color("variable", commands.length)} command(s)`))
    }).catch(e => {
        console.log(e)
    })
}