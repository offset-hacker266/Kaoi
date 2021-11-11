import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'dare',
            description: 'Will send you random task.',
            aliases: ['d'],
            category: 'fun',
            usage: `${client.config.prefix}dare`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://zekais-api.herokuapp.com/dare?apikey=zekais`)
            .then((response) => {
                // console.log(response);
                const text = `💐 *Here is your dare* : ${response.data.message}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🌟 An error occurred: ${err}`)
            })
    }
}
