import { Client, GatewayIntentBits, Collection, PermissionFlagsBits,} from "discord.js";
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
import { Command, SlashCommand } from "./types";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import Express from "express";
import routes from "./routes/routes";
config();

const app = Express();
app.listen(3001, () => console.log("API STARTED ON PORT 3001"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use("/api", routes);

export const client = new Client({
    intents:[Guilds, MessageContent, GuildMessages, GuildMembers],
    allowedMentions: { parse: ["users"], repliedUser: true },
});


client.slashCommands = new Collection<string, SlashCommand>();
client.commands = new Collection<string, Command>();
client.cooldowns = new Collection<string, number>();

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    if (!handler.endsWith(".js")) return;
    require(`${handlersDir}/${handler}`)(client)
});


client.login(process.env.TOKEN);