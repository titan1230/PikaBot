import { EmbedBuilder } from "discord.js";
import { Command } from "../../types";
import axios from "axios";

const command: Command = {
    name: "weather",
    permissions: [],
    aliases: [],
    cooldown: 15,
    execute: async function (message, args) {
        const city = args.slice(1).join(" ");
        if (!city) return message.reply("Please provide a city name.");  
        try{
            const res:any = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=bfa5e3a758ae4029b67180853232506&q=${city}&days=1&aqi=no&alerts=no`);
            
            if (res.error) return message.reply(res.error.message);

            const embed = new EmbedBuilder()
                .setDescription("```\n" + `${res.data.location.name}, ${res.data.location.country}\n` + res.data.current.condition.text + "\n```")
                .setThumbnail(`https://${res.data.current.condition.icon.slice(2)}`)
                .setAuthor({name: "Weather forecast", iconURL: `https://${res.data.current.condition.icon.slice(2)}`})
                .setTimestamp(Date.now())
                .setColor("Yellow")
                .addFields(
                    {
                        name: "Temperature",
                        value: `${res.data.current.temp_c}\℃ \n${res.data.current.temp_f}\℉`,
                        inline: true
                    },
                    {
                        name: "Min/Max Temp",
                        value: `${res.data.forecast.forecastday[0].day.maxtemp_c}/${res.data.forecast.forecastday[0].day.mintemp_c}\℃ \n${res.data.forecast.forecastday[0].day.maxtemp_f}/${res.data.forecast.forecastday[0].day.mintemp_f}\℉`,
                        inline: true
                    },
                    {
                        name: "Feels Like",
                        value: `${res.data.current.feelslike_c}\℃ \n${res.data.current.feelslike_f}\℉`,
                        inline: true
                    },
                    {name: "Wind Speed", value: `${res.data.current.wind_kph} Km/H, ${res.data.current.wind_dir}`, inline: true},
                    {name: "Rain%", value: `${res.data.forecast.forecastday[0].day.daily_chance_of_rain}%`, inline: true},
                    {name: "Snow%", value: `${res.data.forecast.forecastday[0].day.daily_chance_of_snow}%`, inline: true},
                )
            message.reply({embeds: [embed]})

        } catch (err) {
            message.reply("An error occurred.")
            console.log(err)
        }
    },
}

export default command;