import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from "angular2/router";

import {LookupService, LookupData} from "../../services/lookup/lookup";
import {Logger}                    from "../../services/logger/logger";
import {RouteParams} from "angular2/router";


@Component({
    selector: 'domain',
    templateUrl: 'app/components/domain/domain.html',
    styleUrls: ['app/components/domain/domain.css'],
    providers: [],
    directives: [ROUTER_DIRECTIVES],
    pipes: []
})

/**
 *
 */
export class Domain implements OnInit {

    context : Array<LookupData>;
    error: any;

    constructor(private router: Router,
                private routeParams: RouteParams,
                private lookup: LookupService,
                private logger: Logger) {}

    ngOnInit() {
        let path = this.routeParams.get('path');
        if(path == null) path = '';

        this.logger.debug("Domain.ngOnInit() - path:'"+path+"'");

        this.getContext(new LookupData(path));
    }

    search(query: string) {
        this.error = "";
        if(query == null || query == '') {
            this.getContext(new LookupData(''));
        }
        else {
            /*
            switch(this.selectedSearchType) {
                case "Name":
                case "Custom":
                    break;
                default:
                    query = this.selectedSearchType + ":" + query;
                    break;
            }

            this.getContext(new LookupData("?search="+query));
            */
        }
    }

    getContext(context: LookupData) {
        this.error = "";
        if(context.isItem) {
            //this.router.navigate(['Item']);
            this.error = "Unimplemented functionality";
        }
        else {
            this.lookup.getDomainChildren(context.path).subscribe(
                resp => this.context = resp,
                error => this.error = error
            );
        }
    }
}
