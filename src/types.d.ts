import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js"

export interface SlashCommand {
    command: SlashCommandBuilder,
    execute: (interaction : ChatInputCommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    modal?: (interaction: ModalSubmitInteraction<CacheType>) => void,
    cooldown?: number // in seconds
}

export interface Command {
    name: string,
    permissions: Array<PermissionResolvable>,
    aliases: Array<string>,
    cooldown?: number,
    execute: (message: Message, args: Array<string>) => void,
}

interface GuildOptions {
    prefix: string,
}

export type GuildOption = keyof GuildOptions
export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            CLIENT_ID: string,
            PREFIX: string,
            CHANNEL_ID: string,
            MESSAGE_ID: string,
            GUILD_ID: string,
            ARCHIVE_CATEGORY_ID: string,
            PASS: string,  
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        commands: Collection<string, Command>,
        cooldowns: Collection<string, number>
    }
}

interface Timeout {
    id: number,
    userID: string,
    type: string,
    time: number,
}