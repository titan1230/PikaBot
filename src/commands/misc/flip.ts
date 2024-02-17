import { Message } from "discord.js";
import { Command } from "../../types";

const command: Command = {
    name: "flip",
    permissions: [],
    aliases: ["coinflip", "coin", "toss", "tosscoin"],
    execute: function (message: Message<boolean>, args: string[]): void {
        
        message.channel.send(Math.random() > 0.5 ? "Heads" : "Tails");
    },
}

export default command;