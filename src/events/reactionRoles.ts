import { GuildMemberRoleManager, Interaction } from "discord.js";
import { BotEvent, role } from "../types";
import { pool } from "../clients/db";

const event: BotEvent = {
    name: "interactionCreate",
    execute: async function (interaction: Interaction) {
        if (!interaction.isButton() || !interaction.inCachedGuild()) return;

        const id = interaction.customId;
        let conn;

        try {
            //Gender
            if (id === "male") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "709329115009777716"
                );

                if (interaction.member.roles.cache.get("709329115009777716")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role!.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role!.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "female") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "709329063034224661"
                );

                if (interaction.member.roles.cache.get("709329063034224661")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "others") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "709612295482900511"
                );

                if (interaction.member.roles.cache.get("709612295482900511")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            //Device
            if (id === "desktop") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "710012053657485405"
                );

                if (interaction.member.roles.cache.get("710012053657485405")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "laptop") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "710012099652354067"
                );

                if (interaction.member.roles.cache.get("710012099652354067")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "phone") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "710012171748245555"
                );

                if (interaction.member.roles.cache.get("710012171748245555")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            //Notification
            if (id === "announcement") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "709617591425171496"
                );

                if (interaction.member.roles.cache.get("709617591425171496")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "updates") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "745719126290596030"
                );

                if (interaction.member.roles.cache.get("745719126290596030")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "sponcer") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "738044822841065532"
                );

                if (interaction.member.roles.cache.get("738044822841065532")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "partner") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "738044816465723462"
                );

                if (interaction.member.roles.cache.get("738044816465723462")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id == "free-shit") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1263809954897334332"
                );

                if (interaction.member.roles.cache.get("1263809954897334332")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            //Giveaways
            if (id === "myuu-give") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "719463600506273802"
                );

                if (interaction.member.roles.cache.get("719463600506273802")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "pkmn-give") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "865804259744546836"
                );

                if (interaction.member.roles.cache.get("865804259744546836")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }


            //Events
            if (id === "myuu-eve") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "737628220538748978"
                );

                if (interaction.member.roles.cache.get("737628220538748978")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "pkmn-eve") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1171737891085504542"
                );

                if (interaction.member.roles.cache.get("1171737891085504542")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }


            if (id === "raffle") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1196021376482553886"
                );

                if (interaction.member.roles.cache.get("1196021376482553886")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "instant-tourney") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1196021421076385832"
                );

                if (interaction.member.roles.cache.get("1196021421076385832")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            // PLAYER ROLES
            if (id === "myuu-player") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1172450216658616401"
                );

                if (interaction.member.roles.cache.get("1172450216658616401")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "pkmn-player") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1172450255913103370"
                );

                if (interaction.member.roles.cache.get("1172450255913103370")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            // POKEMON BOT ROLES
            if (id === "raider") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1172696602230657095"
                );

                if (interaction.member.roles.cache.get("1172696602230657095")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "pkmn-redeem") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1173909291892232244"
                );

                if (interaction.member.roles.cache.get("1173909291892232244")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "pkmn-incense") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1173909184127967273"
                );

                if (interaction.member.roles.cache.get("1173909184127967273")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }


            // QUICK GIVEAWAY
            if (id === "quick-myuu") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1188388890868985896"
                );

                if (interaction.member.roles.cache.get("1188388890868985896")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "quick-pkmn") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1192498310553014343"
                );

                if (interaction.member.roles.cache.get("1192498310553014343")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            }

            if (id === "amusement") {
                const role = interaction.guild.roles.cache.find(
                    (role) => role.id === "1213091188282892369"
                );

                if (interaction.member.roles.cache.get("1213091188282892369")) {
                    interaction.member.roles.remove(role!);
                    await interaction.reply({
                        content: `Removed \`${role?.name}\``,
                        ephemeral: true,
                    });
                    return;
                }

                interaction.member.roles.add(role!);
                await interaction.reply({
                    content: `Added role \`${role?.name}\``,
                    ephemeral: true,
                });
                return;
            } else {
                try {
                    conn = await pool.getConnection();
                    const roles: role[] = await conn.query(
                        "SELECT * FROM rr WHERE custom_id = ?",
                        [id]
                    );

                    if (roles.length === 0) return;

                    const r = interaction.guild.roles.cache.find(
                        (role) => role.id === roles[0].role_id
                    );

                    if (interaction.member.roles.cache.get(r!.id)) {
                        interaction.member.roles.remove(r!);
                        await interaction.reply({
                            content: `Removed \`${r?.name}\``,
                            ephemeral: true,
                        });

                        return;
                    }

                    interaction.member.roles.add(r!);
                    await interaction.reply({
                        content: `Added role \`${r?.name}\``,
                        ephemeral: true,
                    });

                    return;
                } catch (error) {
                    console.log(error);
                } finally {
                    if (conn) {
                        conn.release();
                    }
                }
            }
        } catch (err) {
            console.log(err);
            interaction.reply({
                content: "An error occurred!",
                ephemeral: true,
            });
        }
    },
};

export default event;
