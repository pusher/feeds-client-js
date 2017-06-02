import {
    App,
    AppOptions,
    DEFAULT_CLUSTER,
    Event,
    ResumableSubscription,
    ResumableSubscribeOptions,
} from 'pusher-platform-js';

export interface FeedOptions extends AppOptions {
    feedId: string;
}

export interface SubscribeOptions extends ResumableSubscribeOptions {
    tailSize?: number;
}

export interface GetHistoryOptions {
    fromId?: string;
    limit?: number;
}

type Response = any;

export class Feed {
    public app: App;
    public feedId: string;
    readonly serviceName: string = "feeds";

    constructor(options: FeedOptions)
    {
        this.app = new App(options);
        this.feedId = options.feedId;
    }

    subscribe(options: SubscribeOptions): ResumableSubscription {
        let queryString = "";
        if (options.tailSize) {
            queryString = `?tail_size=${ options.tailSize }`;
        }
        return this.app.resumableSubscribe({
            path: this.itemsPath + queryString,
            ...options,
        });
    }

    getHistory(options?: GetHistoryOptions): Promise<any> {
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

    publish(item: any): Promise<Response> {
        return this.app.request({
            method: "POST",
            path: this.itemsPath,
            body: { items: [ item ] },
        });
    }

    publishBatch(items: any[]): Promise<Response> {
        return this.app.request({
            method: "POST",
            path: this.itemsPath,
            body: { items },
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

    private servicePath: string = `services/feeds/v1/`;

    private get itemsPath(): string {
        return `${this.servicePath}/feeds/${this.feedId}/items`;
    }
}
