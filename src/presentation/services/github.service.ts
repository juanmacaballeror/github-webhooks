import { GitHubIssuePayload, GithubStarPayload } from "../../interfaces";

export class GitHubSevice {

    constructor() {

    }


    onStar(payload: GithubStarPayload): string {
        let message: string = '';

        //recupero la fecha que clicko en la esrella de guthub de nuestro protecto
        // si quita la estrella esta fecha vendrá a null 
        const { starred_at, sender, repository, action } = payload

        if (starred_at) {
            message = `User ${sender.login} ${action} star on ${repository.full_name}`
        } else {
            message = `User ${sender.login} ${action} star on ${repository.full_name}`
        }


        return message;
    }

    onIssue(payload: GitHubIssuePayload): string {

        const { action, issue } = payload;

        if (action === 'opened') {
            const message = `An issue was iopened whith this title ${issue.title}`
            return message
        }
        if (action === 'closed') {
            const message = `An issue was closed whith this title ${issue.title}`
            return message
        }
        if (action === 'reopened') {
            const message = `An issue was reopened whith this title ${issue.title}`
            return message
        }

        return `Unhandled action for the issue event ${action}`


    }
}