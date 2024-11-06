import express from 'express'
import { envs } from './config';
import { GihubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';



(() => {
    main()
})()

function main() {

    const app = express();

    const controller = new GihubController();


    app.use(express.json())

    app.use(GithubSha256Middleware.verifySignature);

    app.post('/api/github', controller.webHookHandler)

    app.listen(envs.PORT, () => {
        console.log(`Aplicación levantada en el puesto ${envs.PORT}`)
    })

}