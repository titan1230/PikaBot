import { Client } from "discord.js";
import { BotEvent, Timeout } from "../types";
import { color } from "../functions";
import { pool } from "../clients/db";

const event: BotEvent = {
    name: "ready",
    once: true,
    execute: (client: Client) => {
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

        setInterval(async () => {
            let conn;

            try {
                conn = await pool.getConnection();

                const res: Timeout[] = await conn.query("SELECT * FROM timeouts");

                for (let i = 0; i < res.length; i++) {
                    const timeout = res[i];
                    const time = timeout.time;

                    if (time < Date.now()) {
                        await conn.query("DELETE FROM timeouts WHERE id = ?", [timeout.id]);

                        const guild = client.guilds.cache.get(process.env.GUILD_ID!);
                        const member = guild?.members.cache.get(timeout.userID);

                        if (member) {

                            if (timeout.type === "mute") {
                                const role = guild?.roles.cache.find(role => role.id === "726369003349737502");

                                if (role) {
                                    member.roles.remove(role);
                                }
                            } else if (timeout.type === "counting") {
                                const role = guild?.roles.cache.find(role => role.id === "1207648049757687808");

                                if (role) {
                                    member.roles.remove(role);
                                }
                            }
                        }
                    }
                }
            } catch (err) { } finally {
                if (conn) conn.release();
            }

        }, 10000);
    }
}

export default event;