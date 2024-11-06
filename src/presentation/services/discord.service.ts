import { envs } from "../../config";


export class DiscordService {

    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL

    constructor() { }

    async notify(message: string) {

        const body = {
            content: message,
            //embeds es para enviar gif pero me falla y no me deja
            // embeds: [
            //     {
            //         image: { url: '../../../assets/gif-animacion.gif' }
            //     }
            // ]
        }

        console.log({ body: JSON.stringify(body) })

        const resp = await fetch(this.discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        console.log({ resp })

        if (!resp.ok) {
            console.log('Error sending message to discord')
            return false
        }

        return true
    }

}