import {bootstrap}      from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from "angular2/http";

import {CristalWebuiApp} from './app/cristal-webui';
import {Logger}          from "./app/services/logger/logger";
import {LookupService}   from "./app/services/lookup/lookup";

bootstrap(CristalWebuiApp, [Logger, LookupService, HTTP_PROVIDERS]);
