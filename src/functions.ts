import chalk from "chalk"
import { Guild, GuildMember, PermissionFlagsBits, PermissionResolvable, TextChannel } from "discord.js";
import { Command } from "./types";
import { readdirSync, statSync } from "fs";
import { join } from "path";

type colorType = "text" | "variable" | "error"

const themeColors = {
    text: "#ff8e4d",
    variable: "#ff624d",
    error: "#f5426c"
}

export const getThemeColor = (color: colorType) => Number(`0x${themeColors[color].substring(1)}`)

export const color = (color: colorType, message: any) => {
    return chalk.hex(themeColors[color])(message)
}

export const checkPermissions = (member: GuildMember, permissions: Array<PermissionResolvable>) => {
    let neededPermissions: PermissionResolvable[] = []
    permissions.forEach(permission => {
        if (!member.permissions.has(permission)) neededPermissions.push(permission)
    })
    if (neededPermissions.length === 0) return null
    return neededPermissions.map(p => {
        if (typeof p === "string") return p.split(/(?=[A-Z])/).join(" ")
        else return Object.keys(PermissionFlagsBits).find(k => Object(PermissionFlagsBits)[k] === p)?.split(/(?=[A-Z])/).join(" ")
    })
}

export const sendTimedMessage = (message: string, channel: TextChannel, duration: number) => {
    channel.send(message)
        .then(m => setTimeout(async () => (await channel.messages.fetch(m)).delete(), duration))
    return
}

export function readCommands(commandsDir: any, client: any) {
    const commands: Command[] = [];

    function readFilesInDirectory(directory: any) {
        const files = readdirSync(directory);

        for (const file of files) {
            const filePath = join(directory, file);
            const fileStat = statSync(filePath);

            if (fileStat.isDirectory()) {
                // If it's a sub-directory, recursively read files in that directory
                readFilesInDirectory(filePath);
            } else if (file.endsWith('.js')) {
                // If it's a .js file, require and add it as a command
                const command = require(filePath).default;
                commands.push(command);
                client.commands.set(command.name, command);
            }
        }
    }

    readFilesInDirectory(commandsDir);
    return commands;
}

export function getRandomValue(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}