import { Router } from 'express';
import { client } from '..';
import { TextChannel } from 'discord.js';
import { pool } from '../clients/db';
const router = Router();

router.get('/', async (req, res) => {
    res.send('PikaBot says hallo!');
});

router.get('/hourly', async (req, res) => {

    const pass = req.query.pass;

    if (pass !== process.env.PASS) {
        res.status(401).send('Unauthorized!');
        return;
    }
    
    let s; let s1; let s2; let s3; let s4; let s5; let se;

    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query(`SELECT * FROM leveling ORDER BY msg DESC LIMIT 5`);

        s = `︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵\n. • ☆ . °__**Chit-Chat Leaderboard   **__s°:. *₊ ° .\n︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶\n\n─ ･ ｡ Updated <t:${Math.round(Date.now() / 1000)}:R>\n\n╭୧ ✎ ‧₊ — — — — — — — ₊˚ ˊ˗\n`;
        s1 = `┊ ・1. ${res[0] ? `<@${res[0].uid}>\n` : "\n"}`
        s2 = `┊ ・2. ${res[1] ? `<@${res[1].uid}>\n` : "\n"}`
        s3 = `┊ ・3. ${res[2] ? `<@${res[2].uid}>\n` : "\n"}`
        s4 = `┊ ・4. ${res[3] ? `<@${res[3].uid}>\n` : "\n"}`
        s5 = `┊ ・5. ${res[4] ? `<@${res[4].uid}>\n` : "\n"}`
        se = `╰・─・─・─・─・─・─・─・─・₊˚`

    } catch (err) {
        console.error(err);
        res.status(501).send('Error!');
        return;
    } finally {
        if (conn) conn.release();
    }

    const guild = await client.guilds.fetch(process.env.GUILD_ID!)
    const channel = await guild?.channels.fetch(process.env.CHANNEL_ID!) as TextChannel
    const msg = await channel?.messages.fetch(process.env.MESSAGE_ID!)

    msg.edit({ content: s + s1 + s2 + s3 + s4 + s5 + se })
    res.send('Updated!');
});

router.get('/monthly', async (req, res) => {
    const pass = req.query.pass;

    if (pass !== process.env.PASS) {
        res.status(401).send('Unauthorized!');
        return;
    }

    let s = "TOP 5 PPL THIS MONTH!!!\n\n"; let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query(`SELECT * FROM leveling ORDER BY msg DESC LIMIT 5`);

        res.map((r: any) => {
            s += `<@${r.uid}>: ${r.msg}\n`
        });

        await conn.query(`TRUNCATE TABLE leveling`)
    } catch (err) {
        console.error(err);
        res.status(501).send('Error!');
        return;
    } finally {
        if (conn) conn.release();
    }

    const guild = await client.guilds.fetch(process.env.GUILD_ID!)
    const channel = await guild?.channels.fetch("711087619366453298") as TextChannel
    channel.send(s)

    fetch(`http://scratcher.ddns.net:3001/api/hourly?pass=${process.env.PASS}`, { mode: 'no-cors'});
    res.send('Updated!');
});

export default router;