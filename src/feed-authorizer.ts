type Token = string;

interface FeedAuthorizerOptions {
    feedId: string;
    authEndpoint?: string;
}

function requestBody(feedId): string {
    return `grant_type=client_credentials&feed_id=${ feedId }&type=READ`;
}

export default class FeedAuthorizer {
    private feedId: string;
    private authEndpoint: string;
    private readonly defaultAuthEndpoint: string = "/feeds/tokens";
    constructor({ feedId, authEndpoint }: FeedAuthorizerOptions) {
        this.feedId = feedId;
        this.authEndpoint = authEndpoint || this.defaultAuthEndpoint;
    }

    makeAuthRequest(): Promise<Token> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", this.authEndpoint);
            xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText).access_token);
                } else {
                    reject(new Error(`Couldn't get token from ${this.authEndpoint}; got ${xhr.status} ${xhr.statusText}.`));
                }
            });
            xhr.setRequestHeader(
                "content-type",
                "application/x-www-form-urlencoded",
            );
            xhr.send(requestBody(this.feedId));
        });
    }

    authorize(): Promise<Token> {
        // TODO caching
        if (this.feedId.startsWith("private-")) {
            return this.makeAuthRequest();
        }
        return Promise.resolve(null);
    }
}
