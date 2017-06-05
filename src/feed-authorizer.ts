type Token = string;

interface FeedAuthorizerOptions {
    feedId: string;
    authEndpoint?: string;
}

export default class FeedAuthorizer {
    private feedId: string;
    private authEndpoint: string;
    private defaultAuthEndpoint: string = "/feeds/tokens";
    constructor({ feedId, authEndpoint }: FeedAuthorizerOptions) {
        this.feedId = feedId;
        this.authEndpoint = authEndpoint || this.defaultAuthEndpoint;
    }

    private get authUrl(): string {
        return `${this.authEndpoint}?feed_id=${this.feedId}&type=READ`;
    }

    makeAuthRequest(): Promise<Token> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", this.authUrl);
            xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText).token);
                } else {
                    reject(new Error(`Couldn't get token from ${this.authEndpoint}; got ${xhr.status} ${xhr.statusText}.`));
                }
            });
            xhr.send();
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
