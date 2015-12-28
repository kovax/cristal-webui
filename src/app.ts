import {bootstrap} from 'angular2/platform/browser';
import {CristalWebuiApp} from './app/cristal-webui';
import {HTTP_PROVIDERS} from "angular2/http";


bootstrap(CristalWebuiApp, [HTTP_PROVIDERS]);
