import { Request, Response } from 'express'
import { GitHubSevice } from '../services/github.service';
import { DiscordService } from '../services/discord.service';

export class GihubController {


    constructor(
        private readonly githubservice = new GitHubSevice(),
        private readonly discordService = new DiscordService()

    ) { }



    webHookHandler = (req: Request, res: Response) => {

        //"x-", significa que es una cabecera personalizada para captar el evento que ha provocado que se dispare esta petición desde github
        const gitHubEvent = req.header('x-github-event') ?? 'unknown';
        //"x-", significa que es una cabecera personalizada para captar la verificacion de la firma que se ha ejecutado nuestra API desde github y desde postman o algun otro sitio
        const signature = req.header('x-hub-signature-256') ?? 'unknown'

        const payload = req.body

        let message: string = ''
        switch (gitHubEvent) {
            case 'star':
                message = this.githubservice.onStar(payload)
                break
            case 'issues':
                message = this.githubservice.onIssue(payload)
                break
            default:
                message = 'Evento mal capturado'
        }

        //una vez que tenemos el mesanje se lo enviamos a discord
        this.discordService.notify(message)
            .then(() => res.status(200).send('Accepted'))
            .catch(() => res.status(500).send({ error: 'Internal Message error -discord' }))

        res.status(201).send(message)

    }




}