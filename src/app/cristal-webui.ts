import {Component}         from 'angular2/core';
import {Router, RouteConfig,
        ROUTER_DIRECTIVES} from "angular2/router";

import {LookupService, LookupData} from "./services/lookup/lookup";
import {Domain}                    from "./components/domain/domain";
import {Role}                      from "./components/role/role";
import {Navbar}                    from "./components/navbar/navbar";
import {ItemView}                  from "./components/item-view/item-view";

import {ItemSummary} from "./components/item-summary/item-summary";
import {ItemData} from "./components/item-data/item-data";
import {ItemCollection} from "./components/item-collection/item-collection";
import {ItemHistory} from "./components/item-history/item-history";
import {ItemEvent} from "./components/item-event/item-event";
import {Login} from "./components/login/login";
import {AuthRouterOutlet} from "./directives/auth-router-outlet/auth-router-outlet";
import {ItemJob} from "./components/item-job/item-job";

@Component({
    selector: 'cristal-webui-app',
    providers: [],
    templateUrl: 'app/cristal-webui.html',
    directives: [Navbar, Domain, ItemView, AuthRouterOutlet],
    pipes: [],
    properties: [],
    inputs: []
})

@RouteConfig([
    { path:'/login', name: 'Login', component: Login },

    { path:'/domain',       name: 'DomainRoot', component: Domain },
    { path:'/domain/:path', name: 'Domain',     component: Domain },

    { path:'/roles',        name: 'RoleRoot', component: Role },
    { path:'/roles/:path',  name: 'Role',     component: Role },

    { path:'/item/:uuid',                  name: 'ItemSummary',    component: ItemSummary },
    { path:'/item/:uuid/jobs',             name: 'ItemJob',        component: ItemJob },
    { path:'/item/:uuid/data/:schema',     name: 'ItemData',       component: ItemData },
    { path:'/item/:uuid/collection/:name', name: 'ItemCollection', component: ItemCollection },
    { path:'/item/:uuid/history',          name: 'ItemHistory',    component: ItemHistory },
    { path:'/item/:uuid/history/:id',      name: 'ItemEvent',      component: ItemEvent },
])

export class CristalWebuiApp {
    constructor(private router: Router) {}
}
