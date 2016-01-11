import {provide}         from "angular2/core";
import {bootstrap}       from 'angular2/platform/browser';
import {HTTP_PROVIDERS}  from "angular2/http";
import {ROUTER_PROVIDERS,
        LocationStrategy,
        HashLocationStrategy} from "angular2/router";

import {CristalWebuiApp} from './app/cristal-webui';
import {Logger}          from "./app/services/logger/logger";
import {LookupService}   from "./app/services/lookup/lookup";

bootstrap(
    CristalWebuiApp,
    [Logger,
     LookupService,
     HTTP_PROVIDERS,
     ROUTER_PROVIDERS,
     provide(LocationStrategy, {useClass: HashLocationStrategy})]
);
