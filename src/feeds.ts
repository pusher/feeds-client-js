import {
    App,
    AppOptions,
    Authorizer,
    DEFAULT_CLUSTER,
    Event,
    ResumableSubscription,
    ResumableSubscribeOptions,
} from "pusher-platform-js";

export interface FeedOptions extends AppOptions {
    feedId: string;
    authEndpoint?: string;
    authorizer?: Authorizer;
}

export interface FeedSubscribeOptions extends ResumableSubscribeOptions {
    tailSize?: number;
}

export interface FeedHistoryOptions {
    fromId?: string;
    limit?: number;
}

interface FeedAuthorizerOptions {
    feedId: string;
    authEndpoint?: string;
}

type Response = any;
type Item = any;
type Token = string;

class FeedAuthorizer {
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

export class Feed {
    public app: App;
    public feedId: string;
    private authorizer: Authorizer;
    readonly serviceName: string = "feeds";

    constructor(options: FeedOptions)
    {
        this.app = new App(options);
        this.feedId = options.feedId;
        if (options.authorizer) {
            // TODO provide authorizer as an option to the app constructor?
            this.app.authorizer = options.authorizer;
        } else {
            this.app.authorizer = new FeedAuthorizer(options);
        }
    }

    subscribe(options: FeedSubscribeOptions): Promise<ResumableSubscription> {
        let queryString = "";
        if (options.tailSize) {
            queryString = `?tail_size=${ options.tailSize }`;
        }
        return this.app.resumableSubscribe({
            path: this.itemsPath + queryString,
            ...options,
        });
    }

    getHistory(options?: FeedHistoryOptions): Promise<Response> {
        let queryString = "";
        let queryParams: string[] = [];
        if (options && options.fromId) {
            queryParams.push(`from_id=${ options.fromId }`);
        }
        if (options && options.limit) {
            queryParams.push(`limit=${ options.limit }`);
        }
        if (queryParams.length > 0) {
            queryString = `?${ queryParams.join("&") }`;
        }
        return new Promise((resolve, reject) => {
            return this.app.request({
                method: "GET",
                path: this.itemsPath + queryString,
            }).then((response) => {
                try {
                    resolve(JSON.parse(response));
                } catch (err) {
                    reject(err);
                }
            }).catch(reject);
        });
    }

    listFeeds(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.app.request({
                method: "GET",
                path: "feeds",
            }).then((responseBody) => {
                try { 
                    resolve(JSON.parse(responseBody));
                } catch(err){
                    reject(err);
                }
            }).catch(reject);
        });
    }

    private servicePath: string = "services/feeds/v1/";

    private get itemsPath(): string {
        return `${this.servicePath}/feeds/${this.feedId}/items`;
    }
}
