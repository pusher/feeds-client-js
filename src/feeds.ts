import {
    App,
    AppOptions,
    Authorizer,
    DEFAULT_CLUSTER,
    Event,
    ResumableSubscription,
    ResumableSubscribeOptions,
} from "pusher-platform-js";

import FeedAuthorizer from "./feed-authorizer"

type Response = any;

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

export class Feed {
    public app: App;
    public feedId: string;
    private authorizer: Authorizer;
    private readonly servicePath: string = "services/feeds/v1/";
    private readonly feedIdRegex: RegExp = /^[a-zA-Z0-9-]+$/;

    private get itemsPath(): string {
        return `${ this.servicePath }/feeds/${ this.feedId }/items`;
    }

    constructor(options: FeedOptions) {
        if (!options.feedId.match(this.feedIdRegex)) {
            throw new TypeError(`Invalid feedId: ${ options.feedId }`);
        }
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
}
