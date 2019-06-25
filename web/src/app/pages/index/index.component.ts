import {Component, OnInit} from '@angular/core';
import {RssFeedService} from "./store/rss-feed.service";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    constructor(
        private service: RssFeedService
    ) {
    }

    ngOnInit() {
        this.service.getRssFeed().then((response) => {
            console.log(response);
        })

        console.log('init')
    }

}
