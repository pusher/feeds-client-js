type Token = string;

interface FeedAuthorizerOptions {
    feedId: string;
    authEndpoint?: string;
}

interface AuthResponse {
    access_token: Token;
    expires_in: number;
    token_type: string;
}

function requestBody(feedId: string): string {
    return `grant_type=client_credentials&feed_id=${ feedId }&type=READ`;
}

function now(): number {
    return Math.floor(Date.now() / 1000);
}

export default class FeedAuthorizer {
    private feedId: string;
    private authEndpoint: string;
    private cachedToken: Token = null;
    private cacheValidUntil: number;
    private readonly cacheExpiryTolerance: number = 60;
    private readonly defaultAuthEndpoint: string = "/feeds/tokens";

    constructor({ feedId, authEndpoint }: FeedAuthorizerOptions) {
        this.feedId = feedId;
        this.authEndpoint = authEndpoint || this.defaultAuthEndpoint;
    }

    authorize(): Promise<Token> {
        if (this.feedId.startsWith("private-") && this.cacheIsStale) {
            return this.makeAuthRequest().then(responseBody => {
                this.cache(responseBody.access_token, responseBody.expires_in);
                return this.cachedToken;
            });
        }
        return Promise.resolve(this.cachedToken); // null if feed is public
    }

    private get cacheIsStale(): boolean {
        return !this.cachedToken || now() > this.cacheValidUntil;
    }

    private cache(token: Token, expiresIn: number) {
        this.cachedToken = token;
        this.cacheValidUntil = now() + expiresIn - this.cacheExpiryTolerance;
    }

    private makeAuthRequest(): Promise<AuthResponse> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", this.authEndpoint);
            xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
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
}
