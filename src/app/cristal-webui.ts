import {Component}         from 'angular2/core';
import {RouteConfig}       from "angular2/router";
import {ROUTER_DIRECTIVES} from "angular2/router";

import {LookupService} from "./services/lookup/lookup";
import {LookupData}    from "./services/lookup/lookup";
import {Domain}        from "./components/domain/domain";
import {Role}          from "./components/role/role";
import {Navbar}        from "./components/navbar/navbar";
import {ItemSummary}   from "./components/item-summary/item-summary";

@Component({
    selector: 'cristal-webui-app',
    providers: [LookupService],
    templateUrl: 'app/cristal-webui.html',
    directives: [Navbar, Domain, ItemSummary, ROUTER_DIRECTIVES],
    pipes: [],
    properties: [],
    inputs: []
})

@RouteConfig([
    { path:'/domain',       name: 'DomainRoot', component: Domain },
    { path:'/domain/:path', name: 'Domain',     component: Domain },

    { path:'/roles',        name: 'RoleRoot', component: Role },
    { path:'/roles/:path',  name: 'Role',     component: Role },

    { path:'/item/:uuid',   name: 'Item',   component: ItemSummary },
])

export class CristalWebuiApp {}
