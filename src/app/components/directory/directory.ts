import {Component, OnInit} from 'angular2/core';

import {LookupService, LookupData} from "../../services/lookup/lookup";
import {Logger}                    from "../../services/logger/logger";

@Component({
    selector: 'directory',
    templateUrl: 'app/components/directory/directory.html',
    styleUrls: ['app/components/directory/directory.css'],
    providers: [],
    directives: [],
    pipes: []
})

/**
 *
 */
export class Directory implements OnInit {

    searchTypes = ['Name','Type','Custom'];
    selectedSearchType = 'Name';

    context : Array<LookupData>;
    error: any;

    constructor(private lookup: LookupService, private logger: Logger) {}

    ngOnInit() {
        //let path = this.routeParams.get('path');
        //if(path == null) path = '';
        this.getContext(new LookupData(''));
    }

    setSearchType(type: string) {
        this.selectedSearchType = type;
    }

    search(query: string) {
        this.error = "";
        if(query == null || query == '') {
            this.getContext(new LookupData(''));
        }
        else {
            switch(this.selectedSearchType) {
                case "Name":
                case "Custom":
                    break;
                default:
                    query = this.selectedSearchType + ":" + query;
                    break;
            }

            this.getContext(new LookupData("?search="+query));
        }
    }

    getContext(c: LookupData) {
        this.error = "";
        if(c.isItem) {
            this.error = "Unimplemented functionality";
        }
        else {
            this.lookup.getChildren(c.path).subscribe(
                resp => this.context = resp,
                error => this.error = error
            );
        }
    }
}
