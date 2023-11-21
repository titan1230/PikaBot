import { Message } from "discord.js";
import { Command } from "../../types";

const command: Command = {
    name: "test",
    permissions: [],
    aliases: [],
    execute: async function (message: Message<boolean>, args: string[]) {

        if (!args[1]) return;
        
        const user = await message.guild?.members.fetch(args[1]).catch(() => null);
        message.reply(user!.user.tag);
    }
}

export default command;