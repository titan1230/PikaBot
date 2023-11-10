import { Client } from "discord.js";
import { BotEvent } from "../types";
import { color } from "../functions";
import { pool } from "../clients/db";

const event : BotEvent = {
    name: "ready",
    once: true,
    execute: (client : Client) => {
        console.log(
            color("text", `💪 Logged in as ${color("variable", client.user?.tag)}`)
        )

        pool.getConnection().then(async (con) => {
            await con.query("CREATE TABLE IF NOT EXISTS afk (userID varchar(255) PRIMARY KEY,guildID varchar(255) NOT NULL,reason varchar(255) NOT NULL,time INTEGER NOT NULL, AFK tinyint(1) NOT NULL)")
            console.log(color("text", "📚 Successfully connected to database"));
            con.release();
        }).catch(err => {
            console.log(err);
        })
    }
}

export default event;