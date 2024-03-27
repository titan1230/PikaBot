import { Message } from "discord.js";
import { Command } from "../../types";

const command: Command = {
    name: "rickroll",
    permissions: [],
    aliases: ["rick"],
    execute: function (message: Message<boolean>, args: string[]) {
        if (message.author.id !== "462203190298017793") return
        message.delete()
        message.channel.send("https://tenor.com/view/secret-rick-roll-gif-19886714")    
    },
}

export default command;