import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RssFeedService {
    constructor(
        private http: HttpClient
    ) {
    }

    getRssFeed() {
        return this.http.get(window.location.origin + `/api/rss-feed`)
            .toPromise();
    }
}