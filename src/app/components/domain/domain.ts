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

        this.lookup.getDomainChildren(path).subscribe(
            resp => this.context = resp,
            error => this.error = error
        );
    }
}
