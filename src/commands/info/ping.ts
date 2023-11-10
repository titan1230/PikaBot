import { EmbedBuilder } from "discord.js";
import { Command } from "../../types";

const command : Command = {
    name: "ping",
    cooldown: 0,
    aliases: [],
    permissions: [],
    execute: (message, args) => {
        //UPTIME
        let days = Math.floor(message.client.uptime! / 86400000);
        let hours = Math.floor(message.client.uptime! / 3600000) % 24;
        let minutes = Math.floor(message.client.uptime! / 60000) % 60;
        let seconds = Math.floor(message.client.uptime! / 1000) % 60;

        //LATENCY

        let websocketLatency = (message.createdTimestamp - Date.now()) / 1000;
        let apiLatency = message.client.ws.ping;
        let totalLatency = websocketLatency + apiLatency;

        const latencyColor = {
            "green" : "🟢",
            "yellow": "🟡",
            "red": "🔴"
        }

        const embed = new EmbedBuilder()
            .setTitle("Ping")
            .setColor(totalLatency < 200 ? "Green" : totalLatency < 500 ? "Yellow" : "Red")
            .addFields(
                {
                    name: "API Latency",
                    value: `\` ${apiLatency}ms \`${latencyColor[apiLatency < 200 ? "green" : apiLatency < 500 ? "yellow" : "red"]}`
                },
                {
                    name: "WebSocket Latency",
                    value: `\` ${websocketLatency}ms \`${latencyColor[websocketLatency < 200 ? "green" : websocketLatency < 500 ? "yellow" : "red"]}`
                },
                {
                    name: "Uptime",
                    value: `\`${days}d ${hours}h ${minutes}m ${seconds}s\``
                }
            )
            .setTimestamp();
        
        message.reply({ embeds: [embed] });
    },
}

export default command