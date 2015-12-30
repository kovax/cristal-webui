import {Component} from 'angular2/core';
import {LookupService, LookupData} from "../../services/lookup/lookup";

@Component({
    selector: 'directory',
    templateUrl: 'app/components/directory/directory.html',
    styleUrls: ['app/components/directory/directory.css'],
    providers: [LookupService],
    directives: [],
    pipes: []
})

export class Directory {

    context : Array<LookupData>;
    error: any;

    constructor(private lookup: LookupService) {
        this.getContext('');
    }

    getContext(c: string) {
        this.lookup.getChildren(c).subscribe(
            res => this.context = res,
            error => this.error = error
        );
    }
}
